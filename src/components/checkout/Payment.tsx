import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import PromoCode from './PromoCode';
import { FormEvent, useState } from 'react';
import OrderReview from './OrderReview';
import PriceBreakdown from './PriceBreakdown';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PayPalButtonSection from './PayPalButtonSection';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import PaymentSelector from './PaymentSelector';
import { PaymentMethod } from '@/lib/types/checkout';
import BillingAddress from './BillingAddress';

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('creditCard');

  const [message, setMessage] = useState(null);
  const { orderNumber } = useCheckoutContext();
  const { billingAddress: billing_details, shippingAddress } =
    useCheckoutContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const origin = window.location.origin;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        shipping: {
          // email,
          name: shippingAddress.name,
          // phone,
          address: {
            city: shippingAddress.address.city as string,
            country: shippingAddress.address.country as string,
            line1: shippingAddress.address.line1 as string,
            line2: shippingAddress.address.line2 as string,
            postal_code: shippingAddress.address.postal_code as string,
            state: shippingAddress.address.state as string,
          },
        },
        // Make sure to change this to your payment completion page
        return_url: `${origin}/thank-you?order-number=${orderNumber}`,
        payment_method_data: {
          // type,
          billing_details: {
            // email,
            name: billing_details.name,
            // phone,
            address: {
              city: billing_details.address.city as string,
              country: billing_details.address.country as string,
              line1: billing_details.address.line1 as string,
              line2: billing_details.address.line2 as string,
              postal_code: billing_details.address.postal_code as string,
              state: billing_details.address.state as string,
            },
          },
        },
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      console.error('Error:', error.message);
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <div className="px-4">
      {/* <div className="pb-7 pt-9 text-2xl font-medium lg:pt-0">Payment</div> */}
      <div className="mb-10 lg:hidden">
        <PromoCode />
      </div>
      <div className="pb-5">Select Payment Method</div>
      <div className="pb-5">
        <PaymentSelector
          selectedPaymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
        />
      </div>
      {paymentMethod === 'creditCard' ? (
        <>
          <form id="payment-form" onSubmit={handleSubmit}>
            {/* <LinkAuthenticationElement id="link-authentication-element" /> */}
            <PaymentElement
              id="payment-element"
              onChange={(e) => {
                if (e.complete) {
                  console.log('e.value', e.value);
                }
              }}
            />
          </form>
          <div className="pt-4">
            <BillingAddress />
          </div>
        </>
      ) : (
        <div>You will be redirected to the PayPal site upon checkout.</div>
      )}
      <div className="lg:hidden">
        <OrderReview />
      </div>
      <div className="mt-3 lg:hidden">
        <PriceBreakdown />
      </div>
      {paymentMethod === 'creditCard' ? (
        <div className="lg:flex lg:items-center lg:justify-center">
          <div className="my-8 w-full justify-center md:flex md:flex-col lg:w-[350px]">
            <Button
              variant={'default'}
              className="mb-3 w-full rounded-lg bg-[#BE1B1B]  text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl"
              onClick={(e) => {
                setIsLoading(true);
                handleSubmit(e);
              }}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                'Checkout'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <PayPalButtonSection />
      )}
    </div>
  );
}
