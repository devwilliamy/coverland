'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useParams } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TQuery } from '@/components/hero/dropdown/HeroDropdown';
import useDetermineType from '@/hooks/useDetermineType';
import HomeDropdown from '@/components/hero/dropdown/HomeDropdown';
import { PopoverArrow } from '@radix-ui/react-popover';
import { VEHICLE_TYPES } from '@/lib/constants';
import {
  getDistinctMakesByType,
  getDistinctModelsByTypeMake,
  getDistinctYearGenerationFromTypeMakeModelYear,
  getDistinctYearsByTypeMakeModel,
} from '@/lib/db';
import { deslugify, slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LinkBreadcrumbs() {
  const { productType, make, model, year } = useDetermineType();
  const params = Object(useParams());
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  const [paramsObj, setParamObj] = useState<TQuery>({
    type: deslugify(productType as string),
    year: year ? year : '',
    make: make ? deslugify(make) : '',
    model: model ? deslugify(model) : '',
    submodel1: '',
    submodel2: '',
    parent_generation: '',
  });
  const [makeData, setMakeData] = useState<string[]>([]);
  const [modelData, setModelData] = useState<string[]>([]);
  const [yearData, setYearData] = useState<string[]>([]);
  const vehicleTypes = VEHICLE_TYPES;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const router = useRouter();

  // Fetching makes
  useEffect(() => {
    const getMakes = async () => {
      if (paramsObj.type) {
        const makes = await getDistinctMakesByType(paramsObj.type);
        setMakeData(makes);
        // console.log('Fetched Makes', makes);
      }
    };
    const getModels = async () => {
      console.log(paramsObj);

      if (paramsObj.type && paramsObj.make) {
        const models = await getDistinctModelsByTypeMake(
          paramsObj.type,
          paramsObj.make
        );
        // console.log('Fetched Models', models);

        setModelData(models);
      }
    };
    const getYears = async () => {
      console.log(paramsObj);

      if (paramsObj.type && paramsObj.make) {
        const years = await getDistinctYearsByTypeMakeModel(
          paramsObj.type,
          paramsObj.make,
          paramsObj.model
        );
        // console.log('Fetched Years', years);

        setYearData(years);
      }
    };
    if (paramsObj.type) {
      getMakes();
    }
    if (paramsObj.type && paramsObj.make) {
      getModels();
    }
    if (paramsObj.type && paramsObj.make && paramsObj.model) {
      getYears();
    }
    const disabled =
      !paramsObj.type || !paramsObj.make || !paramsObj.model || !paramsObj.year;
    setIsDisabled(disabled);
  }, [paramsObj.type, paramsObj.make, paramsObj.model, paramsObj.year]);

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

  const handleSubmitDropdown = async () => {
    if (
      !paramsObj.type ||
      !paramsObj.make ||
      !paramsObj.model ||
      !paramsObj.year
      // (!paramsObj.submodel1 && !paramsObj.submodel2)
    )
      return;
    setIsLoading(true);
    const yearGen = await getDistinctYearGenerationFromTypeMakeModelYear(
      paramsObj.type,
      paramsObj.make,
      paramsObj.model,
      paramsObj.year
    );
    let url = `/${slugify(paramsObj.type)}/${'premium-plus'}/${slugify(paramsObj.make)}/${slugify(paramsObj.model)}/${yearGen[0]}`;

    // let actualYearGen = yearGen[0];
    // console.log({ yearGen, actualYearGen, url,  });

    router.push(url);
    setIsLoading(false);
  };

  return (
    <div className="mb-[14px] flex text-[12px] leading-[13px] lg:text-[14px] lg:leading-[15px]">
      {params &&
        paramKeys.map((key, generatedIndex) => {
          if (params[key] === 'premium-plus') {
            return;
          }
          return (
            <div key={key} className="">
              <Popover>
                <PopoverTrigger
                  className="flex gap-0.5"
                  onClick={() => {
                    setClickedIndex(generatedIndex);
                  }}
                >
                  <p> </p>
                  <div
                    className={` hover:underline ${params[key].length < 4 ? 'uppercase' : 'capitalize'} `}
                  >
                    {/* Replacing hyphens with spaces (except for year_generation) */}
                    {params[key] && key === 'year'
                      ? params[key]
                      : String(params[key]).replaceAll('-', ' ')}
                  </div>
                  {generatedIndex != paramKeys.length - 1 &&
                    paramValues.length > 2 && <p>/</p>}
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow className="fill-[#BE1B1B]" />
                  <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
                    {productType && clickedIndex <= 1 && (
                      <HomeDropdown
                        place={1}
                        title={'type'}
                        value={paramsObj.type}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={vehicleTypes}
                      />
                    )}
                    {make && clickedIndex <= 2 && (
                      <HomeDropdown
                        place={2}
                        title={'make'}
                        value={paramsObj.make}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={makeData}
                        isDisabled={!paramsObj.type}
                      />
                    )}
                    {model && clickedIndex <= 3 && (
                      <HomeDropdown
                        place={3}
                        title={'model'}
                        value={paramsObj.model}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={modelData}
                        isDisabled={!paramsObj.make}
                        isBreadCrumb
                      />
                    )}
                    {year && (
                      <HomeDropdown
                        place={4}
                        title={'year'}
                        value={paramsObj.year}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={yearData}
                        isDisabled={!paramsObj.model}
                        isBreadCrumb
                      />
                    )}
                    <Button
                      className={`mx-auto h-[40px] max-h-[44px] min-h-[44px] w-full max-w-[px] rounded-[4px] text-lg  disabled:bg-[gray]/70 `}
                      onClick={handleSubmitDropdown}
                      disabled={isDisabled}
                    >
                      {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      ) : (
                        'GO'
                      )}
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
