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
}) {
  const [value, setValue] = useState('');
  const { type, make, model } = queryObj.query;
  const isDisabled = !type;
  const { setQuery } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, year: newValue }));
  };

  const startYear = 1921;
  const endYear = 2025;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  // const years = Array.from(
  //   new Set(dropdownData.flatMap((d) => d.year_options.split(',')))
  // ).sort((a, b) => parseInt(b) - parseInt(a));
  // console.log('YearDropdwon:', { Newyears, years });
  return (
    <button
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      tabIndex={1}
    >
      <div className="ml-[10px] pr-[15px]">2</div>
      <select
        value={value}
        onChange={(event) => handleChange(event)}
        disabled={isDisabled}
        className="w-full bg-transparent outline-none"
      >
        <option value="">{`${value ? 'Clear' : 'Year'}`}</option>
        {years.map((year) => (
          <option key={`year-${year}`} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
    </button>
  );
}
