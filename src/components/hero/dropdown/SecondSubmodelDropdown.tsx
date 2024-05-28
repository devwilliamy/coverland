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
import MainDropdown from './MainDropdown';

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
  // const [thirdSubmodelData, setThirdSubmodelData] = useState<ModelDropdown[]>(
  //   []
  // );

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
  // useEffect(() => {
  //   // Check for thirdsubmodel
  //   const thirdSubmodelData = secondSubmodelData.filter(
  //     (vehicle) => vehicle.submodel1 === value && vehicle.submodel2 !== null
  //   );

  //   setThirdSubmodelData(thirdSubmodelData);
  //   console.log('ThirdSubmodel:', thirdSubmodelData);
  // }, [value]);

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
  // const showThirdSubmodelDropdown = thirdSubmodelData.length > 0;

  return (
    <>
      {/* <div
        className={`flex max-h-[53px] min-h-[53px] px-2 ${prevSelected ? ' w-full border-[5px] border-[#BE1B1B]' : 'w-[98%] border-[1px] border-[#767676] outline-[4px] outline-transparent'} items-center overflow-hidden rounded-[8px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
      >
        <div className="ml-[10px] pr-[15px]">6</div>
        <label htmlFor="secondsubmode"></label>
        <select
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          className={`w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3`}
          aria-label="secondsubmodel"
        >
          <option value="">{`Submodel 2`}</option>
          {filteredSecondSubmodelData?.sort()?.map((secondSubmodel) => (
            <option
              key={`model-${secondSubmodel}`}
              value={secondSubmodel || ''}
            >
              {secondSubmodel}
            </option>
          ))}
        </select>
      </div> */}
      <MainDropdown
        place={6}
        title="submodel2"
        displayTitle="submodel"
        queryObj={queryObj}
        isDisabled={isDisabled}
        prevSelected={prevSelected}
        items={filteredSecondSubmodelData as string[]}
        value={submodel2}
      />
      {/* {showThirdSubmodelDropdown && (
        <ThirdSubmodelDropdown
          queryObj={queryObj}
          thirdSubmodelData={thirdSubmodelData}
        />
      )} */}
    </>
  );
}
