import { TPathParams, TQueryParams } from '@/utils';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import SeatCoverSelectionProvider from '@/contexts/SeatCoverContext';
import SeatCovers from './SeatCovers';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';

export default async function SeatCoverDataWrapper({
  modelData,
  params,
  searchParams,
  reviewData,
  reviewDataSummary,
  reviewImages,
}: {
  modelData: TSeatCoverDataDB[];
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
    <SeatCoverSelectionProvider initialState={initialState}>
      <SeatCovers params={params} searchParams={searchParams} />
    </SeatCoverSelectionProvider>
  );
}
