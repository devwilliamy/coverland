'use client';

import { ChangeEvent, useState } from 'react';
import { TQuery } from './HeroDropdown';

export function MakeSearch({
  queryObj,
  makeData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
  makeData: string[];
}) {
  const [value, setValue] = useState('');
  const { setQuery, query } = queryObj;
  const sortedData = makeData.sort((a, b) => a.localeCompare(b));

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, make: newValue }));
  };

  return (
    <button
      className={`flex w-full items-center rounded-lg ${!queryObj.query.year ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg lg:w-auto`}
      disabled={!query.type || !query.year}
      >
      <div className="pr-[15px]">3</div>
      <select
        value={value}
        onChange={handleChange}
        disabled={!query.type || !query.year}
        className="w-full bg-transparent"
      >
        <option value="" disabled>
          Select car make
        </option>
        {sortedData.map((make) => (
          <option key={make} value={make}>
            {make}
          </option>
        ))}
      </select>
    </button>
  );
}
