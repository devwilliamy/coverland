import { TInitialProductDataDB, getProductData } from '@/lib/db';
import {
  TProductReviewSummary,
  TReviewData,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import CarPDP from '../components/CarPDP';
import { redirect } from 'next/navigation';
import { TPathParams } from '../../utils';
import { deslugify } from '@/lib/utils';

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance

export async function generateStaticParams() {
  return [
    { coverType: 'premium-plus' },
    { coverType: 'premium' },
    { coverType: 'standard-pro' },
    { coverType: 'standard' },
  ];
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  const productType = deslugify(params.productType);
  return {
    title: `${productType}, Custom Fit - Coverland`,
    description: `${productType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: TPathParams;
}) {
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
  const coverType = params.coverType;

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
