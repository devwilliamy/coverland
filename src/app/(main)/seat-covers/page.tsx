import { TPathParams } from '@/utils';
import SeatCoverDataWrapper from './components/SeatCoverDataWrapper';
import {
  TSeatCoverDataDB,
  getDefaultSeatCoverProductsByDisplayColor,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';
import {
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';

export async function generateStaticParams() {
  return [{ coverType: 'leather' }];
}

export async function generateMetadata() {
  return {
    title: `Seat Covers, Custom Fit - Coverland`,
    description: `Seat Covers ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: '/seat-covers',
    },
  };
}

export default async function SeatCoversPage({
  params,
}: {
  params: TPathParams;
}) {
  let modelData: TSeatCoverDataDB[] = [];
  let reviewData: TReviewData[] = [];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  let reviewImages: TReviewData[] = [];
  const typeString = 'Seat Covers';
  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getDefaultSeatCoverProductsByDisplayColor({
          type: params.productType,
        }),
        getProductReviewsByPage(
          { productType: typeString },
          {
            pagination: {
              page: 0,
              limit: 8,
            },
            sort: [
              { field: 'sku', order: 'asc' },
              { field: 'helpful', order: 'desc', nullsFirst: false },
            ],
          }
        ),
        getProductReviewSummary({
          productType: typeString,
        }),
        getAllReviewsWithImages(
          {
            productType: typeString,
          },
          {}
        ),
      ]);
  } catch (error) {
    console.error('Leatherette Error: ', error);
  }

  return (
    <SeatCoverDataWrapper
      modelData={modelData}
      params={params}
      reviewData={reviewData}
      reviewDataSummary={reviewDataSummary}
      reviewImages={reviewImages}
    />
  );
}
