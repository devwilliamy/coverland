import { ChangeEvent } from 'react';
import HomeChevronDown from './icons/HomeChevronDown';

type MobileHomeDropdownProps = {
  handleMobileSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  title: string;
  isDisabled: boolean;
  value: string;
  place: number;
  capitalizeFirstLetter: (title: string) => string;
  selectedIndex: number;
  items: string[] | number[] | any[];
  filteredItems: string[] | number[] | any[];
};
export default function MobileHomeDropdown({
  handleMobileSelectChange,
  title,
  isDisabled,
  value,
  place,
  capitalizeFirstLetter,
  items,
  filteredItems,
  selectedIndex,
}: MobileHomeDropdownProps) {
  return (
    <>
      <select
        onChange={handleMobileSelectChange}
        id={`mobile-select-${title}`}
        disabled={isDisabled}
        value={value}
        title={capitalizeFirstLetter(title)}
        autoComplete="off"
        className={`absolute top-0 flex h-full w-full  cursor-pointer appearance-none items-center rounded-[8px] pl-[20px] outline outline-[2px] outline-offset-0 outline-transparent focus:outline-[#BE1B1B] `}
      >
        <option
          disabled
          value={''}
          className={`flex h-full w-full items-center pl-[20px]`}
        >
          {place} &nbsp;
          {capitalizeFirstLetter(title)}
        </option>
        {items && items.length > 0 && (
          <>
            {filteredItems && filteredItems?.length > 0 ? (
              <>
                {filteredItems?.map((item, i) => (
                  <option
                    key={`mobile-filtered-${title}-${i}`}
                    id={`${title}-${i}`}
                    value={item.name}
                    selected={value === item.name}
                    className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                  >
                    {item.name}
                  </option>
                ))}
              </>
            ) : (
              <>
                {items.map((item, i) => (
                  <option
                    key={`mobile-${title}-${i}`}
                    id={`${title}-${item.id}-${i}`}
                    value={item.name}
                    selected={value === item.name}
                    className={`flex py-1 pl-[20px] hover:bg-[#BE1B1B] hover:text-white ${i === selectedIndex && 'bg-[#BE1B1B] text-white'}`}
                  >
                    {item.name}
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
  );
}
