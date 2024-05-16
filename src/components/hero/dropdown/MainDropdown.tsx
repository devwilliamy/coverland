import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import HomeChevronDown from './icons/HomeChevronDown';
import { TQuery } from './HeroDropdown';
import { Search } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useMediaQuery } from '@mantine/hooks';
import MobileHomeDropdown from './MobileHomeDropdown';
import { useParams } from 'next/navigation';
import useDetermineType from '@/hooks/useDetermineType';
import { deslugify } from '@/lib/utils';

export default function MainDropdown({
  queryObj,
  place,
  title,
  displayTitle,
  prevSelected,
  isDisabled,
  value,
  items,
  isBreadCrumb = false,
  isLoading,
}: {
  place: number;
  title: string;
  displayTitle?: string;
  isDisabled?: boolean;
  prevSelected: boolean;
  value?: string | number;
  items?: string[] | number[] | any[];
  isBreadCrumb?: boolean;
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  isLoading: boolean;
}) {
  const { setQuery } = queryObj;
  const params = Object(useParams());
  const paramKeys = Object.keys(params);
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
  const { isMakePage, isModelPage, isYearPage } = useDetermineType();

  const handleYearData = ({
    newValue,
    id,
  }: {
    newValue: string;
    id?: string;
  }) => {
    switch (true) {
      case isBreadCrumb:
        setQuery((e) => {
          return {
            ...e,
            year: newValue,
            yearId: id as string,
          };
        });
        break;

      case isMakePage:
        setQuery((e) => {
          return {
            ...e,
            make: e.make,
            makeId: e.makeId,
            year: newValue,
            yearId: id as string,
            model: '',
            modelId: '',
          };
        });
        break;

      case isModelPage:
        setQuery((e) => {
          return {
            ...e,
            year: newValue,
            yearId: id as string,
          };
        });
        break;

      case isYearPage:
        setQuery((e) => {
          return {
            ...e,
            year: newValue,
            yearId: id as string,
          };
        });
        break;

      default:
        setQuery((e) => {
          return {
            ...e,
            year: newValue as string,
            make: '',
            model: '',
            submodel1: '',
            submodel2: '',
            parent_generation: '',
            yearId: id as string,
          };
        });
        break;
    }
  };
  const handleMakeData = ({
    newValue,
    id,
  }: {
    newValue: string;
    id?: string;
  }) => {
    switch (true) {
      case isBreadCrumb:
        setQuery((e) => {
          return {
            ...e,
            make: newValue as string,
            model: '',
            year: '',
            makeId: id as string,
          };
        });
        break;

      case isMakePage:
        setQuery((e) => {
          return {
            ...e,
            make: newValue,
            makeId: id as string,
            year: '',
            yearId: '',
            model: '',
            modelId: '',
          };
        });

      case isModelPage:
        setQuery((e) => {
          return {
            ...e,
            make: newValue,
            makeId: id as string,
            year: '',
            yearId: '',
            model: '',
            modelId: '',
          };
        });
        break;
      case isYearPage:
        setQuery((e) => {
          return {
            ...e,
            make: newValue,
            makeId: id as string,
            model: '',
            modelId: '',
            year: '',
            yearId: '',
          };
        });
        break;

      default:
        setQuery((e) => {
          return {
            ...e,
            make: newValue as string,
            model: '',
            submodel1: '',
            submodel2: '',
            parent_generation: '',
            makeId: id as string,
          };
        });
    }
  };
  const handleModelData = ({
    newValue,
    id,
  }: {
    newValue: string;
    id?: string;
  }) => {
    switch (true) {
      case isBreadCrumb:
        setQuery((e) => {
          return {
            ...e,
            model: newValue,
            year: '',
            modelId: id as string,
          };
        });
        break;

      case isMakePage:
        setQuery((e) => {
          return {
            ...e,
            model: newValue,
            modelId: id as string,
          };
        });
        break;

      case isModelPage:
        setQuery((e) => {
          return {
            ...e,
            model: newValue,
            modelId: id as string,
            year: '',
            yearId: '',
            submodel1: '',
            submodel2: '',
          };
        });
        break;

      case isYearPage:
        setQuery((e) => {
          return {
            ...e,
            model: newValue,
            modelId: id as string,
            year: '',
            yearId: '',
            submodel1: '',
            submodel2: '',
          };
        });
        break;

      default:
        setQuery((e) => {
          return {
            ...e,
            model: newValue,
            submodel1: '',
            submodel2: '',
            parent_generation: '',
            modelId: id as string,
          };
        });
        break;
    }
  };

  // const handleSelect = ({newValue,id}) => {
  const handleSelect = ({
    newValue,
    id,
  }: {
    newValue: string;
    id?: string;
  }) => {
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
          typeId: id as string,
          yearId: '',
          makeId: '',
          modelId: '',
        });
        break;
      case 'year':
        handleYearData({ newValue, id });
        break;
      case 'make':
        handleMakeData({ newValue, id });
        break;
      case 'model':
        handleModelData({ newValue, id });
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
    const _items =
      filteredItems && filteredItems?.length > 0 ? filteredItems : items;
    if (selectedIndex < 0) {
      setSelectedIndex(0);
      return;
    }
    if (_items?.length && selectedIndex >= _items?.length - 1) {
      setSelectedIndex(() => _items.length - 1);
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
      if (typeof item?.name === 'string') {
        return item?.name?.toLowerCase().startsWith(inputValue.toLowerCase());
      }
      if (typeof item?.name === 'number') {
        return item?.name?.toString().startsWith(inputValue.toLowerCase());
      }
    });
    setFilteredItems(newFilteredItems);
  };

  const handleMobileSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = items?.find((item) =>
      item.name
        ? item.name.toString() === e.target.value
        : item.toString() === e.target.value
    );
    if (selectedItem) {
      handleSelect({
        newValue: selectedItem.name ? selectedItem.name : selectedItem,
        id: selectedItem.id ? selectedItem.id : '',
      });
    }
  };

  const handleOnDropdownOnBlur = () => {
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
  };

  const handleOnMouseDown = (item: string | number | any, index: number) => {
    handleSelect({
      newValue: item.name ? item.name : item,
      id: item.id ? item.id : '',
    });
    setSelectedIndex(index);
    setDropdownOpen((prevState) => !prevState);
  };

  const handleOnKeyUp = (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: string | number | any
  ) => {
    if (isFocused) {
      if (e.key === 'Enter') {
        handleSelect({
          newValue: item.name,
          id: item.id,
        });
        setDropdownOpen(false);
      }
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
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
  };

  const handleOnDropdownClicked = () => {
    if (!isDisabled) {
      setDropdownOpen(() => {
        setTimeout(() => {
          const searchCont = document.getElementById('search');
          searchCont?.focus();
        }, 0);
        return true;
      });
    }
  };

  const handleInputOnFocus = () => {
    setIsFocused(true);
    setSearchIsFocused(true);
    setDropdownOpen(true);
  };

  const handleInputOnBlur = () => {
    setIsFocused(false);
    setDropdownOpen(false);
    setSearchIsFocused(false);
    setSearch('');
  };

  const handleInputOnClick = () => {
    setDropdownOpen(true);
    setIsFocused(true);
  };

  const isSubmodel1 = title === 'submodel1';
  const isSubmodel2 = title === 'submodel2';

  const submodel1Text = isSubmodel1
    ? 'Submodel'
    : title.replace(title.charAt(0), title.charAt(0).toUpperCase());
  const submodel2Text = isSubmodel2
    ? 'Submodel 2'
    : title.replace(title.charAt(0), title.charAt(0).toUpperCase());

  const capitalizeFirstLetter = (title: string) => {
    return title.replace(title.charAt(0), title.charAt(0).toUpperCase());
  };
  return (
    <div
      className={`relative flex max-h-[48px] min-h-[48px] w-full lg:max-h-[64px] lg:min-h-[64px]  ${dropdownOpen && !isMobile ? 'rounded-t-[8px] ' : 'rounded-[8px] '} ${!isDisabled ? ' bg-white outline outline-[1px] outline-black' : 'bg-gray-300/90'}`}
    >
      {/*  ---------- Desktop Dropdown START  ----------*/}
      <>
        {!isMobile && (
          <div
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={handleOnDropdownOnBlur}
            className={`absolute top-0  flex h-full w-full cursor-pointer items-center rounded-[8px] pl-[20px] ${prevSelected && !dropdownOpen && 'outline outline-[2px] outline-offset-0 outline-[#BE1B1B] '}  `}
            onClick={handleOnDropdownClicked}
          >
            <div className={`flex w-full items-center`}>
              <p className={``}>{value === '' && place} &nbsp;</p>
              <p className="capitalize">
                {value === '' && !isSubmodel1 && !isSubmodel2
                  ? capitalizeFirstLetter(displayTitle ? displayTitle : title)
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
                        ? capitalizeFirstLetter(
                            displayTitle ? displayTitle : title
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
                    onFocus={handleInputOnFocus}
                    onBlur={handleInputOnBlur}
                    onClick={handleInputOnClick}
                    onKeyUp={(e) => {
                      const _items =
                        filteredItems && filteredItems.length > 0
                          ? filteredItems
                          : items;
                      handleOnKeyUp(e, _items?.[selectedIndex]);
                    }}
                    onKeyDown={handleOnKeyDown}
                  />
                </div>
                {isLoading ? (
                  <div className="px-[10px] py-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  </div>
                ) : items && items.length === 0 ? (
                  <div className="px-[10px] py-2">No available items</div>
                ) : (
                  <div className="relative z-[100] flex w-full flex-col justify-center">
                    <div className="home-scrollbar flex max-h-[700px] w-full flex-col overflow-y-auto overflow-x-clip">
                      {filteredItems && filteredItems.length > 0 ? (
                        <>
                          {filteredItems?.map((filteredItem, i) => (
                            <div
                              key={`filtered-${title}-${i}`}
                              id={`${title}-${i}`}
                              tabIndex={-1}
                              className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                              onMouseDown={() => {
                                handleOnMouseDown(filteredItem, i);
                              }}
                            >
                              {filteredItem?.name
                                ? filteredItem.name
                                : filteredItem}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {items?.map((item, i) => (
                            <div
                              key={`${title}-${i}`}
                              id={`${title}-${i}`}
                              tabIndex={-1}
                              className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                              onMouseDown={() => {
                                handleOnMouseDown(item, i);
                              }}
                            >
                              {item?.name ? item.name : item}{' '}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
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
        <MobileHomeDropdown
          handleMobileSelectChange={handleMobileSelectChange}
          title={displayTitle ? displayTitle : title}
          isDisabled={isDisabled as boolean}
          value={
            displayTitle === 'submodel'
              ? (value as string)
              : deslugify(value as string)
          }
          place={place}
          capitalizeFirstLetter={capitalizeFirstLetter}
          items={items as string[] | number[] | any[]}
          filteredItems={filteredItems as string[] | number[] | any[]}
          selectedIndex={selectedIndex}
        />
      )}
      {/*  ---------- Mobile Dropdown END  ----------*/}
    </div>
  );
}
