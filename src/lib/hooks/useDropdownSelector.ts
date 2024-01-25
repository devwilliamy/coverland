'use client';

import { useReducer } from 'react';
import generationData from '@/data/generationData.json';
import { compareRawStrings, slugify } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export type CarSelectorAction =
  | { type: 'SET_YEAR'; payload: string | null }
  | { type: 'SET_MAKE'; payload: string | null }
  | { type: 'SET_MODEL'; payload: string | null }
  | { type: 'SET_SUBMODEL'; payload: string | null }
  | { type: 'SET_SECOND_SUBMODEL'; payload: string | null };

const useDropdownSelector = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathnameParts = pathname?.split('/').filter(Boolean) as string[];

  const [typePath, makePath, modelPath] = pathnameParts;

  console.log('type', typePath);

  type TCarSelectorState = {
    selectedYear: string | null;
    selectedMake: string | null;
    selectedModel: string | null;
    selectedSubmodel: string | null;
    selectedSecondSubmodel: string | null;
  };

  const initialState = {
    selectedYear: '',
    selectedMake: makePath ?? '',
    selectedModel: modelPath ?? '',
    selectedSubmodel: '',
    selectedSecondSubmodel: '',
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

  const filteredData = generationData.filter((car) => {
    const yearMatch = selectedYear
      ? car.year_options.includes(selectedYear)
      : true;
    const makeMatch = selectedMake
      ? compareRawStrings(car.make, selectedMake)
      : true;
    const modelMatch = selectedModel
      ? compareRawStrings(car.model, selectedModel)
      : true;
    const submodelMatch = selectedSubmodel
      ? compareRawStrings(car.submodel1, selectedSubmodel)
      : true;
    const secondSubmodelMatch = selectedSecondSubmodel
      ? compareRawStrings(car.submodel2, selectedSecondSubmodel)
      : true;

    return (
      yearMatch &&
      makeMatch &&
      modelMatch &&
      submodelMatch &&
      secondSubmodelMatch
    );
  });

  console.log('filteredData', filteredData);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(name, value);

    return params.toString().toLowerCase();
  };

  const createQueryUrl = () => {
    const { selectedMake, selectedModel, selectedYear } = state;
    const urlParts = [
      selectedMake && slugify(selectedMake),
      selectedModel && slugify(selectedModel),
      selectedYear && filteredData[0].year_generation,
    ]
      .filter(Boolean)
      .join('/');

    const queryParams = [];
    if (selectedSubmodel)
      queryParams.push(createQueryString('submodel', selectedSubmodel));
    if (selectedSecondSubmodel)
      queryParams.push(
        createQueryString('second_submodel', selectedSecondSubmodel)
      );

    const url = `/${typePath}/${urlParts}${queryParams.length ? '?' + queryParams.join('&') : ''}`;

    return url;
  };

  const selectionOptions = {
    yearOpts: Array.from(
      new Set(filteredData.flatMap((car) => car.year_options.split('|')))
    ).sort((a, b) => Number(b) - Number(a)),
    makeOpts: Array.from(new Set(filteredData.map((car) => car.make))),
    modelOpts: Array.from(new Set(filteredData.map((car) => car.model))),
    submodelOpts: Array.from(
      new Set(
        filteredData
          .map((car) => car.submodel1)
          .sort()
          .filter(Boolean)
      )
    ),
    secondSubmodelOpts: Array.from(
      new Set(
        filteredData
          .map((car) => car.submodel2)
          .sort()
          .filter(Boolean)
      )
    ),
  };

  const isFullySelected =
    (selectionOptions.yearOpts.length > 0 ? !!selectedYear : true) &&
    (selectionOptions.makeOpts.length > 0 ? !!selectedMake : true) &&
    (selectionOptions.modelOpts.length > 0 ? !!selectedModel : true) &&
    (selectionOptions.submodelOpts.length > 0 ? !!selectedSubmodel : true) &&
    (selectionOptions.secondSubmodelOpts.length > 0
      ? !!selectedSecondSubmodel
      : true);

  return {
    selectionOptions,
    setDropdown,
    url: createQueryUrl(),
    isFullySelected,
  };
};

export default useDropdownSelector;
