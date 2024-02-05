'use client';

import { ChangeEvent, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function SubmodelSearch2nd({
  dataQuery,
  secondSubmodelOpts,
  query,
  handleSubmit,
}: {
  dataQuery: (newQuery: TQuery) => void;
  secondSubmodelOpts: string[];
  query?: TQuery;
  handleSubmit: () => void;
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    const updatedQuery = { ...query, secondSubmodel: newValue };
    dataQuery(updatedQuery as TQuery);
    handleSubmit();
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
