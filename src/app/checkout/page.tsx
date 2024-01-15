'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useCartContext } from '@/providers/CartProvider';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { IoInformationCircleOutline, IoTrashBin } from 'react-icons/io5';
import { dummyCartData } from '@/lib/constants';
import Link from 'next/link';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';

function CheckoutPage() {
  const { cartItems, adjustItemQuantity, addToCart } = useCartContext();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState(false);
  let total = 0;
  const redirectToCheckout = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );

      if (!stripe) throw new Error('Stripe failed to initialize.');

      const checkoutResponse = await fetch('/api/checkout-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (cartItems.length > 0) {
    let totalNum = 0;

    for (const item of cartItems) {
      totalNum += parseInt(item.price);
    }
    total = totalNum;
  }
  console.log(cartItems);

  return (
    <div className="">
      {/* {cartItems.length === 0 && (
        <p className="text-xl w-full text-center h-20 mt-10">
          Your cart is empty.
        </p>
      )} */}
      {!!cartItems.length && (
        <div className="flex gap-12">
          <Table className="mt-4 md:w-8/12 lg:w-full">
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="color-black flex items-center gap-2 text-3xl font-bold">
                  Cart
                  <div className="text-xl font-thin">
                    {cartItems.length} Items
                  </div>
                </TableHead>
                {/* <TableHead className="text-xl"> Summary </TableHead> */}
                {/* <TableHead className="text-xl">QTY</TableHead>
                <TableHead className="text-xl hidden md:block">Price</TableHead>
                <TableHead className="text-right text-xl">Total</TableHead> */}
              </TableRow>
            </TableHeader>

            {cartItems.map((item) => {
              return (
                <TableBody key={item.sku}>
                  <TableRow>
                    <TableCell className="flex w-full text-2xl font-medium">
                      {/* {`${item.make} ${item.product_name} - ${item.display_id} ${item.display_color}`} */}
                      <div className="h-9/12 w-3/12 justify-items-center p-2">
                        <Image
                          className="bg-gray-100 p-2"
                          src={item?.feature as string}
                          width={200}
                          height={200}
                          alt={`The image for a ${item.product_name} car cover`}
                        />
                        <div className="text-xl">Same-Day Shipping</div>
                        <div className="flex items-center gap-2 text-xl">
                          <div>Free Delivery</div>
                          <IoInformationCircleOutline />
                        </div>
                      </div>

                      <div className="w-7/12 p-2">
                        <div className="text-3xl font-bold">
                          {item?.display_id} {item.type}
                        </div>
                        <div className="text-lg font-thin text-gray-500">
                          Vehicle: {item?.make} {item.model}
                        </div>
                        <div className="text-lg font-thin text-gray-500">
                          Color: {item.display_color}
                        </div>
                        <div className="flex gap-3 text-lg font-thin text-gray-500">
                          <div className="font-bold">Quantity</div>
                          <select className="min-w-[50px]">
                            {/* <option> Delete </option> */}
                            {[...new Array(6)].map((item, index) => (
                              <option key={item}>{index + 1}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <IconContext.Provider
                        value={{
                          className: 'cursor-pointer',
                        }}
                      >
                        <div className="h-12/12 flex w-2/12 flex-col items-end justify-between text-right ">
                          <div className="">
                            <div className="font-bold">
                              Price: ${item.price}
                            </div>
                            <div className="text-xl font-thin text-gray-400 line-through decoration-gray-400">
                              ${parseInt(item.price) * 2}
                            </div>
                          </div>
                          {/* <IoTrashBin /> */}
                          <FaRegTrashAlt color="grey" />
                        </div>
                      </IconContext.Provider>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
          <div className="mt-4 p-2 md:w-4/12">
            <div className="text-3xl font-bold">Summary</div>
            <div className="mt-[3vh] text-2xl font-thin">
              Do you have a Promo Code?
            </div>
            <div className="mt-[3vh] flex min-h-[4vh] justify-center gap-2">
              <input
                className="w-8/12 rounded border border-gray-400"
                value={promoCode}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPromoCode(e.target.value);
                }}
              />
              <div
                className={`
                100 flex w-4/12 cursor-pointer
                items-center justify-center rounded
                border border-black text-lg
                font-bold transition
                ease-in-out hover:bg-black hover:text-white
                ${promoError && 'bg-red-600'}
                `}
                onClick={() => {
                  if (promoCode.length <= 0) {
                    setPromoError(true);
                  }
                  setPromoCode('');
                }}
              >
                Apply
              </div>
            </div>
            <div className="border-grey border-b py-[3vh] text-xl font-thin">
              <div className="flex justify-between ">
                <div>Order Subtotal</div>
                <div>${`${total}.00`}</div>
              </div>
              <div className="flex justify-between text-red-500">
                <div>Sale-discount</div>
                <div>${`${total}.00`}</div>
              </div>
            </div>
            <div className="border-grey flex justify-between border-b py-[3vh] text-xl font-thin">
              <div>Order Total</div>
              <div>${`${total}.00`}</div>
            </div>
            {/* <Link
                href=""
                className="flex flex-col text-white bg-black"
              >
              </Link> */}
            <div
              className="
                100 mt-[4vh] flex
                min-h-[5vh] cursor-pointer flex-col
                items-center justify-center rounded
                bg-black text-[2vh] text-white
                transition ease-in-out 
                hover:border hover:border-black hover:bg-white hover:text-black
              "
            >
              CHECKOUT
            </div>
          </div>
          {/* <div className="w-full my-10 flex justify-center">
            <Button
              variant={'default'}
              className="text-xl w-40 bg-[#BE1B1B]"
              onClick={redirectToCheckout}
            >
              Checkout
            </Button>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
