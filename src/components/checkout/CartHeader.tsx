import { useCartContext } from '@/providers/CartProvider';

export default function CartHeader() {
  const { getTotalCartQuantity } = useCartContext();
  const cartQuantity = getTotalCartQuantity();
  return (
    <div
      className="flex h-full flex-1
        flex-col items-center 
        leading-4 lg:flex lg:flex-row lg:gap-2 lg:pb-4"
    >
      <div className="text-[22px] font-bold text-black">Checkout</div>
      <div className="pt-2 text-base font-light lg:pb-0">
        {cartQuantity} Items
      </div>
    </div>
  );
}
