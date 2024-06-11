import { TInitialProductDataDB } from '@/lib/db';
import CarCoverSelector from './CarCoverSelector';
import { TPathParams } from '@/utils';

import CarSelectionProvider from '@/contexts/CarSelectionContext';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';

export default async function CarPDP({
  modelData: modelDataProps,
  reviewData,
  reviewDataSummary,
  reviewImages,
  searchParams,
}: {
  modelData: TInitialProductDataDB[];
  params: TPathParams;
  reviewData: TReviewData[] | null;
  reviewDataSummary: TProductReviewSummary;
  reviewImages: TReviewData[];
  searchParams?:
    | { submodel?: string; second_submodel?: string; submodel2?: string }
    | undefined;
}) {
  const initialState = {
    modelData: modelDataProps,
    reviewData,
    reviewDataSummary,
    reviewImages,
    searchParams,
  };
  return (
    <CarSelectionProvider initialState={initialState}>
      <CarCoverSelector searchParams={searchParams} />
    </CarSelectionProvider>
  );
}
