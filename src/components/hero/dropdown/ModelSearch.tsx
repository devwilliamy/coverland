'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';
import {
  editVehicleGetAllModelsByTypeIdMakeID,
  getAllUniqueModelsByYearMake,
  getDistinctModelsByTypeMake,
  getDistinctModelsByTypeMakeSlug,
  // getUniqueModelsByTypeMake,
} from '@/lib/db';
import { SubmodelDropdown } from './SubmodelDropdown';
import MainDropdown from './MainDropdown';
import useDetermineType from '@/hooks/useDetermineType';
import { deslugify } from '@/lib/utils';

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
  isBreadCrumb = false,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  isBreadCrumb?: boolean;
}) {
  const [modelData, setModelData] = useState<ModelDropdown[]>([]);
  const [modelDataStrings, setModelDataStrings] = useState<string[]>([]);
  const [submodelData, setSubmodelData] = useState<ModelDropdown[]>([]);

  const { isMakePage, isModelPage } = useDetermineType();

  const [submodelDataStrings, setSubmodelDataStrings] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  // Get Unique Models By Type / Year / Make
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
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

        // console.log({ response });
      } catch (error) {
        console.error('[Model Search]: ', error);
      } finally {
        setIsLoading(false)
      }
    };
    if (type && year && make && typeId && yearId && makeId) {
      fetchData();
    }
  }, [type, year, make, typeId, yearId, makeId]);

  useEffect(() => {
    if (!isBreadCrumb && isModelPage && typeId && makeId) {
      const getModels = async () => {
        // console.log({ typeId, makeId });

        const res = await getDistinctModelsByTypeMake(
          Number(typeId),
          Number(makeId)
        );

        const fetchedCars = res.uniqueCars;
        const fetchedModels = res.uniqueModels;

        setModelDataStrings(fetchedModels);
        setModelData(fetchedCars as ModelDropdown[]);
        // console.log({ fetchedCars, fetchedModels });
      };

      getModels();
    }
  }, [typeId, makeId]);

  useEffect(() => {
    // Check for submodel
    const submodel = modelData.filter(
      (vehicle) => vehicle.model === model && vehicle.submodel1
    );

    setSubmodelData(submodel);
  }, [model]);

  const determineDisabled = () => {
    switch (true) {
      case isModelPage:
        return !type || !make;
      default:
        return !type || !year || !make;
    }
  };

  const isDisabled = determineDisabled();

  const showSubmodelDropdown = submodelData.length > 0;

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
        isLoading={isLoading}
      />
      {!isMakePage && !isModelPage && showSubmodelDropdown && (
        <SubmodelDropdown queryObj={queryObj} submodelData={submodelData} />
      )}
    </>
  );
}
