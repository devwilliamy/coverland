'use client';
import { useCartContext } from '@/providers/CartProvider';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TCartItem } from '@/lib/cart/useCart';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import AddToCartBody from '../cart/AddToCartBody';
import AddToCartFooter from '../cart/AddToCartFooter';
import YourCartHeader from '../cart/YourCartHeader';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
function Cart() {
  const { cartItems, cartOpen, setCartOpen } = useCartContext();
  const cartColor = cartItems.length > 0 ? '#BE1B1B' : '#000000';
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();
  return (
    <Sheet open={cartOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center">
          <ItemsInCartAnimation cartItems={cartItems} />
          <HiOutlineShoppingCart
            size={24}
            color={cartColor}
            className="mt-1 flex hover:cursor-pointer"
            onClick={() => router.push('/checkout')}
          />
        </div>
      </SheetTrigger>
      {isMobile ? null : (
        // <Dialog key={nanoid()} open={cartOpen} setOpen={setCartOpen} />
        // <BottomUpDrawer
        //   title={<YourCartHeader />}
        //   open={cartOpen}
        //   setOpen={setCartOpen}
        //   footer={<AddToCartFooter />}
        // >
        //   <AddToCartBody />
        // </BottomUpDrawer>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex w-full items-center justify-between py-7 pl-4 pr-7">
              <YourCartHeader />
              <SheetClose
                asChild
                className="cursor-pointer bg-gray-200 text-black *:h-6 *:w-6"
              >
                <button
                  className="rounded-full"
                  onClick={() => setCartOpen(false)}
                >
                  <IoClose />
                </button>
              </SheetClose>
            </SheetTitle>
            <div className="border-b bg-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.1)]"></div>
          </SheetHeader>
          <div className="mx-auto flex h-screen w-full flex-col overflow-y-scroll px-4 pt-20">
            <AddToCartBody />
          </div>
          <div className="w-full bg-white shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)]">
            <SheetFooter>
              <SheetClose asChild>
                <AddToCartFooter />
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
}

type ItemsInCartAnimation = {
  cartItems: TCartItem[];
};

const ItemsInCartAnimation = ({
  cartItems,
}: ItemsInCartAnimation): JSX.Element => {
  return (
    <>
      {cartItems?.length > 0 && (
        <span className="relative flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BE1B1B] opacity-75"></span>
          <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#BE1B1B] text-xs text-white">
            {cartItems?.length}
          </span>
        </span>
      )}
    </>
  );
};

export default Cart;
