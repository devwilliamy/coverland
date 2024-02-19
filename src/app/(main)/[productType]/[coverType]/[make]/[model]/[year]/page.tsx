import { TReviewData, getProductData } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import { TPathParams } from '@/app/(main)/utils';
import {
  TProductReviewSummary,
  filterReviewData,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';

export default async function CarPDPDataLayer({
  params,
}: {
  params: TPathParams;
  searchParams: { submodel?: string; second_submodel?: string };
}) {
  let modelData = [];
  let reviewData: TReviewData[] | null = [];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  const coverType = params.coverType;
  console.log('here');

  if (!coverType?.includes('premium')) {
    console.log('redirecting');
    redirect('/');
  }

  let reviewImages: Record<string, boolean>;
  const SuvOrTruckType =
    params?.productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    params?.productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;

  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          model: params.model,
          make: params.make,
          year: params.year,
          cover: params.coverType,
        }),
        getProductReviewsByPage(
          { make: params.make, model: params.model, year: params.year },
          {
            pagination: {
              page: 0,
              limit: 8,
            },
          }
        ),
        getProductReviewSummary({
          make: params?.make,
          model: params.model,
          year: params.year,
        }),
        getAllReviewsWithImages({
          productType: typeString,
          make: params?.make,
          model: params.model,
          year: params.year,
        }),
      ]);
    filterReviewData({ reviewData, reviewImages });

    if (!modelData) {
      redirect('/404');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    redirect('/404');
  }

  if (modelData?.length === 0) {
    console.log('redirecting');
    redirect('/');
  }
  console.log(modelData);

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
