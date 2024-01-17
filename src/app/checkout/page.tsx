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
import Link from 'next/link';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';

function CheckoutPage() {
  const { cartItems, adjustItemQuantity, removeItemFromCart, getTotalPrice } =
    useCartContext();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState(false);
  let total = 0;
  const [quantity, setQuantity] = useState(Number);
  const redirectToCheckout = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
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

  const calculateTotal = () => {
    if (cartItems.length > 0) {
      // let totalNum = 0;
      // for (const item of cartItems) {
      //   totalNum += parseInt(item?.price as string);
      // }
      // total = totalNum
    }
  };
  total = getTotalPrice();
  console.log(cartItems);
  return (
    <div className="">
      {cartItems.length === 0 && (
        <p className="mt-10 h-20 w-full text-center text-xl">
          Your cart is empty.
        </p>
      )}
      {!!cartItems.length && (
        <div className="flex flex-col md:flex md:flex-row md:gap-12">
          <Table className="mt-4 w-full">
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="color-black flex h-full
                flex-col items-center text-3xl font-bold
                md:flex md:items-start md:gap-2"
                >
                  <div className="font-black text-black">Cart</div>
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
                  <TableRow className="flex flex-col">
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
                      </div>

                      <div className="flex w-7/12 flex-col gap-2 p-2">
                        <div className="w-10/12 text-3xl font-bold">
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
                          <div> {item.quantity}</div>
                          {/* <select
                            className="min-w-[50px]"
                            // value={item.quantity}
                          >
                            ^ Will want to add cursor Pointer Here ^
                            <option> Delete </option>
                            {[...new Array(6)].map((optionNumber, optionIndex) => (
                              <option
                                key={optionNumber}
                                onClick={() => {
                                  // setQuantity(index + 1);
                                  adjustItemQuantity(item.sku, optionIndex + 1);
                                  console.log("Option Clicked:");
                                  
                                  // calculateTotal();
                                }}
                              >
                                {optionIndex + 1}
                              </option>
                            ))}
                          </select> */}
                        </div>
                      </div>

                      <div className="h-12/12 flex w-2/12 flex-col items-end justify-between text-right ">
                        <div className="">
                          <div className="font-bold">
                            $
                            {item.msrp
                              ? parseInt(item.msrp) * item.quantity
                              : ''}
                          </div>
                          <div className="text-xl font-thin text-gray-400 line-through decoration-gray-400">
                            ${parseInt(item?.price as string) * item.quantity}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <div className="text-xl">Same-Day Shipping</div>
                        <div className="flex items-center gap-2 text-xl">
                          <div>Free Delivery</div>
                          <IconContext.Provider
                            // Info Circle Icon
                            value={{
                              className: 'cursor-pointer h-full w-[3vh]',
                            }}
                          >
                            <IoInformationCircleOutline />
                          </IconContext.Provider>
                        </div>
                      </div>
                      <IconContext.Provider
                        // Trash Icon
                        value={{
                          className: 'cursor-pointer h-full w-[3vh]',
                        }}
                      >
                        <FaRegTrashAlt
                          className=""
                          color="grey"
                          onClick={() => {
                            removeItemFromCart(item.sku);
                          }}
                        />
                      </IconContext.Provider>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
          <div className="mt-4 p-2 pb-[4vh] md:w-4/12">
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
                font-bold transition ease-in-out hover:bg-black hover:text-white
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
                <div>${total}</div>
              </div>
              <div className="flex justify-between text-red-500">
                <div>Sale-discount</div>
                <div>${total}</div>
              </div>
            </div>
            <div className="border-grey flex justify-between border-b py-[3vh] text-xl font-thin">
              <div>Order Total</div>
              <div>${total}</div>
            </div>
            <div className="my-10 flex w-full justify-center">
              <Button
                variant={'default'}
                className="w-40 bg-[#BE1B1B] text-xl"
                onClick={redirectToCheckout}
              >
                Checkout
              </Button>
            </div>
            {/* <Link
                href=""
                className="flex flex-col text-white bg-black"
              >
              </Link> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
