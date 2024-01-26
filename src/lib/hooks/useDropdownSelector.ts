'use client';

import { useCallback, useMemo, useReducer } from 'react';
import carData from '@/data/car_data_master.json';
import { compareRawStrings, slugify } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export type CarSelectorAction =
  | { type: 'SET_YEAR'; payload: string | null }
  | { type: 'SET_MAKE'; payload: string | null }
  | { type: 'SET_MODEL'; payload: string | null }
  | { type: 'SET_SUBMODEL'; payload: string | null }
  | { type: 'SET_SECOND_SUBMODEL'; payload: string | null };

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

const useDropdownSelector = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathnameParts = pathname?.split('/').filter(Boolean) as string[];
  const productType = pathname?.includes('car-covers')
    ? 'Car Covers'
    : pathname?.includes('suv-covers')
      ? 'SUV Covers'
      : 'Truck Covers';

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

  console.log(state);

  let filteredData = carData.filter(
    (car) => car.type === productType
  ) as TCarDataJson[];

  console.log(filteredData.length);
  console.log(selectedYear);

  if (selectedYear) {
    console.log('here');
    filteredData = filteredData.filter((car) =>
      yearPath
        ? car.parent_generation.includes(selectedYear)
        : car.year_options.includes(selectedYear)
    );
    console.log(filteredData.length);
  }

  if (selectedMake) {
    console.log('here');

    filteredData = filteredData.filter((car) =>
      compareRawStrings(car.make, selectedMake)
    );
    console.log(filteredData.length);
  }

  if (selectedModel) {
    console.log('here');

    filteredData = filteredData.filter((car) =>
      compareRawStrings(car.model, selectedModel)
    );
  }

  if (selectedSubmodel) {
    console.log('here');

    filteredData = filteredData.filter((car) =>
      compareRawStrings(car?.submodel1 as string, selectedSubmodel)
    );
  }

  if (selectedSecondSubmodel) {
    console.log('here');

    filteredData = filteredData.filter((car) =>
      compareRawStrings(car?.submodel2 as string, selectedSecondSubmodel)
    );
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString().toLowerCase();
    },
    [searchParams]
  );

  const createQueryUrl = useCallback(() => {
    if (!filteredData.length) return null;
    const { selectedMake, selectedModel, selectedYear } = state;
    const urlParts = [
      selectedMake && slugify(selectedMake),
      selectedModel && slugify(selectedModel),
      selectedYear && filteredData[0].parent_generation,
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

    console.log(url);

    return url;
  }, [
    state,
    filteredData,
    typePath,
    createQueryString,
    selectedSubmodel,
    selectedSecondSubmodel,
  ]);

  console.log(filteredData);

  const selectionOptions = useMemo(() => {
    const yearOpts = Array.from(
      new Set(filteredData.flatMap((car) => car.year_options.split(',')))
    ).sort((a, b) => Number(b) - Number(a));

    const filteredByYear = filteredData.filter((car) =>
      yearOpts.includes(car.year_options.split(',')[0])
    );

    const makeOpts = Array.from(new Set(filteredByYear.map((car) => car.make)));

    const filteredByMake = filteredByYear.filter((car) =>
      makeOpts.includes(car.make)
    );

    const modelOpts = Array.from(
      new Set(filteredByMake.map((car) => car.model))
    );

    const filteredByModel = filteredByMake.filter((car) =>
      modelOpts.includes(car.model)
    );

    console.log(filteredByModel);

    const submodelOpts = Array.from(
      new Set(filteredByModel.map((car) => car.submodel1).filter(Boolean))
    ).sort();

    const filteredBySubmodel = filteredByModel.filter((car) =>
      submodelOpts.includes(car.submodel1)
    );

    const secondSubmodelOpts = Array.from(
      new Set(filteredBySubmodel.map((car) => car.submodel2).filter(Boolean))
    ).sort();

    return { yearOpts, makeOpts, modelOpts, submodelOpts, secondSubmodelOpts };
  }, [filteredData]);

  const isFullySelected =
    (selectionOptions.yearOpts.length > 0 ? !!selectedYear : true) &&
    (selectionOptions.makeOpts.length > 0 ? !!selectedMake : true) &&
    (selectionOptions.modelOpts.length > 0 ? !!selectedModel : true) &&
    (selectionOptions.submodelOpts.length > 0 ? !!selectedSubmodel : true) &&
    (selectionOptions.secondSubmodelOpts.length > 0
      ? !!selectedSecondSubmodel
      : true);

  const queryUrl = isFullySelected ? createQueryUrl() : '';

  return {
    selectionOptions,
    setDropdown,
    queryUrl,
    isFullySelected,
    state,
  };
};

export default useDropdownSelector;
