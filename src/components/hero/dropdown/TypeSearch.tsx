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
    setQuery({
      type: newValue,
      year: '',
      make: '',
      model: '',
      submodel1: '',
      submodel2: '',
      parent_generation: '',
    });
  };

  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      tabIndex={1}
    >
      <div className=" ml-[10px] pr-[15px]">1</div>
      <select
        value={value}
        onChange={handleChange}
        className="w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3"
      >
        <option value="">Type</option>
        {types.map((type, i) => (
          <option key={`type-${type}-${i}`} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
