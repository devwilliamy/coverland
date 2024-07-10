import { useCartContext } from '@/providers/CartProvider';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const AddToCartFooter = () => {
  const router = useRouter();
  const { getTotalPrice, getTotalCartQuantity, setCartOpen } = useCartContext();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const cartQuantity = getTotalCartQuantity();

  const handleClick = () => {
    setCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="p-4 lg:p-5">
      <Button
        onClick={handleClick}
        aria-label="Close"
        className="my-3 h-[48px] w-full bg-[#BE1B1B] text-base font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-lg"
      >
        Checkout
      </Button>
    </div>
  );
};

export default AddToCartFooter;
