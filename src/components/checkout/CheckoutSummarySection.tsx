'use client';
import { Button } from '@/components/ui/button';
import { ChangeEvent, Suspense, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { TCartItem } from '@/lib/cart/useCart';
import {
  paypalCaptureOrder,
  paypalCreateOrder,
  redirectToCheckout,
} from '@/app/(noFooter)/checkout/utils';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import { Separator } from '../ui/separator';
import PromoCode from './PromoCode';

export default function CheckoutSummarySection({
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
  const { currentStep, nextStep, setCurrentStep } = useCheckoutContext();
  const isCartStep = currentStep === CheckoutStep.CART;
  return (
    <div className="px-4 pb-[4vh] ">
      <div className="flex items-center justify-between pb-12 lg:pb-8">
        <div className="text-xl font-bold lg:text-[22px]">
          {isCartStep ? 'Summary' : 'In Your Cart'}
        </div>
        {!isCartStep && (
          <div
            onClick={() => setCurrentStep(CheckoutStep.CART)}
            className="cursor-pointer text-[#0C87B8] underline"
          >
            Edit
          </div>
        )}
      </div>
      <div className="lg:pb-4">
        <PromoCode />
      </div>
      <div className="hidden justify-between lg:flex">
        <div>Order Subtotal</div>
        <div>${orderSubtotal}</div>
      </div>
      <div className="flex justify-between text-[#D13C3F]">
        <div>Sale-discount</div>
        <div>-${totalDiscountedPrice}</div>
      </div>

      {/* <div className="mt-[3vh] text-base font-normal text-[#343434]">
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
      </div> */}
      <div className="pb-14 pt-14">
        <Separator className="w-full bg-[#C8C7C7] lg:block" />
        <div className="flex self-end py-5 text-lg font-bold max-md:hidden lg:flex-row lg:justify-between lg:font-bold">
          <div>Order Total: </div>
          <div>${totalMsrpPrice}</div>
        </div>
        <Separator className="w-full bg-[#C8C7C7] lg:block" />
      </div>
      {isCartStep && (
        <div className="my-8 hidden w-full justify-center md:flex md:flex-col lg:w-[350px]">
          <Button
            variant={'default'}
            className="mb-3 w-full rounded-lg bg-[#BE1B1B]  text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl"
            onClick={() => {
              // redirectToCheckout({ cartItems, promoCode, setLoading });
              // setLoading(true);
              nextStep();
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
      )}

      {/* <div className="fixed inset-x-0 bottom-0 z-[200] bg-white p-4 shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)] md:hidden">
        <div className="flex flex-col items-center justify-between">
          <div className="self-end pb-1 pr-5 text-lg font-bold lg:font-bold">
            Order Total: ${totalMsrpPrice}
          </div>
          <Button
            variant={'default'}
            className="h-[48px] w-full max-w-xs rounded-lg bg-black text-base font-bold uppercase text-white lg:h-[63px] lg:text-xl"
            onClick={() => {
              // setLoading(true);
              // await redirectToCheckout({ cartItems, promoCode, setLoading });
              nextStep();
            }}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              'Checkout'
            )}
          </Button>
        </div>
      </div> */}
    </div>
  );
}
