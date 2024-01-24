'use client';

import { ChangeEvent, useState } from 'react';
import { TProductData } from '@/lib/db';
import { TQuery } from './HeroDropdown';

export function YearSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
  currentSelection?: TProductData;
}) {
  const [value, setValue] = useState('');
  const years = Array.from({ length: 101 }, (_, i) => 1924 + i).reverse();
  const { setQuery } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, year: newValue }));
  };

  return (
    <button
      className={`flex max-h-[44px] outline-[#767676] min-h-[44px] w-full items-center rounded-[4px]  ${!queryObj.query.type ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
      disabled={!queryObj.query.type}
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
