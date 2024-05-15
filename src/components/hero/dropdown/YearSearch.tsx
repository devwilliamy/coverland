'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import {
  getAllSubmodelsByTypeMakeModelYear,
  getAllYearByType,
  getAllYearsByTypeMakeModel,
} from '@/lib/db';
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
  const [allSubmodelData, setAllSubmodelData] = useState<any[]>([]);
  const [submodel1Data, setSubmodel1Data] = useState<any[]>([]);
  const [submodel2Data, setSubmodel2Data] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isMakePage, isModelPage } = useDetermineType();
  const {
    type,
    year,
    submodel1,
    submodel2,
    typeId,
    make,
    makeId,
    model,
    modelId,
    yearId,
  } = queryObj.query;
  const { setQuery } = queryObj;

  const determineDisabled = () => {
    switch (true) {
      case isMakePage:
        return Boolean(!type && !make && !model);
      case isModelPage:
        return Boolean(!type && !make && !model);
      default:
        return Boolean(!type);
    }
  };

  const isDisabled = determineDisabled();
  const isSubmodel1Disabled = Boolean(!type && !make && !model && !year);

  const determinePrevSelected = () => {
    switch (true) {
      case isMakePage:
        return Boolean(type && make && model && !year);
      case isModelPage:
        return Boolean(type && make && model && !year);
      default:
        return Boolean(type && !year);
    }
  };

  const prevSelected = determinePrevSelected();

  const startYear = type === 'Seat Covers' ? 1949 : 1921;
  const endYear = 2025;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  const fetchDataYear = async () => {
    try {
      setIsLoading(true);
      const response = await getAllYearByType({
        type: typeId,
      });

      setYearData(response);
    } catch (error) {
      console.error('[Year Search]: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getYearsAndSubmodels = async () => {
    const fetchedYearsandSubmodels = await getAllYearsByTypeMakeModel(
      Number(typeId),
      Number(makeId),
      Number(modelId)
    );

    const filteredYears = fetchedYearsandSubmodels.uniqueYears
      .map((yearObj) => {
        return { id: yearObj?.id, name: yearObj?.name };
      })
      .sort((a, b) => {
        if (a.id && b.id) {
          return b.id - a.id;
        }
        return 0;
      });
    // console.log({
    //   filteredYears,
    //   submodelData: fetchedYearsandSubmodels.submodelData,
    // });

    setYearData(filteredYears);
  };

  const getUniqueSubmodelData = async () => {
    const data = await getAllSubmodelsByTypeMakeModelYear(
      Number(typeId),
      Number(makeId),
      Number(modelId),
      Number(yearId)
    );
    console.log(data);
    setAllSubmodelData(data.allProductData);
    if (data.uniqueSubmodel1s) {
      setSubmodel1Data(data.uniqueSubmodel1s);
    }
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

  const submodel1DataExists = submodel1Data.length > 0;
  const submodel2DataExists = submodel2Data.length > 0;

  useEffect(() => {
    if (submodel1) {
      const selectedSubmodel2 = allSubmodelData
        .filter((product) => {
          if (product.submodel1 === submodel1) {
            return product;
          }
        })
        .map((product) => {
          if (!product.submodel2) {
            return;
          }
          return product.submodel2;
        })
        .filter((name) => {
          if (Boolean(name !== undefined && name !== null)) {
            return name;
          }
        });
      console.log('[SELECTED SUBMODEL2 ARRAY]: ', selectedSubmodel2);

      setSubmodel2Data(selectedSubmodel2);
    }
  }, [year, submodel1, allSubmodelData]);

  useEffect(() => {
    if ((isMakePage || isModelPage) && year) {
      getUniqueSubmodelData();
    }
  }, [year]);

  return (
    <>
      <MainDropdown
        place={isMakePage || isModelPage ? 3 : 2}
        title={'year'}
        queryObj={queryObj}
        value={year}
        isDisabled={isDisabled}
        // prevSelected={!isDisabled}
        prevSelected={prevSelected}
        items={yearData}
        isLoading={isLoading}
      />
      {(isMakePage || isModelPage) && submodel1DataExists && year && (
        // <SubmodelDropdown queryObj={queryObj} submodelData={submodelData} />
        <MainDropdown
          place={4}
          title={'submodel1'}
          displayTitle={'submodel'}
          queryObj={queryObj}
          value={submodel1}
          isDisabled={isDisabled}
          // prevSelected={!isDisabled}
          prevSelected={prevSelected}
          items={submodel1Data}
          isLoading={isLoading}
        />
      )}
      {(isMakePage || isModelPage) && submodel2DataExists && submodel1 && (
        // <SubmodelDropdown queryObj={queryObj} submodelData={submodelData} />
        <MainDropdown
          place={5}
          title={'submodel2'}
          displayTitle={'submodel'}
          queryObj={queryObj}
          value={submodel2}
          isDisabled={isDisabled}
          // prevSelected={!isDisabled}
          prevSelected={prevSelected}
          items={submodel2Data}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
