import { ZodError, z } from 'zod';

import {
  PRODUCT_REVIEWS_TABLE,
  SEAT_PRODUCT_REVIEWS_TABLE,
} from '../constants/databaseTableNames';
import { Tables } from '../types';
import { getPagination } from '../utils';
import { supabaseDatabaseClient } from '../supabaseClients';

export type TReviewData = Tables<'reviews-2'>;

export type TProductReviewsQueryFilters = {
  productType?: 'Car Covers' | 'SUV Covers' | 'Truck Covers' | 'Seat Covers';
  year?: string;
  make?: string;
  model?: string;
};

export type FilterParams = {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'notnull';
  value: string | number;
};

export type SortParams = {
  field: string;
  order: 'asc' | 'desc';
};

export type TProductReviewsQueryOptions = {
  pagination?: {
    page?: number;
    limit?: number;
  };
  sort?: SortParams;
  filters?: FilterParams[];
  search?: string;
};

export type TProductReviewSummary = {
  total_reviews: number;
  average_score: number;
};

export type TProductReviewDistinctImages = {
  rating_stars: number;
  helpful: number;
  reviewed_at: string;
  gpt_review_id: string;
  model: string;
  year_generation: string;
  submodel1: string;
  submodel2: string;
  mirror: string;
  review_description: string;
  make_slug: string;
  review_title: string;
  review_author: string;
  review_image: string;
  model_slug: string;
  size: string;
  sku: string;
  parent_generation: string;
  product_type: string;
  product_name: string;
  type: string;
  make: string;
};

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

const FilterSchema = z.object({
  field: z.string(),
  operator: z.enum(['eq', 'neq', 'gt', 'lt', 'gte', 'lte', 'notnull']),
  value: z.union([z.string(), z.number()]), // Adjust as necessary
});

const ProductReviewsQueryFiltersSchema = z.object({
  productType: z.optional(
    z.union([
      z.literal('Car Covers'),
      z.literal('SUV Covers'),
      z.literal('Truck Covers'),
      z.literal('Seat Covers'),
    ])
  ),
  year: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
});

const ProductReviewsQueryOptionsSchema = z.object({
  pagination: z
    .object({
      page: z.number().optional().default(1),
      limit: z.number().optional().default(8),
    })
    .optional()
    .default({ page: 1, limit: 8 }),
  sort: z
    .object({
      field: z.string().default('helpful'),
      order: z.enum(['asc', 'desc']).default('desc'),
    })
    .optional()
    .default({ field: 'helpful', order: 'desc' }),
  filters: z.array(FilterSchema).optional(),
  search: z.string().optional(),
});

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
    const table =
      productType === 'Seat Covers'
        ? SEAT_PRODUCT_REVIEWS_TABLE
        : PRODUCT_REVIEWS_TABLE;
    let fetch = supabaseDatabaseClient.from(table).select('*').range(from, to);

    if (productType) {
      fetch = fetch.eq('type', productType);
    }

    if (make) {
      fetch = fetch.textSearch('make_slug', generateSlug(make));
    }

    if (model) {
      fetch = fetch.textSearch('model_slug', generateSlug(model));
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

    if (sort && sort.field) {
      fetch = fetch.order(sort.field, { ascending: sort.order === 'asc' });
    }

    // if (search) {
    //   fetch = fetch.textSearch('review_description', search);
    // }

    const { data, error } = await fetch;

    if (error) {
      console.error(error);
      return [];
    }

    return filterDuplicateReviewImages({
      reviewData: data,
      reviewImageTracker,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('ZodError:', error);
    }
    console.error(error);
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

    // let fetch = supabaseDatabaseClient
    //   .from(PRODUCT_REVIEWS_TABLE)
    //   .select('*')
    //   .not('review_image', 'is', null);

    // if (productType) {
    //   fetch = fetch.eq('type', productType);
    // }
    // if (make) {
    //   fetch = fetch.textSearch('make_slug', generateSlug(make));
    // }

    // if (model) {
    //   fetch = fetch.textSearch('model_slug', generateSlug(model));
    // }

    // if (year) {
    //   fetch = fetch.eq('parent_generation', year);
    // }

    // if (sort && sort.field) {
    //   fetch = fetch.order(sort.field, { ascending: sort.order === 'asc' });
    // }

    const rpc =
      productType === 'Seat Covers'
        ? 'get_distinct_seat_covers_review_images'
        : 'get_distinct_review_images';

    const fetch = supabaseDatabaseClient.rpc(rpc, {
      p_type: productType,
      p_make_slug: generateSlug(make as string) || null,
      p_model_slug: generateSlug(model as string) || null,
      p_parent_generation: year || null,
    });

    const { data, error } = await fetch;

    if (error) {
      console.error('[GetAllReviewsWithImages] Error: ', error);
      return [];
    }

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
    console.error(error);
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
    const rpc =
      productType === 'Seat Covers'
        ? 'get_seat_covers_product_reviews_summary'
        : 'get_product_reviews_summary';
    const fetch = supabaseDatabaseClient.rpc(rpc, {
      type: productType || null,
      make: generateSlug(make as string) || null,
      model: generateSlug(model as string) || null,
      year: year || null,
    });

    const { data, error } = await fetch;

    if (error) {
      console.error(error);
      return { total_reviews: 0, average_score: 0 };
    }

    return {
      total_reviews: data[0].total_reviews,
      average_score: data[0].average_score,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('ZodError:', error);
    }
    console.error(error);
    return { total_reviews: 0, average_score: 0 };
  }
}

export async function getProductReviewData(
  filters: TProductReviewsQueryFilters
): Promise<TReviewData[]> {
  try {
    const validatedFilters = ProductReviewsQueryFiltersSchema.parse(filters);
    const { year, make, model } = validatedFilters;

    let fetch = supabaseDatabaseClient.from(PRODUCT_REVIEWS_TABLE).select('*');

    if (make) {
      fetch = fetch.textSearch('make', make);
    }

    if (model) {
      fetch = fetch.textSearch('model', model);
    }

    const { data, error } = await fetch;

    if (year) {
    }
    if (error) {
      console.error(error);
    }

    return data || [];
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('ZodError:', error);
    }
    console.error(error);
    return [];
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

    const table =
      productType === 'Seat Covers'
        ? SEAT_PRODUCT_REVIEWS_TABLE
        : PRODUCT_REVIEWS_TABLE;
    let fetch = supabaseDatabaseClient.from(table).select('*');

    if (productType) {
      fetch = fetch.eq('type', productType);
    }

    if (make) {
      fetch = fetch.textSearch('make_slug', generateSlug(make));
    }

    if (model) {
      fetch = fetch.textSearch('model_slug', generateSlug(model));
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

    if (sort && sort.field) {
      fetch = fetch.order(sort.field, { ascending: sort.order === 'asc' });
    }

    const { data, error } = await fetch;

    if (error) {
      console.error(error);
      return [];
    }
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
    console.error(error);
    return [];
  }
}
