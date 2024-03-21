import { TInitialProductDataDB, TReviewData } from '@/lib/db';
import CarCoverSelector from './CarCoverSelector';
import { TPathParams } from '../../utils';
import { TProductReviewSummary } from '@/lib/db/review';
import CarSelectionProvider from '@/contexts/CarSelectionContext';

export default async function CarPDP({
  modelData: modelDataProps,
  reviewData,
  reviewDataSummary,
  reviewImages,
  searchParams,
}: {
  modelData: TInitialProductDataDB[];
  reviewData: TReviewData[] | null;
  params: TPathParams;
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
