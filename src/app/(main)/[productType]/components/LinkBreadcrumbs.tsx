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
import { useParams, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import loading from '../../loading';
import { TQuery } from '@/contexts/CarSelectionContext';
import useDetermineType from '@/hooks/useDetermineType';
import HomeDropdown from '@/components/hero/dropdown/HomeDropdown';
import { PopoverArrow } from '@radix-ui/react-popover';
import { PREMIUM_PLUS_URL_PARAM, VEHICLE_TYPES } from '@/lib/constants';
import {
  getDistinctMakesByType,
  getAllUniqueMakesByYear,
  getAllYears,
  getDistinctModelsByTypeMake,
  getDistinctParentGenerations,
} from '@/lib/db';
import { deslugify } from '@/lib/utils';

export default function LinkBreadcrumbs() {
  const { productType, make, model, year } = useDetermineType();
  const customParams: Map<string, string> = new Map();

  productType && customParams.set('productType', productType);
  make && customParams.set('make', make);
  model && customParams.set('model', model);
  year && customParams.set('year', year);

  const entries = [...customParams];

  const objectFromMap = Object.fromEntries(entries);

  // console.log('Object From Map: ', objectFromMap);

  const params = Object(objectFromMap);

  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  const [paramsObj, setParamsObj] = useState<TQuery>({
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

  const router = useRouter();
  const vehicleTypes = VEHICLE_TYPES;
  const [makeDataStrings, setMakeDataStrings] = useState<string[]>();
  const [modelDataStrings, setModelDataStrings] = useState<string[]>();
  const [yearDataStrings, setYearDataStrings] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const queryObj = {
    query: paramsObj as TQuery,
    setQuery: setParamsObj as Dispatch<SetStateAction<TQuery>>,
  };

  // const initialQueryParams = { type: productType, make, model, year } as TQuery;

  useEffect(() => {
    setParamsObj((e) => {
      return {
        ...e,
        type: productType,
        make,
        model,
        year,
      } as TQuery;
    });
  }, []);

  useEffect(() => {
    const getMakes = async (incomingType: string) => {
      const desluggifiedType = deslugify(incomingType);
      const data = await getDistinctMakesByType(desluggifiedType);
      console.log('Fetched Makes: ', data);
      const makeTempArr = [];
      for (const obj of data) {
        makeTempArr.push(obj?.make);
      }
      // console.log(tempArr);

      setMakeDataStrings(makeTempArr);
      console.log(queryObj);

      return data;
    };

    const getModels = async (incomingType: string, incomingMake: string) => {
      const desluggifiedType = deslugify(incomingType);
      const desluggifiedMake = deslugify(incomingMake);
      const typeMakeObj = {
        type: desluggifiedType,
        make: desluggifiedMake,
      };
      const data = await getDistinctModelsByTypeMake(typeMakeObj);
      console.log('Fetched Model: ', {
        data,
        typeMakeObj,
      });

      const modelTempArr = [];
      for (const obj of data) {
        modelTempArr.push(obj?.model);
      }

      setModelDataStrings(modelTempArr);
      console.log('Query Obj From Model: ', queryObj);

      return data;
    };

    const getYears = async (
      incomingType: string,
      incomingMake: string,
      incomingModel: string
    ) => {
      const desluggifiedType = deslugify(incomingType);
      const desluggifiedMake = deslugify(incomingMake);
      const desluggifiedModel = deslugify(incomingModel);
      const typeMakeModelObj = {
        type: desluggifiedType,
        make: desluggifiedMake,
        model: desluggifiedModel,
      };
      const data = await getDistinctParentGenerations(typeMakeModelObj);
      console.log('Fetched Years: ', data);

      const yearTempArr = [];
      for (const obj of data) {
        yearTempArr.push(obj?.parent_generation);
      }
      setYearDataStrings(yearTempArr);
      return data;
    };

    if (paramsObj.type) {
      getMakes(paramsObj.type);
    }

    if (paramsObj.type && paramsObj.make) {
      getModels(paramsObj.type, paramsObj.make);
    }

    if (paramsObj.type && paramsObj.make && paramsObj.model) {
      getYears(paramsObj.type, paramsObj.make, paramsObj.model);
    }
  }, [paramsObj.type, paramsObj.make, paramsObj.model, params.year]);

  useEffect(() => {
    console.log('Current Params: ', paramsObj);
  }, [paramsObj]);

  const goIsDisabled = !paramsObj.make || !paramsObj.model || !paramsObj.year;

  const handleSubmitDropdown = () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <div className="mb-[14px] flex text-[12px] leading-[13px] lg:text-[14px] lg:leading-[15px]">
      {params &&
        paramKeys.map((key, selectedIndex) => {
          return (
            <div key={key} className="">
              <Popover>
                <PopoverTrigger
                  className="flex gap-0.5"
                  // onClick={() => {
                  //   setSelectedIndex(selectedIndex);
                  // }}
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

                  <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
                    {productType && selectedIndex === 0 && (
                      <HomeDropdown
                        place={1}
                        title={'type'}
                        value={paramsObj.type}
                        queryObj={queryObj}
                        prevSelected={false}
                        isBreadcrumb
                        items={vehicleTypes}
                      />
                    )}

                    {make && selectedIndex < 2 && (
                      <HomeDropdown
                        place={2}
                        title={'make'}
                        value={paramsObj.make}
                        queryObj={queryObj}
                        prevSelected={false}
                        isDisabled={!paramsObj.type}
                        isBreadcrumb
                        items={makeDataStrings}
                      />
                    )}

                    {model && selectedIndex < 3 && (
                      <HomeDropdown
                        place={3}
                        title={'model'}
                        value={paramsObj.model}
                        queryObj={queryObj}
                        prevSelected={false}
                        isDisabled={!paramsObj.make}
                        isBreadcrumb
                        items={modelDataStrings}
                      />
                    )}

                    {year && selectedIndex < 4 && (
                      <HomeDropdown
                        place={4}
                        title={'year'}
                        value={paramsObj.year}
                        queryObj={queryObj}
                        prevSelected={false}
                        isDisabled={!paramsObj.model}
                        isBreadcrumb
                        items={yearDataStrings}
                      />
                    )}

                    {/* <Button
                      className={`mx-auto h-[40px] max-h-[44px] min-h-[44px] w-full max-w-[px] rounded-[4px] ${goIsDisabled ? 'bg-[black] text-[white]/10 ' : 'bg-[#BE1B1B] text-[white] '} text-lg  `}
                      onClick={handleSubmitDropdown}
                      disabled={goIsDisabled}
                    >
                      {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      ) : (
                        'GO'
                      )}
                    </Button> */}
                    <button
                      className={`flex h-full max-h-[44px] min-h-[44px] w-full items-center justify-center rounded-lg bg-[#BE1B1B] text-lg  font-[700] text-white transition-colors duration-100 ease-in disabled:bg-[#BE1B1B]/40 `}
                      onClick={handleSubmitDropdown}
                      disabled={goIsDisabled}
                    >
                      {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      ) : (
                        'GO'
                      )}
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          );
        })}
    </div>
  );
}
