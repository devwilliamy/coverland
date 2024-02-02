import { TReviewData, getProductData, getReviewData } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import { TPathParams } from '@/app/(main)/utils';

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
  params: TPathParams;
  searchParams: { submodel?: string; second_submodel?: string };
}) {
  let modelData = [];
  let reviewData: TReviewData[] | null = [];

  try {
    [modelData, reviewData] = await Promise.all([
      getProductData({
        model: params.model,
        make: params.make,
        year: params.year,
      }),
      getReviewData({
        make: params.make,
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

  if (modelData?.length === 0) {
    // redirect('/404');
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CarPDP modelData={modelData} reviewData={reviewData} params={params} />
      </Suspense>

      <div
        id="product-details"
        className="h-auto w-full"
        // flex flex-col justify-center items-center max-w-[1280px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails reviewData={reviewData} />
      </div>
    </>
  );
}
