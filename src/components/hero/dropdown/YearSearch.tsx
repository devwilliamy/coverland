'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import { getAllYearByType } from '@/lib/db';
import MainDropdown from './MainDropdown';

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
  const { setQuery } = queryObj;

  useEffect(() => {
    setValue('');
  }, [type]);

  const startYear = type === 'Seat Covers' ? 1949 : 1921;
  const endYear = 2025;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  const fetchDataYear = async () => {
    try {
      const response = await getAllYearByType({
        type: typeId,
      });
      setYearData(response);
    } catch (error) {
      console.error('[Year Search]: ', error);
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
    <MainDropdown
      place={2}
      title={'year'}
      queryObj={queryObj}
      value={year}
      isDisabled={isDisabled}
      prevSelected={prevSelected}
      items={yearData}
    />
  );
}
