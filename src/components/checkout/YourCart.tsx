import { useCartContext } from '@/providers/CartProvider';
import CartItemCard from '@/components/checkout/CartItemCard';
import PriceBreakdown from './PriceBreakdown';
import OrderReviewItem from './OrderReviewItem';
import { Separator } from '../ui/separator';
import StickyCheckoutButton from './StickyCheckoutButton';
import PromoCode from './PromoCode';
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
          <div className="max-lg:px-4 lg:flex lg:flex-col">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="border-b border-t py-[26px] transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <CartItemCard item={item} />
              </div>
            ))}
            <div className="pb-20 pt-4 lg:hidden">
              <div className="text-xl font-medium">Summary</div>
              <div className="pt-6">{/* <PromoCode /> */}</div>
              <div className="pt-4">
                <PriceBreakdown />
              </div>
            </div>
          </div>
          <StickyCheckoutButton />
        </div>
      )}
    </>
  );
}
