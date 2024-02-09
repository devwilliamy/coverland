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

  try {
    [modelData, reviewData, reviewDataSummary] = await Promise.all([
      getProductData({
        model: params.model,
        make: params.make,
        year: params.year,
      }),
      getProductReviewsByPage(
        { make: params?.make, model: params.model },
        {
          pagination: {
            page: 0,
            limit: 4,
          },
        }
      ),
      getProductReviewSummary({
        make: params?.make,
        model: params.model,
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
