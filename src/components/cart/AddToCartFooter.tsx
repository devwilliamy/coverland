import { useCartContext } from '@/providers/CartProvider';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const AddToCartFooter = () => {
  const router = useRouter();
  const { getCartTotalPrice, getTotalCartQuantity, setCartOpen } = useCartContext();
  const totalMsrpPrice = getCartTotalPrice().toFixed(2) as unknown as number;
  const cartQuantity = getTotalCartQuantity();

  const handleClick = () => {
    setCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="p-4 lg:p-5">
      <div className="pr-4 text-end text-xl font-extrabold lg:font-bold">
        <div>Total: ${totalMsrpPrice}</div>
      </div>
      <Button
        onClick={handleClick}
        aria-label="Close"
        className="my-3 h-[48px] w-full bg-[#BE1B1B] text-base font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-lg"
      >
        View Cart ({cartQuantity})
      </Button>
    </div>
  );
};

export default AddToCartFooter;
