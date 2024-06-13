import { Tables } from '../db/types';

export type TReviewData = Tables<'reviews-2'>;

export type TProductReviewSummary = {
  total_reviews: number;
  average_score: number;
};

export type SortParams = {
  field: string;
  order: 'asc' | 'desc';
  nullsFirst?: boolean;
};

export type FilterParams = {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'notnull';
  value: string | number;
};