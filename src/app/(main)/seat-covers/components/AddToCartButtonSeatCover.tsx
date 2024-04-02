import { Button } from '@/components/ui/button';
import { track } from '@vercel/analytics/react';
import { useContext, useState } from 'react';
import { TPathParams, getCompleteSelectionData } from '../../utils';
import { handleAddToCartGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useParams } from 'next/navigation';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';

export default function AddToCartButton({handleAddToCart, setAddToCartOpen}) {
    const params = useParams<TPathParams>();
  const store = useContext(SeatCoverSelectionContext);
  if (!store) throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
    const isTypeOrCoverPage = !params?.make;

    const [nonFinalButtonText, setNonFinalButtonText] = useState('Start Here');
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
              handleAddToCart();
              handleAddToCartGoogleTag(selectedProduct, params as TPathParams);
              return;
            }
            setAddToCartOpen((p) => !p);
          }}
        >
          <p
            style={
              isTypeOrCoverPage
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
            {isTypeOrCoverPage ? nonFinalButtonText : 'Add To Cart'}
          </p>
        </Button>
    )
}
