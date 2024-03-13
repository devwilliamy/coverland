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
  const [value, setValue] = useState('');
  // Leaving this for when third submodel becomes a thing
  // const [thirdSubmodelData, setThirdSubmodelData] = useState<ModelDropdown[]>(
  //   []
  // );

  const { query, setQuery } = queryObj;
  const { submodel1 } = query;

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
  );

  useEffect(() => {
    setValue('');
  }, [submodel1]);

  // Leaving this for when third submodel becomes a thing
  // useEffect(() => {
  //   // Check for thirdsubmodel
  //   const thirdSubmodelData = secondSubmodelData.filter(
  //     (vehicle) => vehicle.submodel1 === value && vehicle.submodel2 !== null
  //   );

  //   setThirdSubmodelData(thirdSubmodelData);
  //   console.log('ThirdSubmodel:', thirdSubmodelData);
  // }, [value]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, submodel2: newValue }));
  };

  const isDisabled =
    !query.make ||
    !query.year ||
    !query.type ||
    !query.model ||
    !query.submodel1;
  // const showThirdSubmodelDropdown = thirdSubmodelData.length > 0;

  return (
    <>
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-lg outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
        tabIndex={1}
      >
        <div className="ml-[10px] pr-[15px]">6</div>
        <select
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          className={`w-full cursor-pointer py-1 outline-none lg:py-3 ${isDisabled ? 'bg-transparent' : 'bg-white'}`}
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
      </div>
      {/* {showThirdSubmodelDropdown && (
        <ThirdSubmodelDropdown
          queryObj={queryObj}
          thirdSubmodelData={thirdSubmodelData}
        />
      )} */}
    </>
  );
}
