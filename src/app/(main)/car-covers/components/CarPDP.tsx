'use client';
import { TReviewData } from '@/lib/db';
import { useSearchParams } from 'next/navigation';
import { TCarCoverSlugParams } from '../[make]/[model]/[year]/page';
import { Tables } from '@/lib/db/types';
import CarCoverSelector from './CarCoverSelector';

export type TCarCoverData = Tables<'product_2024_join'>;

export default function CarPDP({
  params,
  generationFk,
  modelData,
  reviewData,
}: {
  params: TCarCoverSlugParams['params'];
  generationFk: number;
  modelData: TCarCoverData[];
  reviewData: TReviewData[] | null;
}) {
  const submodelParam = useSearchParams()?.get('submodel');
  const secondSubmodelParam = useSearchParams()?.get('second_submodel');
  let filteredModelData = modelData;

  if (submodelParam) {
    filteredModelData = modelData?.filter(
      (car) => car?.submodel1_slug === submodelParam
    );
  }

  if (secondSubmodelParam) {
    filteredModelData = modelData?.filter(
      (car) => car?.submodel2_slug === secondSubmodelParam
    );
  }

  return (
    <>
      <CarCoverSelector
        params={params}
        generationFk={generationFk}
        modelData={filteredModelData}
        key={`${params.make}-${params.model}-${params.year}-${submodelParam}-${secondSubmodelParam}`}
        reviewData={reviewData}
        submodelParam={submodelParam}
        secondSubmodelParam={secondSubmodelParam}
      />
    </>
  );
}
