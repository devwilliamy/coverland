import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import HomeChevronDown from './icons/HomeChevronDown';
import { TQuery } from './HeroDropdown';
import { set, string } from 'zod';
import { MakeDropdown } from './MakeSearch';

export default function HomeDropdown({
  queryObj,
  place,
  title,
  prevSelected,
  items,
}: {
  place: number;
  title: string;
  prevSelected: boolean;
  items?: string[] | number[];
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const types = ['Car Covers', 'SUV Covers', 'Truck Covers'];
  type coverTypes = 'Car Covers' | 'SUV Covers' | 'Truck Covers';
  const { setQuery } = queryObj;

  useEffect(() => {}, [queryObj, prevSelected]);

  const handleSelect = (newType: string) => {
    setDropdownOpen((b) => !b);
    setSelectedValue(newType);
    setQuery((e) => {
      return { ...e, [title]: newType };
    });
  };

  const [selectedValue, setSelectedValue] = useState<string>(title);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleIncrease = () => {
    if (selectedIndex <= 0) {
      const dropdownEl = document.getElementById(`${title}-${0}`);
      dropdownEl?.focus();
      setSelectedIndex((e) => {
        const newIndex = e + 1;
        const dropdownEl = document.getElementById(`${title}-${newIndex}`);
        dropdownEl?.focus();
        return newIndex;
      });
      return;
    }
    if (items?.length && selectedIndex > items?.length - 1) {
      return;
    }
    setSelectedIndex((e) => {
      const newIndex = e + 1;
      const dropdownEl = document.getElementById(`${title}-${newIndex}`);
      dropdownEl?.focus();
      return newIndex;
    });
  };
  const handleDecrease = () => {
    if (selectedIndex <= 0) {
      const dropdownEl = document.getElementById(`${title}-${0}`);
      dropdownEl?.focus();
      return;
    }
    setSelectedIndex((e) => {
      const newIndex = e - 1;
      const dropdownEl = document.getElementById(`${title}-${newIndex}`);
      dropdownEl?.focus();
      return newIndex;
    });
  };
  return (
    <div
      className={`relative flex min-h-[44px] lg:h-[58px] lg:min-h-[58px] w-full  ${dropdownOpen ? 'rounded-t-[8px] ' : 'rounded-[8px]'}  bg-white`}
    >
      <div
        tabIndex={0}
        className={`absolute top-0 flex h-full w-full cursor-pointer items-center px-[5px] ${prevSelected ? 'border-[#BE1B1B] ' : 'border-[2px] border-black/0'} ${dropdownOpen ? 'rounded-t-[8px] border-b-0 border-l-[2px] border-r-[2px] border-t-[2px]' : 'rounded-[8px] border-[2px]'}`}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
          
            setDropdownOpen(true);
          }

          if (e.key === 'Escape') {
            setDropdownOpen(false);
          }
        }}
        onKeyDown={(e) => {
          e.preventDefault();
          if (e.key === 'ArrowUp') {
            handleDecrease();
          }
          if (e.key === 'ArrowDown') {
            handleIncrease();
          }
        }}
        onClick={() => {
          setDropdownOpen(true);
        }}
      >
        <div className={`flex w-full items-center`}>
          <p className={`px-[14px]`}>{place}</p>
          <p className="capitalize">{selectedValue}</p>
        </div>

        <div className="mr-[14px] flex h-[20px] w-[20px] items-center">
          <HomeChevronDown />
        </div>
      </div>
      <div
        className={`absolute top-[100%] z-[40] ${prevSelected && ' border-b-[2px] border-l-[2px] border-r-[2px] border-t-0 border-[#BE1B1B] '} ${dropdownOpen ? 'rounded-t-0 flex rounded-b-[8px]' : 'hidden'} top-0 max-h-[120px] w-full flex-col justify-start overflow-y-auto bg-white  text-left  `}
      >
        {items && (
          <>
            {items.map((type, i) => (
              <div
                key={`type-${type}`}
                id={`${title}-${i}`}
                tabIndex={-1}
                className={`z-[100] w-full  cursor-pointer px-[14px] py-[12.5px] hover:bg-[#BE1B1B]/80`}
                onClick={() => {
                  handleSelect(type as string);
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSelect(type as string);
                  }
                  if (e.key === 'Escape') {
                    setDropdownOpen(false);
                  }
                }}
                onKeyDown={(e) => {
                  e.preventDefault();
                  if (e.key === 'ArrowUp') {
                    handleDecrease();
                  }
                  if (e.key === 'ArrowDown') {
                    handleIncrease();
                  }
                }}
              >
                {type}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
