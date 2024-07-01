import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { useRouter } from 'next/navigation';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from '@stripe/stripe-js';
import { useState } from 'react';
import { CvvPopover } from './CvvPopover';
import LockIcon from './icons/LockIcon';
import { CardLockIcon } from './icons/CardLockIcon';

export const NewCheckout = () => {
  const stripe = useStripe();
  const elements = useElements() ?? undefined;
  const router = useRouter();
  const {
    orderNumber,
    clientSecret,
    paymentIntentId: id,
  } = useCheckoutContext();
  const origin = window.location.origin;
  const {
    billingAddress,
    shippingAddress,
    customerInfo,
    shipping,
    cardNumberError,
    cardExpiryError,
    cardCvvError,
    updateCardNumberError,
    updateCardExpiryError,
    updateCardCvvError,
  } = useCheckoutContext();

  const paymentContainerStyle = `border rounded-[8px] px-[17px] py-[19px] items-center`;
  if (!stripe || !elements) {
    // Stripe.js hasn't yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    return;
  }

  const handleCardNumberElementChange = (
    e: StripeCardNumberElementChangeEvent
  ) => {
    if (e.error) {
      updateCardNumberError({
        ...cardNumberError,
        error: 'invalid',
        message: e.error.message,
        visited: true,
      });
    } else if (e.empty) {
      updateCardNumberError({
        ...cardNumberError,
        error: 'empty',
        message: 'Please enter card number.',
        visited: true,
      });
    } else {
      updateCardNumberError({
        ...cardNumberError,
        visited: true,
        error: null,
      });
    }
  };

  const handleCardExpiryElementChange = (
    e: StripeCardExpiryElementChangeEvent
  ) => {
    if (e.error) {
      updateCardExpiryError({
        ...cardExpiryError,
        error: 'invalid',
        message: e.error.message,
        visited: true,
      });
    } else if (e.empty) {
      updateCardExpiryError({
        ...cardExpiryError,
        error: 'empty',
        message: 'Please enter date.',
        visited: true,
      });
    } else {
      updateCardExpiryError({
        ...cardExpiryError,
        visited: true,
        error: null,
      });
    }
  };

  const handleCardCvcElementChange = (e: StripeCardCvcElementChangeEvent) => {
    if (e.error) {
      updateCardCvvError({
        ...cardCvvError,
        error: 'invalid',
        message: e.error.message,
        visited: true,
      });
    } else if (e.empty) {
      updateCardCvvError({
        ...cardCvvError,
        error: 'empty',
        message: 'Please enter CVV.',
        visited: true,
      });
    } else {
      updateCardCvvError({
        ...cardCvvError,
        error: null,
        visited: true,
      });
    }
  };

  const [showLock, setShowLock] = useState(true);

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex w-full justify-center">
          <LockIcon />
        </div>
        <p className="mx-auto w-full text-center ">
          Secure, 1-click checkout with link
        </p>
      </section>
      <div className="mt-[26px] flex flex-col rounded-[8px] border border-[#DBDBDB] px-[19px] py-[25px] ">
        <h1 className="mb-[32px] font-[700]">Add Card</h1>
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[2fr_1fr_1fr]">
          <span className="flex flex-col gap-1 ">
            <div
              className={
                `flex ${cardNumberError.error ? `border-[red]` : ` border-[#2A2A2A]`} ` +
                paymentContainerStyle
              }
            >
              <CardNumberElement
                onChange={(e) => handleCardNumberElementChange(e)}
                className="w-full min-w-[217px]"
                options={{
                  style: { base: { fontSize: '16px' } },
                  placeholder: 'Card Number',
                  showIcon: false,
                }}
              />
              <CardLockIcon />
            </div>
            {cardNumberError.error && (
              <p className="pl-4 text-[red]"> {cardNumberError.message}</p>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <div
              className={
                `${cardExpiryError.error ? `border-[red]` : ` border-[#2A2A2A]`} ` +
                paymentContainerStyle
              }
            >
              <CardExpiryElement
                onChange={(e) => handleCardExpiryElementChange(e)}
              />
            </div>
            {cardExpiryError.error && (
              <p className="pl-4 text-[red]"> {cardExpiryError.message}</p>
            )}
          </span>

          <span className="flex flex-col gap-1">
            <div
              className={
                `${cardCvvError.error ? `border-[red]` : ` border-[#2A2A2A]`} ` +
                paymentContainerStyle
              }
            >
              <CardCvcElement
                onChange={(e) => handleCardCvcElementChange(e)}
                options={{
                  style: { base: { fontSize: '16px' } },
                  placeholder: 'CVV',
                }}
              />
            </div>
            {cardCvvError.error && (
              <p className="pl-4 text-[red]"> {cardCvvError.message}</p>
            )}
          </span>

          <div className="flex lg:col-span-3 lg:items-end lg:justify-self-end">
            <CvvPopover />
          </div>
        </div>
      </div>
    </>
  );
};
