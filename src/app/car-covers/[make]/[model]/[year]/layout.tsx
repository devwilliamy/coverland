import { slugify } from '@/lib/utils';
import CarPDP from './page';
import generationData from '@/data/generationData.json';
import {
  TReviewData,
  fetchCarPDPData,
  fetchGenerationReviewData,
  fetchPDPData,
} from '@/lib/db';
import { redirect } from 'next/navigation';
import { colorOrder } from '@/lib/constants';
import { Suspense } from 'react';

export type TCarCoverSlugParams = {
  params: {
    make: string;
    model: string;
    year: string;
  };
};

export default async function CarPDPYearLayout({
  params,
}: TCarCoverSlugParams) {
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
          generationFk={generationFk}
          modelData={modelData}
          key={params.year}
          reviewData={reviewData}
        />
      </Suspense>
    </>
  );
}
