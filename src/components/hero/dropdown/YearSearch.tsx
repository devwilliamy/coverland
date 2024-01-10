'use client';

import { ChangeEvent, useState } from 'react';
import { TProductData } from '@/lib/db';
import { TQuery } from './HeroDropdown';

export function YearSearch({
  queryObj,
  currentSelection,
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
    <select
      value={value}
      onChange={(event) => handleChange(event)}
      disabled={!queryObj.query.type}
      className="text-lg rounded-lg  px-2"
    >
      <option value="">Select car year</option>
      {years.map((year) => (
        <option key={`year-${year}`} value={year.toString()}>
          {year}
        </option>
      ))}
    </select>
  );
}
