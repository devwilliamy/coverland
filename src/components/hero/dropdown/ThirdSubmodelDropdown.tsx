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
import HomeDropdown from './HomeDropdown';

export function ThirdSubmodelDropdown({
  queryObj,
  thirdSubmodelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  thirdSubmodelData: ModelDropdown[];
}) {
  const { query, setQuery } = queryObj;
  const { submodel1, submodel2, submodel3 } = query;
  const filteredThirdSubmodelData: (string | null)[] = Array.from(
    new Set(
      thirdSubmodelData
        .filter(
          (vehicle) =>
            vehicle.submodel1 === (submodel1 as string) &&
            vehicle.submodel2 === (submodel2 as string) &&
            vehicle.submodel3 !== null
        )
        .map((vehicle) => vehicle.submodel3)
    )
  ).map((submodel) => ({
    name: submodel,
  }));

  // Leaving this for when third submodel becomes a thing
  // useEffect(() => {
  //   // Check for thirdsubmodel
  //   const thirdSubmodelData = thirdSubmodelData.filter(
  //     (vehicle) => vehicle.submodel2 === value && vehicle.submodel3 !== null
  //   );

  //   setThirdSubmodelData(thirdSubmodelData);
  //   console.log('ThirdSubmodel:', thirdSubmodelData);
  // }, [value]);

  const isDisabled =
    !query.make ||
    !query.year ||
    !query.type ||
    !query.model ||
    !query.submodel1 ||
    !query.submodel2;

  const prevSelected =
    !queryObj ||
    (queryObj.query.type !== '' &&
      queryObj.query.year !== '' &&
      queryObj.query.make !== '' &&
      queryObj.query.model !== '' &&
      queryObj.query.submodel1 !== '' &&
      queryObj.query.submodel2 !== '' &&
      queryObj.query.submodel3 === '');
  // const showThirdSubmodelDropdown = thirdSubmodelData.length > 0;

  return (
    <>
      <HomeDropdown
        place={7}
        title="submodel3"
        queryObj={queryObj}
        isDisabled={isDisabled}
        prevSelected={prevSelected}
        items={filteredThirdSubmodelData as string[]}
        value={submodel3}
      />
    </>
  );
}
