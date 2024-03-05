'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';
import { TProductJsonData } from '@/components/PDP/EditVehicleDropdown';
import { getAllUniqueModelsByYearMake } from '@/lib/db';

type ModelDropdown = { model: string | null; model_slug: string | null };

export function ModelSearch({
  queryObj,
  dropdownData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  dropdownData: TProductJsonData[];
}) {
  const [value, setValue] = useState('');
  const [modelData, setModelData] = useState<ModelDropdown[]>([]);

  const {
    query: { type, year, make },
    setQuery,
  } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    setQuery((p) => ({ ...p, model: newValue }));
  };

  useEffect(() => {
    !make && setValue('');
  }, [make]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUniqueModelsByYearMake({
          type,
          cover: 'Premium Plus', // TOOD: - Update this to make it work for premium as well.
          year,
          make,
        });
        const uniqueModel = response.filter(
          (car, index, self) =>
            index === self.findIndex((t) => t.model_slug === car.model_slug)
        );
        setModelData(uniqueModel);
      } catch (error) {
        console.error('[Model Search]: ', error);
      }
    };
    if (type && year && make) {
      fetchData();
    }
  }, [type, year, make]);

  useEffect(() => {
    // Check for submodel
    const submodel = 

  }, [value])

  const isDisabled = !type || !year || !make;

  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg lg:w-auto`}
      tabIndex={1}
    >
      <div className="ml-[10px] pr-[15px]">4</div>
      <select
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        className=" w-full bg-transparent outline-none"
      >
        <option value="">{`${value ? 'Clear' : 'Model'}`}</option>
        {modelData?.sort()?.map(({ model }, index) => (
          <option key={`${model}-${index}`} value={model || ''}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
}
