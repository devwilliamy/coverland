import { Suspense } from 'react';
import {
  defaultCarModelData,
  defaultSuvModelData,
  defaultTruckModelData,
} from '@/lib/constants';
import { TInitialProductDataDB } from '@/lib/db';
import CarPDP from './components/CarPDP';
import {
  TProductReviewSummary,
  TReviewData,
  filterDuplicateReviewImages,
  // filterDuplicateReviewImages,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: { productType: string };
}) {
  let reviewData: TReviewData[] = [];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  let reviewImages: TReviewData[];
  const productType = params.productType;
  const SuvOrTruckData =
    productType === 'suv-covers' ? defaultSuvModelData : defaultTruckModelData;
  const modelData: TInitialProductDataDB[] =
    productType === 'car-covers' ? defaultCarModelData : SuvOrTruckData;

  const SuvOrTruckType =
    params?.productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    params?.productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;

  try {
    [reviewData, reviewDataSummary, reviewImages] = await Promise.all([
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
    console.error('CarPDPModelDataLayer Error: ', error);
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
