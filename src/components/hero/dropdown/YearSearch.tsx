'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import { getAllYearByType, getAllYearsByTypeMakeModel } from '@/lib/db';
import MainDropdown from './MainDropdown';
import useDetermineType from '@/hooks/useDetermineType';
import { SubmodelDropdown } from './SubmodelDropdown';

type DateDropdown = { year_id: any; year: any }[] | null;
export function YearSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
}) {
  const [yearData, setYearData] = useState<DateDropdown[]>([]);
  const { type, year, typeId, make, makeId, model, modelId } = queryObj.query;
  const { isMakePage, isModelPage } = useDetermineType();
  const determineDisabled = () => {
    switch (true) {
      case isMakePage:
        return !type || !make;
      case isModelPage:
        return !type || !make || !model;
      default:
        return !type;
    }
  };

  const isDisabled = determineDisabled();
  const { setQuery } = queryObj;

  const startYear = type === 'Seat Covers' ? 1949 : 1921;
  const endYear = 2025;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  const fetchDataYear = async () => {
    try {
      const response = await getAllYearByType({
        type: typeId,
      });
      setYearData(response);
    } catch (error) {
      console.error('[Year Search]: ', error);
    }
  };

  const getYearsAndSubmodels = async () => {
    const fetchedYearsandSubmodels = await getAllYearsByTypeMakeModel(
      Number(typeId),
      Number(makeId),
      Number(modelId)
    );

    const filteredYears = fetchedYearsandSubmodels.uniqueYears.map(
      (yearObj) => {
        return { id: yearObj?.id, name: yearObj?.name };
      }
    );
    console.log({ filteredYears });

    setYearData(filteredYears);
  };

  useEffect(() => {
    if (typeId) {
      fetchDataYear();
    }
  }, [typeId]);

  useEffect(() => {
    if (typeId && makeId && modelId && (isMakePage || isModelPage)) {
      getYearsAndSubmodels();
    }
  }, [typeId, makeId, modelId]);

  // const prevSelected =
  //   queryObj && queryObj.query.year === '' && queryObj.query.type !== '';

  return (
    <>
      <MainDropdown
        place={2}
        title={'year'}
        queryObj={queryObj}
        value={year}
        isDisabled={isDisabled}
        prevSelected={!isDisabled}
        items={yearData}
      />
      {/* {isMakePage ||
        (isModelPage && showSubmodelDropdown && (
          <SubmodelDropdown queryObj={queryObj} submodelData={submodelData} />
        ))} */}
    </>
  );
}
