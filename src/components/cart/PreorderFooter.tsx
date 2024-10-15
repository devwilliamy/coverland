import { useCartContext } from '@/providers/CartProvider';
import { Button } from '../ui/button';
import { useParams, useRouter } from 'next/navigation';
import {
  PREORDER_CONFIRM,
  PREORDER_PREVIEW,
  PreorderStep,
} from './PreorderSheet';
import { handlePreorderAddToCartGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import useStoreContext from '@/hooks/useStoreContext';
import { TPathParams } from '@/utils';
import { useStore } from 'zustand';

type PreorderFooterProps = {
  currentStep: PreorderStep;
  handleNextStep: () => void;
  checked: boolean;
};
const PreorderFooter = ({
  currentStep,
  handleNextStep,
  checked,
}: PreorderFooterProps) => {
  const params = useParams<TPathParams>();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const router = useRouter();
  const { setCartOpen } = useCartContext();

  const handleClick = () => {
    if (currentStep === PREORDER_PREVIEW) {
      if (process.env.NEXT_PUBLIC_IS_PREVIEW !== 'PREVIEW') {
        handlePreorderAddToCartGoogleTag(
          selectedProduct,
          params as TPathParams,
          'preorder_2_discount-and-date'
        );
      }
      handleNextStep();
    } else if (currentStep === PREORDER_CONFIRM) {
      if (process.env.NEXT_PUBLIC_IS_PREVIEW !== 'PREVIEW') {
        handlePreorderAddToCartGoogleTag(
          selectedProduct,
          params as TPathParams,
          'preorder_3_acknowledge-checkbox'
        );
      }
      setCartOpen(false);
      router.push('/checkout');
    }
  };

  const isDisabled = currentStep === PREORDER_CONFIRM && checked === false;

  return (
    <div className="p-4 lg:p-5">
      <Button
        onClick={handleClick}
        aria-label="Close"
        disabled={isDisabled}
        className="my-3 h-[48px] w-full bg-[#BE1B1B] text-base font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-lg"
      >
        {currentStep === PREORDER_CONFIRM ? 'Checkout' : 'Pre-Order Now'}
      </Button>
    </div>
  );
};

export default PreorderFooter;
