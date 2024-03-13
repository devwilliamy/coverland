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

  return (
    <>
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-lg outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
        tabIndex={1}
      >
        <div className="ml-[10px] pr-[15px]">5</div>
        <select
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          className={`w-full py-1 outline-none lg:py-3 ${isDisabled ? 'bg-transparent' : 'bg-white'}`}
        >
          <option value="">{`Submodel`}</option>
          {filteredSubmodelData?.sort()?.map((submodel) => (
            <option key={`model-${submodel}`} value={submodel || ''}>
              {submodel}
            </option>
          ))}
        </select>
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
