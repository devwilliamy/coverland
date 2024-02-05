'use client';

import { ChangeEvent, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function YearSearch({
  dataQuery,
  yearOpts,
  query,
  handleSubmit,
}: {
  dataQuery: (newQuery: TQuery) => void;
  yearOpts: string[];
  query: TQuery;
  handleSubmit: () => void;
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    const updatedQuery = { ...query, submodel: newValue };
    dataQuery(updatedQuery);
    handleSubmit();
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
