'use client';

import { ChangeEvent, Dispatch, useState } from 'react';
import { CarSelectorAction } from '@/lib/hooks/useDropdownSelector';

export function MakeSearch({
  setDropdown,
  makeOpts,
}: {
  setDropdown: Dispatch<CarSelectorAction>;
  makeOpts: string[];
}) {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setDropdown({ type: 'SET_MAKE', payload: e.target.value });
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
