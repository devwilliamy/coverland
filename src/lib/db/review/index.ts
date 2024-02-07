import { PRODUCT_REVIEWS_TABLE } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';
import { ZodError, z } from 'zod';
import { getPagination } from '../utils';
import { Tables } from '../types';

export type TReviewData = Tables<'Mock-Data-Reviews'>;

export type TProductReviewsQueryFilters = {
  productType?: 'Car Covers' | 'SUV Covers' | 'Truck Covers';
  year?: string;
  make?: string;
  model?: string;
};

export type TProductReviewsQueryOptions = {
  pagination?: {
    page?: number;
    limit?: number;
  };
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
    const { productType, year, make, model } = validatedFilters;
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

    const { data, error } = await fetch;
    console.log('Data:', { data, validatedFilters });

    if (year) {
    }

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
