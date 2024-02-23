import { TReviewData, getProductData } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import {
  TProductReviewSummary,
  filterDuplicateReviewImages,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { TPathParams } from '@/app/(main)/utils';

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
  productType: string;
};

export default async function CarPDPDataLayer({
  params,
}: {
  params: TPathParams;
  searchParams: { submodel?: string; second_submodel?: string };
}) {
  let modelData = [];
  let reviewData: TReviewData[] | null = [];
  let reviewImages: TReviewData[];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  const typeString =
    params?.productType === 'car-covers'
      ? 'Car Covers'
      : params?.productType === 'suv-covers'
        ? 'SUV Covers'
        : 'Truck Covers';
  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          model: params.model,
          make: params.make,
          year: params.year,
          type: typeString,
        }),
        getProductReviewsByPage(
          { productType: typeString, make: params?.make },
          {
            pagination: {
              page: 0,
              limit: 8,
            },
          }
        ),
        getProductReviewSummary({
          productType: typeString,
          make: params?.make,
        }),
        getAllReviewsWithImages(
          {
            productType: typeString,
            make: params?.make,
          },
          {}
        ),
      ]);
    // filterDuplicateReviewImages({ reviewData, reviewImages });

    if (!modelData) {
      redirect('/404');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    redirect('/404');
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CarPDP
          modelData={modelData}
          reviewData={reviewData}
          params={params}
          reviewDataSummary={reviewDataSummary}
          reviewImages={reviewImages}
        />
      </Suspense>
    </>
  );
}
