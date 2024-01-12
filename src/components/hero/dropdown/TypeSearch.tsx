'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './HeroDropdown';

export function TypeSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const [value, setValue] = useState('');
  const { setQuery } = queryObj;

  const types = ['Car Covers', 'SUV Covers', 'Truck Covers'];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((prev) => ({ ...prev, type: newValue }));
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="text-lg rounded-lg px-2 w-full lg:w-auto"
    >
      <option value="" selected>
        Product Type
      </option>
      {types.map((type, i) => (
        <option key={`type-${type}-${i}`} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}
