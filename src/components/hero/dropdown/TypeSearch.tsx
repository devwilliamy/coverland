'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import HomeDropdown from './HomeDropdown';
import { getAllType } from '@/lib/db';

type TypeDropdown = {
  id: string | number;
  name: string | null;
};

export function TypeSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const [typeData, setTypeData] = useState<TypeDropdown[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    query: { type },
  } = queryObj;
  const prevSelected = queryObj?.query.type === '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllType();
        setTypeData(response);
      } catch (error) {
        console.error('[Type Search]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <HomeDropdown
      place={1}
      title={'type'}
      value={type}
      queryObj={queryObj}
      prevSelected={prevSelected}
      items={typeData}
      isLoading={isLoading}
    />
  );
}
