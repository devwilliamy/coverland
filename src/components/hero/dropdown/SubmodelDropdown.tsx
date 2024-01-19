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
    <select
      value={value}
      onChange={handleChange}
      disabled={isDisabled}
      className="rounded-lg px-2  text-lg"
    >
      <option value="">Select car model</option>
      {submodelData?.sort()?.map((submodel) => (
        <option key={`model-${submodel}`} value={submodel}>
          {submodel}
        </option>
      ))}
    </select>
  );
}
