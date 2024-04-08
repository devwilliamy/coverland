import { useCartContext } from '@/providers/CartProvider';
import OrderReviewItem from './OrderReviewItem';

export default function OrderReview() {
  const { cartItems } = useCartContext();
  return (
    <>
      <div className="pb-7 pt-9 text-2xl font-medium">Order Review</div>
      {cartItems.map((cartItem, i) => (
        <OrderReviewItem key={i} item={cartItem} />
      ))}
    </>
  );
}
