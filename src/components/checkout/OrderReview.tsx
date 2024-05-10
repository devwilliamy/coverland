import { useCartContext } from '@/providers/CartProvider';
import OrderReviewItem from './OrderReviewItem';
import { Table, TableBody } from '../ui/table';
import { CheckoutStep } from '@/lib/types/checkout';
import { useCheckoutContext } from '@/contexts/CheckoutContext';

export default function OrderReview() {
  const { cartItems } = useCartContext();
  const { currentStep } = useCheckoutContext();
  return (
    <div className={`${currentStep === CheckoutStep.CART && 'lg:hidden'}`}>
      <div id="order-review" className="pb-2 pt-9 text-2xl font-medium">
        Order Review
      </div>
      {cartItems.map((cartItem, i) => (
        <div key={i} className="pb-2">
          <OrderReviewItem item={cartItem} />
        </div>
      ))}
    </div>
  );
}
