import { Suspense } from 'react';
import { TInitialProductDataDB, getProductData } from '@/lib/db';
import {
  TProductReviewSummary,
  TReviewData,
  filterReviewData,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import CarPDP from '../components/CarPDP';
import { redirect } from 'next/navigation';

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: { productType: string; coverType: string };
}) {
  let reviewData: TReviewData[] = [];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  let reviewImages: Record<string, boolean>;
  let modelData: TInitialProductDataDB[] = [];
  const productType = params.productType;
  const coverType = params.coverType;

  const SuvOrTruckType =
    productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;

  if (!coverType.includes('Premium')) {
    redirect('/');
  }

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
        getAllReviewsWithImages({
          productType: typeString,
        }),
      ]);
    filterReviewData({ reviewData, reviewImages });
    console.log('modelData', modelData);

    if (!modelData) {
      redirect('/404');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    redirect('/404');
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarPDP
        modelData={modelData}
        reviewData={reviewData}
        params={params}
        reviewDataSummary={reviewDataSummary}
        reviewImages={reviewImages}
      />
    </Suspense>
  );
}
