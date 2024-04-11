import { useCartContext } from '@/providers/CartProvider';

export default function CartHeader() {
  const { getTotalCartQuantity } = useCartContext();
  const cartQuantity = getTotalCartQuantity();
  return (
    <div
      className="flex h-full flex-1
        flex-col items-center 
        leading-4 md:flex md:flex-row md:gap-2 md:pb-4"
    >
      <div className="text-[22px] font-bold text-black">Checkout</div>
      <div className="pt-2 text-base font-light md:pb-0">
        {cartQuantity} Items
      </div>
    </div>
  );
}
