'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';
import { getAllUniqueModelsByYearMake } from '@/lib/db';
import { SubmodelDropdown } from './SubmodelDropdown';

export type ModelDropdown = {
  model: string | null;
  model_slug: string | null;
  parent_generation: string | null;
  submodel1: string | null;
  submodel2: string | null;
  submodel3: string | null;
};

export function ModelSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
}) {
  const [value, setValue] = useState('');
  const [modelData, setModelData] = useState<ModelDropdown[]>([]);
  const [filteredModelData, setFilteredModelData] = useState<ModelDropdown[]>(
    []
  );
  const [submodelData, setSubmodelData] = useState<ModelDropdown[]>([]);

  const {
    query: { type, year, make },
    setQuery,
  } = queryObj;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    const parent_generation =
      modelData.find((car) => car.model === newValue)?.parent_generation || '';
    setValue(newValue);
    setQuery((p) => ({
      ...p,
      model: newValue,
      parent_generation,
      submodel1: '',
      submodel2: '',
    }));
  };

  useEffect(() => {
    setValue('');
  }, [type, year, make]);

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
        setModelData(response);
        setFilteredModelData(uniqueModel);
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
    const submodel = modelData.filter(
      (vehicle) => vehicle.model === value && vehicle.submodel1 !== null
    );

    setSubmodelData(submodel);
  }, [value]);

  const isDisabled = !type || !year || !make;
  const showSubmodelDropdown = submodelData.length > 0;

  return (
    <>
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg lg:w-auto`}
        tabIndex={1}
      >
        <div className="ml-[10px] pr-[15px]">4</div>
        <label htmlFor="model">
          <select
            value={value}
            onChange={handleChange}
            disabled={isDisabled}
            className={`w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3`}
            aria-label="model"
          >
            <option value="">{`Model`}</option>
            {filteredModelData?.map(({ model }, index) => (
              <option key={`${model}-${index}`} value={model || ''}>
                {model}
              </option>
            ))}
          </select>
        </label>
      </div>
      {showSubmodelDropdown && (
        <SubmodelDropdown queryObj={queryObj} submodelData={submodelData} />
      )}
    </>
  );
}
