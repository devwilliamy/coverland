'use client';

import { ChangeEvent, useState } from 'react';
import { TQuery } from './HeroDropdown';
import { TProductJsonData } from '@/components/PDP/EditVehicleDropdown';

export function YearSearch({
  queryObj,
  dropdownData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
  dropdownData: TProductJsonData[];
}) {
  const [value, setValue] = useState('');
  const { type, make } = queryObj.query;
  const isDisabled = !type || !make;
  const { setQuery } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, year: newValue }));
  };

  const years = Array.from(
    new Set(dropdownData.flatMap((d) => d.year_options.split(',')))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <button
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] outline-[#767676] md:max-h-[58px]  ${!queryObj.query.type ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
      disabled={isDisabled}
      tabIndex={1}
    >
      <div className="ml-[10px] pr-[15px]">2</div>
      <select
        value={value}
        onChange={(event) => handleChange(event)}
        disabled={!queryObj.query.type}
        className="w-full bg-transparent outline-none"
      >
        <option value="capitalize">Year</option>
        {years.map((year) => (
          <option key={`year-${year}`} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
    </button>
  );
}
