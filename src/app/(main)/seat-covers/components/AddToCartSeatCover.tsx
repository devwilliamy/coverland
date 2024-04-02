'use client';
import { useMediaQuery } from '@mantine/hooks';
import {
  ChangeEvent,
  SetStateAction,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';
import { DrawerTitle } from '@/components/ui/drawer';
import { useParams, useRouter } from 'next/navigation';
import { TPathParams, getCompleteSelectionData } from '../../utils';
import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { handleAddToCartGoogleTag } from '@/hooks/useGoogleTagDataLayer';

import { slugify } from '@/lib/utils';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import {
  getAllUniqueMakesByYear,
  getAllUniqueModelsByYearMake,
  getSeatCoverProductData,
} from '@/lib/db/seat-covers';
import EditVehicleDropdown from './EditVehicleDropdownSeatCover';
import AddToCartButton from './AddToCartButtonSeatCover';
import AddtoCartSeatSelect from './AddToCartSeatSelect';

export default function AddToCart({
  handleAddToCart,
  searchParams,
  isSticky,
}: {
  handleAddToCart: () => void;
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
  isSticky?: boolean;
}) {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const [selectSeatOpen, setSelectSeatOpen] = useState<boolean>(false);
  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  return (
    <Suspense fallback={<></>}>
      <div className="w-full" id="selector">
        {isComplete ? (
          <AddtoCartSeatSelect
            handleAddToCart={handleAddToCart}
            selectSeatOpen={selectSeatOpen}
            setSelectSeatOpen={setSelectSeatOpen}
          />
        ) : (
          <AddToCartSelector
            submodelSelectionOpen={addToCartOpen}
            setSubmodelSelectionOpen={setAddToCartOpen}
            searchParams={searchParams}
          />
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex bg-white p-4 lg:relative lg:my-3 lg:p-0">
        <AddToCartButton
          setSelectSeatOpen={setSelectSeatOpen}
          setAddToCartOpen={setAddToCartOpen}
        />
      </div>
    </Suspense>
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

const AddToCartSelector = ({
  submodelSelectionOpen,
  setSubmodelSelectionOpen,
  searchParams,
}: {
  submodelSelectionOpen: boolean;
  setSubmodelSelectionOpen: (value: SetStateAction<boolean>) => void;
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) => {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');

  const queryState = useStore(store, (s) => s.query);
  const setQuery = useStore(store, (s) => s.setQuery);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  //   const setCustomerSelectedYear = useStore(
  //     store,
  //     (s) => s.setCustomerSelectedYear
  //   );
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
    const coverType = params?.coverType;
    const fetchData = async () => {
      try {
        const response = await getSeatCoverProductData({
          type: typeString,
          // cover: coverType,
          year: parent_generation,
          make: slugify(make),
          model: slugify(model),
        });
        setNewModelData(response);
        const checkIsComplete = isComplete_v2(queryState, response);
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
          const selectedItem =
            filterDownResponse.length > 1
              ? response.find((p) => p.display_color === color)
              : filterDownResponse[0];
          setSelectedItem(selectedItem);
        }
      } catch (error) {
        console.error('[AddToCartSelector]: ', error);
      }
    };

    if (!!year && !!type && !!make && !!model) {
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
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <Sheet
      open={submodelSelectionOpen}
      onOpenChange={(o) => setSubmodelSelectionOpen(o)}
    >
      <SheetContent
        className="flex  flex-col justify-center rounded-t-2xl border   border-neutral-800 bg-neutral-800 pt-8 max-lg:max-h-[80vh]"
        side={isMobile ? 'bottom' : 'right'}
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
          <EditVehicleDropdown searchParams={searchParams} />
        </div>
        <SheetFooter
          id="Add-To-Cart-Button"
          className="mt-auto flex flex-col gap-3 px-4 py-3 align-bottom"
        >
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
  const hasSubmodel1 = newModelData.some(
    (item) => item.submodel1 !== null && item.submodel1 !== ''
  );
  const hasSubmodel2 = newModelData.some(
    (item) => item.submodel2 !== null && item.submodel2 !== ''
  );
  const isBasicInfoFilled = !!year && !!type && !!make && !!model;
  const isSubmodel1Complete = !hasSubmodel1 || (hasSubmodel1 && !!submodel);
  const isSubmodel2Complete =
    !hasSubmodel2 || (hasSubmodel2 && !!secondSubmodel);
  return isBasicInfoFilled && isSubmodel1Complete && isSubmodel2Complete;
};

