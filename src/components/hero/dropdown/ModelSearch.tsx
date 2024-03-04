'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';
import { TProductJsonData } from '@/components/PDP/EditVehicleDropdown';

export function ModelSearch({
  queryObj,
  dropdownData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  dropdownData: TProductJsonData[];
}) {
  const [value, setValue] = useState('');
  const { query, setQuery } = queryObj;

  const { make } = query;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, model: newValue }));
  };

  useEffect(() => {
    !make && setValue('');
  }, [make]);

  const isDisabled = !query.type || !query.make;
  const models = Array.from(new Set(dropdownData.map((d) => d.model)));

  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg lg:w-auto`}
      tabIndex={1}
    >
      <div className="ml-[10px] pr-[15px]">4</div>
      <select
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className=" w-full bg-transparent outline-none"
      >
        <option value="">{`${value ? 'Clear' : 'Model'}`}</option>
        {models?.sort()?.map((model) => (
          <option key={`model-${model}`} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}
