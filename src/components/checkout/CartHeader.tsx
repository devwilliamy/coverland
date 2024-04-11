import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import { useCartContext } from '@/providers/CartProvider';

export default function CartHeader() {
  const { currentStep } = useCheckoutContext();
  const { getTotalCartQuantity, getTotalPrice } = useCartContext();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const cartQuantity = getTotalCartQuantity();
  const titleText = currentStep === CheckoutStep.CART ? 'Cart' : 'Checkout';
  const itemText = cartQuantity > 1 ? 'Items' : 'Item';
  return (
    <div
      className="flex flex-1
        flex-col items-center 
        leading-4 lg:flex-row lg:gap-2 lg:pb-4 lg:pl-4"
    >
      <div className="text-[22px] font-bold text-black">{titleText}</div>
      <div className="pt-2 text-base font-light lg:pb-0">
        {cartQuantity} {itemText}{' '}
        <span className="lg:hidden">- ${totalMsrpPrice}</span>
      </div>
    </div>
  );
}
