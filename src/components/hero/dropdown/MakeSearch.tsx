'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import { getAllUniqueMakesByYear, getProductDataByPage } from '@/lib/db';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import MainDropdown from './MainDropdown';

export type MakeDropdown = { make: string | null; make_slug: string | null };

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
    query: { type, year, make },
  } = queryObj;
  const [makeData, setMakeData] = useState<MakeDropdown[]>([]);
  const [makeDataStrings, setMakeDataStrings] = useState<string[]>([]);
  const isDisabled = !type || !year;
  const prevSelected = Boolean(
    queryObj &&
      queryObj.query.type &&
      queryObj.query.year &&
      queryObj.query.make === ''
  );
  // console.log(prevSelected);

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
        setMakeDataStrings(() => {
          const makeStrings = response.map(({ make }) => make);
          return makeStrings;
        });
      } catch (error) {
        console.error('[Make Search]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (type && year) {
      fetchData();
    }
  }, [queryObj]);

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
    // <div
    //   className={`flex max-h-[53px] min-h-[53px] px-2 ${prevSelected ? ' w-full border-[5px] border-[#BE1B1B]' : 'w-[98%] border-[1px] border-[#767676] outline-[4px] outline-transparent'} items-center overflow-hidden rounded-[8px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
    // >
    //   <div
    //     className={`flex h-full w-full ${prevSelected && 'border-[2.5px]  border-white'} items-center overflow-hidden rounded-[4px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
    //     // tabIndex={1}
    //   >
    //     <div className="ml-[10px] pr-[15px]">3</div>
    //     {isLoading ? (
    //       <div className="pl-2">
    //         <AiOutlineLoading3Quarters className="animate-spin " />
    //       </div>
    //     ) : (
    //       <select
    //         value={value}
    //         onChange={handleChange}
    //         disabled={isLoading || isDisabled}
    //         className={`w-full cursor-pointer bg-transparent  py-1 outline-none lg:py-3`}
    //       >
    //         <option value="">{`Make`}</option>
    //         {makeData.map(({ make }, index) => (
    //           <option key={`${make}-${index}`} value={make || ''}>
    //             {make}
    //           </option>
    //         ))}
    //       </select>
    //     )}
    //   </div>
    // </div>
    <MainDropdown
      place={3}
      title={'make'}
      queryObj={queryObj}
      isDisabled={isDisabled}
      value={make}
      prevSelected={prevSelected}
      items={makeDataStrings}
    />
  );
}
