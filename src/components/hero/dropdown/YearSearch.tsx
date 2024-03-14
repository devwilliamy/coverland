'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';

export function YearSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
}) {
  const [value, setValue] = useState('');
  const { type } = queryObj.query;
  const isDisabled = !type;
  const { setQuery } = queryObj;

  useEffect(() => {
    setValue('');
  }, [type]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({
      ...p,
      year: newValue,
      parent_generation: '',
      make: '',
      model: '',
      submodel1: '',
      submodel2: '',
    }));
  };

  const startYear = 1921;
  const endYear = 2025;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  return (
    <button
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      tabIndex={1}
    >
      <div className="ml-[10px] pr-[15px]">2</div>
      <label htmlFor="year">
        <select
          value={value}
          onChange={(event) => handleChange(event)}
          disabled={isDisabled}
          className={`w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3`}
          aria-label="year"
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={`year-${year}`} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </button>
  );
}
