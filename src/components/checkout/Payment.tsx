import {
  PaymentElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import PromoCode from './PromoCode';
import { FormEvent, useEffect, useState } from 'react';
import OrderReview from './OrderReview';
import PriceBreakdown from './PriceBreakdown';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PayPalButtonSection from './PayPalButtonSection';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import PaymentSelector from './PaymentSelector';
import { PaymentMethod, StripeAddress } from '@/lib/types/checkout';
import BillingAddress from './BillingAddress';
import { useCartContext } from '@/providers/CartProvider';
import { convertPriceToStripeFormat } from '@/lib/utils/stripe';

function isValidShippingAddress({ address }: StripeAddress) {
  return (
    address &&
    address.line1 !== '' &&
    // address.address_line_2 &&
    // address.line2 !== '' &&
    address.city !== '' &&
    address.state !== '' &&
    address.postal_code !== '' &&
    address.country !== ''
  );
}

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('creditCard');
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [message, setMessage] = useState<string>('');
  const { orderNumber, paymentIntentId } = useCheckoutContext();
  const { billingAddress, shippingAddress, customerInfo, shipping } =
    useCheckoutContext();
  const { getTotalPrice } = useCartContext();
  const totalMsrpPrice = convertPriceToStripeFormat(getTotalPrice() + shipping);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const origin = window.location.origin;
    const response = await fetch('/api/stripe/payment-intent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        amount: totalMsrpPrice,
      }),
    });
    const data = await response.json();
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        shipping: {
          name: shippingAddress.name,
          phone: shippingAddress.phone,
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
        return_url: `${origin}/thank-you?order_number=${orderNumber}`,
        receipt_email: customerInfo.email,
        payment_method_data: {
          billing_details: {
            email: customerInfo.email,
            name: billingAddress.name,
            phone: billingAddress.phone,
            address: {
              city: billingAddress.address.city as string,
              country: billingAddress.address.country as string,
              line1: billingAddress.address.line1 as string,
              line2: billingAddress.address.line2 as string,
              postal_code: billingAddress.address.postal_code as string,
              state: billingAddress.address.state as string,
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
      setMessage(
        error.message || "There's an error, but could not find error message"
      );
    } else {
      console.error('Error:', error.message);
      setMessage(error.message || 'An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const isDisabled =
    !isValidShippingAddress(shippingAddress) || isEditingAddress;

  return (
    <div className="px-4">
      <div className="mb-10 lg:hidden">{/* <PromoCode /> */}</div>
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
            <PaymentElement
              id="payment-element"
              // onChange={(e) => {
              //   if (e.complete) {
              //     console.log('e.value', e.value);
              //   }
              // }}
            />
          </form>
          <div className="pt-4">
            <BillingAddress
              isEditingAddress={isEditingAddress}
              setIsEditingAddress={setIsEditingAddress}
            />
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
          <div className="my-4 w-full justify-center md:flex md:flex-col lg:w-[350px]">
            <Button
              disabled={isDisabled}
              variant={'default'}
              className={`mb-3 w-full rounded-lg ${isDisabled ? 'bg-[#BE1B1B]/90' : 'bg-[#BE1B1B]'} text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
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
      {message && (
        <div className="font-base flex items-center justify-center text-lg text-red-500">
          Error: {message}
        </div>
      )}
    </div>
  );
}
