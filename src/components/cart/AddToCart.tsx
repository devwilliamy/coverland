'use client';
import { track } from '@vercel/analytics/react';
import { Suspense, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  TPathParams,
  TQueryParams,
  getCompleteSelectionData,
} from '../../utils';
import { useStore } from 'zustand';
import { handleAddToCartGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import AddToCartSelector from './AddToCartSelector';
import AddToCartButton from './AddToCartButton';
import useDetermineType from '@/hooks/useDetermineType';
import AddtoCartSeatSelect from '../../app/(main)/seat-covers/components/AddToCartSeatSelect';
import useStoreContext from '@/hooks/useStoreContext';
import { isFullSet } from '@/lib/utils';

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
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const selectedSetDisplay = useStore(store, (s) => s.selectedSetDisplay); // Not sure what to do about typing here, will research later
  const selectedColor = useStore(store, (s) => s.selectedColor);
  const { isSeatCover } = useDetermineType();
  const filteredData = isSeatCover
    ? modelData.filter(
        (product) =>
          isFullSet(product.display_set ?? '') ===
          selectedSetDisplay?.toLowerCase()
      )
    : modelData;

  const isSelectedColorAvailable = filteredData.some(
    (product) =>
      product?.display_color?.toLowerCase() === selectedColor.toLowerCase() &&
      product.quantity !== '0'
  );

  const [addToCartSelectorOpen, setAddToCartSelectorOpen] =
    useState<boolean>(false);
  const initalLoadingState = false;
  const [isLoading, setIsLoading] = useState<boolean>(initalLoadingState);
  const [selectSeatOpen, setSelectSeatOpen] = useState<boolean>(false);

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const handleAddToCartClicked = () => {
    // if (isSeatCover && isSelectedColorAvailable === false) {
    //   return; // Don't want to open add to cart selector
    // }
    setIsLoading(true);
    if (isComplete) {
      handleAddToCart();
      handleAddToCartGoogleTag(selectedProduct, params as TPathParams);
      selectedProduct?.sku &&
        track('PDP_add_to_cart', {
          sku: selectedProduct?.sku,
        });
      setIsLoading(false);
      return; // Don't want to open add to cart selector
    }
    setIsLoading(false);
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
      {/* {!isFinalSelection && !isSticky ? (
        <VehicleSelector searchParams={searchParams} />
      ) : ( */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex bg-white p-4 lg:relative lg:p-1">
        <AddToCartButton
          preorder={selectedProduct.preorder}
          isColorAvailable={true} // since we are always allowing customers to add to cart, overriding isSelectedColorAvailable with true
          handleAddToCartClicked={handleAddToCartClicked}
          isLoading={isLoading}
        />
      </div>
      {/* )} */}
    </Suspense>
  );
}
