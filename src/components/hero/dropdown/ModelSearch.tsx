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
import MainDropdown from './MainDropdown';

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
    query: { type, year, make, model, modelId, makeId, yearId, typeId },
    setQuery,
  } = queryObj;

  useEffect(() => {
    if (model) {
      const parent_generation =
        modelData.find((car) => car.model === model)?.parent_generation || '';
      setQuery((p) => ({
        ...p,
        parent_generation,
      }));
      // fetchData();
    }
  }, [model, modelData, setQuery, modelId]);

  useEffect(() => {
    setValue('');
  }, [type, year, make, makeId, typeId, yearId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cover = type === 'Seat Covers' ? 'Leather' : 'Premium Plus'; // TODO: - Extract cover from query obj or something
        const response = await getAllUniqueModelsByYearMake({
          type,
          cover,
          year,
          make,
          makeId,
          yearId,
          typeId,
        });
        const uniqueModel = response.uniqueCars.filter(
          (car, index, self) =>
            index === self.findIndex((t) => t.model_slug === car.model_slug)
        );
        setModelData(response.uniqueCars);
        setModelDataStrings(response.uniqueModels);
        setFilteredModelData(response.uniqueModels);
        console.log({ response });
      } catch (error) {
        console.error('[Model Search]: ', error);
      }
    };
    if (type && year && make && typeId && yearId && makeId) {
      fetchData();
    }
  }, [type, year, make, typeId, yearId, makeId]);

  useEffect(() => {
    // Check for submodel
    const submodel = modelData.filter(
      (vehicle) => vehicle.model === model && vehicle.submodel1
    );

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
      <MainDropdown
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
