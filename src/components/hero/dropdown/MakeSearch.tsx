'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import {
  CAR_COVER_MAKES,
  SUV_COVER_MAKES,
  TRUCK_COVER_MAKES,
} from '@/lib/constants';
import { getAllUniqueMakesByYear } from '@/lib/db';

type MakeDropdown = { make: string | null; make_slug: string | null };

export function MakeSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
}) {
  const [value, setValue] = useState('');
  const {
    setQuery,
    query: { type, year },
  } = queryObj;
  const [makeData, setMakeData] = useState<MakeDropdown[]>([]);
  const isDisabled = !type || !year;

  useEffect(() => {
    !type && !year && setValue('');
  }, [type, year]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUniqueMakesByYear({
          type,
          cover: 'Premium Plus', // TOOD: - Update this to make it work for premium as well.
          year,
        });
        setMakeData(response);
      } catch (error) {
        console.error('[Make Search]: ', error);
      }
    };
    if (type && year) {
      fetchData();
    }
  }, [type, year]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, make: newValue }));
  };

  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
      tabIndex={1}
    >
      <div className="ml-[10px] pr-[15px]">3</div>
      <select
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className="w-full bg-transparent outline-none "
      >
        <option value="">{`Make`}</option>
        {makeData.map(({ make }, index) => (
          <option key={`${make}-${index}`} value={make || ''}>
            {make}
          </option>
        ))}
      </select>
    </div>
  );
}
