'use client';
import { TCarDataMaster, TReviewData } from '@/lib/db';
import { Tables } from '@/lib/db/types';
import CarCoverSelector from './CarCoverSelector';
import { compareRawStrings } from '@/lib/utils';
import useUrlState from '@/lib/hooks/useUrlState';
import { TCarCoverSlugParams } from '../[make]/[model]/[year]/page';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';

export type TCarCoverData = Tables<'Car-Data-Master'>;

interface ICarCoverProps {
  modelData: TCarDataMaster[];
  year: string;
  make: string;
  model: string;
  submodel: string | null | undefined;
  secondSubmodel: string | null | undefined;
}

interface ICarCoverSelectionState extends ICarCoverProps {
  setYear: (year: string) => void;
  setMake: (make: string) => void;
  setModel: (model: string) => void;
  setSubmodel: (submodel: string) => void;
  setSecondSubmodel: (secondSubmodel: string) => void;
}

const createCarSelectionStore = (initialState: ICarCoverProps) => {
  const DEFAULT_PROPS: ICarCoverProps = {
    modelData: [],
    year: '',
    make: '',
    model: '',
    submodel: '',
    secondSubmodel: '',
  };

  return createStore<ICarCoverSelectionState>((set) => ({
    ...DEFAULT_PROPS,
    ...initialState,
    setYear: (year: string) => set((state) => ({ ...state, year })),
    setMake: (make: string) => set((state) => ({ ...state, make })),
    setModel: (model: string) => set((state) => ({ ...state, model })),
    setSubmodel: (submodel: string) => set((state) => ({ ...state, submodel })),
    setSecondSubmodel: (secondSubmodel: string) =>
      set((state) => ({ ...state, secondSubmodel })),
  }));
};

type CarSelectionStore = ReturnType<typeof createCarSelectionStore>;

export const CarSelectionContext = createContext<CarSelectionStore | null>(
  null
);

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

  const isCompleteSelection = (modelData: TCarDataMaster[]) => {
    if (!make || !model || !year) return false;

    const isAllSameSku = modelData?.every(
      (item) =>
        compareRawStrings(
          String(item.submodel1),
          String(modelData[0]?.submodel1)
        ) &&
        compareRawStrings(
          String(item.submodel2),
          String(modelData[0]?.submodel2)
        )
    );
    const hasSubmodels = modelData?.some((car) => car.submodel1);
    const hasSecondSubModels = modelData?.some((car) => car.submodel2);
    if (!isAllSameSku) {
      if (hasSubmodels && !submodelParam) return false;
      if (hasSecondSubModels && !secondSubmodelParam) return false;
    }

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
        car.submodel2 && compareRawStrings(car.submodel2, secondSubmodelParam)
    );
  }

  const store = useRef(
    createCarSelectionStore({
      modelData,
      year,
      make,
      model,
      submodel: submodelParam,
      secondSubmodel: secondSubmodelParam,
    })
  ).current;

  return (
    <>
      <CarSelectionContext.Provider value={store}>
        <CarCoverSelector
          modelData={filteredModelData}
          reviewData={reviewData}
          submodelParam={submodelParam}
          secondSubmodelParam={secondSubmodelParam}
          isCompleteSelection={isCompleteSelection(filteredModelData)}
          yearParam={year}
          key={`${make}-${model}-${year}-${submodelParam}-${secondSubmodelParam}`}
        />
      </CarSelectionContext.Provider>
    </>
  );
}
