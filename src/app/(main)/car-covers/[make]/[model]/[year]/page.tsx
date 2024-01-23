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
import CarPDP, {
  TCarCoverData,
} from '@/app/(main)/car-covers/components/CarPDP';

export type TCarCoverSlugParams = {
  params: {
    make: string;
    model: string;
    year: string;
  };
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
  params: TCarCoverSlugParams['params'];
}) {
  const generationFk = generationData.filter(
    (gen) =>
      slugify(gen.make) === params.make &&
      slugify(gen.model) === params.model &&
      gen.year_generation === params.year
  )[0]?.generation;

  const availableGenerations = generationData.filter(
    (gen) => gen.generation === generationFk
  );

  console.log(availableGenerations, generationFk);

  const modelData: TCarCoverData[] | null = await fetchCarPDPData(
    generationFk,
    availableGenerations
  );

  if (!modelData) {
    redirect('/404');
  }
  const reviewData: TReviewData[] | null = await fetchGenerationReviewData(
    String(generationFk)
  );

  let filteredModelData = modelData.filter((car) =>
    car.generation_default
      ? car.generation_default === generationFk
      : car.fk === generationFk
  );

  filteredModelData = modelData
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

  console.log(filteredModelData);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CarPDP
          params={params}
          modelData={filteredModelData}
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
