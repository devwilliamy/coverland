'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { TQuery } from './HeroDropdown';
import {
  editVehicleGetAllMakes,
  getAllUniqueMakesByYear,
  getProductDataByPage,
} from '@/lib/db';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import MainDropdown from './MainDropdown';
import useDetermineType from '@/hooks/useDetermineType';

// export type MakeDropdown = { make: string | null; make_slug: string | null };

export function MakeSearch({
  queryObj,
}: {
  queryObj: {
    query: TQuery;
    setQuery: React.Dispatch<React.SetStateAction<TQuery>>;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setQuery,
    query: { type, year, make, model, typeId, yearId },
  } = queryObj;

  const [makeData, setMakeData] = useState<{ id: number; name: string }[]>([]);

  const { isMakePage, isModelPage, isYearPage } = useDetermineType();

  const determineDisabled = () => {
    switch (true) {
      case isMakePage:
        return !type;
      case isModelPage:
        return !type;
      case isYearPage:
        return !type;
      default:
        return !type || !year;
    }
  };

  const isDisabled = determineDisabled();
  const prevSelected = Boolean(
    queryObj &&
      queryObj.query.type &&
      queryObj.query.year &&
      queryObj.query.make === ''
  );
  // console.log(prevSelected);

  useEffect(() => {
    // Doing this to warm up the DB
    const fetchData = async () => {
      try {
        await getProductDataByPage();
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cover = type === 'Seat Covers' ? 'Leather' : 'Premium Plus'; // TODO: - Extract cover from query obj or something
        setIsLoading(true);
        const response = await getAllUniqueMakesByYear({
          typeId,
          yearId,
        });

        // console.log({ response });

        setMakeData(response);
      } catch (error) {
        console.error('[Make Search]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (type && year && typeId && yearId) {
      fetchData();
    }
  }, [queryObj]);

  useEffect(() => {
    if (isMakePage || isModelPage || isYearPage) {
      const getMakes = async () => {
        const res = await editVehicleGetAllMakes();
        const fetchedMakeData = res.map((e) => {
          return { name: e.name as string, id: e.id };
        });
        setMakeData(fetchedMakeData);
      };
      getMakes();
    }
    // console.log({ queryObj });
  }, [queryObj]);

  return (
    <MainDropdown
      place={isMakePage || isModelPage ? 1 : 2}
      title={'make'}
      queryObj={queryObj}
      isDisabled={isDisabled}
      value={make}
      prevSelected={prevSelected}
      items={makeData}
      isLoading={isLoading}
    />
  );
}
