'use client';

import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { compareRawStrings, slugify } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { TProductData } from '../db';
import { TCarCoverData } from '@/app/(main)/car-covers/components/CarPDP';

export type CarSelectorAction =
  | { type: 'SET_YEAR'; payload: string | null }
  | { type: 'SET_MAKE'; payload: string | null }
  | { type: 'SET_MODEL'; payload: string | null }
  | { type: 'SET_SUBMODEL'; payload: string | null }
  | { type: 'SET_SECOND_SUBMODEL'; payload: string | null }
  | { type: 'RESET' };

//TODO: Change the structure of the json to an object so we get better performance

export type TCarDataJson = {
  type: string;
  make: string;
  model: string;
  year_options: string;
  year_generation: string;
  parent_generation: string;
  submodel1: string | undefined;
  submodel2: string | undefined;
  sku: string;
};

const useCarDropdown = (modelData: TProductData[] | TCarCoverData[]) => {
  console.log(modelData.map((car) => car.submodel2));
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathnameParts = pathname?.split('/').filter(Boolean) as string[];
  const productType = pathname?.includes('car-covers')
    ? 'Car Covers'
    : pathname?.includes('suv-covers')
      ? 'SUV Covers'
      : 'Truck Covers';
  const submodelParam = searchParams?.get('submodel');
  const secondSubmodelParam = searchParams?.get('second_submodel');

  const [typePath, makePath, modelPath, yearPath] = pathnameParts;

  console.log(typePath, makePath, modelPath, yearPath);

  console.log(pathnameParts);

  type TCarSelectorState = {
    selectedYear: string | null;
    selectedMake: string | null;
    selectedModel: string | null;
    selectedSubmodel: string | null;
    selectedSecondSubmodel: string | null;
  };

  const initialState = {
    selectedYear: yearPath ?? '',
    selectedMake: makePath ?? '',
    selectedModel: modelPath ?? '',
    selectedSubmodel: submodelParam ?? '',
    selectedSecondSubmodel: secondSubmodelParam ?? '',
  };

  function reducer(state: TCarSelectorState, action: CarSelectorAction) {
    switch (action.type) {
      case 'SET_YEAR':
        return { ...state, selectedYear: action.payload };
      case 'SET_MAKE':
        return { ...state, selectedMake: action.payload };
      case 'SET_MODEL':
        return { ...state, selectedModel: action.payload };
      case 'SET_SUBMODEL':
        return { ...state, selectedSubmodel: action.payload };
      case 'SET_SECOND_SUBMODEL':
        return { ...state, selectedSecondSubmodel: action.payload };
      case 'RESET':
        return initialState;
      default:
        throw new Error();
    }
  }

  const [state, setDropdown] = useReducer(reducer, initialState);
  const {
    selectedYear,
    selectedMake,
    selectedModel,
    selectedSubmodel,
    selectedSecondSubmodel,
  } = state;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      console.log(name, value);
      const params = new URLSearchParams(searchParams?.toString());
      console.log(params.toString());
      params.set(name, value);

      return params.toString().toLowerCase();
    },
    [searchParams]
  );

  const createQueryUrl = useCallback(() => {
    if (!modelData.length) return '';
    const { selectedMake, selectedModel, selectedYear } = state;

    const urlParts = [
      selectedMake && slugify(selectedMake),
      selectedModel && slugify(selectedModel),
      selectedYear &&
        modelData.filter((car) => car.year_options.includes(selectedYear))[0]
          ?.parent_generation,
    ]
      .filter(Boolean)
      .join('/');

    const queryParams = [];
    if (selectedSubmodel && !submodelParam)
      queryParams.push(createQueryString('submodel', selectedSubmodel));
    if (selectedSecondSubmodel && !secondSubmodelParam)
      queryParams.push(
        createQueryString('second_submodel', selectedSecondSubmodel)
      );

    console.log(typePath, urlParts, queryParams.join('&'));

    const url = `/${typePath}/${urlParts}${queryParams.length ? '?' + queryParams.join('&') : ''}`;

    console.log(url);

    return url;
  }, [
    state,
    typePath,
    createQueryString,
    selectedSubmodel,
    selectedSecondSubmodel,
    modelData,
    submodelParam,
    secondSubmodelParam,
  ]);

  console.log(state);

  const selectionOptions = useMemo(() => {
    const yearOpts = Array.from(
      new Set(
        modelData.flatMap((car) =>
          car.year_options.split(',').map((year) => year.trim())
        )
      )
    ).sort((a, b) => Number(b) - Number(a));

    const makeOpts = Array.from(
      new Set(modelData.map((car) => car?.make?.trim()))
    );

    const modelOpts = Array.from(
      new Set(modelData.map((car) => car.model?.trim()))
    );

    const submodelOpts = Array.from(
      new Set(
        modelData
          .filter((car) => compareRawStrings(car.model, selectedModel))
          .map((car) => car.submodel1?.trim())
          .filter(Boolean)
      )
    ).sort();

    console.log(submodelOpts);

    const secondSubmodelOpts = Array.from(
      new Set(
        modelData
          .filter((car) => compareRawStrings(car.submodel1, selectedSubmodel))
          .map((car) => car.submodel2)
          .filter(Boolean)
      )
    ).sort();

    console.log(secondSubmodelOpts);

    return { yearOpts, makeOpts, modelOpts, submodelOpts, secondSubmodelOpts };
  }, [modelData, selectedSubmodel, selectedModel]);

  const isFullySelected =
    !!selectedYear &&
    !!selectedMake &&
    !!selectedModel &&
    (selectionOptions.submodelOpts.length > 0 ? !!selectedSubmodel : true) &&
    (selectionOptions.secondSubmodelOpts.length > 0
      ? !!selectedSecondSubmodel
      : true);

  console.log(isFullySelected);

  const queryUrl = createQueryUrl();

  console.log(selectionOptions.secondSubmodelOpts);
  console.log(
    isFullySelected &&
      (!submodelParam || selectionOptions.secondSubmodelOpts.length > 0)
  );
  console.log(queryUrl);

  return {
    selectionOptions,
    setDropdown,
    queryUrl,
    isFullySelected,
    state,
  };
};

export default useCarDropdown;
