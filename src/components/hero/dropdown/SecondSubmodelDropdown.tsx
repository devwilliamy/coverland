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
import { ThirdSubmodelDropdown } from './ThirdSubmodelDropdown';

export function SecondSubmodelDropdown({
  queryObj,
  secondSubmodelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  secondSubmodelData: ModelDropdown[];
}) {
  // Leaving this for when third submodel becomes a thing
  const [thirdSubmodelData, setThirdSubmodelData] = useState<ModelDropdown[]>(
    []
  );
  const { query, setQuery } = queryObj;
  const { submodel1, submodel2 } = query;

  const filteredSecondSubmodelData: (string | null)[] = Array.from(
    new Set(
      secondSubmodelData
        .filter(
          (vehicle) =>
            vehicle.submodel1 === (submodel1 as string) &&
            vehicle.submodel2 !== null
        )
        .map((vehicle) => vehicle.submodel2)
    )
  ).map((submodel) => ({
    name: submodel,
  }));

  // useEffect(() => {
  // }, [submodel1]);

  // Leaving this for when third submodel becomes a thing
  useEffect(() => {
    // Check for thirdsubmodel
    const thirdSubmodelData = secondSubmodelData.filter(
      (vehicle) =>
        vehicle.submodel1 === submodel1 &&
        vehicle.submodel2 === submodel2 &&
        vehicle.submodel3
    );

    setThirdSubmodelData(thirdSubmodelData);
    console.log('ThirdSubmodel:', thirdSubmodelData);
  }, [submodel1, submodel2]);

  const isDisabled =
    !query.make ||
    !query.year ||
    !query.type ||
    !query.model ||
    !query.submodel1;

  const prevSelected =
    !queryObj ||
    (queryObj.query.type !== '' &&
      queryObj.query.year !== '' &&
      queryObj.query.make !== '' &&
      queryObj.query.model !== '' &&
      queryObj.query.submodel1 !== '' &&
      queryObj.query.submodel2 === '');
  const showThirdSubmodelDropdown = thirdSubmodelData.length > 0;

  return (
    <>
      <HomeDropdown
        place={6}
        title="submodel2"
        queryObj={queryObj}
        isDisabled={isDisabled}
        prevSelected={prevSelected}
        items={filteredSecondSubmodelData as string[]}
        value={submodel2}
      />
      {showThirdSubmodelDropdown && (
        <ThirdSubmodelDropdown
          queryObj={queryObj}
          thirdSubmodelData={thirdSubmodelData}
        />
      )}
    </>
  );
}
