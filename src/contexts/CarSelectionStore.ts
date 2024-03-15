// CarSelectionStore.ts
import { createContext } from 'react';
import { createStore } from 'zustand';
import {
  IProductData,
  TPathParams,
  TQueryParams,
  TReviewData,
  TProductReviewSummary,
} from '@/lib/types';

// Define your store creation function and types here

export const CarSelectionContext = createContext<CarSelectionStore | null>(
  null
);

export const createCarSelectionStoreInstance = ({
  initialModelData,
  params,
  queryParams,
  initialReviewData,
  initialReviewDataSummary,
  initialReviewImages,
}: {
  initialModelData: IProductData[];
  params: TPathParams;
  queryParams: TQueryParams;
  initialReviewData: TReviewData[];
  initialReviewDataSummary: TProductReviewSummary;
  initialReviewImages: TReviewData[];
}) => {
  return createCarSelectionStore({
    // Pass the arguments to the store creation function
  });
};
