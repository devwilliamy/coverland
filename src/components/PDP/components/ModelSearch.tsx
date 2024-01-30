'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './SubDropdowns';

export function ModelSearch({
  setQuery,
  modelOpts,
  handleSubmitDropdown,
}: {
  setQuery: Dispatch<SetStateAction<TQuery>>;
  modelOpts: string[];
  handleSubmitDropdown: () => void;
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setQuery((p) => ({ ...p, model: e.target.value }));
    handleSubmitDropdown();
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
