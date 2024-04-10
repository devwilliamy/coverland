import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import PromoCode from './PromoCode';
import { FormEvent, useEffect, useState } from 'react';
import useGetStripePaymentIntent from '@/hooks/useGetStripePaymentIntent';
import OrderReview from './OrderReview';
import PriceBreakdown from './PriceBreakdown';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PaypalButtons from './PaypalButtons';

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { clientSecret } = useGetStripePaymentIntent();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'http://localhost:3000/thank-you',
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
      <div className="lg:hidden">
        <OrderReview />
      </div>
      <div className="pb-7 pt-9 text-2xl font-medium lg:pt-0">Payment</div>
      <div className="mb-10 lg:hidden">
        <PromoCode />
      </div>
      <div className="pb-7">Select Payment Method</div>
      <form id="payment-form" onSubmit={handleSubmit}>
        {/* <LinkAuthenticationElement id="link-authentication-element" /> */}
        <PaymentElement id="payment-element" />
      </form>
      <div className="-mt-5 lg:hidden">
        <PriceBreakdown />
      </div>
      <div className="lg:flex lg:items-center lg:justify-center">
        <div className="my-8 w-full justify-center md:flex md:flex-col lg:w-[350px]">
          <Button
            variant={'default'}
            className="mb-3 w-full rounded-lg bg-[#BE1B1B]  text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl"
            onClick={(e) => {
              //   redirectToCheckout({ cartItems, promoCode, setLoading });
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
      <PaypalButtons />
    </div>
  );
}
