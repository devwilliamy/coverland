'use client';;
import { Suspense, useContext, useState } from 'react';
import { getCompleteSelectionData } from '../../utils';
import { useStore } from 'zustand';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import AddToCartButton from './AddToCartButtonSeatCover';
import AddtoCartSeatSelect from './AddToCartSeatSelect';
import AddToCartSelector from './AddToCartSelector';
import { track } from '@vercel/analytics';

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
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const [selectSeatOpen, setSelectSeatOpen] = useState<boolean>(false);
  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const handleAddToCartClicked = () => {
    selectedProduct?.sku &&
      track('PDP_add_to_cart', {
        sku: selectedProduct?.sku,
      });
    if (isComplete) {
      setSelectSeatOpen(true);
      return;
    }
    setAddToCartOpen((p) => !p);
  }

  return (
    <Suspense fallback={<></>}>
      <div className="w-full z-20" id="selector">
        {isComplete ? (
          <AddtoCartSeatSelect
            handleAddToCart={handleAddToCart}
            selectSeatOpen={selectSeatOpen}
            setSelectSeatOpen={setSelectSeatOpen}
          />
        ) : (
          <AddToCartSelector
            addToCartSelectorOpen={addToCartOpen}
            setAddToCartSelectorOpen={setAddToCartOpen}
            searchParams={searchParams}
          />
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex bg-white p-4 lg:relative lg:my-3 lg:p-0">
        <AddToCartButton
          handleAddToCartClicked={handleAddToCartClicked}
        />
      </div>
    </Suspense>
  );
}