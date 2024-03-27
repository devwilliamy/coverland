'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';
import { getAllUniqueModelsByYearMake } from '@/lib/db';
import { SubmodelDropdown } from './SubmodelDropdown';
import HomeDropdown from './HomeDropdown';

export type ModelDropdown = {
  model: string | null;
  model_slug: string | null;
  parent_generation: string | null;
  submodel1: string | null;
  submodel2: string | null;
  submodel3: string | null;
};

export function ModelSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const [value, setValue] = useState('');
  const [modelData, setModelData] = useState<ModelDropdown[]>([]);
  const [modelDataStrings, setModelDataStrings] = useState<string[]>([]);
  const [filteredModelData, setFilteredModelData] = useState<ModelDropdown[]>(
    []
  );
  const [submodelData, setSubmodelData] = useState<ModelDropdown[]>([]);
  const [submodelDataStrings, setSubmodelDataStrings] = useState<string[]>([]);

  const {
    query: { type, year, make, model },
    setQuery,
  } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    const parent_generation =
      modelData.find((car) => car.model === newValue)?.parent_generation || '';
    setValue(newValue);
    setQuery((p) => ({
      ...p,
      model: newValue,
      parent_generation,
      submodel1: '',
      submodel2: '',
    }));
  };

  useEffect(() => {
    setValue('');
  }, [type, year, make]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUniqueModelsByYearMake({
          type,
          cover: 'Premium Plus', // TOOD: - Update this to make it work for premium as well.
          year,
          make,
        });
        const uniqueModel = response.filter(
          (car, index, self) =>
            index === self.findIndex((t) => t.model_slug === car.model_slug)
        );
        setModelData(response);
        setModelDataStrings(() => {
          const modelStrings = uniqueModel.map(({ model }) => model);
          return modelStrings as string[];
        });
        setFilteredModelData(uniqueModel);
      } catch (error) {
        console.error('[Model Search]: ', error);
      }
    };
    if (type && year && make) {
      fetchData();
    }
  }, [type, year, make]);

  useEffect(() => {
    // Check for submodel
    const submodel = modelData.filter(
      (vehicle) => vehicle.model === model && vehicle.submodel1 !== null
    );


    // setSubmodelDataStrings(() => {
    //   const modelStrings = uniqueModel.map(({ model }) => model);
    //   return modelStrings as string[];
    // });

    setSubmodelData(submodel);
  }, [model]);

  const isDisabled = !type || !year || !make;
  const showSubmodelDropdown = submodelData.length > 0;
  const prevSelected =
    queryObj &&
    Boolean(
      queryObj.query.type &&
        queryObj.query.year &&
        queryObj.query.make &&
        queryObj.query.model === ''
    );

  return (
    <>
      <HomeDropdown
        place={4}
        title={'model'}
        queryObj={queryObj}
        isDisabled={isDisabled}
        value={model}
        prevSelected={!isDisabled}
        items={modelDataStrings}
      />
      {showSubmodelDropdown && (
        <SubmodelDropdown queryObj={queryObj} submodelData={submodelData} />
      )}
    </>
  );
}
