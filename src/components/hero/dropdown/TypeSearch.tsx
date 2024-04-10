'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './HeroDropdown';
import SeeAllChevronDown from '@/components/PDP/components/icons/SeeAllChevronDown';
import HomeChevronDown from './icons/HomeChevronDown';
import HomeDropdown from './HomeDropdown';
import { useParams, usePathname } from 'next/navigation';

const vehicleTypes = ['Car Covers', 'SUV Covers', 'Truck Covers'];
const seatCoverTypes = ['Seat Covers'];
export function TypeSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const pathname = usePathname();
  const coverTypes = pathname.startsWith('/seat-covers')
    ? seatCoverTypes
    : vehicleTypes;

  const {
    query: { type },
    setQuery,
  } = queryObj;
  const prevSelected = queryObj?.query.type === '';

  return (
    <HomeDropdown
      place={1}
      title={'type'}
      value={type}
      queryObj={queryObj}
      prevSelected={prevSelected}
      items={coverTypes}
    />
  );
}
