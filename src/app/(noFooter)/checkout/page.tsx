'use client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCartContext } from '@/providers/CartProvider';
import Image from 'next/image';
import React, { ChangeEvent, Suspense, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCheckoutViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { TCartItem } from '@/lib/cart/useCart';
import {
  paypalCaptureOrder,
  paypalCreateOrder,
  redirectToCheckout,
} from './utils';

function CheckoutPage() {
  const {
    cartItems,
    removeItemFromCart,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    clearLocalStorageCart,
  } = useCartContext();

  const router = useRouter();

  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const totalDiscountedPrice = getTotalDiscountPrice().toFixed(
    2
  ) as unknown as number;
  const orderSubtotal = getOrderSubtotal().toFixed(2) as unknown as number;
  const cartQuantity = getTotalCartQuantity();
  useCheckoutViewedGoogleTag();

  return (
    <div className="">
      {cartItems.length === 0 ? (
        <p className="mt-10 h-20 w-full text-center text-xl">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-24">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="flex h-full
                flex-row items-center justify-between text-3xl
                md:flex md:flex-row md:gap-2"
                >
                  <div onClick={() => router.back()}>
                    <IoArrowBack />
                  </div>
                  <div
                    className="flex h-full flex-1
                flex-col items-center 
                leading-4 md:flex md:flex-row md:gap-2"
                  >
                    <div className="text-[22px] font-bold text-black">Cart</div>
                    <div className="text-base font-normal md:pb-0">
                      {cartQuantity} Items
                    </div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            {cartItems.map((item) => {
              return <CartItemCard item={item} key={item?.sku} />;
            })}
          </Table>

          <CheckoutSummarySecton
            totalMsrpPrice={totalMsrpPrice}
            orderSubtotal={orderSubtotal}
            totalDiscountedPrice={totalDiscountedPrice}
            cartItems={cartItems}
            clearLocalStorageCart={clearLocalStorageCart}
          />
        </div>
      )}
    </div>
  );
}
export default CheckoutPage;

function CartItemCard({ item }: { item: TCartItem }) {
  const { removeItemFromCart } = useCartContext();
  return (
    <TableBody key={item?.sku}>
      <TableRow className="flex flex-col">
        <TableCell className="flex w-full justify-items-center gap-2 text-2xl font-medium">
          <div className="h-9/12 w-3/12 justify-items-center ">
            <Image
              className="bg-gray-100 p-[6.5px] "
              src={(item?.feature as string) || ''}
              width={137.5}
              height={137.5}
              alt={`The image for a ${item?.product_name || ''} car cover`}
            />
          </div>
          <div className="flex w-7/12 flex-col gap-1">
            <div className="w-10/12 text-base font-bold lg:text-lg">
              {item?.display_id}&trade; {item?.type}
            </div>
            <div
              className={`text-sm font-normal ${!item?.make && 'hidden'} text-[#707070] lg:text-base`}
            >
              Vehicle: {item?.make} {item?.model} {item?.year_generation}{' '}
              {item?.submodel1 ?? ''} {item?.submodel2 ?? ''}
            </div>
            <div
              className={`text-sm font-normal ${item?.type === 'Seat Covers' ? 'flex' : 'hidden'}  text-[#707070] lg:text-base`}
            >
              Seat Cover
            </div>
            <div className="text-sm font-normal text-[#707070] lg:text-base">
              Color: {item?.display_color}
            </div>
            <div className="flex gap-3 text-sm font-normal text-[#707070] lg:text-base">
              <div className="font-medium lg:text-base">Quantity</div>
              <div className="font-medium lg:text-base">{item?.quantity}</div>
            </div>
          </div>
          <div className="flex w-2/12 flex-col text-right ">
            <div className="text-base font-bold lg:text-lg">
              $
              {item?.msrp
                ? (parseFloat(item?.msrp) * item?.quantity).toFixed(2)
                : ''}
            </div>
            <div className="text-sm font-normal text-[#707070] line-through decoration-[#707070] lg:text-base">
              {item?.price &&
                `$${(parseFloat(item?.price as string) * item?.quantity).toFixed(2)}`}
            </div>
          </div>
        </TableCell>
        <TableCell className="flex items-end justify-between pb-2 pt-0">
          <div className="flex flex-col">
            <div className="text-sm font-normal text-[#343434] lg:text-base">
              Same-Day Shipping
            </div>
            <div className="flex items-center gap-3 pt-1 text-sm font-normal text-[#343434] lg:text-base">
              <div>Free Delivery</div>
            </div>
          </div>
          <IconContext.Provider
            // Trash Icon
            value={{
              className: 'cursor-pointer',
            }}
          >
            <FaRegTrashAlt
              size={20}
              color="grey"
              onClick={() => {
                removeItemFromCart(item?.sku);
              }}
            />
          </IconContext.Provider>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

function CheckoutSummarySecton({
  totalMsrpPrice,
  orderSubtotal,
  totalDiscountedPrice,
  cartItems,
  clearLocalStorageCart,
}: {
  totalMsrpPrice: number;
  orderSubtotal: number;
  totalDiscountedPrice: number;
  cartItems: TCartItem[];
  clearLocalStorageCart: () => void;
}) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="mt-2 px-4 pb-[4vh] md:w-4/12">
      <div className="text-xl font-bold lg:text-[22px]">Summary</div>
      <div className="lg:hidden">
        <div className="py-[1vh] text-base font-normal text-[#343434]">
          <div className="flex justify-between ">
            <div>Order Subtotal</div>
            <div>${orderSubtotal}</div>
          </div>
          <div className="flex justify-between text-[#D13C3F]">
            <div>Sale-discount</div>
            <div>-${totalDiscountedPrice}</div>
          </div>
        </div>
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
            currency: 'USD',
            intent: 'capture',
            components: 'buttons',
            disableFunding: 'card',
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <PayPalButtons
              style={{
                color: 'gold',
                shape: 'rect',
                label: 'pay',
                height: 50,
              }}
              createOrder={async () => {
                const data = await paypalCreateOrder(totalMsrpPrice);
                if (!data) {
                  console.log('Error creating order');
                  return '';
                }
                return data;
              }}
              onApprove={async (data) => {
                const response = await paypalCaptureOrder(data.orderID);
                if (response.success) {
                  clearLocalStorageCart();
                  router.push(`/thank-you?order-number=CL-P-${data.orderID}`);
                }
              }}
            />
          </Suspense>
        </PayPalScriptProvider>
      </div>
      <div className="hidden justify-between lg:flex">
        <div>Order Subtotal</div>
        <div>${orderSubtotal}</div>
      </div>

      <div className="mt-[3vh] text-base font-normal text-[#343434]">
        Do you have a Promo Code?
      </div>
      <div className="mt-[2vh] flex h-8 justify-center gap-2">
        <input
          className="w-8/12 rounded border border-[#9C9C9C]"
          value={promoCode}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPromoCode(e.target.value);
          }}
        />
        <div
          className={`
                flex h-8 w-4/12 cursor-pointer items-center
                justify-center rounded border
                border-[#343434] text-lg font-bold text-[#1A1A1A]
                transition ease-in-out hover:bg-black hover:text-white
                ${promoError && 'bg-red-600'}
                `}
          onClick={() => {
            if (promoCode.length <= 0) {
              setPromoError(true);
            }
            // setPromoCode('');
          }}
        >
          Apply
        </div>
      </div>
      <div className="pb-20">
        <div className="self-end pb-1 pr-5 text-lg font-bold max-md:hidden lg:font-bold">
          Order Total: ${totalMsrpPrice}
        </div>
      </div>
      <div className="my-8 hidden w-full justify-center md:flex md:flex-col lg:w-[350px]">
        <Button
          variant={'default'}
          className="mb-3 w-full rounded-lg bg-[#BE1B1B]  text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl"
          onClick={() => {
            redirectToCheckout({ cartItems, promoCode, setLoading });
            setLoading(true);
          }}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            'Checkout'
          )}
        </Button>
        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
            currency: 'USD',
            intent: 'capture',
            components: 'buttons',
            disableFunding: 'card',
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <PayPalButtons
              style={{
                color: 'gold',
                shape: 'rect',
                label: 'pay',
                height: 55,
              }}
              createOrder={async () => {
                const data = await paypalCreateOrder(totalMsrpPrice);
                if (!data) {
                  console.log('Error creating order');
                  return '';
                }
                return data;
              }}
              onApprove={async (data) => {
                const response = await paypalCaptureOrder(data.orderID);
                if (response.success) {
                  clearLocalStorageCart();
                  router.push(`/thank-you?order-number=CL-P-${data.orderID}`);
                }
              }}
            />
          </Suspense>
        </PayPalScriptProvider>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-[200] bg-white p-4 shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)] md:hidden">
        <div className="flex flex-col items-center justify-between">
          <div className="self-end pb-1 pr-5 text-lg font-bold lg:font-bold">
            Order Total: ${totalMsrpPrice}
          </div>
          <Button
            variant={'default'}
            className="h-[48px] w-full max-w-xs rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl"
            onClick={async () => {
              setLoading(true);
              await redirectToCheckout({ cartItems, promoCode, setLoading });
            }}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              'Checkout'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
