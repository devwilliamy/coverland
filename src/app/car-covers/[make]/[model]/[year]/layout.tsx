import { slugify } from '@/lib/utils';
import CarPDP from './page';
import generationData from '@/data/generationData.json';
import { fetchCarPDPData, fetchPDPData } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function CarPDPYearLayout({ params, searchParams }) {
  console.log(params, searchParams);
  const generationFk = generationData.filter(
    (gen) =>
      slugify(gen.make) === params.make &&
      slugify(gen.model) === params.model &&
      gen.year_generation === params.year
  )[0]?.generation;

  console.log(generationFk);

  let modelData = await fetchCarPDPData(generationFk);

  if (!modelData) {
    redirect('/404');
  }

  modelData = modelData.filter((car) =>
    car.generation_default
      ? car.fk === generationFk
      : car.generation_default !== generationFk
  );

  if (searchParams?.get('submodel')) {
    modelData = modelData?.filter(
      (car) =>
        car?.submodel1_slug === searchParams?.get('submodel')?.toLowerCase()
    );
  }

  if (searchParams?.get('second_submodel')) {
    modelData = modelData?.filter(
      (car) =>
        car?.submodel2_slug ===
        searchParams?.get('second_submodel')?.toLowerCase()
    );
  }

  if (modelData?.length === 0) {
    redirect('/404');
  }

  console.log(modelData);

  return (
    <>
      <CarPDP
        params={params}
        searchParams={searchParams}
        generationFk={generationFk}
        modelData={modelData}
      />
    </>
  );
}
