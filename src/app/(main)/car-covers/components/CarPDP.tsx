'use client';
import { TCarDataMaster, TReviewData } from '@/lib/db';
import { Tables } from '@/lib/db/types';
import CarCoverSelector from './CarCoverSelector';
import { compareRawStrings } from '@/lib/utils';
import useUrlState from '@/lib/hooks/useUrlState';
import { TCarCoverSlugParams } from '../[make]/[model]/[year]/page';

export type TCarCoverData = Tables<'Car-Data-Master'>;

export default function CarPDP({
  modelData,
  reviewData,
  params,
}: {
  modelData: TCarDataMaster[];
  reviewData: TReviewData[] | null;
  params: TCarCoverSlugParams;
}) {
  const { submodelParam, secondSubmodelParam } = useUrlState();
  const { make, model, year } = params;

  const isCompleteSelection = () => {
    if (!make || !model || !year) return false;

    const hasSubmodels = modelData?.some((car) => car.submodel1);
    const hasSecondSubModels = modelData?.some((car) => car.submodel2);

    if (hasSubmodels && !submodelParam) return false;
    if (hasSecondSubModels && !secondSubmodelParam) return false;

    return true;
  };

  let filteredModelData = modelData;

  if (submodelParam) {
    filteredModelData = modelData?.filter(
      (car) =>
        car?.submodel1 && compareRawStrings(car?.submodel1, submodelParam)
    );
  }

  if (secondSubmodelParam) {
    filteredModelData = filteredModelData?.filter(
      (car) =>
        car.submodel2 && compareRawStrings(car?.submodel2, secondSubmodelParam)
    );
  }

  if (!isCompleteSelection()) {
    filteredModelData = filteredModelData?.filter(
      (car) => car.year_generation === year
    );
  }

  return (
    <>
      <CarCoverSelector
        modelData={filteredModelData}
        reviewData={reviewData}
        submodelParam={submodelParam}
        secondSubmodelParam={secondSubmodelParam}
        isCompleteSelection={isCompleteSelection()}
      />
    </>
  );
}
