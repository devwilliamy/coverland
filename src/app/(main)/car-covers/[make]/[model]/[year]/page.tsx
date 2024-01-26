import { TReviewData, getProductData, getReviewData } from '@/lib/db';
import { redirect } from 'next/navigation';
import { colorOrder } from '@/lib/constants';
import { Suspense } from 'react';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import CarPDP from '@/app/(main)/car-covers/components/CarPDP';

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
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
}) {
  let modelData = [];
  let reviewData: TReviewData[] | null = [];

  try {
    [modelData, reviewData] = await Promise.all([
      getProductData({
        make: params.make,
        model: params.model,
        year: params.year,
      }),
      getReviewData({
        make: params.make,
        model: params.model,
      }),
    ]);

    if (!modelData) {
      console.log('No model data found');
      redirect('/404');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    redirect('/404');
  }

  const validAndSortedData = modelData
    ?.filter((product) => product.msrp && product.price)
    .sort((a, b) => {
      let colorIndexA = colorOrder.indexOf(a?.display_color as string);
      let colorIndexB = colorOrder.indexOf(b?.display_color as string);

      if (colorIndexA === -1) colorIndexA = Infinity;
      if (colorIndexB === -1) colorIndexB = Infinity;

      return colorIndexA - colorIndexB;
    });

  if (modelData?.length === 0) {
    redirect('/404');
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CarPDP
          modelData={validAndSortedData}
          reviewData={reviewData}
          params={params}
        />
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
