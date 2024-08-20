'use client';
import { useEffect, useState } from 'react';
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
  const [yearData, setYearData] = useState<DateDropdown[]>([]);
  const { type, year, typeId } = queryObj.query;
  const isDisabled = !type;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDataYear = async () => {
    try {
      setIsLoading(true);
      const response = await getAllYearByType({
        type: typeId,
      });
      setYearData(response);
    } catch (error) {
      console.error('[Year Search]: ', error);
    } finally {
      setIsLoading(false);
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
