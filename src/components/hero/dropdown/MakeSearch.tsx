'use client';

import { useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import { getAllUniqueMakesByYear, getProductDataByPage } from '@/lib/db';
import HomeDropdown from './HomeDropdown';

export type MakeDropdown = { make: string | null; make_slug: string | null };

export function MakeSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    query: { type, year, make, typeId, yearId },
  } = queryObj;
  const [makeData, setMakeData] = useState<MakeDropdown[]>([]);
  const isDisabled = !type || !year;
  const prevSelected = Boolean(
    queryObj &&
      queryObj.query.type &&
      queryObj.query.year &&
      queryObj.query.make === ''
  );

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
    const fetchData = async () => {
      try {
        const cover = type === 'Seat Covers' ? 'Leather' : 'Premium Plus';
        setIsLoading(true);
        const response = await getAllUniqueMakesByYear({
          type,
          cover,
          year,
          typeId,
          yearId,
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
  }, [queryObj]);

  return (
    <HomeDropdown
      place={3}
      title={'make'}
      queryObj={queryObj}
      isDisabled={isDisabled}
      value={make}
      prevSelected={prevSelected}
      items={makeData}
      isLoading={isLoading}
    />
  );
}
