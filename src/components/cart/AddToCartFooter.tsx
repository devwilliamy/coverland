import { useCartContext } from '@/providers/CartProvider';
import Link from 'next/link';
import { Button } from '../ui/button';

const AddToCartFooter = () => {
  const { getTotalPrice, getTotalCartQuantity, setCartOpen } = useCartContext();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const cartQuantity = getTotalCartQuantity();

  const handleClick = () => {
    setCartOpen(false);
  };

  return (
    <div className="p-4 lg:p-5">
      <div className="pr-4 text-end text-xl font-extrabold lg:font-bold">
        <div>Total: ${totalMsrpPrice}</div>
      </div>
      <Link
        href="/checkout"
        onClick={handleClick}
        className="
      my-3 inline-flex h-[48px] w-full items-center justify-center whitespace-nowrap rounded-md bg-[#BE1B1B] bg-primary text-base text-sm font-bold font-medium uppercase
      text-primary-foreground text-white ring-offset-background
      transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-[#BE1B1B] disabled:opacity-50 md:h-[62px] md:text-lg"
      >
        View Cart ({cartQuantity})
      </Link>
    </div>
  );
};

export default AddToCartFooter;
