'use client';

import { ChangeEvent, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function SubmodelSearch({
  dataQuery,
  submodelOpts,
  query,
  handleSubmit,
}: {
  dataQuery: (newQuery: TQuery) => void;
  submodelOpts: string[];
  query: TQuery;
  handleSubmit: () => void;
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    console.log('newValue', newValue);
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
      <option value={''}>{value || 'Select submodel'}</option>
      {submodelOpts.map((submodel) => (
        <option key={submodel} value={submodel}>
          {submodel}
        </option>
      ))}
    </select>
  );
}
