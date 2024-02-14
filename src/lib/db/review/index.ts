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
  options: TProductReviewsQueryOptions
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
    let fetch = supabaseDatabaseClient
      .from(PRODUCT_REVIEWS_TABLE)
      .select('*')
      .range(from, to);

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
    const { productType, year, make, model } = validatedFilters;

    const fetch = supabaseDatabaseClient.rpc('get_product_reviews_summary', {
      type: productType,
      make: generateSlug(make as string) || undefined,
      model: generateSlug(model as string) || undefined,
      year,
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
