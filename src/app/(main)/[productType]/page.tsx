import CarPDP from './components/CarPDP';
import {
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { deslugify } from '@/lib/utils';
import { TPathParams } from '@/utils';
import { notFound } from 'next/navigation';
import { TInitialProductDataDB, getProductData } from '@/lib/db';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';

export const revalidate = 86400;

export function generateStaticParams() {
  return [
    { productType: 'car-covers' },
    { productType: 'suv-covers' },
    { productType: 'truck-covers' },
  ];
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  const productType = deslugify(params.productType);
  return {
    title: `${deslugify(productType.slice(productType.length - 1))} │ Lifetime Warranty │ Custom Fit │ 100% Weatherproof`,
    description: `${productType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: `/${productType}`,
    },
  };
}

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: { productType: string };
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  const productTypes = ['car-covers', 'truck-covers', 'suv-covers'];
  if (!productTypes.includes(params.productType)) {
    return notFound();
  }
  let reviewData: TReviewData[] = [];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  let reviewImages: TReviewData[] = [];
  let modelData: TInitialProductDataDB[] = [];

  const SuvOrTruckType =
    params?.productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    params?.productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;
  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          type: typeString,
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
    modelData = await getProductData({ type: typeString });
  } catch (error) {
    console.error('CarPDPModelDataLayer Error: ', error);
  }

  return (
    <CarPDP
      modelData={modelData}
      params={params}
      reviewData={reviewData}
      reviewDataSummary={reviewDataSummary}
      reviewImages={reviewImages}
    />
  );
}
