import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics/react';
import { useContext, useState } from 'react';
import { TPathParams, getCompleteSelectionData } from '../../utils';
import { useParams } from 'next/navigation';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import CarMagnify from '@/components/icons/CarMagnify';

type AddToCartButtonProps = {
  setSelectSeatOpen: (open: boolean) => void;
  setAddToCartOpen: (open: boolean) => void;
};
export default function AddToCartButton({
  setSelectSeatOpen,
  setAddToCartOpen,
}: AddToCartButtonProps) {
  const params = useParams<TPathParams>();
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const isFinalSelection = params?.year;

  const [nonFinalButtonText, setNonFinalButtonText] = useState('');
  const blinkTime = 2;
  const blinkVel = 10;
  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });
  
  return (
    <Button
      className=" h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] lg:h-[62px]"
      onClick={() => {
        selectedProduct?.sku &&
          track('PDP_add_to_cart', {
            sku: selectedProduct?.sku,
          });
        if (isComplete) {
          setSelectSeatOpen(true);
          return;
        }
        setAddToCartOpen((p) => !p);
      }}
    >
      <div
        className="flex gap-[10px]"
        style={
          !isFinalSelection
            ? {
                animation: `blink ${blinkTime}s cubic-bezier(0,-${blinkVel},1,${blinkVel}) infinite`,
              }
            : {}
        }
        onAnimationIteration={() => {
          setNonFinalButtonText((e) => {
            if (e === 'Start Here') {
              return 'Find your Custom-Cover';
            }
            return 'Start Here';
          });
        }}
      >
        {nonFinalButtonText === 'Start Here' && (
          // <Image alt="car-magnifying-glass" src={CarMag} />
          <div className="flex min-h-[30px] min-w-[67px]">
            <CarMagnify />
          </div>
        )}
        <p className="">
          {!isFinalSelection ? nonFinalButtonText : 'Add To Cart'}
        </p>
      </div>
    </Button>
  );
}
