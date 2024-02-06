import { PRODUCT_REVIEWS_TABLE } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';
import { z } from 'zod';
import { getPagination } from '../utils';

export type TProductReviewsQueryFilters = {
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
) {
  const validatedFilters = ProductReviewsQueryFiltersSchema.parse(filters);
  const validatedOptions = ProductReviewsQueryOptionsSchema.parse(options);

  const { year, make, model } = validatedFilters;
  const {
    pagination: { page, limit },
  } = validatedOptions;

  const { from, to } = getPagination(page, limit);

  let fetch = supabaseDatabaseClient
    .from(PRODUCT_REVIEWS_TABLE)
    .select('*')
    .range(from, to);

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
    console.log(error);
  }

  return data;
}
