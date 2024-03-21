import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import HomeChevronDown from './icons/HomeChevronDown';
import { TQuery } from './HeroDropdown';
import { set, string } from 'zod';
import { MakeDropdown } from './MakeSearch';
import { Search } from 'lucide-react';

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
  const { setQuery } = queryObj;

  const [selectedValue, setSelectedValue] = useState<string>(title);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const [searchValue, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<
    (string | number)[] | undefined
  >([]);

  const isActive = prevSelected || selectedValue !== title;

  useEffect(() => {}, [queryObj, prevSelected, items, searchValue]);

  const handleSelect = (newType: string) => {
    setDropdownOpen((e) => !e);
    setSelectedValue(newType);
    setQuery((e) => {
      return { ...e, [title]: newType };
    });
  };

  const handleIncrease = () => {
    const drpCont = document?.getElementById('dropdown-container');

    if (selectedIndex < 0) {
      setSelectedIndex(0);
      return;
    }
    if (items?.length && selectedIndex >= items?.length - 1) {
      setSelectedIndex(() => items.length - 1);
      return;
    }
    setSelectedIndex((e) => {
      const newIndex = e + 1;
      const selectedElement = document?.getElementById(`${title}-${newIndex}`);
      drpCont?.scrollTo({
        top: selectedElement?.offsetTop,
        behavior: 'instant',
      });
      return newIndex;
    });
  };

  const handleDecrease = () => {
    if (selectedIndex <= 0) {
      setSelectedIndex(0);
      return;
    }
    setSelectedIndex((e) => e - 1);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
    const newFilteredItems = items?.filter((item) => {
      if (typeof item === 'string') {
        return item?.toLowerCase().includes(inputValue.toLowerCase());
      }
      if (typeof item === 'number') {
        return item.toString().includes(inputValue.toLowerCase());
      }
    });
    setFilteredItems(newFilteredItems);
  };

  return (
    <div
      className={`relative flex w-full ${prevSelected ? 'min-h-[48px] lg:h-[64px] lg:min-h-[64px] ' : 'min-h-[44px] lg:h-[58px] lg:min-h-[58px]'}  ${dropdownOpen ? 'rounded-t-[8px] ' : 'rounded-[8px] '} ${isActive ? ' bg-white' : 'bg-gray-300/90'}`}
    >
      <div
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setTimeout(() => {
            if (!document?.activeElement?.closest('#search')) {
              setIsFocused(false);
              setDropdownOpen(false);
            }
          }, 40);
        }}
        className={`absolute top-0 flex h-full w-full cursor-pointer items-center rounded-[8px] px-[5px] ${prevSelected && !dropdownOpen ? 'outline outline-[2px] outline-offset-0 outline-[#BE1B1B] ' : 'outline outline-[2px] outline-offset-0 outline-transparent'} ${dropdownOpen && 'rounded-b-none border-b-[0px] border-l-[2px] border-r-[2px] border-t-[2px] border-[#BE1B1B] outline-none'} `}
        onKeyUp={(e) => {
          if (isFocused) {
            if (e.key === 'Enter') {
              handleSelect(items?.[selectedIndex] as string);
            }
            if (e.key === 'Escape') {
              setDropdownOpen(false);
            }
          }
        }}
        onKeyDown={(e) => {
          if (isFocused) {
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              handleDecrease();
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              handleIncrease();
            }
          }
        }}
        onClick={() => {
          isActive && setDropdownOpen((e) => !e);
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
      {dropdownOpen && (
        <section
          id="dropdown-container"
          className={`absolute top-[100%] z-[2]  max-h-[120px] w-full cursor-pointer ${dropdownOpen && 'border-[2px] border-[#BE1B1B]'} ${dropdownOpen && 'rounded-b-[10px] rounded-t-none border-b-[2px] border-l-[2px] border-r-[2px] border-t-[0px] border-[#BE1B1B] outline-none'} flex-col justify-start overflow-y-auto bg-white text-left `}
        >
          {items && (
            <>
              <div
                className={`flex w-full ${searchIsFocused && 'border-[1px] border-[#BE1B1B]'} items-center gap-[6px] px-[5px] py-2`}
              >
                <Search className="text-[#9C9C9C]" />
                <input
                  id="search"
                  className="flex w-full outline-none"
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleInputChange}
                  onFocus={() => {
                    setIsFocused(true);
                    setSearchIsFocused(true);
                    setDropdownOpen(true);
                  }}
                  onBlur={() => {
                    setIsFocused(false);
                    setSearchIsFocused(false);
                    setDropdownOpen(false);
                    setSearch('');
                  }}
                  onClick={() => {
                    setDropdownOpen(true);
                    setIsFocused(true);
                  }}
                  onKeyUp={(e) => {
                    if (isFocused) {
                      if (e.key === 'Enter') {
                        handleSelect(items?.[selectedIndex] as string);
                        setSearch('');
                      }
                      if (e.key === 'Escape') {
                        setDropdownOpen(false);
                        setSearch('');
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    if (isFocused) {
                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        handleDecrease();
                      }
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        handleIncrease();
                      }
                    }
                  }}
                />
              </div>
              {filteredItems && filteredItems?.length > 0 ? (
                <>
                  {filteredItems?.map((type, i) => (
                    <div
                      key={`type-${type}`}
                      id={`${title}-${i}`}
                      tabIndex={-1}
                      className={`flex px-[5px] py-2 hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                      onMouseDown={() => {
                        handleSelect(filteredItems?.[i] as string);
                      }}
                      onKeyUp={(e) => {
                        if (isFocused) {
                          if (e.key === 'Enter') {
                            handleSelect(filteredItems?.[i] as string);
                          }
                          if (e.key === 'Escape') {
                            setDropdownOpen(false);
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        // e.preventDefault();
                        if (isFocused) {
                          if (e.key === 'ArrowUp') {
                            handleDecrease();
                          }
                          if (e.key === 'ArrowDown') {
                            handleIncrease();
                          }
                        }
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {items.map((type, i) => (
                    <div
                      key={`type-${type}`}
                      id={`${title}-${i}`}
                      tabIndex={-1}
                      className={`flex px-[5px] py-2 hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                      onMouseDown={() => {
                        handleSelect(items?.[i] as string);
                      }}
                      onKeyUp={(e) => {
                        if (isFocused) {
                          if (e.key === 'Enter') {
                            handleSelect(items?.[i] as string);
                          }
                          if (e.key === 'Escape') {
                            setDropdownOpen(false);
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        // e.preventDefault();
                        if (isFocused) {
                          if (e.key === 'ArrowUp') {
                            handleDecrease();
                          }
                          if (e.key === 'ArrowDown') {
                            handleIncrease();
                          }
                        }
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}
