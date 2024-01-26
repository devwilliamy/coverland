'use client';

import { ChangeEvent, Dispatch, useState } from 'react';
import { CarSelectorAction } from '@/lib/hooks/useCarDropdown';

export function YearSearch({
  setDropdown,
  yearOpts,
}: {
  setDropdown: Dispatch<CarSelectorAction>;
  yearOpts: string[];
}) {
  const [value, setValue] = useState('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    setDropdown({ type: 'SET_YEAR', payload: e.target.value });
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
