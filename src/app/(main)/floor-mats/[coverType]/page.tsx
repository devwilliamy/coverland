import { notFound } from 'next/navigation';
import { TPathParams } from '@/utils';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import {
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';
import FloorMatDataWrapper from '@/components/data-wrapper/FloorMatDataWrapper';
import { getProductData } from '@/lib/db';
export const dynamicParams = false;

export const revalidate = 86400;

export async function generateStaticParams() {
  return [{ coverType: 'textured' }];
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  return {
    title: `Floor Mats, Custom Fit - Coverland`,
    description: `Floor Mats ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Custom-fit, all-weather car mats 🌦️ with a 10-year warranty 🛡️ and odor-free materials.
    Anti-slip, flexible 🤸, and designed for full edge protection.
    Easy to clean 🧼 and built to withstand any climate.
    Enjoy 4.7-star quality, free returns, and direct pricing savings 💰!`,
  };
}

const coverTypes = ['textured'];
export default async function FloorMatServerComponentStart({
  params,
}: {
  params: TPathParams;
}) {
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
  const typeString = 'Floor Mats';

  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          type: typeString,
          cover: 'Textured',
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
    console.error('Floor Mat Textured Error: ', error);
  }
  return (
    <FloorMatDataWrapper
      modelData={modelData}
      params={params}
      reviewData={reviewData}
      reviewDataSummary={reviewDataSummary}
      reviewImages={reviewImages}
    />
  );
}
