import { TInitialProductDataDB, getProductData } from '@/lib/db';
import {
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import CarPDP from '../components/CarPDP';
import { notFound, redirect } from 'next/navigation';
import { TPathParams } from '@/utils';
import {
  combineOptions,
  coverOptions,
  deslugify,
  productOptions,
} from '@/lib/utils';
import { PREMIUM_PLUS_URL_PARAM } from '@/lib/constants';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';

export const revalidate = 0;

export async function generateStaticParams() {
  return combineOptions(coverOptions, productOptions);
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  const productType = deslugify(params.productType).slice(
    0,
    params.productType.length - 1
  );
  return {
    title: `${productType} │ Lifetime Warranty │ Custom Fit │ 100% Weatherproof`,
    description: `${productType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: `/${params.productType}/${PREMIUM_PLUS_URL_PARAM}`,
    },
  };
}
const coverTypes = ['premium-plus', 'premium', 'standard-pro', 'standard'];
const productTypes = ['car-covers', 'truck-covers', 'suv-covers'];

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: TPathParams;
}) {
  const coverType = params.coverType;
  if (
    !productTypes.includes(params.productType) ||
    !coverTypes.includes(coverType as string)
  ) {
    notFound();
  }
  let reviewData: TReviewData[] = [];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  let reviewImages: TReviewData[] = [];
  let modelData: TInitialProductDataDB[] = [];

  const productType = params.productType;

  const SuvOrTruckType =
    productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;

  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          type: typeString,
          cover: coverType,
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

    if (!modelData) {
      redirect('/404');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    redirect('/404');
  }

  return (
    <CarPDP
      modelData={modelData}
      reviewData={reviewData}
      params={params}
      reviewDataSummary={reviewDataSummary}
      reviewImages={reviewImages}
    />
  );
}
