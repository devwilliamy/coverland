'use client';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TQuery } from './HeroDropdown';
import { ModelDropdown } from './ModelSearch';
import { SecondSubmodelDropdown } from './SecondSubmodelDropdown';
import HomeDropdown from './HomeDropdown';

export function SubmodelDropdown({
  queryObj,
  submodelData,
}: {
  queryObj: {
    query: TQuery;
    setQuery: Dispatch<SetStateAction<TQuery>>;
  };
  submodelData: ModelDropdown[];
}) {
  const [value, setValue] = useState('');
  const [secondSubmodelData, setSecondSubmodelData] = useState<ModelDropdown[]>(
    []
  );

  const { query, setQuery } = queryObj;
  const { model, submodel1 } = query;

  const filteredSubmodelData: (string | null)[] = Array.from(
    new Set(
      submodelData
        .filter(
          (vehicle) =>
            vehicle.model === (model as string) && vehicle.submodel1 !== null
        )
        .map((vehicle) => vehicle.submodel1)
    )
  );

  useEffect(() => {
    setValue('');
  }, [model]);

  useEffect(() => {
    // Check for second submodel
    const secondSubmodelData = submodelData.filter(
      (vehicle) => vehicle.submodel1 === submodel1 && vehicle.submodel2 !== null
    );

    setSecondSubmodelData(secondSubmodelData);
  }, [submodel1]);

  const isDisabled = !query.make || !query.year || !query.type || !query.model;
  const showSecondSubmodelDropdown = secondSubmodelData.length > 0;
  const isSeatCover = query.type === 'Seat Covers'
  const prevSelected =
    !queryObj ||
    (queryObj.query.type !== '' &&
      queryObj.query.year !== '' &&
      queryObj.query.make !== '' &&
      queryObj.query.model !== '' &&
      queryObj.query.submodel1 === '');

  return (
    <>
      {/* <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-lg outline-[#767676] md:max-h-[58px] ${isDisabled ? 'bg-gray-100/75' : 'bg-white'} px-2 text-lg outline outline-1 outline-offset-1 lg:w-auto`}
        tabIndex={1}
      >
        <div className="ml-[10px] pr-[15px]">5</div>
        <label htmlFor="submodel"></label>

        <select
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          className={`w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3`}
          aria-label="submodel"
        >
          <option value="">{`Submodel`}</option>
          {filteredSubmodelData?.sort()?.map((submodel) => (
            <option key={`model-${submodel}`} value={submodel || ''}>
              {submodel}
            </option>
          ))}
        </select>
      </div> */}
      <HomeDropdown
        place={5}
        title="submodel1"
        queryObj={queryObj}
        isDisabled={isDisabled}
        prevSelected={prevSelected}
        items={filteredSubmodelData as string[]}
        value={submodel1}
      />
      {!isSeatCover && showSecondSubmodelDropdown && (
        <SecondSubmodelDropdown
          queryObj={queryObj}
          secondSubmodelData={secondSubmodelData}
        />
      )}
    </>
  );
}
