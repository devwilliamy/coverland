'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';
import { ModelDropdown } from './ModelSearch';
import { SecondSubmodelDropdown } from './SecondSubmodelDropdown';
import MainDropdown from './MainDropdown';
import useDetermineType from '@/hooks/useDetermineType';
import { getAllSubmodelsByTypeMakeModelYear } from '@/lib/db';

export function SubmodelDropdown({
  queryObj,
  submodelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  submodelData: ModelDropdown[];
}) {
  const [secondSubmodelData, setSecondSubmodelData] = useState<ModelDropdown[]>(
    []
  );

  const { query, setQuery } = queryObj;
  const {
    type,
    typeId,
    model,
    modelId,
    make,
    makeId,
    year,
    yearId,
    submodel1,
  } = query;

  const { isMakePage, isModelPage } = useDetermineType();

  const filteredSubmodelData: (string | null)[] = Array.from(
    new Set(
      submodelData
        .filter(
          (vehicle) => vehicle.model === (model as string) && vehicle.submodel1
        )
        .map((vehicle) => vehicle.submodel1)
    )
  ).map((submodel) => ({
    name: submodel,
  }));

  useEffect(() => {
    // Check for second submodel
    const secondSubmodelData = submodelData.filter(
      (vehicle) => vehicle.submodel1 === submodel1 && vehicle.submodel2
    );

    setSecondSubmodelData(secondSubmodelData);
  }, [submodel1]);

  const isDisabled = !query.make || !query.year || !query.type || !query.model;
  const showSecondSubmodelDropdown = secondSubmodelData.length > 0;
  const prevSelected =
    !queryObj ||
    (queryObj.query.type !== '' &&
      queryObj.query.year !== '' &&
      queryObj.query.make !== '' &&
      queryObj.query.model !== '' &&
      queryObj.query.submodel1 === '');

  return (
    <>
      <MainDropdown
        place={5}
        title="submodel1"
        displayTitle="submodel"
        queryObj={queryObj}
        isDisabled={isDisabled}
        prevSelected={prevSelected}
        items={filteredSubmodelData as string[]}
        value={submodel1}
      />
      {showSecondSubmodelDropdown && (
        <SecondSubmodelDropdown
          queryObj={queryObj}
          secondSubmodelData={secondSubmodelData}
        />
      )}
    </>
  );
}
