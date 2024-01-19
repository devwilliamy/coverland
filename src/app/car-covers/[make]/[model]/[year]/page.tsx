import { slugify } from '@/lib/utils';
import generationData from '@/data/generationData.json';
import {
  TReviewData,
  fetchCarPDPData,
  fetchGenerationReviewData,
} from '@/lib/db';
import { redirect } from 'next/navigation';
import { colorOrder } from '@/lib/constants';
import { Suspense } from 'react';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import CarPDP from '@/app/car-covers/components/CarPDP';

export type TCarCoverSlugParams = {
  params: {
    make: string;
    model: string;
    year: string;
  };
};

export default async function CarPDPDataLayer({
  params,
}: {
  params: TCarCoverSlugParams['params'];
}) {
  const generationFk = generationData.filter(
    (gen) =>
      slugify(gen.make) === params.make &&
      slugify(gen.model) === params.model &&
      gen.year_generation === params.year
  )[0]?.generation;

  let modelData = await fetchCarPDPData(generationFk);

  if (!modelData) {
    redirect('/404');
  }
  const reviewData: TReviewData[] | null = await fetchGenerationReviewData(
    String(generationFk)
  );

  modelData = modelData.filter((car) =>
    car.generation_default
      ? car.generation_default === generationFk
      : car.fk === generationFk
  );

  modelData = modelData
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
          params={params}
          modelData={modelData}
          generationFk={generationFk}
          reviewData={reviewData}
        />
      </Suspense>

      <div
        id="product-details"
        className="h-auto w-full"
        // flex flex-col justify-center items-center max-w-[1440px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails reviewData={reviewData} />
      </div>
    </>
  );
}
