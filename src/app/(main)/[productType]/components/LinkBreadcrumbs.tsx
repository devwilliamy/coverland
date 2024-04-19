'use client';
import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { MakeSearch } from '@/components/hero/dropdown/MakeSearch';
import { ModelSearch } from '@/components/hero/dropdown/ModelSearch';
import { TypeSearch } from '@/components/hero/dropdown/TypeSearch';
import { YearSearch } from '@/components/hero/dropdown/YearSearch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TPathParams, TQueryParams } from '@/utils';
import { Button } from '@mui/material';
import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import loading from '../../loading';
import { TQuery } from '@/contexts/CarSelectionContext';
import useDetermineType from '@/hooks/useDetermineType';
import HomeDropdown from '@/components/hero/dropdown/HomeDropdown';
import { PopoverArrow } from '@radix-ui/react-popover';
import { PREMIUM_PLUS_URL_PARAM, VEHICLE_TYPES } from '@/lib/constants';
import { getAllUniqueMakesByYear } from '@/lib/db';

export default function LinkBreadcrumbs() {
  const { productType, make, model, year } = useDetermineType();
  const customParams: Map<string, string> = new Map();
  productType && customParams.set('productType', productType);
  make && customParams.set('make', make);
  model && customParams.set('model', model);
  year && customParams.set('year', year);
  // console.log('Custom Params: ', Object(customParams.entries()));

  const entries = [...customParams];

  const objectFromMap = Object.fromEntries(entries);

  console.log('Object From Map: ', objectFromMap);

  const params = Object(objectFromMap);


  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  const [paramsObj, setParamObj] = useState<TQuery>({
    type: productType as string,
    coverType: PREMIUM_PLUS_URL_PARAM,
    year: '',
    make: '',
    model: '',
    submodel: '',
    secondSubmodel: '',
    submodel1: '',
    submodel2: '',
    parent_generation: '',
  });
  useEffect(() => {
    setParamObj(() => {
      console.log('URL queryParams: ', { ...params });
      return { ...paramsObj };
    });
  }, []);

  const vehicleTypes = VEHICLE_TYPES;
  const [makeData, setMakeData] = useState({});
  const [makeDataStrings, setMakeDataStrings] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // console.log('URL Params: ', params);
  // console.log('URL queryParams: ', paramsObj);

  const getUrlFromBreadcrumbs = (index: number): string => {
    let returnString = '';
    for (let i = 0; i < index + 1; i++) {
      if (paramValues[i] === 'leather') {
        returnString = returnString + '/' + 'seat-covers';
      }
      returnString = returnString + '/' + paramValues[i];
    }
    return returnString;
  };

  const queryObj = {
    query: paramsObj as TQuery,
    setQuery: setParamObj as Dispatch<SetStateAction<TQuery>>,
  };

  const fetchData = async () => {
    try {
      // const cover = type === 'Seat Covers' ? 'Leather' : 'Premium Plus'; // TODO: - Extract cover from query obj or something
      const response = await getAllUniqueMakesByYear({
        type: paramsObj.type,
        cover: paramsObj.coverType,
        year: paramsObj.year,
      });
      setMakeData(response);
      const uniqueStrings = Array.from(
        new Set(response.map(({ make }) => make))
      );
      setMakeDataStrings(uniqueStrings as string[]);
    } catch (error) {
      console.error('[Make Search]: ', error);
    } finally {
    }
  };
  if (paramsObj.type && paramsObj.year) {
    fetchData();
  }

  return (
    <div className="mb-[14px] flex text-[12px] leading-[13px] lg:text-[14px] lg:leading-[15px]">
      {params &&
        paramKeys.map((key, selectedIndex) => {
          return (
            // <div key={String(params[key])} className="flex gap-1">
            //   <p> </p>
            //   <a
            //     href={getUrlFromBreadcrumbs(index)}
            //     className={`hover:underline ${params[key].length < 4 ? 'uppercase' : 'capitalize'} `}
            //   >
            //     Replacing hyphens with spaces (except for year_generation)
            // {params[key] && key === 'year'
            //   ? params[key]
            //   : String(params[key]).replaceAll('-', ' ')}
            //   </a>
            // {index != paramKeys.length - 1 && <p>/</p>}
            // </div>
            <div key={key} className="">
              <Popover>
                <PopoverTrigger
                  className="flex gap-0.5"
                  onClick={() => {
                    setSelectedIndex(selectedIndex);
                  }}
                >
                  <p> </p>
                  <div
                    className={` hover:underline ${params[key]?.length < 4 ? 'uppercase' : 'capitalize'} `}
                  >
                    {/* Replacing hyphens with spaces (except for year_generation) */}
                    {params[key] && key === 'year'
                      ? params[key]
                      : String(params[key]).replaceAll('-', ' ')}
                  </div>
                  {selectedIndex != paramKeys.length - 1 && <p>/</p>}
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow className="fill-[#BE1B1B]" />
                  {/* {paramKeys.map((item, i) => {
                    if (index < i) {
                      return (
                        <div>
                          {params[item]} {index} {i}
                        </div>
                      );
                    }
                    if (i === paramKeys.length - 1) {
                      return (
                        <div>
                          {params[item]} {index} {i}
                        </div>
                      );
                    }
                  })} */}
                  <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
                    {productType && selectedIndex === 0 && (
                      <HomeDropdown
                        place={1}
                        title={'type'}
                        value={paramsObj.type}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={vehicleTypes}
                      />
                    )}
                    {/* {coverType && selectedIndex < 2 && (
                      <HomeDropdown
                        place={2}
                        title={'coverType'}
                        value={paramsObj.coverType}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={coverTypes}
                      />
                    )} */}
                    {make && selectedIndex < 2 && (
                      <HomeDropdown
                        place={2}
                        title={'make'}
                        value={paramsObj.make}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={makeDataStrings}
                      />
                    )}
                    {/* {paramKeys.map((item, index) => {
                      if (selectedIndex < index) {
                        return (
                          <HomeDropdown
                            key={'inner-' + item}
                            place={index}
                            title={paramKeys[index]}
                            value={paramValues[index] as string}
                            queryObj={queryObj}
                            prevSelected={false}
                            items={vehicleTypes}
                          />
                        );
                      }
                      // if (i === paramKeys.length - 1) {
                      //   return (
                      //     <HomeDropdown
                      //       place={i}
                      //       title={paramKeys[i]}
                      //       value={paramsObj.type}
                      //       queryObj={queryObj}
                      //       prevSelected={false}
                      //       items={vehicleTypes}
                      //     />
                      //   );
                      // }
                    })} */}
                    {/* <YearSearch queryObj={queryObj} />
                    <MakeSearch queryObj={queryObj} />
                    <ModelSearch queryObj={queryObj} /> */}
                    <Button
                    // className={`mx-auto h-[40px] max-h-[44px] min-h-[44px] w-full max-w-[px] rounded-[4px] ${isDisabled ? 'bg-[black]' : 'bg-[#BE1B1B]'} text-lg `}
                    // onClick={handleSubmitDropdown}
                    // disabled={isDisabled}
                    >
                      {/* {loading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      ) : (
                        'GO'
                      )} */}
                      GO
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          );
        })}
    </div>
  );
}
