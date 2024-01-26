'use client';

import { ChangeEvent, Dispatch, useState } from 'react';
import { CarSelectorAction } from '@/lib/hooks/useCarDropdown';

export function SubmodelSearch({
  setDropdown,
  submodelOpts,
}: {
  setDropdown: Dispatch<CarSelectorAction>;
  submodelOpts: string[];
}) {
  const [value, setValue] = useState<string>('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setDropdown({ type: 'SET_SUBMODEL', payload: e.target.value });
  }

  return (
    <select
      value={value.toLowerCase()}
      defaultValue={value.toLowerCase() ?? ''}
      onChange={handleChange}
      className="rounded-lg px-2 py-3 text-lg outline outline-1 outline-offset-1 "
    >
      <option value={''}>Submodel</option>
      {submodelOpts.map((submodel) => (
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
