'use client';;
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

//const vehicleTypes = ['Car Covers', 'SUV Covers', 'Truck Covers'];

// const vehicleTypes = [
//   { id: 1, name: 'Car Covers' },
//   { id: 2, name: 'SUV Covers' },
//   { id: 3, name: 'Truck Covers' },
// ];

// const seatCoverTypes = { id: 4, name: 'Seat Covers' };
export function TypeSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  // const handleSelect = (newType: string) => {
  //   setDropdownOpen((b) => !b);
  //   setSelectedValue(newType);
  //   setQuery({
  //     type: newType,
  //     year: '',
  //     make: '',
  //     model: '',
  //     submodel1: '',
  //     submodel2: '',
  //     parent_generation: '',
  //     typeId: '',
  //   });
  // };
  // const pathname = usePathname();
  // const [selectedValue, setSelectedValue] = useState<string>('Type');
  const [typeData, setTypeData] = useState<TypeDropdown[]>([]);
  // const coverTypes = pathname.startsWith('/seat-covers')
  //   ? seatCoverTypes
  //   : vehicleTypes;

  const {
    query: { type },
    setQuery,
  } = queryObj;
  const prevSelected = queryObj?.query.type === '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllType();
        setTypeData(response);
      } catch (error) {
        console.error('[Type Search]: ', error);
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
    />
  );
}
