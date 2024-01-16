'use client';

import { ChangeEvent, useState } from 'react';
import { TQuery } from './HeroDropdown';
import { TProductData } from '@/lib/db';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export function MakeSearch({
  queryObj,
  makeData,
  isLoading,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
  makeData: string[];
  isLoading: boolean;
}) {
  const [value, setValue] = useState('');
  const { setQuery, query } = queryObj;
  const sortedData = makeData.sort((a, b) => a.localeCompare(b));

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, make: newValue }));
  };

  console.log(isLoading);

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={!query.type || !query.year}
      className="text-lg rounded-lg  px-2"
    >
      <option value="" disabled selected>
        {isLoading ? (
          <div className="w-full h-full">
            {'Loading...'}{' '}
            <AiOutlineLoading3Quarters className="animate-spin bg-black" />
          </div>
        ) : (
          'Select car make'
        )}
      </option>
      {sortedData.map((make) => (
        <option key={make} value={make}>
          {make}
        </option>
      ))}
    </select>
  );
}
