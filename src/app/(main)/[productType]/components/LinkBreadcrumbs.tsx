'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useParams, usePathname } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TQuery } from '@/components/hero/dropdown/HeroDropdown';
import useDetermineType from '@/hooks/useDetermineType';
import MainDropdown from '@/components/hero/dropdown/MainDropdown';
import { PopoverArrow } from '@radix-ui/react-popover';
import { PREMIUM_PLUS_URL_PARAM, VEHICLE_TYPES } from '@/lib/constants';
import {
  getAllType,
  getDistinctMakesByType,
  getDistinctModelsByTypeMake,
  getDistinctYearGenerationByTypeMakeModelYear,
  getDistinctYearsByTypeMakeModel,
} from '@/lib/db';
import { deslugify, slugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';

export default function LinkBreadcrumbs() {
  const {
    isSeatCover,
    productType,
    make: paramsMake,
    model: paramsModel,
    year,
  } = useDetermineType();
  let store;
  let make: string = '';
  let model: string = '';
  if (!isSeatCover) {
    store = useContext(CarSelectionContext);
    if (!store) throw new Error('Missing CarContext.Provider in the tree');
    // { make, model } = selectedProduct.make;
    const selectedProduct = useStore(store, (s) => s.selectedProduct);
    make = String(selectedProduct.make);
    model = String(selectedProduct.model);
  }

  const params = Object(useParams());
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);

  // const { make, model } = selectedProduct;
  // console.log('[MODEL FROM BREADCRUMBS]: ', { model });

  const [paramsObj, setParamObj] = useState<TQuery>({
    type: deslugify(productType as string),
    year: year ? year : '',
    make: paramsMake ? deslugify(make) : '',
    model: paramsModel ? deslugify(model) : '',
    submodel1: '',
    submodel2: '',
    parent_generation: '',
    typeId: '',
    makeId: '',
    modelId: '',
    yearId: '',
  });
  const [typeData, setTypeData] = useState<any[]>([]);
  const [makeData, setMakeData] = useState<string[]>([]);
  const [modelData, setModelData] = useState<string[]>([]);
  const [yearData, setYearData] = useState<string[]>([]);
  const vehicleTypes = VEHICLE_TYPES;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  // Fetching makes
  useEffect(() => {
    const getTypes = async () => {
      try {
        const response = await getAllType();
        setTypeData(response);
      } catch (error) {
        console.error('[Type Search]: ', error);
      }
    };
    const getMakes = async () => {
      if (paramsObj.type) {
        const makes = await getDistinctMakesByType(paramsObj.type);
        setMakeData(makes);
        // console.log('Fetched Makes', makes);
      }
    };
    const getModels = async () => {
      // console.log(paramsObj);

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
      // console.log(paramsObj);

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
    getTypes();

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
    const yearGen = await getDistinctYearGenerationByTypeMakeModelYear(
      paramsObj.type,
      paramsObj.make,
      paramsObj.model,
      paramsObj.year
    );

    let url = `/${slugify(paramsObj.type)}/${PREMIUM_PLUS_URL_PARAM}/${slugify(paramsObj.make)}/${slugify(paramsObj.model)}/`;

    if (yearGen[0]) {
      url += `${yearGen[0]}`;
    } else if (paramsObj.year) {
      url += `${paramsObj.year}`;
    }
    if (url === pathname) {
      setIsLoading(false);
      return;
    }
    try {
      router.push(url, { scroll: true });
      // console.log({ url, yearGen: yearGen[0], paramsObj });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <div className="mb-[14px] flex text-[12px] leading-[13px] lg:text-[14px] lg:leading-[15px]">
      {isSeatCover && (
        <div className="flex gap-1">
          <p> </p>
          <a
            href={getUrlFromBreadcrumbs(0)}
            className={`capitalize hover:underline `}
          >
            {/* Replacing hyphens with spaces (except for year_generation) */}
            Seat Covers
          </a>

          {paramsObj.make && <p>/</p>}
        </div>
      )}
      {params &&
        paramKeys.map((key, generatedIndex) => {
          if (params[key] === 'premium-plus' || params[key] === 'leather') {
            return;
          }
          return (
            <div key={key} className="">
              <Popover>
                <PopoverTrigger
                  className="flex gap-1"
                  onClick={() => {
                    setClickedIndex(generatedIndex);
                  }}
                >
                  <p> </p>
                  <div
                    className={` hover:underline ${params[key].length < 4 ? 'uppercase' : 'capitalize'} `}
                  >
                    {key !== 'make' &&
                      key !== 'model' &&
                      key !== 'year' &&
                      deslugify(params[key])}
                    {key === 'make' && make}
                    {key === 'model' && model}
                    {key == 'year' && params[key]}
                  </div>
                  {generatedIndex != paramKeys.length - 1 &&
                    paramValues.length > 2 && <p>/</p>}
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow className="mb-0 fill-[#BE1B1B] " />
                  <div className="z-100 relative flex w-full flex-col items-stretch  gap-[16px] *:flex-1">
                    {productType && clickedIndex <= 1 && (
                      <MainDropdown
                        place={1}
                        title={'type'}
                        value={paramsObj.type}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={typeData}
                        isBreadCrumb
                      />
                    )}
                    {make && clickedIndex <= 2 && (
                      <MainDropdown
                        place={2}
                        title={'make'}
                        value={paramsObj.make}
                        queryObj={queryObj}
                        prevSelected={false}
                        items={makeData}
                        isDisabled={!paramsObj.type}
                        isBreadCrumb
                      />
                    )}
                    {model && clickedIndex <= 3 && (
                      <MainDropdown
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
                    <MainDropdown
                      place={4}
                      title={'year'}
                      value={paramsObj.year}
                      queryObj={queryObj}
                      prevSelected={false}
                      items={yearData}
                      isDisabled={!paramsObj.model}
                      isBreadCrumb
                    />
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
