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
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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


  const handleSelect = (newValue: string) => {
    setDropdownOpen((prevState) => !prevState);
    setSelectedValue(newValue);
    setQuery((prevState) => {
      return { ...prevState, [title]: newValue };
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
    setSelectedIndex((prevState) => {
      const newIndex = prevState + 1;
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
    setSelectedIndex((prevState) => prevState - 1);
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
        className={`absolute top-0 flex h-full w-full cursor-pointer items-center rounded-[8px] px-[5px] ${prevSelected && !dropdownOpen && 'outline outline-[5px] outline-offset-0 outline-[#BE1B1B] '}  `}
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
          isActive &&
            setDropdownOpen((e) => {
              document.getElementById('search-container');
              return !e;
            });
        }}
      >
        <div className={`flex w-full items-center`}>
          <p className={`pl-[5px] pr-[14px]`}>{place}</p>
          <p className="capitalize">{selectedValue}</p>
        </div>

        <div className="mr-[14px] flex h-[20px] w-[20px] items-center">
          <HomeChevronDown />
        </div>
      </div>
      {dropdownOpen && (
        <section
          className={`absolute top-0 z-[2] w-full cursor-pointer ${dropdownOpen && 'rounded-[8px] outline outline-[5px] outline-offset-0 outline-[#BE1B1B] '}  flex-col justify-start bg-white text-left`}
        >
          <div
            className={`flex w-full items-center px-[5px] ${prevSelected ? 'min-h-[48px] lg:h-[64px] lg:min-h-[64px] ' : 'min-h-[44px] lg:h-[58px] lg:min-h-[58px]'}  ${dropdownOpen ? 'rounded-t-[8px] ' : 'rounded-[8px] '} ${isActive ? ' bg-white' : 'bg-gray-300/90'}`}
          >
            <div className={`flex w-full items-center`}>
              <p className={`pl-[5px] pr-[14px]`}>{place}</p>
              <p className="capitalize">{selectedValue}</p>
            </div>
            <div className="mr-[14px] flex h-[20px] w-[20px] items-center">
              <HomeChevronDown />
            </div>
          </div>
          <div
            id="search-container"
            className={`flex w-full items-center gap-[6px] bg-[#D9D9D9] px-[5px] py-2`}
          >
            <Search className="text-[#9C9C9C]" />
            <input
              id="search"
              className="flex w-full bg-transparent outline-none"
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
          {items && items.length > 0 ? (
            <div
              id="dropdown-container"
              className="z-[1000] flex max-h-[700px] w-full flex-col overflow-y-auto"
              style={{

              }}
            >
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
                      className={`flex px-[10px] py-2 hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
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
            </div>
          ) : (
            <div className="px-[10px] py-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
