'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function SubmodelSearch({
  setQuery,
  submodelOpts,
}: {
  setQuery: Dispatch<SetStateAction<TQuery>>;
  submodelOpts: string[];
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setQuery((p) => ({ ...p, submodel: e.target.value }));
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
