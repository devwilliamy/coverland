import React, {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import HomeChevronDown from './icons/HomeChevronDown';
import { TQuery } from './HeroDropdown';
import { set, string } from 'zod';
import { MakeDropdown } from './MakeSearch';
import { Search } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useMediaQuery } from '@mantine/hooks';

export default function HomeDropdown({
  queryObj,
  place,
  title,
  prevSelected,
  isDisabled,
  items,
}: {
  place: number;
  title: string;
  isDisabled?: boolean;
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
  const isMobile = useMediaQuery('(max-width: 768px)');

  // useEffect(() => {
  //   setSelectedValue('');
  // }, [contentRef.current, queryObj, isDisabled]);

  const handleSelect = (newValue: string) => {
    // handleReset(newValue);

    switch (title.toLowerCase()) {
      case 'type':
        setQuery((e) => {
          console.log('Type Switch', e);
          return { ...e, type: newValue, year: '', make: '', model: '' };
        });

        break;
      case 'year':
        setQuery((e) => {
          console.log('Year Switch', e);
          return { ...e, year: newValue, make: '', model: '' };
        });

        break;
      case 'make':
        setQuery((e) => {
          console.log('Make Switch', e);
          return { ...e, make: newValue, model: '' };
        });

        break;
      case 'model':
        setQuery((e) => {
          console.log('Model Switch', e);
          return { ...e, model: newValue };
        });

        break;
      default:
        return;
    }
    setSelectedValue(newValue);

    // setQuery((prevState) => {
    //   return { ...prevState, [title]: newValue };
    // });
  };

  const handleIncrease = () => {
    const drpCont = document?.getElementById('content');

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

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
    const newFilteredItems = items?.filter((item) => {
      if (typeof item === 'string') {
        return item?.toLowerCase().startsWith(inputValue.toLowerCase());
      }
      if (typeof item === 'number') {
        return item.toString().startsWith(inputValue.toLowerCase());
      }
    });
    setFilteredItems(newFilteredItems);
  };

  return (
    <div
      className={`relative flex min-h-[48px] w-full lg:z-[2] lg:h-[64px] lg:min-h-[64px]  ${dropdownOpen && !isMobile ? 'rounded-t-[8px] ' : 'rounded-[8px] '} ${isActive ? ' bg-white outline outline-black outline-[1px]' : 'bg-gray-300/90'}`}
    >
      {!isMobile && (
        <div
          tabIndex={0}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setTimeout(() => {
              if (
                !document?.activeElement?.closest('#search') &&
                !document?.activeElement?.closest('#scrollbar-thumb')
              ) {
                console.log(document?.activeElement);

                setIsFocused(true);
                setDropdownOpen(true);
                // setIsFocused(false);
                // setDropdownOpen(false);
              }
            }, 40);
          }}
          className={`absolute top-0  flex h-full w-full cursor-pointer items-center rounded-[8px] pl-[20px] ${prevSelected && !dropdownOpen && 'outline outline-[2px] outline-offset-0 outline-[#BE1B1B] '}  `}
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
            if (isActive) {
              setDropdownOpen((e) => {
                setTimeout(() => {
                  const searchCont = document.getElementById('search');
                  searchCont?.focus();
                }, 0);
                return true;
              });
            }
          }}
        >
          <div className={`flex w-full items-center`}>
            <p className={``}>{selectedValue === title && place} &nbsp;</p>
            <p className="capitalize">{selectedValue}</p>
          </div>

          <div className="mr-[14px] flex h-[20px] w-[20px] items-center">
            <HomeChevronDown />
          </div>
        </div>
      )}
      {dropdownOpen && (
        <>
          <section
            id="dropdown-container"
            className={`absolute top-0 z-[10] w-full cursor-pointer overflow-clip ${dropdownOpen && 'rounded-[8px] outline outline-[2px] outline-offset-0 outline-[#BE1B1B] '}  flex-col justify-start bg-white text-left`}
          >
            <div
              className={`flex w-full items-center pl-[20px] ${prevSelected ? 'min-h-[48px] lg:h-[64px] lg:min-h-[64px] ' : 'min-h-[44px] lg:h-[58px] lg:min-h-[58px]'}  ${dropdownOpen ? 'rounded-t-[8px] ' : 'rounded-[8px] '} ${isActive ? ' bg-white' : 'bg-gray-300/90'}`}
            >
              <div className={`flex w-full items-center`}>
                <p className={``}>{selectedValue === title && place} &nbsp;</p>
                <p className="capitalize">{selectedValue}</p>
              </div>
              <div className="mr-[14px] flex h-[20px] w-[20px] items-center">
                <HomeChevronDown />
              </div>
            </div>
            <div
              id="search-container"
              className={`flex w-full items-center gap-[6px] bg-[#D9D9D9] `}
            >
              <Search className="pl-[5px] text-[#9C9C9C]" />
              <input
                id="search"
                className="flex h-full w-full bg-transparent py-2 pr-[5px] outline-none"
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchInputChange}
                onFocus={() => {
                  setIsFocused(true);
                  setSearchIsFocused(true);
                  setDropdownOpen(true);
                }}
                onBlur={() => {
                  setIsFocused(false);
                  setSearchIsFocused(false);
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
              <div className="relative z-[10] flex w-full flex-col justify-center">
                <div className="home-scrollbar flex max-h-[700px] w-full flex-col overflow-y-auto overflow-x-clip">
                  {filteredItems && filteredItems?.length > 0 ? (
                    <>
                      {filteredItems?.map((type, i) => (
                        <div
                          key={`type-${type}`}
                          id={`${title}-${i}`}
                          tabIndex={-1}
                          className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                          onMouseDown={() => {
                            setDropdownOpen((prevState) => !prevState);
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
                          className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                          onMouseDown={() => {
                            setDropdownOpen((prevState) => !prevState);
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
              </div>
            ) : (
              <div className="px-[10px] py-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            )}
          </section>
          <div className="absolute right-0 top-0 mr-[14px] flex h-[20px] w-[20px] items-center">
            <HomeChevronDown />
          </div>
        </>
      )}
      {isMobile && (
        <>
          <select
            onChange={(e) => {
              handleSelect(e.target.value);
            }}
            onFocus={(e) => {
              e.target.setAttribute('data-open', '');
              e.target.style.minHeight = '500';
            }}
            // onClick={(e) => {
            //   e.currentTarget.focus();
            // }}
            id={`mobile-select-${title}`}
            disabled={isDisabled}
            defaultValue={''}
            className={`absolute top-0 flex h-full w-full  cursor-pointer appearance-none items-center rounded-[8px] pl-[20px] outline outline-[2px] outline-offset-0 outline-transparent focus:outline-[#BE1B1B] `}
          >
            <option
              // selected
              disabled
              value={''}
              className={`flex h-full w-full items-center pl-[20px]`}
            >
              <p className={``}>{place} &nbsp;</p>
              
              <p className="capitalize">
                {title.replace(title.charAt(0), title.charAt(0).toUpperCase())}
              </p>
            </option>
            {items && items.length > 0 ? (
              <>
                {filteredItems && filteredItems?.length > 0 ? (
                  <>
                    {filteredItems?.map((type, i) => (
                      <option
                        key={`type-${type}`}
                        id={`${title}-${i}`}
                        value={type}
                        className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                      >
                        {type}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {items.map((type, i) => (
                      <option
                        key={`type-${type}`}
                        id={`${title}-${i}`}
                        value={type}
                        className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                      >
                        {type}
                      </option>
                    ))}
                  </>
                )}
              </>
            ) : (
              <div className="px-[10px] py-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            )}
          </select>
          <div className="absolute right-0 top-1/2 mr-[14px] flex min-h-[20px] min-w-[20px] -translate-y-1/2 items-center">
            <HomeChevronDown />
          </div>
          {/* <div
            id="dropdown-container"
            onClick={() => {
              document
                .getElementById(`mobile-select-${title}`)
                ?.setAttribute('data-open', '');
              document.getElementById(`mobile-select-${title}`)?.focus();
              // document
              //   .getElementById(`mobile-select-${title}`)
              //   ?.removeAttribute('data-open');
            }}
            className={`absolute top-0 z-[2] flex h-full w-full cursor-pointer  items-center rounded-[8px] bg-white pl-[20px] outline outline-[2px] outline-offset-0 outline-transparent focus:outline-[#BE1B1B] `}
          >
            <p>{place}</p>
            &nbsp;
            <p>
              {selectedValue.replace(
                selectedValue.charAt(0),
                selectedValue.charAt(0).toUpperCase()
              )}
            </p>
          </div> */}
        </>
      )}
    </div>
  );
}
