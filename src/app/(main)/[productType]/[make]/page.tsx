import { TReviewData, getProductData } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import {
  TProductReviewSummary,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
  productType: string;
};

export type TGenerationData = {
  generation: number;
  year_generation: string;
  make: string;
  model: string;
  submodel1: string | null;
  submodel2: string | null;
  year_options: string;
};

export default async function CarPDPDataLayer({
  params,
}: {
  params: TCarCoverSlugParams;
  searchParams: { submodel?: string; second_submodel?: string };
}) {
  let modelData = [];
  let reviewData: TReviewData[] | null = [];
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
    [modelData, reviewData, reviewDataSummary] = await Promise.all([
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
            limit: 4,
          },
        }
      ),
      getProductReviewSummary({
        productType: typeString,
        make: params?.make,
      }),
    ]);

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
        />
      </Suspense>
    </>
  );
}
