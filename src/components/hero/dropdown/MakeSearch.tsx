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
      className={`flex max-h-[44px] md:max-h-[58px] outline-[#767676] min-h-[44px] w-full items-center rounded-[4px] ${!queryObj.query.year ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
      disabled={!query.type || !query.year}
    >
      <div className="ml-[10px] pr-[15px]">3</div>
      <select
        value={value}
        onChange={handleChange}
        disabled={!query.type || !query.year}
        className="w-full bg-transparent outline-none "
      >
        <option value="" disabled>
          Make
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
