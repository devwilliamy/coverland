import { useCartContext } from '@/providers/CartProvider';
import CartItemCard from '@/components/checkout/CartItemCard';
import PriceBreakdown from './PriceBreakdown';
import OrderReviewItem from './OrderReviewItem';
import { Separator } from '../ui/separator';
export default function YourCart() {
  const { cartItems } = useCartContext();

  return (
    <>
      {cartItems.length === 0 ? (
        <p className="mt-10 h-20 w-full text-center text-xl">
          Your cart is empty.
        </p>
      ) : (
        <div className="w-full">
          <div className="px-4 lg:hidden">
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
          </div>
          <div className="hidden px-4 lg:flex lg:flex-col ">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="pb-3 lg:border-b lg:border-t lg:pt-3 lg:transition-colors lg:hover:bg-muted/50 lg:data-[state=selected]:bg-muted"
              >
                <CartItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
