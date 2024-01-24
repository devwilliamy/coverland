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
    <button
      className={`flex w-full items-center rounded-lg  bg-white px-2 text-lg lg:w-auto`}
      disabled={!queryObj.query.type}
    >
      <div className="pr-[15px]">1</div>
      <select
        value={value}
        onChange={handleChange}
        className="w-full bg-transparent"
      >
        <option value="">Product Type</option>
        {types.map((type, i) => (
          <option key={`type-${type}-${i}`} value={type}>
            {type}
          </option>
        ))}
      </select>
    </button>
  );
}
