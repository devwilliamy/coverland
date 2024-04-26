import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import HomeChevronDown from './icons/HomeChevronDown';
import { TQuery } from './HeroDropdown';
import { Search } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useMediaQuery } from '@mantine/hooks';
import { useParams } from 'next/navigation';

export default function MainDropdown({
  queryObj,
  place,
  title,
  prevSelected,
  isDisabled,
  value,
  items,
  isBreadCrumb = false,
}: {
  place: number;
  title: string;
  isDisabled?: boolean;
  prevSelected: boolean;
  value?: string | number;
  items?: string[] | number[];
  isBreadCrumb?: boolean;
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const { setQuery } = queryObj;
  const params = Object(useParams());
  const paramKeys = Object.keys(params);
  // console.log(params);
  const paramValues = Object.values(params);
  const [selectedValue, setSelectedValue] = useState<string>(
    isBreadCrumb ? String(value) : ''
  );
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

  const handleSelect = (newValue: string) => {
    switch (title) {
      case 'type':
        setQuery({
          type: newValue,
          year: '',
          make: '',
          model: '',
          submodel1: '',
          submodel2: '',
          parent_generation: '',
        });
        break;
      case 'year':
        if (isBreadCrumb) {
          setQuery((e) => {
            return {
              ...e,
              year: newValue,
            };
          });
        } else {
          setQuery((e) => {
            return {
              ...e,
              year: newValue,
              make: '',
              model: '',
              submodel1: '',
              submodel2: '',
              parent_generation: '',
            };
          });
        }
        break;
      case 'make':
        if (isBreadCrumb) {
          setQuery((e) => {
            return {
              ...e,
              make: newValue,
              model: '',
              year: '',
            };
          });
        } else {
          setQuery((e) => {
            return {
              ...e,
              make: newValue,
              model: '',
              submodel1: '',
              submodel2: '',
              parent_generation: '',
            };
          });
        }
        break;
      case 'model':
        if (isBreadCrumb) {
          setQuery((e) => {
            return {
              ...e,
              model: newValue,
              year: '',
            };
          });
        } else {
          setQuery((e) => {
            return {
              ...e,
              model: newValue,
              submodel1: '',
              submodel2: '',
              parent_generation: '',
            };
          });
        }
        break;
      case 'submodel1':
        setQuery((e) => {
          return {
            ...e,
            submodel1: newValue,
            submodel2: '',
            // parent_generation: '',
          };
        });
        break;
      case 'submodel2':
        setQuery((e) => {
          return {
            ...e,
            submodel2: newValue,
            // parent_generation: '',
          };
        });
        break;
    }

    setQuery((prevState) => {
      return { ...prevState, [title]: newValue };
    });
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

  const isSubmodel1 = title === 'submodel1';
  const isSubmodel2 = title === 'submodel2';

  const submodel1Text = isSubmodel1
    ? 'Submodel'
    : title.replace(title.charAt(0), title.charAt(0).toUpperCase());
  const submodel2Text = isSubmodel2
    ? 'Submodel 2'
    : title.replace(title.charAt(0), title.charAt(0).toUpperCase());

  return (
    <div
      className={`relative flex min-h-[48px] w-full lg:h-[64px] lg:min-h-[64px]  ${dropdownOpen && !isMobile ? 'rounded-t-[8px] ' : 'rounded-[8px] '} ${!isDisabled ? ' bg-white outline outline-[1px] outline-black' : 'bg-gray-300/90'}`}
    >
      {/*  ---------- Desktop Dropdown START  ----------*/}
      <>
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
                  setIsFocused(false);
                  setDropdownOpen(false);
                  // set to true to keep dropdown open
                  // setIsFocused(true);
                  // setDropdownOpen(true);
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
              if (!isDisabled) {
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
              <p className={``}>{value === '' && place} &nbsp;</p>
              <p className="capitalize">
                {value === '' && !isSubmodel1 && !isSubmodel2
                  ? title.replace(
                      title.charAt(0),
                      title.charAt(0).toUpperCase()
                    )
                  : value}
                {value === '' && isSubmodel1 && submodel1Text}
                {value === '' && isSubmodel2 && submodel2Text}
              </p>
            </div>

            <div className="mr-[14px] flex h-[20px] w-[20px] items-center">
              <HomeChevronDown />
            </div>
          </div>
        )}
        <>
          {dropdownOpen && (
            <>
              <section
                id="dropdown-container"
                className={`absolute top-0 z-[1] w-full cursor-pointer overflow-clip ${dropdownOpen && 'rounded-[8px] outline outline-[2px] outline-offset-0 outline-[#BE1B1B] '}  flex-col justify-start bg-white text-left`}
              >
                <div
                  className={`flex w-full items-center pl-[20px] ${prevSelected ? 'min-h-[48px] lg:h-[64px] lg:min-h-[64px] ' : 'min-h-[44px] lg:h-[58px] lg:min-h-[58px]'} bg-white  ${dropdownOpen ? 'rounded-t-[8px] ' : 'rounded-[8px] '} ${isDisabled ? ' bg-white' : 'bg-gray-300/90'}`}
                >
                  <div className={`flex w-full items-center`}>
                    <p className={``}>{value === '' && place} &nbsp;</p>
                    <p className="capitalize">
                      {value === '' && !isSubmodel1 && !isSubmodel2
                        ? title.replace(
                            title.charAt(0),
                            title.charAt(0).toUpperCase()
                          )
                        : value}
                      {value === '' && isSubmodel1 && submodel1Text}
                      {value === '' && isSubmodel2 && submodel2Text}
                    </p>
                  </div>
                  <div className="mr-[14px] flex items-center">
                    <HomeChevronDown />
                  </div>
                </div>
                <div
                  id="search-container"
                  className={`flex w-full items-center gap-[6px] bg-[#D9D9D9] `}
                >
                  <Search className="pl-[5px] text-[#9C9C9C]" />
                  <input
                    autoComplete="off"
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
                      setDropdownOpen(false);
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
                  <div className="relative z-[100] flex w-full flex-col justify-center">
                    <div className="home-scrollbar flex max-h-[700px] w-full flex-col overflow-y-auto overflow-x-clip">
                      {filteredItems && filteredItems?.length > 0 ? (
                        <>
                          {filteredItems?.map((items, i) => (
                            <div
                              key={`filtered-${title}-${i}`}
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
                              {items}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {items.map((item, i) => (
                            <div
                              key={`${title}-${i}`}
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
                              {item}
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
        </>
      </>
      {/*  ---------- Desktop Dropdown END  ----------*/}

      {/*  ---------- Mobile Dropdown START ---------- */}
      {isMobile && (
        <>
          <select
            onChange={(e) => {
              handleSelect(e.target.value);
            }}
            id={`mobile-select-${title}`}
            disabled={isDisabled}
            // defaultValue={value}
            value={value}
            title={title.replace(
              title.charAt(0),
              title.charAt(0).toUpperCase()
            )}
            autoComplete="off"
            className={`absolute top-0 flex h-full w-full  cursor-pointer appearance-none items-center rounded-[8px] pl-[20px] outline outline-[2px] outline-offset-0 outline-transparent focus:outline-[#BE1B1B] `}
          >
            <option
              // selected
              disabled
              value={''}
              className={`flex h-full w-full items-center pl-[20px]`}
            >
              {place} &nbsp;
              {title.replace(title.charAt(0), title.charAt(0).toUpperCase())}
            </option>
            {items && items.length > 0 && (
              <>
                {filteredItems && filteredItems?.length > 0 ? (
                  <>
                    {filteredItems?.map((item, i) => (
                      <option
                        key={`mobile-filtered-${title}-${i}`}
                        id={`${title}-${i}`}
                        value={item}
                        selected={value === item}
                        className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                      >
                        {item}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    {items.map((item, i) => (
                      <option
                        key={`mobile-${title}-${i}`}
                        id={`${title}-${i}`}
                        value={item}
                        selected={value === item}
                        className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                      >
                        {item}
                      </option>
                    ))}
                  </>
                )}
              </>
            )}
          </select>
          <div className="absolute right-0 top-1/2 mr-[14px] flex -translate-y-1/2 items-center">
            <HomeChevronDown />
          </div>
        </>
      )}
      {/*  ---------- Mobile Dropdown END  ----------*/}
    </div>
  );
}
