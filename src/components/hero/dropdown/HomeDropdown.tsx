import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import HomeChevronDown from './icons/HomeChevronDown';
import { TQuery } from './HeroDropdown';
import { string } from 'zod';
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
  items?: string[] | number[] | MakeDropdown[];
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const types = ['Car Covers', 'SUV Covers', 'Truck Covers'];
  type coverTypes = 'Car Covers' | 'SUV Covers' | 'Truck Covers';
  const { setQuery } = queryObj;

  useEffect(() => {}, [queryObj, prevSelected]);

  const handleSelect = (newType: string, index: number) => {
    setDropdownOpen((b) => !b);
    setSelectedValue(newType);
    setSelectedIndex(index);
    setQuery((e) => {
      console.log(Object(e));
      return { ...e, [title]: newType };
    });
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string>(title);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div
      className={`relative flex min-h-[44px]  w-full ${prevSelected ? ' w-full border-[5px] border-[#BE1B1B]' : 'border-[1px] border-[#767676] outline-[4px] outline-transparent'} ${dropdownOpen ? 'rounded-t-[8px] ' : 'rounded-[8px]'}  bg-white`}
    >
      <div
        tabIndex={0}
        className={`absolute top-0  flex h-full w-full cursor-pointer items-center ${dropdownOpen ? 'rounded-t-[4px] ' : 'rounded-[4px]'}`}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            setDropdownOpen(true);
          }
          if (e.key === 'ArrowUp') {
            setSelectedIndex((e) => {
              if (items && e < items.length - 1) {
                return e + 1;
              }
              return e;
            });
          }
          if (e.key === 'ArrowDown') {
            setSelectedIndex((e) => {
              if (e > 0) {
                return e - 1;
              }
              return e;
            });
          }
          if (e.key === 'Escape') {
            setDropdownOpen(false);
          }
        }}
        onClick={() => {
          setDropdownOpen(true);
        }}
        onMouseDown={(e) => {
          console.log(e.screenX, e.screenY);
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
        className={`absolute top-[100%] z-[40] ${dropdownOpen === true ? 'flex' : 'hidden'} top-0 h-[100px]  w-full flex-col justify-start overflow-y-auto rounded-[4px] border-b-[5px] border-l-[5px] border-r-[5px]  border-[#BE1B1B] bg-white  text-left  `}
      >
        {items ? (
          <>
            {items.map((type, i) => (
              <div
                key={`type-${type}`}
                tabIndex={0}
                onKeyUp={(e) => {
                  if (e.key === 'Escape') {
                    setDropdownOpen(false);
                  }
                }}
                autoFocus={i === 0}
                className="z-[100] w-full cursor-pointer px-[14px] py-[12.5px] hover:bg-[#BE1B1B]/80"
                onClick={() => {
                  handleSelect(type as coverTypes, i);
                }}
              >
                {}
              </div>
            ))}
          </>
        ) : (
          <>
            {types.map((type, i) => (
              <div
                key={`type-${type}`}
                tabIndex={0}
                onKeyUp={(e) => {
                  if (e.key === 'Escape') {
                    setDropdownOpen(false);
                  }
                }}
                className="z-[100] w-full cursor-pointer px-[14px] py-[12.5px] hover:bg-[#BE1B1B]/80"
                onClick={() => {
                  handleSelect(type as coverTypes);
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
