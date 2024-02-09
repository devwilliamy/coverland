import { PRODUCT_REVIEWS_TABLE } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';
import { ZodError, z } from 'zod';
import { getPagination } from '../utils';
import { Tables } from '../types';

export type TReviewData = Tables<'reviews-2'>;

export type TProductReviewsQueryFilters = {
  productType?: 'Car Covers' | 'SUV Covers' | 'Truck Covers';
  year?: string;
  make?: string;
  model?: string;
  submodel?: string;
  submodel2?: string;
};

export type TProductReviewsQueryOptions = {
  pagination?: {
    page?: number;
    limit?: number;
  };
};

export type TProductReviewSummary = {
  total_reviews: number;
  average_score: number;
};

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
  submodel: z.string().optional(),
  submodel2: z.string().optional(),
});

const ProductReviewsQueryOptionsSchema = z.object({
  pagination: z
    .object({
      page: z.number().optional().default(1),
      limit: z.number().optional().default(10),
    })
    .optional()
    .default({ page: 1, limit: 10 }),
});

export async function getProductReviewsByPage(
  filters: TProductReviewsQueryFilters,
  options: TProductReviewsQueryOptions
): Promise<TReviewData[]> {
  try {
    const validatedFilters = ProductReviewsQueryFiltersSchema.parse(filters);
    const validatedOptions = ProductReviewsQueryOptionsSchema.parse(options);
    const { productType, year, make, model, submodel, submodel2 } =
      validatedFilters;
    const {
      pagination: { page, limit },
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

    // Note: This is using the year generation from the url.
    // It's possible there might be some other years overlapping and might need extra logic to find those
    if (year) {
      fetch = fetch.eq('year_generation', year);
    }

    if (submodel) {
      fetch = fetch.textSearch('submodel', submodel);
    }
    if (submodel2) {
      fetch = fetch.textSearch('submodel2', submodel2);
    }

    const { data, error } = await fetch;
    console.log('getProductReviewsByPage:', {
      data: data?.slice(0, 3),
      validatedFilters,
    });

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
    const { productType, year, make, model, submodel, submodel2 } =
      validatedFilters;

    const fetch = supabaseDatabaseClient.rpc('get_product_reviews_summary', {
      type: productType,
      make,
      model,
      year,
      submodel,
      submodel2,
    });

    const { data, error } = await fetch;
    console.log('GetProductReviewSummary:', { data, validatedFilters });
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
