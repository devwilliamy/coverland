'use client';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@mantine/hooks';
import { track } from '@vercel/analytics/react';
import {
  ChangeEvent,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DrawerTitle } from '@/components/ui/drawer';
import { useParams, useRouter } from 'next/navigation';
import {
  TPathParams,
  getCompleteSelectionData,
  getUniqueValues,
} from '../../utils';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { useCartContext } from '@/providers/CartProvider';
import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { handleAddToCartGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import {
  getAllUniqueMakesByYear,
  getAllUniqueModelsByYearMake,
  getProductData,
} from '@/lib/db';
import { slugify } from '@/lib/utils';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function AddToCart({
  selectedProduct,
  handleAddToCart,
  searchParams,
  isSticky,
}: {
  selectedProduct: any;
  handleAddToCart: () => void;
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
  isSticky?: boolean;
}) {
  const params = useParams<TPathParams>();
  const store = useContext(CarSelectionContext);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // For sticky Add To Cart on mobile only (can maybe extract this out)
  // Will check if Add To Cart has been scroll past, if so, will show sticky button

  const [submodelSelectionOpen, setSubmodelSelectionOpen] =
    useState<boolean>(false);

  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);

  const isTypeOrCoverPage = !params?.make;

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  return (
    <div>
      <div className="w-full" id="selector">
        <AddToCartSelector
          submodelSelectionOpen={submodelSelectionOpen}
          setSubmodelSelectionOpen={setSubmodelSelectionOpen}
        />
      </div>

      {/* Add to Cart Button */}
      {isTypeOrCoverPage && !isSticky ? (
        <VehicleSelector searchParams={searchParams} />
      ) : (
        <div className="fixed inset-x-0 bottom-0 z-50 flex bg-white p-4 lg:relative lg:p-1">
          <Button
            className=" h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] lg:h-[62px]"
            onClick={() => {
              selectedProduct?.sku &&
                track('PDP_add_to_cart', {
                  sku: selectedProduct?.sku,
                });
              if (isComplete) {
                handleAddToCart();
                handleAddToCartGoogleTag(
                  selectedProduct,
                  params as TPathParams
                );
                isMobile ? router.push('/checkout') : setAddToCartOpen(true);
                return;
              }
              setSubmodelSelectionOpen((p) => !p);
            }}
          >
            Add To Cart
          </Button>
        </div>
      )}
    </div>
  );
}

const determineTypeString = (type: string) => {
  const typeOptions = ['Car Covers', 'SUV Covers', 'Truck Covers'];
  return type === 'car-covers'
    ? typeOptions[0]
    : type === 'suv-covers'
      ? typeOptions[1]
      : type === 'truck-covers'
        ? typeOptions[2]
        : type;
};

const determineCoverType = (type: string) => {
  let coverType;
  switch (type) {
    case 'premium-plus':
      coverType = 'Premium Plus';
      break;
    case 'premium':
      coverType = 'Premium';
      break;
    case 'standard':
      coverType = 'Standard';
      break;
    case 'standard-pro':
      coverType = 'Standard Pro';
      break;
    default:
      coverType = 'Premium Plus';
      break;
  }
  return coverType;
};

const AddToCartSelector = ({
  submodelSelectionOpen,
  setSubmodelSelectionOpen,
}: {
  submodelSelectionOpen: boolean;
  setSubmodelSelectionOpen: (value: SetStateAction<boolean>) => void;
}) => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  const queryState = useStore(store, (s) => s.query);
  const setQuery = useStore(store, (s) => s.setQuery);
  // console.log('[AddToCart queryState]:', queryState);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const setCustomerSelectedYear = useStore(
    store,
    (s) => s.setCustomerSelectedYear
  );
  const color = useStore(store, (s) => s.selectedColor);

  const router = useRouter();

  const { addToCart } = useCartContext();

  const params = useParams<TPathParams>();
  const [newModelData, setNewModelData] = useState([]);
  const { completeSelectionState } = getCompleteSelectionData({
    data: newModelData,
  });

  // const { shouldDisplayMake, isComplete } = completeSelectionState;
  const [isComplete, setIsComplete] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleAddToCart = () => {
    if (!selectedItem) return;
    handleAddToCartGoogleTag(selectedItem, params as TPathParams);
    return addToCart({ ...selectedItem, quantity: 1 });
  };

  const {
    year,
    type,
    make,
    model,
    submodel,
    secondSubmodel,
    parent_generation,
  } = queryState;

  useEffect(() => {
    const typeString = determineTypeString(queryState.type);
    const coverType = determineCoverType(params?.coverType as string);
    const fetchData = async () => {
      try {
        const response = await getProductData({
          type: typeString,
          // cover: coverType,
          year: parent_generation,
          make: slugify(make),
          model: slugify(model),
        });
        setNewModelData(response);
        const checkIsComplete = isComplete_v2(queryState, response);
        // console.log('checkIsComplete:', {
        //   checkIsComplete,
        //   isComplete,
        //   queryState,
        // });
        setIsComplete(checkIsComplete);
        if (checkIsComplete) {
          const filterDownResponse = response.filter((item) => {
            if (!!coverType && item.display_id !== coverType) {
              return false;
            }
            if (!!submodel && item.submodel1 !== submodel) {
              return false;
            }
            if (!!secondSubmodel && item.submodel2 !== secondSubmodel) {
              return false;
            }
            return true;
          });
          // console.log('[AddToCart.AddToCartSelector.useEffect.fetchData]:', {
          //   response,
          //   filterDownResponse,
          //   color,
          // });
          const selectedItem =
            filterDownResponse.length > 1
              ? response.find((p) => p.display_color === color)
              : filterDownResponse[0];
          // console.log('[AddToCart.AddToCartSelector.useEffect]:', selectedItem);
          setSelectedItem(selectedItem);
        }
      } catch (error) {
        console.error('[AddToCartSelector]: ', error);
      }
    };

    if (!!year && !!type && !!make && !!model) {
      // console.log('AddToCartSelector UseEffect:', {
      //   year,
      //   parent_generation,
      //   type,
      //   make,
      //   model,
      // });
      fetchData();
    } else {
      setIsComplete(false);
      setSelectedItem({});
    }
  }, [
    type,
    year,
    make,
    model,
    submodel,
    secondSubmodel,
    parent_generation,
    isComplete,
    color,
    params,
    queryState,
  ]);

  const wait = () => new Promise((resolve) => setTimeout(resolve, 350));

  return (
    <Sheet
      open={submodelSelectionOpen}
      onOpenChange={(o) => setSubmodelSelectionOpen(o)}
    >
      <SheetContent
        className="flex flex-col justify-center rounded-t-2xl   border border-neutral-800 bg-neutral-800 pt-8"
        side="right"
        onClick={(e) => e.stopPropagation()}
      >
        <SheetClose className="mb-auto ml-auto mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-400">
          <X className="h-6 w-6 fill-neutral-800" />
        </SheetClose>
        <SheetHeader>
          <DrawerTitle className="my-4 text-center text-[22px] font-bold uppercase text-white">
            Complete Your Vehicle
          </DrawerTitle>
        </SheetHeader>
        <div className="flex w-full flex-col gap-4 px-4 ">
          <TypeDropdown queryState={queryState} setQuery={setQuery} />
          <YearDropdown queryState={queryState} setQuery={setQuery} />
          <MakeDropdown queryState={queryState} setQuery={setQuery} />
          <ModelDropdown queryState={queryState} setQuery={setQuery} />
          {/* {queryState.year && <SubmodelDropdown />}
          {queryState.submodel && queryState && <SecondSubmodelDropdown />} */}
        </div>
        <SheetFooter
          id="Add-To-Cart-Button"
          className="mt-auto flex flex-col gap-3 bg-white px-4 py-3 align-bottom"
        >
          <p className="text-right font-extrabold leading-4 text-black">
            {isComplete
              ? `$${selectedItem?.msrp || selectedProduct?.msrp || ''}`
              : ''}
          </p>
          <Button
            onClick={() => {
              if (!isComplete) return;
              handleAddToCart();
              setCustomerSelectedYear(queryState.year);
              wait().then(() => setSubmodelSelectionOpen(false));
              router.push('/checkout');
            }}
            disabled={!isComplete}
            className="w-full py-6 text-lg uppercase"
          >
            Add To Cart
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const isComplete_v2 = (queryState, newModelData) => {
  const {
    year,
    type,
    make,
    model,
    submodel,
    secondSubmodel,
    parent_generation,
  } = queryState;

  const hasSubmodel1 = newModelData.some((item) => item.submodel1 !== null);
  const hasSubmodel2 = newModelData.some((item) => item.submodel2 !== null);
  const isBasicInfoFilled = !!year && !!type && !!make && !!model;
  const isSubmodel1Complete = !hasSubmodel1 || (hasSubmodel1 && !!submodel);
  const isSubmodel2Complete =
    !hasSubmodel2 || (hasSubmodel2 && !!secondSubmodel);
  // console.log('IsCOmplete_v2 Checks:', {
  //   hasSubmodel1,
  //   hasSubmodel2,
  //   isBasicInfoFilled,
  //   isSubmodel1Complete,
  //   isSubmodel2Complete,
  //   queryState,
  // });
  return isBasicInfoFilled && isSubmodel1Complete && isSubmodel2Complete;
};
function VehicleSelector({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  return <EditVehicleDropdown searchParams={searchParams} />;
}

const TypeDropdown = ({ queryState, setQuery }) => {
  const typeOptions = ['Car Covers', 'SUV Covers', 'Truck Covers'];
  const typeString =
    queryState.type === 'car-covers'
      ? typeOptions[0]
      : queryState.type === 'suv-covers'
        ? typeOptions[1]
        : typeOptions[2];
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setQuery({
      type: newValue,
      make: '',
      model: '',
      year: '',
      submodel: '',
      secondSubmodel: '',
    });
  };
  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
    >
      <div className=" ml-[10px] pr-[15px]">1</div>
      <select
        value={determineTypeString(queryState.type)}
        onChange={handleChange}
        className="w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3"
      >
        <option value="">{'Product Type'}</option>

        {typeOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

const YearDropdown = ({ queryState, setQuery }) => {
  const { type } = queryState;
  const isDisabled = !type;
  const startYear = 1921;
  const endYear = 2025;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
    >
      <div className=" ml-[10px] pr-[15px]">2</div>
      <select
        value={queryState.year}
        className={`w-full cursor-pointer bg-transparent py-1 outline-none lg:py-3`}
        onChange={(e) =>
          setQuery({
            ...queryState,
            year: e.target.value,
            make: '',
            model: '',
            submodel: '',
            secondSubmodel: '',
          })
        }
        disabled={isDisabled}
      >
        <option value="">Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

type TMakeDropdown = { make: string | null; make_slug: string | null };

const MakeDropdown = ({ queryState, setQuery }) => {
  const { type, year } = queryState;
  const [isLoading, setIsLoading] = useState(false);

  // console.log('QueryState MakeDropdown:', queryState);
  const [makeData, setMakeData] = useState<TMakeDropdown[]>([]);

  useEffect(() => {
    !queryState?.type && setQuery({ ...queryState, make: '' });
  }, []);

  useEffect(() => {
    const typeString = determineTypeString(type);
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await getAllUniqueMakesByYear({
          type: typeString,
          cover: 'Premium Plus', // TOOD: - Update this to make it work for premium as well.
          year,
        });
        setMakeData(response);
      } catch (error) {
        console.error('[Make Search]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!!type && !!year) {
      // console.log('[MakeDropdown useEffect] triggered?', { type, year });
      fetchData();
    }
  }, [type, year]);
  const isDisabled = !type || !year;
  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
    >
      <div className=" ml-[10px] pr-[15px]">3</div>
      {isLoading ? (
        <div className="pl-2">
          <AiOutlineLoading3Quarters className="animate-spin " />
        </div>
      ) : (
        <select
          value={queryState.make}
          className={`w-full cursor-pointer bg-transparent py-1 capitalize outline-none lg:py-3`}
          disabled={isDisabled || isLoading}
          onChange={(e) =>
            setQuery({
              ...queryState,
              make: e.target.value,
            })
          }
        >
          <option value="">{'Make'}</option>
          {makeData.map(({ make }, index) => (
            <option key={`${make}-${index}`} value={make || ''}>
              {make}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

type TModelDropdown = {
  model: string | null;
  model_slug: string | null;
  parent_generation: string | null;
  submodel1: string | null;
  submodel2: string | null;
  submodel3: string | null;
};
const ModelDropdown = ({ queryState, setQuery }) => {
  const [modelData, setModelData] = useState<TModelDropdown[]>([]);
  const [filteredModelData, setFilteredModelData] = useState<TModelDropdown[]>(
    []
  );
  const [submodelData, setSubmodelData] = useState<TModelDropdown[]>([]);
  const [filteredSubmodelData, setFilteredSubmodelData] = useState<
    TModelDropdown[]
  >([]);
  const { type, year, make, model } = queryState;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    const parent_generation =
      modelData.find((car) => car.model === newValue)?.parent_generation || '';
    setQuery({
      ...queryState,
      model: newValue,
      parent_generation,
      submodel: '',
      secondSubmodel: '',
    });
  };

  // useEffect(() => {
  //   !make && setQuery({ ...queryState, model: '' });
  // }, [make]);
  useEffect(() => {
    setSubmodelData([]);
  }, [type, year, make, model]);

  useEffect(() => {
    const fetchData = async () => {
      const typeString = determineTypeString(type);

      try {
        const response = await getAllUniqueModelsByYearMake({
          type: typeString,
          cover: 'Premium Plus', // TOOD: - Update this to make it work for premium as well.
          year,
          make,
        });
        const uniqueModel = response.filter(
          (car, index, self) =>
            index === self.findIndex((t) => t.model_slug === car.model_slug)
        );
        // console.log('[ModelDropdown.UseEffect]:', uniqueModel);

        const submodel = response.filter(
          (vehicle) =>
            slugify(vehicle.model) === slugify(model) &&
            vehicle.submodel1 !== null
        );
        const filteredSubmodelData = Array.from(
          new Set(
            submodel
              ?.filter(
                (vehicle) =>
                  slugify(vehicle.model as string) ===
                    slugify(model as string) && vehicle.submodel1 !== null
              )
              ?.map((vehicle) => vehicle.submodel1)
          )
        );
        // console.log('Testing...:', {
        //   model,
        //   slugmodel: slugify(model),
        //   filter1: submodel?.filter(
        //     (vehicle) =>
        //       slugify(vehicle.model as string) === slugify(model as string) &&
        //       vehicle.submodel1 !== null
        //   ),
        // });
        // console.log('[ModelDropdown.UseEffect]:', {
        //   submodel,
        //   filteredSubmodelData,
        // });
        setSubmodelData(submodel);

        setModelData(response);
        setFilteredModelData(uniqueModel);
        setFilteredSubmodelData(filteredSubmodelData);
      } catch (error) {
        console.error('[Model Search]: ', error);
      }
    };
    if (type && year && make) {
      fetchData();
    }
  }, [type, year, make, model]);

  const isDisabled = !type || !year || !make;
  const showSubmodelDropdown = submodelData.length > 0;

  return (
    <>
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">4</div>
        <select
          value={queryState.model}
          className={`w-full cursor-pointer bg-transparent py-1 capitalize outline-none lg:py-3`}
          disabled={isDisabled}
          onChange={handleChange}
        >
          <option value="">{'Model'}</option>
          {filteredModelData?.map(({ model }, index) => (
            <option key={`${model}-${index}`} value={model || ''}>
              {model}
            </option>
          ))}
        </select>
      </div>
      {showSubmodelDropdown && (
        <SubmodelDropdown
          submodelData={submodelData}
          filteredSubmodelData={filteredSubmodelData}
          queryState={queryState}
          setQuery={setQuery}
        />
      )}
    </>
  );
};

const SubmodelDropdown = ({
  queryState,
  setQuery,
  submodelData,
  filteredSubmodelData,
}: {
  submodelData: TModelDropdown[];
}) => {
  const [secondSubmodelData, setSecondSubmodelData] = useState<
    TModelDropdown[]
  >([]);
  const { model, submodel } = queryState;
  // console.log('[SubmodelDropdown]:', { submodel, filteredSubmodelData });
  useEffect(() => {
    setSecondSubmodelData([]);
  }, [model, submodel]);
  useEffect(() => {
    // Check for second submodel
    if (submodel) {
      const secondSubmodelData = submodelData?.filter(
        (vehicle) =>
          vehicle.submodel1 === submodel && vehicle.submodel2 !== null
      );
      setSecondSubmodelData(secondSubmodelData);
    }
  }, [submodel, submodelData]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setQuery({ ...queryState, submodel: newValue, secondSubmodel: '' });
  };

  const isDisabled =
    !queryState.make ||
    !queryState.year ||
    !queryState.type ||
    !queryState.model;
  const showSecondSubmodelDropdown = secondSubmodelData.length > 0;
  return (
    <>
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">5</div>
        <select
          value={queryState.submodel}
          className={`w-full cursor-pointer bg-transparent py-1 capitalize outline-none lg:py-3`}
          disabled={isDisabled}
          onChange={handleChange}
        >
          <option value="">Submodel</option>
          {filteredSubmodelData?.sort()?.map((submodel) => (
            <option key={submodel} value={submodel as string}>
              {submodel}
            </option>
          ))}
        </select>
      </div>
      {showSecondSubmodelDropdown && (
        <SecondSubmodelDropdown
          secondSubmodelData={secondSubmodelData}
          queryState={queryState}
          setQuery={setQuery}
        />
      )}
    </>
  );
};

const SecondSubmodelDropdown = ({
  secondSubmodelData,
  queryState,
  setQuery,
}) => {
  const { submodel } = queryState;

  const filteredSecondSubmodelData: (string | null)[] = Array.from(
    new Set(
      secondSubmodelData
        .filter(
          (vehicle) =>
            vehicle.submodel1 === (submodel as string) &&
            vehicle.submodel2 !== null
        )
        .map((vehicle) => vehicle.submodel2)
    )
  );

  // useEffect(() => {
  //   !submodel1 && setValue('');
  // }, [submodel1]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    // newValue === '' ? setIsComplete(false) : setIsComplete(true);

    setQuery({ ...queryState, secondSubmodel: newValue });
  };

  const isDisabled =
    !queryState.make ||
    !queryState.year ||
    !queryState.type ||
    !queryState.model ||
    !queryState.submodel;
  // const showThirdSubmodelDropdown = thirdSubmodelData.length > 0;

  return (
    <div
      className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
    >
      <div className=" ml-[10px] pr-[15px]">6</div>
      <select
        value={queryState.secondSubmodel}
        className={`w-full cursor-pointer bg-transparent py-1 capitalize outline-none lg:py-3`}
        disabled={isDisabled}
        onChange={handleChange}
      >
        <option value="">Second Submodel</option>
        {filteredSecondSubmodelData?.sort()?.map((submodel2) => (
          <option key={submodel2} value={submodel2 as string}>
            {submodel2}
          </option>
        ))}
      </select>
    </div>
  );
};
