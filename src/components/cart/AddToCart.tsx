'use client';
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

export default function AddToCart({
  selectedProduct,
  handleAddToCart,
  searchParams,
}: {
  selectedProduct: any;
  handleAddToCart: () => void;
  searchParams: TQueryParams;
}) {
  const params = useParams<TPathParams>();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const { isSeatCover } = useDetermineType();


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
    setIsLoading(true);
    if (isComplete) {
      handleAddToCart();
      handleAddToCartGoogleTag(selectedProduct, params as TPathParams);
      selectedProduct?.sku &&
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
      <div className="fixed inset-x-0 bottom-0 z-20 flex bg-white p-4 lg:relative lg:p-1">
        <AddToCartButton
          preorder={selectedProduct.preorder}
          isColorAvailable={true} // since we are always allowing customers to add to cart, overriding isSelectedColorAvailable with true
          handleAddToCartClicked={handleAddToCartClicked}
          isLoading={isLoading}
        />
      </div>
    </Suspense>
  );
}
