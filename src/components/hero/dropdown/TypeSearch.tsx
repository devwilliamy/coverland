'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import { getAllType } from '@/lib/db';
import SeeAllChevronDown from '@/components/PDP/components/icons/SeeAllChevronDown';
import HomeChevronDown from './icons/HomeChevronDown';
import MainDropdown from './MainDropdown';
import { useParams, usePathname } from 'next/navigation';

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
    setQuery,
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
    <MainDropdown
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
