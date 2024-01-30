'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function MakeSearch({
  setQuery,
  makeOpts,
}: {
  setQuery: Dispatch<SetStateAction<TQuery>>;
  makeOpts: string[];
}) {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setQuery((p) => ({ ...p, make: e.target.value }));
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Makes</option>
      {makeOpts.map((make) => (
        <option key={`${make}`} value={make}>
          {make}
        </option>
      ))}
    </select>
  );
}
