'use client';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@mantine/hooks';
import { track } from '@vercel/analytics/react';
import { SetStateAction, useContext, useState } from 'react';
import { DrawerTitle } from '@/components/ui/drawer';
import { useParams, useRouter } from 'next/navigation';
import {
  TPathParams,
  getCompleteSelectionData,
  getUniqueValues,
} from '../../utils';
import { useStore } from 'zustand';
import { CarSelectionContext } from './CarPDP';
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

const AddToCartSelector = ({
  submodelSelectionOpen,
  setSubmodelSelectionOpen,
}: {
  submodelSelectionOpen: boolean;
  setSubmodelSelectionOpen: (value: SetStateAction<boolean>) => void;
}) => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  const modelData = useStore(store, (s) => s.modelData);
  const initialModelData = useStore(store, (s) => s.initialModelData);
  const queryState = useStore(store, (s) => s.query);
  const setQuery = useStore(store, (s) => s.setQuery);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const color = useStore(store, (s) => s.selectedColor);

  const router = useRouter();

  const { addToCart } = useCartContext();

  const params = useParams<TPathParams>();

  const { completeSelectionState } = getCompleteSelectionData({
    data: modelData,
  });

  const { shouldDisplayMake, isComplete } = completeSelectionState;

  const {
    uniqueMakes,
    uniqueModels,
    uniqueSecondSubmodels,
    uniqueSubmodels,
    uniqueYears,
  } = getUniqueValues({ data: initialModelData, queryState: queryState });

  const cartProduct = modelData.find((p) => p.display_color === color);

  const handleAddToCart = () => {
    if (!cartProduct) return;
    handleAddToCartGoogleTag(cartProduct, params as TPathParams);
    return addToCart({ ...cartProduct, quantity: 1 });
  };

  const TypeDropdown = () => {
    const typeOptions = ['Car Covers', 'SUV Covers', 'Truck Covers'];
    const typeString =
      queryState.type === 'car-covers'
        ? typeOptions[0]
        : queryState.type === 'suv-covers'
          ? typeOptions[1]
          : typeOptions[2];

    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">1</div>
        <select
          value={queryState.type}
          className={`bg w-full bg-transparent outline-none `}
          disabled={!!queryState.type && !!params?.productType}
        >
          <option value="">
            {!!queryState.type ? typeString : 'Product Type'}
          </option>

          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const MakeDropdown = () => {
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">2</div>
        <select
          value={queryState.make}
          className={`bg w-full bg-transparent capitalize outline-none`}
          disabled={!shouldDisplayMake && !!params?.make}
          onChange={(e) =>
            setQuery({
              ...queryState,
              make: e.target.value,
            })
          }
        >
          <option value="">{queryState.make || 'Make'}</option>
          {uniqueMakes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const YearDropdown = () => {
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">4</div>
        <select
          value={queryState.year}
          className={`bg w-full bg-transparent outline-none `}
          onChange={(e) =>
            setQuery({
              ...queryState,
              year: e.target.value,
              submodel: '',
              secondSubmodel: '',
            })
          }
        >
          <option value="">Year</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const ModelDropdown = () => {
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">3</div>
        <select
          value={queryState.model}
          className={`bg w-full bg-transparent capitalize outline-none `}
          disabled={!!params?.model}
          onChange={(e) =>
            setQuery({
              ...queryState,
              model: e.target.value,
              submodel: '',
              secondSubmodel: '',
              year: '',
            })
          }
        >
          <option value="">{queryState.model || 'Model'}</option>
          {uniqueModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const SubmodelDropdown = () => {
    if (uniqueSubmodels.length === 0 && !queryState.submodel) return null;
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">5</div>
        <select
          value={queryState.submodel}
          className={`bg w-full bg-transparent outline-none `}
          onChange={(e) =>
            setQuery({ submodel: e.target.value, secondSubmodel: '' })
          }
        >
          <option value="">Submodel</option>
          {uniqueSubmodels.map((submodel) => (
            <option key={submodel} value={submodel as string}>
              {submodel}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const SecondSubmodelDropdown = () => {
    if (uniqueSecondSubmodels.length === 0 && !queryState.secondSubmodel)
      return null;
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">6</div>
        <select
          value={queryState.secondSubmodel}
          className={`bg w-full bg-transparent outline-none `}
          onChange={(e) => setQuery({ secondSubmodel: e.target.value })}
        >
          <option value="">Submodel</option>
          {uniqueSecondSubmodels.map((submodel) => (
            <option key={submodel} value={submodel as string}>
              {submodel}
            </option>
          ))}
        </select>
      </div>
    );
  };
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
          <TypeDropdown />
          <MakeDropdown />
          <ModelDropdown />
          <YearDropdown />
          {queryState.year && <SubmodelDropdown />}
          {queryState.submodel && queryState && <SecondSubmodelDropdown />}
        </div>
        <SheetFooter
          id="Add-To-Cart-Button"
          className="mt-auto flex flex-col gap-3 bg-white px-4 py-3 align-bottom"
        >
          <p className="text-right font-extrabold leading-4 text-black">
            Starting from ${selectedProduct.msrp}
          </p>
          <Button
            onClick={() => {
              if (!isComplete) return;
              handleAddToCart();
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

function VehicleSelector({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  return <EditVehicleDropdown searchParams={searchParams} />;
}
