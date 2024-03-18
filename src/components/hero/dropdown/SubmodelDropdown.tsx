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
  const [value, setValue] = useState('');
  const [secondSubmodelData, setSecondSubmodelData] = useState<ModelDropdown[]>(
    []
  );

  const { query, setQuery } = queryObj;
  const { model } = query;

  const filteredSubmodelData: (string | null)[] = Array.from(
    new Set(
      submodelData
        .filter(
          (vehicle) =>
            vehicle.model === (model as string) && vehicle.submodel1 !== null
        )
        .map((vehicle) => vehicle.submodel1)
    )
  );

  useEffect(() => {
    setValue('');
  }, [model]);

  useEffect(() => {
    // Check for second submodel
    const secondSubmodelData = submodelData.filter(
      (vehicle) => vehicle.submodel1 === value && vehicle.submodel2 !== null
    );

    setSecondSubmodelData(secondSubmodelData);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, submodel1: newValue, submodel2: '' }));
  };

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
      <div
        className={`flex max-h-[53px] min-h-[53px] px-[3px] ${prevSelected ? ' w-full border-[5px] border-[#BE1B1B]' : 'w-[98%] border-[1px] border-[#767676] outline-[4px] outline-transparent'} items-center overflow-hidden rounded-[8px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
      >
        <div
          className={`flex h-full w-full ${prevSelected && 'border-[2.5px]  border-white'} items-center overflow-hidden rounded-[4px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
          // tabIndex={1}
        >
          <div className="ml-[10px] pr-[15px]">5</div>
          <select
            value={value}
            onChange={handleChange}
            disabled={isDisabled}
            className={`w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3`}
          >
            <option value="">{`Submodel`}</option>
            {filteredSubmodelData?.sort()?.map((submodel) => (
              <option key={`model-${submodel}`} value={submodel || ''}>
                {submodel}
              </option>
            ))}
          </select>
        </div>
      </div>
      {showSecondSubmodelDropdown && (
        <SecondSubmodelDropdown
          queryObj={queryObj}
          secondSubmodelData={secondSubmodelData}
        />
      )}
    </>
  );
}
