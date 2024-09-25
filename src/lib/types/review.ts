import { StaticImageData } from 'next/image';
import { Tables } from '../db/types';
import { Asset } from 'next-video/dist/assets.js';

export type TReviewData = Tables<'reviews_car_covers'>;

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

export type ReviewMedia = {
  review_image_url: string;
  review_video_thumbnail_url: StaticImageData;
  review_video_url: Asset;
  rating_stars: string | number | undefined;
  duration: string;
};
