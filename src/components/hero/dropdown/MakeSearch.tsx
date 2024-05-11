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
    query: { type, year, make, typeId, yearId },
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
        const cover = type === 'Seat Covers' ? 'Leather' : 'Premium Plus'; // TODO: - Extract cover from query obj or something
        setIsLoading(true);
        const response = await getAllUniqueMakesByYear({
          type,
          cover, // TOOD: - Update this to make it work for premium as well.
          year,
          typeId,
          yearId,
        });

        setMakeData(response);
        // const uniqueStrings = Array.from(new Set(response.map(({ name,id }, index) => name)))
        // setMakeDataStrings(uniqueStrings as string[]);
      } catch (error) {
        console.error('[Make Search]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (type && year && typeId && yearId) {
      fetchData();
    }
  }, [queryObj]);

  return (
    <MainDropdown
      place={3}
      title={'make'}
      queryObj={queryObj}
      isDisabled={isDisabled}
      value={make}
      prevSelected={prevSelected}
      items={makeData}
    />
  );
}
