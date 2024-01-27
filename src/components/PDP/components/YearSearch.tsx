'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function YearSearch({
  setQuery,
  yearOpts,
}: {
  setQuery: Dispatch<SetStateAction<TQuery>>;
  yearOpts: string[];
}) {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setQuery((p) => ({ ...p, year: e.target.value }));
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Years</option>
      {yearOpts.map((year) => (
        <option key={`model-${year}`} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
