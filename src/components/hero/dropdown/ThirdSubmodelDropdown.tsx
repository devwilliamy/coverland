'use client';

import { Dispatch, SetStateAction } from 'react';
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
  const { query } = queryObj;
  const { submodel1, submodel2, submodel3 } = query;
  const filteredThirdSubmodelData = Array.from(
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

  return (
    <>
      <HomeDropdown
        place={7}
        title="submodel3"
        queryObj={queryObj}
        isDisabled={isDisabled}
        prevSelected={prevSelected}
        items={filteredThirdSubmodelData}
        value={submodel3}
      />
    </>
  );
}
