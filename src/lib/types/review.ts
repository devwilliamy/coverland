import { Tables } from "../db/types";

export type TReviewData = Tables<'reviews-2'>;

export type TProductReviewSummary = {
    total_reviews: number;
    average_score: number;
  };