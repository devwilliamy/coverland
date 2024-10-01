import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { getCompleteSelectionData } from '../../utils';
import CarMagnify from '@/components/icons/CarMagnify';
import { FaSpinner } from 'react-icons/fa';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';

type AddToCartButtonProps = {
  handleAddToCart: () => void;
  preorder: boolean;
  isColorAvailable: boolean;
  isLoading: boolean;
};
export default function AddToCartButton({
  preorder,
  isColorAvailable,
  handleAddToCart,
  isLoading,
}: AddToCartButtonProps) {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');

  const modelData = useStore(store, (s) => s.modelData);

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const [nonFinalButtonText, setNonFinalButtonText] = useState(
    'Find your Custom-Cover'
  );
  const blinkTime = 2;
  const blinkVel = 10;
  
  return (
    <Button
      className="h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] lg:h-[62px]"
      onClick={handleAddToCart}
      disabled={!isColorAvailable}
    >
      <div
        className="flex gap-[10px]"
        style={
          !isComplete || preorder
            ? {
                animation: `blink ${blinkTime}s cubic-bezier(0,-${blinkVel},1,${blinkVel}) infinite`,
              }
            : {}
        }
        onAnimationIteration={() => {
          setNonFinalButtonText((e) => {
            if (e === 'Pre-order & Save Big') {
              return 'Pre-order & Save Big';
            }

            if (e === 'Start Here') {
              return 'Find your Custom-Cover';
            }
            return 'Start Here';
          });
        }}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          nonFinalButtonText === 'Start Here' &&
          !preorder &&
          !isComplete && (
            // <Image alt="car-magnifying-glass" src={CarMag} />
            <div className="flex min-h-[30px] min-w-[67px]">
              <CarMagnify />
            </div>
          )
        )}
        <p>
          {!isComplete
            ? nonFinalButtonText
            : preorder
              ? 'Pre-order & Save Big'
              : 'Add To Cart'}
        </p>
      </div>
    </Button>
  );
}
