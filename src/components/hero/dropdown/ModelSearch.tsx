'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './HeroDropdown';

export function ModelSearch({
  queryObj,
  modelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  modelData: string[];
}) {
  const [value, setValue] = useState('');
  const { query, setQuery } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, model: newValue }));
  };

  const isDisabled = !query.type || !query.year || !query.make;

  return (
    <button
      className={`flex w-full items-center rounded-lg outline outline-1 outline-offset-1 ${!queryObj.query.make ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg lg:w-auto`}
      disabled={isDisabled}
    >
      <div className="ml-[10px] pr-[15px]">4</div>
      <select
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className=" w-full bg-transparent outline-none"
      >
        <option value="">Model</option>
        {modelData?.sort()?.map((model) => (
          <option key={`model-${model}`} value={model}>
            {model}
          </option>
        ))}
      </select>
    </button>
  );
}
