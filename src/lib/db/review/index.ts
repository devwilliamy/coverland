import { ZodError, z } from 'zod';

import {
  CAR_COVERS_REVIEWS_TABLE,
  PRODUCT_REVIEWS_TABLE,
  RPC_GET_DISTINCT_REVIEW_IMAGES,
  RPC_GET_PRODUCT_REVIEWS_SUMMARY,
  SEAT_COVERS_REVIEWS_TABLE,
} from '../constants/databaseTableNames';
import { getPagination } from '../utils';
import { supabaseDatabaseClient } from '../supabaseClients';

import {
  TProductReviewsQueryFilters,
  TProductReviewsQueryOptions,
  ProductReviewsQueryFiltersSchema,
  ProductReviewsQueryOptionsSchema,
  TProductReviewDistinctImages,
} from './types';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';
import { CAR_COVERS } from '@/lib/constants';

export const generateSlug = (text: string) => {
  if (!text) return ''; // Return an empty string if text is falsy

  // Step 1: Replace special characters with whitespace, except for periods and parentheses
  let slug = text.replace(/[^a-zA-Z0-9 .()]/g, ' ');

  // Step 2: Remove periods and parentheses but keep the numeric and alphabetic characters together
  slug = slug.replace(/[.()]/g, '');

  // Step 3: Replace consecutive whitespaces (including those introduced by removing special characters) with a single space
  slug = slug.replace(/\s+/g, ' ');

  // Convert to lowercase
  slug = slug.toLowerCase();

  // Step 4: Avoid separating alphabetic characters and numbers when they should stay together

  // Final: Trim and replace whitespaces with hyphens
  slug = slug.trim().replace(/ /g, '-');

  return slug.trim();
};

/**
 * Takes in an async function and will retry the function call after a delay
 * @param fn
 * @param retries
 * @param delay
 * @returns
 */
const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 2000
): Promise<T> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt < retries) {
        console.warn(
          `Attempt ${attempt} failed. Retrying in ${delay / 1000} seconds...`
        );
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error(`All ${retries} attempts failed.`);
        throw error;
      }
    }
  }
  throw new Error('Unexpected error in retry logic.');
};

export async function getProductReviewsByPage(
  productQueryFilters: TProductReviewsQueryFilters,
  options: TProductReviewsQueryOptions,
  reviewImageTracker: Record<string, boolean> = {}
): Promise<TReviewData[]> {
  try {
    const validatedFilters =
      ProductReviewsQueryFiltersSchema.parse(productQueryFilters);

    const validatedOptions = ProductReviewsQueryOptionsSchema.parse(options);

    const { productType, year, make, model } = validatedFilters;

    const {
      pagination: { page, limit },
      sort,
      filters,
      // search,
    } = validatedOptions;

    const { from, to } = getPagination(page, limit);
    const fetchReviews = async () => {
      const TABLE_NAME = productType === CAR_COVERS ? CAR_COVERS_REVIEWS_TABLE : SEAT_COVERS_REVIEWS_TABLE
      let fetch = supabaseDatabaseClient
        .from(TABLE_NAME)
        .select(
          'review_image,review_description,review_title,rating_stars,review_author,helpful,reviewed_at'
        )
        .range(from, to);

      // 6/20/24: Separating tables by type, testing to see if this works. If it does, remove.
      // if (productType) {
      //   fetch = fetch.eq('type', productType);
      // }

      if (make) {
        fetch = fetch.eq('make_slug', generateSlug(make));
      }

      if (model) {
        fetch = fetch.eq('model_slug', generateSlug(model));
      }

      if (year) {
        fetch = fetch.eq('parent_generation', year);
      }

      // Dynamically apply filters
      filters?.forEach(({ field, operator, value }) => {
        switch (operator) {
          case 'eq':
            fetch = fetch.eq(field, value);
            break;
          case 'neq':
            fetch = fetch.neq(field, value);
            break;
          case 'gt':
            fetch = fetch.gt(field, value);
            break;
          case 'lt':
            fetch = fetch.lt(field, value);
            break;
          case 'gte':
            fetch = fetch.gte(field, value);
            break;
          case 'lte':
            fetch = fetch.lte(field, value);
            break;
          case 'notnull':
            fetch = fetch.not(field, 'is', null);
            break;
          // Add cases for other operators as needed
          default:
            break;
        }
      });

      sort.forEach(({ field, order, nullsFirst }) => {
        fetch = fetch.order(field, { ascending: order === 'asc', nullsFirst });
      });

      const { data, error } = await fetch;

      if (error) {
        console.error('[getProductReviewsByPage]:', error);
        throw error;
      }
      return data;
    };

    const data = await retry(fetchReviews, 3, 100);

    return filterDuplicateReviewImages({
      reviewData: data,
      reviewImageTracker,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('ZodError:', error);
    }
    console.error('[getProductReviewsByPage] caught: ', error);
    return [];
  }
}

export async function getAllReviewsWithImages(
  productQueryFilters: TProductReviewsQueryFilters,
  options: TProductReviewsQueryOptions
): Promise<TReviewData[]> {
  //  Promise<Record<string, boolean>>
  try {
    const validatedFilters =
      ProductReviewsQueryFiltersSchema.parse(productQueryFilters);
    const validatedOptions = ProductReviewsQueryOptionsSchema.parse(options);
    const { productType, year, make, model } = validatedFilters;
    const {
      sort,
      // search,
    } = validatedOptions;
    const TABLE_NAME = productType === CAR_COVERS ? CAR_COVERS_REVIEWS_TABLE : SEAT_COVERS_REVIEWS_TABLE

    const fetchAllReviewsWithImages = async () => {
      const fetch = supabaseDatabaseClient.rpc(RPC_GET_DISTINCT_REVIEW_IMAGES, {
        p_table_name: TABLE_NAME,
        p_type: productType,
        p_make_slug: generateSlug(make as string) || null,
        p_model_slug: generateSlug(model as string) || null,
        p_parent_generation: year || null,
      });

      const { data, error } = await fetch;

      if (error) {
        console.error('[GetAllReviewsWithImages] Error: ', error);
        throw error;
      }

      return data;
    };

    const data = await retry(fetchAllReviewsWithImages, 3, 100);

    const filteredDuplicatedReviewImages:
      | TReviewData[]
      | TProductReviewDistinctImages[] = filterDuplicateReviewImages({
      reviewData: data,
      reviewImageTracker: {},
    });

    return filteredDuplicatedReviewImages.filter(
      (reviewImage: TReviewData) => reviewImage.review_image !== ''
    );
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('ZodError:', error);
    }
    console.error('[GetAllReviewsWithImages] Caught Error: ', error);
    // return {};
    return [];
  }
}

export const filterDuplicateReviewImages = ({
  reviewData,
  reviewImageTracker,
}: {
  reviewData: TReviewData[] | TProductReviewDistinctImages[];
  reviewImageTracker: Record<string, boolean>;
}): TReviewData[] => {
  const imageObj = reviewImageTracker;
  const newImageData: TReviewData[] = [];

  for (const ob of reviewData) {
    const splitImages = ob.review_image?.split(',');
    const savedStrings = splitImages?.filter((imgStr) => {
      if (!imageObj[imgStr] && imgStr.endsWith('.webp')) {
        imageObj[imgStr] = true;
        return true;
      }
      return false;
    });

    const uniqueString = savedStrings?.join(',');
    newImageData.push({ ...ob, review_image: uniqueString });
  }

  return newImageData;
};

/*
  Uses an RPC (Remote Procedure Call). Pretty much SQL Function.
  Have to set it up on Supabase first.

  Check out the script on Supabase in SQL Editor -> 'Review Statistics'

*/
export async function getProductReviewSummary(
  filters: TProductReviewsQueryFilters
): Promise<TProductReviewSummary> {
  try {
    const validatedFilters = ProductReviewsQueryFiltersSchema.parse(filters);
    const { productType, year, make, model } = validatedFilters;
    const TABLE_NAME = productType === CAR_COVERS ? CAR_COVERS_REVIEWS_TABLE : SEAT_COVERS_REVIEWS_TABLE

    const fetchReviewSummary = async () => {
      const fetch = supabaseDatabaseClient.rpc(
        RPC_GET_PRODUCT_REVIEWS_SUMMARY,
        {
          table_name: TABLE_NAME,
          type: productType || null,
          make: generateSlug(make as string) || null,
          model: generateSlug(model as string) || null,
          year: year || null,
        }
      );

      const { data, error } = await fetch;

      if (error) {
        console.error('[getProductReviewsByPage]:', error);
        throw error;
      }
      return data;
    };

    const data = await retry(fetchReviewSummary, 3, 100);

    return {
      total_reviews: data[0].total_reviews,
      average_score: data[0].average_score,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('ZodError:', error);
    }
    console.error('[getProductReviewSummary] caught error: ', error);
    return { total_reviews: 0, average_score: 0 };
  }
}

/*
  Special function for special case.
  Need to run this when user selects filter by image
  Because we are doing something special to filter out the images so duplicates don't appear later
  We currently don't have many images so this isn't too bad, but if we get more and more and less duplicates, we can get rid of this
  This was for the filterByImage quickfix. Can be removed later.
*/
export async function getProductReviewsByImage(
  productQueryFilters: TProductReviewsQueryFilters,
  options: TProductReviewsQueryOptions
): Promise<TReviewData[]> {
  try {
    const validatedFilters =
      ProductReviewsQueryFiltersSchema.parse(productQueryFilters);
    const validatedOptions = ProductReviewsQueryOptionsSchema.parse(options);
    const { productType, year, make, model } = validatedFilters;
    const { sort, filters } = validatedOptions;
    const fetchReviews = async () => {
      const TABLE_NAME = productType === CAR_COVERS ? CAR_COVERS_REVIEWS_TABLE : SEAT_COVERS_REVIEWS_TABLE

      let fetch = supabaseDatabaseClient
        .from(TABLE_NAME)
        .select(
          'review_image,review_description,review_title,rating_stars,review_author,helpful,reviewed_at'
        );

      if (productType) {
        fetch = fetch.eq('type', productType);
      }

      if (make) {
        fetch = fetch.eq('make_slug', generateSlug(make));
      }

      if (model) {
        fetch = fetch.eq('model_slug', generateSlug(model));
      }

      if (year) {
        fetch = fetch.eq('parent_generation', year);
      }

      // Dynamically apply filters
      // Special case, this should only be using review image
      // Field SHOULD only be "review_image", operator SHOULD only be "neq"
      filters?.forEach(({ field, operator, value }) => {
        switch (operator) {
          case 'neq':
            fetch = fetch.neq(field, value);
            break;
          // Add cases for other operators as needed
          default:
            break;
        }
      });

      sort.forEach(({ field, order, nullsFirst }) => {
        fetch = fetch.order(field, { ascending: order === 'asc', nullsFirst });
      });

      const { data, error } = await fetch;

      if (error) {
        console.error('[getProductReviewsByImage] error:', error);
        throw error;
      }
      return data;
    };

    const data = await retry(fetchReviews, 3, 100);

    const filteredDuplicatedReviewImages: TReviewData[] =
      filterDuplicateReviewImages({
        reviewData: data,
        reviewImageTracker: {},
      });

    return filteredDuplicatedReviewImages.filter(
      (reviewImage: TReviewData) => reviewImage.review_image !== ''
    );
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('ZodError:', error);
    }
    console.error('[getProductReviewsByImage] caught error:', error);

    return [];
  }
}
