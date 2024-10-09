import { TPathParams, TQueryParams } from '@/utils';
import { TFloorMatDataDB } from '@/lib/db/seat-covers';
import FloorMatSelectionProvider from '@/contexts/FloorMatContext';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';
import FloorMats from '../PDP/FloorMats';

export default async function FloorMatDataWrapper({
  modelData,
  params,
  searchParams,
  reviewData,
  reviewDataSummary,
  reviewImages,
}: {
  modelData: TFloorMatDataDB[];
  params: TPathParams;
  searchParams?: TQueryParams | undefined;
  reviewData: TReviewData[] | null;
  reviewDataSummary: TProductReviewSummary;
  reviewImages: TReviewData[];
}) {
  const initialState = {
    modelData,
    params,
    searchParams,
    reviewData,
    reviewDataSummary,
    reviewImages,
  };

  return (
    <FloorMatSelectionProvider initialState={initialState}>
      <FloorMats params={params} searchParams={searchParams} />
    </FloorMatSelectionProvider>
  );
}
