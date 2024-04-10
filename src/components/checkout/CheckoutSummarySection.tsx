'use client';
import { Button } from '@/components/ui/button';
import { Suspense, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  paypalCaptureOrder,
  paypalCreateOrder,
} from '@/app/(noFooter)/checkout/utils';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import { Separator } from '../ui/separator';
import PromoCode from './PromoCode';
import { useCartContext } from '@/providers/CartProvider';

export default function CheckoutSummarySection() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    clearLocalStorageCart,
    getTotalCartQuantity,
  } = useCartContext();

  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const totalDiscountedPrice = getTotalDiscountPrice().toFixed(
    2
  ) as unknown as number;
  const orderSubtotal = getOrderSubtotal().toFixed(2) as unknown as number;
  const { currentStep, nextStep, setCurrentStep } = useCheckoutContext();
  const isCartStep = currentStep === CheckoutStep.CART;

  const isCartEmpty = getTotalCartQuantity() === 0;
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
      {isCartEmpty ? null : (
        <div className="flex justify-between text-[#D13C3F]">
          <div>Sale-discount</div>
          <div>-${totalDiscountedPrice}</div>
        </div>
      )}

      <div className="pb-14 pt-14">
        <Separator className="w-full bg-[#C8C7C7] lg:block" />
        <div className="flex self-end py-5 text-lg font-bold max-md:hidden lg:flex-row lg:justify-between lg:font-bold">
          <div>Order Total: </div>
          <div>${totalMsrpPrice}</div>
        </div>
        <Separator className="w-full bg-[#C8C7C7] lg:block" />
      </div>
      {isCartStep && (
        <div className="my-8  hidden w-full justify-center md:flex md:flex-col lg:w-[350px]">
          <Button
            variant={'default'}
            disabled={isCartEmpty}
            className={`mb-3 w-full rounded-lg ${isCartEmpty ? 'bg-[#BE1B1B]/75' : 'bg-[#BE1B1B]'}  text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
            onClick={nextStep}
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
    </div>
  );
}
