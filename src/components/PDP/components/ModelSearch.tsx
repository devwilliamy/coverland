'use client';

import { ChangeEvent, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function ModelSearch({
  dataQuery,
  modelOpts,
  query,
  handleSubmit,
}: {
  dataQuery: (newQuery: TQuery) => void;
  modelOpts: string[];
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
      value={value.toLowerCase()}
      defaultValue={value.toLowerCase() ?? ''}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Model</option>
      {modelOpts.map((model) => (
        <option key={`model-${model}`} value={model?.toLowerCase() as string}>
          {model}
        </option>
      ))}
    </select>
  );
}
