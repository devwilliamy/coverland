'use client';
import {
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
  const [modelData, setModelData] = useState<ModelDropdown[]>([]);
  const [modelDataStrings, setModelDataStrings] = useState<string[]>([]);
  const [submodelData, setSubmodelData] = useState<ModelDropdown[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    query: { type, year, make, model, makeId, yearId, typeId },
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
    }
  }, [model, modelData, setQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
        setModelData(response.uniqueCars);
        setModelDataStrings(response.uniqueModels);
      } catch (error) {
        console.error('[Model Search]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (type && year && make) {
      fetchData();
    }
  }, [type, year, make]);

  useEffect(() => {
    const submodel = modelData.filter(
      (vehicle) => vehicle.model === model && vehicle.submodel1
    );
    setSubmodelData(submodel);
  }, [model]);

  const isDisabled = !type || !year || !make;
  const showSubmodelDropdown = submodelData.length > 0;

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
        isLoading={isLoading}
      />
      {/* {showSubmodelDropdown && (
        <SubmodelDropdown queryObj={queryObj} submodelData={submodelData} />
      )} */}
    </>
  );
}
