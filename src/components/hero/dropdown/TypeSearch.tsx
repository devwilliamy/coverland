'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { TQuery } from './HeroDropdown';
import SeeAllChevronDown from '@/components/PDP/components/icons/SeeAllChevronDown';
import HomeChevronDown from './icons/HomeChevronDown';
import HomeDropdown from './HomeDropdown';

export function TypeSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const handleSelect = (newType: string) => {
    setDropdownOpen((b) => !b);
    setSelectedValue(newType);
    setQuery({
      type: newType,
      year: '',
      make: '',
      model: '',
      submodel1: '',
      submodel2: '',
      parent_generation: '',
    });
  };
  const [selectedValue, setSelectedValue] = useState<string>('Type');
  const coverTypes = ['Car Covers', 'SUV Covers', 'Truck Covers'];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    query: { type, year, make, model },
    setQuery,
  } = queryObj;
  const prevSelected = queryObj?.query.type === '';

  // return (
  //   <div
  //     className={`flex max-h-[53px] min-h-[53px] px-2 ${prevSelected ? ' w-full border-[5px] border-[#BE1B1B]' : 'w-[98%] border-[1px] border-[#767676] outline-[4px] outline-transparent'} items-center overflow-hidden rounded-[8px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
  //     tabIndex={1}
  //   >
  //     <div
  //       className={`flex h-full w-full ${prevSelected && 'border-[2.5px]  border-white'} items-center overflow-hidden rounded-[4px] bg-white  text-lg  md:max-h-[58px] lg:w-auto`}
  //       // tabIndex={1}
  //     >
  //       <div className=" ml-[10px] pr-[15px]">1</div>
  //       <select
  //         value={value}
  //         onChange={handleChange}
  //         className="h-full w-full cursor-pointer bg-transparent  outline-none lg:py-3"
  //       >
  //         <option value="">Type</option>
  //         {types.map((type, i) => (
  //           <option key={`type-${type}-${i}`} value={type}>
  //             {type}
  //           </option>
  //         ))}
  //       </select>
  //     </div>
  //   </div>
  // );
  return (
    <HomeDropdown
      place={1}
      title={'type'}
      queryObj={queryObj}
      prevSelected={prevSelected}
      items={coverTypes}
    />
  );
}
