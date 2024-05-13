'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import HomeDropdown from './HomeDropdown';
import { getAllYearByType } from '@/lib/db';

type DateDropdown = { year_id: any; year: any }[] | null;
export function YearSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
}) {
  const [value, setValue] = useState('');
  const [yearData, setYearData] = useState<DateDropdown[]>([]);
  const { type, year, typeId } = queryObj.query;
  const isDisabled = !type;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
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

  const startYear = type === 'Seat Covers' ? 1949 : 1921;
  const endYear = 2025;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  const fetchDataYear = async () => {
    try {
      setIsLoading(true)
      const response = await getAllYearByType({
        type: typeId,
      });
      setYearData(response);
    } catch (error) {
      console.error('[Year Search]: ', error);
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    if (typeId) {
      fetchDataYear();
    }
  }, [typeId]);

  const prevSelected =
    queryObj && queryObj.query.year === '' && queryObj.query.type !== '';

  return (
    <HomeDropdown
      place={2}
      title={'year'}
      queryObj={queryObj}
      value={year}
      isDisabled={isDisabled}
      prevSelected={prevSelected}
      items={yearData}
      isLoading={isLoading}
    />
  );
}
{
  /* <div
  className={`flex max-h-[53px] min-h-[53px] px-2 ${prevSelected ? ' w-full border-[5px] border-[#BE1B1B]' : 'w-[98%] border-[1px] border-[#767676] outline-[4px] outline-transparent'} items-center overflow-hidden rounded-[8px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
>
  <div
    className={`flex h-full w-full ${prevSelected && 'border-[2.5px]  border-white'} items-center overflow-hidden rounded-[4px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
    tabIndex={1}
  >
    <div className="ml-[10px] pr-[15px]">2</div>
    <select
      value={value}
      onChange={(event) => handleChange(event)}
      disabled={isDisabled}
      className={`w-full cursor-pointer  bg-transparent py-1 outline-none lg:py-3`}
    >
      <option value="">Year</option>
      {years.map((year) => (
        <option key={`year-${year}`} value={year.toString()}>
          {year}
        </option>
      ))}
    </select>
  </div>
</div>; */
}
