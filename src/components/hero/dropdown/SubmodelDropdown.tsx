'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';

export function SubmodelDropdown({
  queryObj,
  submodelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  submodelData: string[];
}) {
  const [value, setValue] = useState('');
  const { query, setQuery } = queryObj;
  const { year } = query;

  useEffect(() => {
    !year && setValue('');
  }, [year]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    console.log(newValue);
    setValue(newValue);
    setQuery((p) => ({ ...p, submodel: newValue }));
  };

  const isDisabled = !query.make || !query.year || !query.type;
  console.log(value);

  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-lg outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
      tabIndex={1}
    >
      <div className="ml-[10px] pr-[15px]">5</div>
      <select
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className="w-full bg-transparent outline-none "
      >
        <option value="">{`${value ? 'Clear' : 'Submodel'}`}</option>
        {submodelData?.sort()?.map((submodel) => (
          <option key={`model-${submodel}`} value={submodel}>
            {submodel}
          </option>
        ))}
      </select>
    </div>
  );
}
