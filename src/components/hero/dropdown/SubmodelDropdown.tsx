'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';

export function SubmodelDropdown({
  queryObj,
  submodelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  submodelData: string[];
}) {
  const [value, setValue] = useState('');
  const { query, setQuery } = queryObj;

  useEffect(() => {
    return () => {
      setQuery((p) => ({ ...p, submodel: '' }));
    };
  }, [setQuery]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, submodel: newValue }));
  };

  const isDisabled = !query.make || !query.year || !query.type;

  return (
    <button
      className={`flex max-h-[44px] outline-[#767676] min-h-[44px] w-full items-center rounded-lg ${!queryObj.query.make ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
      disabled={isDisabled}
    >
      <div className="ml-[10px] pr-[15px]">5</div>
      <select
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className="w-full bg-transparent outline-none "
      >
        <option value="">Submodel</option>
        {submodelData?.sort()?.map((submodel) => (
          <option key={`model-${submodel}`} value={submodel}>
            {submodel}
          </option>
        ))}
      </select>
    </button>
  );
}
