import { notFound } from 'next/navigation';
import { TPathParams } from '@/utils';
import {
  TSeatCoverDataDB,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';
import {
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { deslugify } from '@/lib/utils';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';
import FloorMatDataWrapper from '@/components/data-wrapper/FloorMatDataWrapper';
import { getProductData } from '@/lib/db';

export const revalidate = 86400;

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
  productType: string;
};

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance

// export async function generateStaticParams({
//   params: { productType, coverType, make },
// }: {
//   params: { productType: string; coverType: string; make: string };
// }) {
//   const modelData = await getAllModels({
//     type: productType,
//     cover: coverType,
//     make: make,
//   });

//   return modelData.filter(Boolean).map((model) => ({
//     model: model,
//   }));
// }

export async function generateMetadata({ params }: { params: TPathParams }) {
  const make = deslugify(params.make || '');
  const model = deslugify(params.model || '');
  const productType = deslugify(params.productType || '');
  return {
    title: `${make} ${model} Floor Mats, Custom Fit - Coverland`,
    description: `${make} ${model} Floor Mats ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: `/${productType}/${make}/${model}`,
    },
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
  const typeString = 'Floor Mat';
  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          type: typeString,
          cover: 'Textured',
          make: params.make,
          model: params.model,
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

    if (!modelData || modelData.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
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
