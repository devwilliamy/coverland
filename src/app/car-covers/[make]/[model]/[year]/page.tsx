'use client';

import {
  CarCoverSelector,
  TCarCoverData,
} from '@/app/car-covers/components/CarCoverSelector';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { TCarCoverSlugParams } from './layout';
import { TReviewData } from '@/lib/db';

export default function CarPDP({
  params,
  modelData,
  generationFk,
  reviewData,
}: {
  params: TCarCoverSlugParams['params'];
  modelData: TCarCoverData[];
  generationFk: number;
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
        submodelParam={submodelParam}
        secondSubmodelParam={secondSubmodelParam}
        modelData={filteredModelData}
        generationFk={generationFk}
        key={`${submodelParam}-${secondSubmodelParam}`}
        reviewData={reviewData}
      />
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
