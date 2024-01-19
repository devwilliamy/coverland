'use client';

import { useCartContext } from '@/providers/CartProvider';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { TCartItems } from '@/lib/cart/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';

function Cart() {
  const { cartItems, cartOpen, setCartOpen } = useCartContext();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const cartColor = cartItems.length > 0 ? '#BE1B1B' : '#000000';

  return (
    <Sheet open={cartOpen}>
      <SheetTrigger asChild>
        <button
          className="mt-1 flex h-[40px] w-5 items-center md:order-last"
          onClick={() => setCartOpen(!cartOpen)}
        >
          <div className="h-[17px] w-[17px] *:h-full *:w-full lg:h-[20px] lg:w-[20px]">
            <HiOutlineShoppingCart />
          </div>
        </button>
        {/* <ShoppingCart
            size={isMobile ? 24 : 32}
            color={cartColor}
            className="hover:cursor-pointer"
          /> */}
      </SheetTrigger>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle className="flex w-full items-center justify-between">
            <div className="text-green-600 *:h-5 *:w-5">
              <FaCheck />
            </div>
            Your Cart
            <SheetClose
              asChild
              className="cursor-pointer bg-gray-200 text-black *:h-8 *:w-8"
            >
              <button
                className="rounded-full"
                onClick={() => setCartOpen(false)}
              >
                <IoIosClose />
              </button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        {cartItems.map((item) => {
          return <CartLineItem key={item.sku} item={item} />;
        })}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="mt-10 w-full" asChild>
              <Link href="/checkout" onClick={() => setCartOpen(false)}>
                Checkout
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const CartLineItem = ({ item }: { item: TCartItems }) => {
  // console.log(item);
  return (
    <Card className="my-1 w-full">
      <CardHeader>
        <CardTitle>{item.product_name}</CardTitle>
        <CardDescription>
          {item.display_color} {item.product_name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={item.feature as string}
          alt={item.product_name as string}
          width={150}
          height={150}
        />
        <p>${item.msrp}</p>
      </CardContent>
      <CardFooter>{/* <p>Card Footer</p> */}</CardFooter>
    </Card>
  );
};

export default Cart;
