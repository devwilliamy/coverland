import { useCartContext } from '@/providers/CartProvider';
import { Separator } from '../ui/separator';
import OrderReviewItem from './OrderReviewItem';
import PriceBreakdown from './PriceBreakdown';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';

export default function InYourCart() {
  const { cartItems } = useCartContext();
  const { setCurrentStep } = useCheckoutContext();

  return (
    <>
      <div className="flex flex-row justify-end">
        <div
          onClick={() => setCurrentStep(CheckoutStep.CART)}
          className="mb-2 cursor-pointer font-[500] underline hover:text-[#0C87B8]"
        >
          Edit
        </div>
      </div>
      {cartItems.map((cartItem, i) => (
        <div
          key={i}
          className="pb-3 lg:border-b lg:border-t lg:pt-3 lg:transition-colors lg:hover:bg-muted/50 lg:data-[state=selected]:bg-muted"
        >
          <OrderReviewItem item={cartItem} />
        </div>
      ))}
      <Separator className="mt-2 w-full bg-[#C8C7C7] lg:hidden" />
      <div className="mt-4 lg:hidden">
        <PriceBreakdown />
      </div>
    </>
  );
}
