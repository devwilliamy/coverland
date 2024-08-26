import { useCartContext } from '@/providers/CartProvider';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import {
  PREORDER_CONFIRM,
  PREORDER_PREVIEW,
  PreorderStep,
} from './PreorderSheet';

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
  const router = useRouter();
  const { setCartOpen } = useCartContext();

  const handleClick = () => {
    if (currentStep === PREORDER_PREVIEW) {
      handleNextStep();
    } else if (currentStep === PREORDER_CONFIRM) {
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
        {currentStep === PREORDER_CONFIRM
          ? 'Checkout'
          : 'Pre-Order Now'}
      </Button>
    </div>
  );
};

export default PreorderFooter;
