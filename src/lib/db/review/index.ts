import { ZodError, z } from 'zod';

import { PRODUCT_REVIEWS_TABLE } from '../constants/databaseTableNames';
import { Tables } from '../types';
import { getPagination } from '../utils';
import { supabaseDatabaseClient } from '../supabaseClients';
import { StaticImageData } from 'next/image';

export type TReviewData = Tables<'reviews-2'>;

export type TProductReviewsQueryFilters = {
  productType?: 'Car Covers' | 'SUV Covers' | 'Truck Covers';
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
};

export type TProductReviewSummary = {
  total_reviews: number;
  average_score: number;
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
});

export async function getProductReviewsByPage(
  productQueryFilters: TProductReviewsQueryFilters,
  options: TProductReviewsQueryOptions
): Promise<TReviewData[]> {
  console.log('running fetch');
  try {
    const validatedFilters =
      ProductReviewsQueryFiltersSchema.parse(productQueryFilters);
    const validatedOptions = ProductReviewsQueryOptionsSchema.parse(options);
    const { productType, year, make, model } = validatedFilters;
    const {
      pagination: { page, limit },
      sort,
      filters,
    } = validatedOptions;
    const { from, to } = getPagination(page, limit);
    let fetch = supabaseDatabaseClient
      .from(PRODUCT_REVIEWS_TABLE)
      .select('*')
      .range(from, to);

    if (productType) {
      fetch = fetch.eq('type', productType);
    }

    if (make) {
      fetch = fetch.textSearch('make', make);
    }

    if (model) {
      fetch = fetch.textSearch('model', model);
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
    const { data, error } = await fetch;

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log('ZodError:', error);
    }
    console.error(error);
    return [];
  }
}

export async function getAllReviewsWithImages(
  filters: TProductReviewsQueryFilters
): Promise<[string, boolean][]> {
  try {
    const validatedFilters = ProductReviewsQueryFiltersSchema.parse(filters);
    const { productType, year, make, model, submodel, submodel2 } =
      validatedFilters;
    let fetch = supabaseDatabaseClient
      .from(PRODUCT_REVIEWS_TABLE)
      .select('*')
      .not('review_image', 'is', null);

    if (productType) {
      fetch = fetch.eq('type', productType);
    }

    if (make) {
      fetch = fetch.textSearch('make', make);
    }

    if (model) {
      fetch = fetch.textSearch('model', model);
    }

    if (year) {
      fetch = fetch.eq('parent_generation', year);
    }

    if (submodel) {
      fetch = fetch.textSearch('submodel', submodel);
    }
    if (submodel2) {
      fetch = fetch.textSearch('submodel2', submodel2);
    }

    const { data, error } = await fetch;
    console.log('getAllReviewsWithImages:', {
      data,
      validatedFilters,
    });

    if (error) {
      console.error(error);
      return [];
    }

    const imageMap = new Map<string, boolean>();

    for (const ob of data) {
      const split = ob.review_image?.split(',');
      if (split) {
        for (const imageString of split) {
          !imageMap.has(imageString) && imageMap.set(imageString, false);
        }
      }
    }

    return Array.from(imageMap);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log('ZodError:', error);
    }
    console.error(error);
    return [];
  }
}

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

    const fetch = supabaseDatabaseClient.rpc('get_product_reviews_summary', {
      type: productType,
      make,
      model,
      year,
    });

    const { data, error } = await fetch;
    // console.log('GetProductReviewSummary:', { data, validatedFilters });
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
      console.log('ZodError:', error);
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
      console.log(error);
    }
    return data || [];
  } catch (error) {
    if (error instanceof ZodError) {
      console.log('ZodError:', error);
    }
    console.error(error);
    return [];
  }
}
