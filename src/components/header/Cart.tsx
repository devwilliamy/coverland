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
import { useState } from 'react';

function Cart() {
  const { cartItems } = useCartContext();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const cartColor = cartItems.length > 0 ? '#BE1B1B' : '#000000';

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <ShoppingCart
            size={isMobile ? 24 : 32}
            color={cartColor}
            className="hover:cursor-pointer"
          />
        </SheetTrigger>
        {cartItems.length > 0 && (
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BE1B1B] opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#BE1B1B] text-xs text-white">
              {cartItems.length}
            </span>
          </span>
        )}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Ready to checkout? Click the button below
            </SheetDescription>
          </SheetHeader>
          {cartItems.map((item) => {
            return <CartLineItem key={item.sku} item={item} />;
          })}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" className="mt-10 w-full" asChild>
                <Link href="/checkout">Checkout</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const CartLineItem = ({ item }: { item: TCartItems }) => {
  console.log(item);
  return (
    <Card>
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
