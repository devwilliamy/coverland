import { z } from 'zod';
import { FilterParams, SortParams } from '@/lib/types/review';

export type TProductReviewsQueryFilters = {
  productType?:
    | 'Car Covers'
    | 'SUV Covers'
    | 'Truck Covers'
    | 'Seat Covers'
    | 'Floor Mats'
    | 'Floor Mat';
  year?: string;
  make?: string;
  model?: string;
};

export type TProductReviewsQueryOptions = {
  pagination?: {
    page?: number;
    limit?: number;
  };
  sort?: SortParams[];
  filters?: FilterParams[];
  search?: string;
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
  submodel3: string;
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

export const FilterSchema = z.object({
  field: z.string(),
  operator: z.enum(['eq', 'neq', 'gt', 'lt', 'gte', 'lte', 'notnull']),
  value: z.union([z.string(), z.number()]), // Adjust as necessary
});

export const SortOptionSchema = z.object({
  field: z.string().default('helpful'),
  order: z.enum(['asc', 'desc']).default('desc'),
  nullsFirst: z.boolean().optional(),
});

export const ProductReviewsQueryFiltersSchema = z.object({
  productType: z.optional(
    z.union([
      z.literal('Car Covers'),
      z.literal('SUV Covers'),
      z.literal('Truck Covers'),
      z.literal('Seat Covers'),
      z.literal('Floor Mats'),
      z.literal('Floor Mat'),
    ])
  ),
  year: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
});

export const ProductReviewsQueryOptionsSchema = z.object({
  pagination: z
    .object({
      page: z.number().optional().default(1),
      limit: z.number().optional().default(8),
    })
    .optional()
    .default({ page: 1, limit: 8 }),
  sort: z
    .array(SortOptionSchema)
    .optional()
    .default([{ field: 'helpful', order: 'desc', nullsFirst: false }]),
  filters: z.array(FilterSchema).optional(),
  search: z.string().optional(),
});
