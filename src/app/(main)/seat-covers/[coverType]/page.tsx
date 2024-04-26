import { notFound } from 'next/navigation';
import { TPathParams } from '@/utils';
import SeatCoverDataWrapper from '../components/SeatCoverDataWrapper';
import {
  TSeatCoverDataDB,
  getSeatCoverProductData,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';
import {
  TProductReviewSummary,
  TReviewData,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ coverType: 'leather' }];
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  return {
    title: `Seat Covers, Custom Fit - Coverland`,
    description: `Seat Covers ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

const coverTypes = ['leather'];
export default async function Leatherette({ params }: { params: TPathParams }) {
  if (!coverTypes.includes(params.coverType as string)) {
    return notFound();
  }
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
        getSeatCoverProductsByDisplayColor({
          type: params.productType,
        }),
        getProductReviewsByPage(
          { productType: typeString },
          {
            pagination: {
              page: 0,
              limit: 8,
            },
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
