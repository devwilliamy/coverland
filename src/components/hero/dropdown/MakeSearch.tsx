'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import { getAllUniqueMakesByYear, getProductDataByPage } from '@/lib/db';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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
  const [isLoading, setIsLoading] = useState(false);
  const {
    setQuery,
    query: { type, year },
  } = queryObj;
  const [makeData, setMakeData] = useState<MakeDropdown[]>([]);
  const isDisabled = !type || !year;

  useEffect(() => {
    // Doing this to warm up the DB
    const fetchData = async () => {
      try {
        await getProductDataByPage();
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setValue('');
  }, [type, year]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllUniqueMakesByYear({
          type,
          cover: 'Premium Plus', // TOOD: - Update this to make it work for premium as well.
          year,
        });
        setMakeData(response);
      } catch (error) {
        console.error('[Make Search]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (type && year) {
      fetchData();
    }
  }, [type, year]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({
      ...p,
      make: newValue,
      model: '',
      submodel1: '',
      submodel2: '',
    }));
  };

  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
      tabIndex={1}
    >
      <div className="ml-[10px] pr-[15px]">3</div>
      {isLoading ? (
        <div className="pl-2">
          <AiOutlineLoading3Quarters className="animate-spin " />
        </div>
      ) : (
        <>
          <label htmlFor="make"></label>
          <select
            value={value}
            onChange={handleChange}
            disabled={isLoading || isDisabled}
            className={`w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3`}
            aria-label="make"
          >
            <option value="">{`Make`}</option>
            {makeData.map(({ make }, index) => (
              <option key={`${make}-${index}`} value={make || ''}>
                {make}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
