'use client';
import { track } from '@vercel/analytics/react';
import { Suspense, useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  TPathParams,
  TQueryParams,
  getCompleteSelectionData,
} from '../../utils';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { handleAddToCartGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import AddToCartSelector from '../../seat-covers/components/AddToCartSelector';
import AddToCartButton from '../../seat-covers/components/AddToCartButtonSeatCover';
import VehicleSelector from './VehicleSelector';
import useDetermineType from '@/hooks/useDetermineType';
import AddtoCartSeatSelect from '../../seat-covers/components/AddToCartSeatSelect';

export default function AddToCart({
  selectedProduct,
  handleAddToCart,
  searchParams,
  isSticky,
}: {
  selectedProduct: any;
  handleAddToCart: () => void;
  searchParams: TQueryParams;
  isSticky?: boolean;
}) {
  const params = useParams<TPathParams>();
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const [addToCartSelectorOpen, setAddToCartSelectorOpen] =
    useState<boolean>(false);
  const [selectSeatOpen, setSelectSeatOpen] = useState<boolean>(false);
  const { isSeatCover } = useDetermineType();
  const isFinalSelection = params?.year;

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const handleAddToCartClicked = () => {
    if (isComplete) {
      if (isSeatCover) {
        setSelectSeatOpen(true);
      } else {
        handleAddToCart();
        handleAddToCartGoogleTag(selectedProduct, params as TPathParams);
        selectedProduct?.sku &&
          track('PDP_add_to_cart', {
            sku: selectedProduct?.sku,
          });
      }
      return; // Don't want to open add to cart selector
    }
    setAddToCartSelectorOpen((p) => !p);
  };

  return (
    <Suspense fallback={<></>}>
      <div className="z-20 w-full" id="selector">
        {isComplete && isSeatCover ? (
          <AddtoCartSeatSelect
            handleAddToCart={handleAddToCart}
            selectSeatOpen={selectSeatOpen}
            setSelectSeatOpen={setSelectSeatOpen}
          />
        ) : (
          <AddToCartSelector
            addToCartSelectorOpen={addToCartSelectorOpen}
            setAddToCartSelectorOpen={setAddToCartSelectorOpen}
            searchParams={searchParams}
          />
        )}
      </div>

      {/* Add to Cart Button */}
      {!isFinalSelection && !isSticky ? (
        <VehicleSelector searchParams={searchParams} />
      ) : (
        <div className="fixed inset-x-0 bottom-0 z-20 flex bg-white p-4 lg:relative lg:p-1">
          <AddToCartButton handleAddToCartClicked={handleAddToCartClicked} />
        </div>
      )}
    </Suspense>
  );
}
