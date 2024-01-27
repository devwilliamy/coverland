'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function SubmodelSearch2nd({
  setQuery,
  secondSubmodelOpts,
}: {
  setQuery: Dispatch<SetStateAction<TQuery>>;
  secondSubmodelOpts: string[];
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setQuery((p) => ({ ...p, secondSubmodel: e.target.value }));
  }

  return (
    <select
      value={value.toLowerCase()}
      defaultValue={value.toLowerCase() ?? ''}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Select 2nd submodel</option>
      {secondSubmodelOpts.map((submodel) => (
        <option
          key={`model-${submodel}`}
          value={submodel?.toLowerCase() as string}
        >
          {submodel}
        </option>
      ))}
    </select>
  );
}
