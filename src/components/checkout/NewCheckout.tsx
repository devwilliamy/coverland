import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  ExpressCheckoutElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { getCurrentDayInLocaleDateString } from '@/lib/utils/date';
import { useRouter } from 'next/navigation';
import LockIcon from '../PDP/components/icons/LockIcon';
import { CvvPopover } from './CvvPopover';
import { useState } from 'react';

export const NewCheckout = () => {
  const stripe = useStripe();
  const elements = useElements() ?? undefined;
  const router = useRouter();
  // const clientSecret = String(process.env.STRIPE_SECRET_KEY);
  const {
    orderNumber,
    clientSecret,
    paymentIntentId: id,
  } = useCheckoutContext();
  // const { orderNumber, clientSecret } = useCreateStripePaymentIntent();
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
  // const [cardNumberError, setCardNumberError] = useState('');
  // const [cardExpiryError, setCardExpiryError] = useState('');
  // const [cardCvvError, setCardCvvError] = useState('');

  const paymentContainerStyle = `border rounded-[8px]  px-[17px] py-[19px]`;
  // if (!stripe || !elements) {
  //   // Stripe.js hasn't yet loaded.
  //   // Make sure to disable form submission until Stripe.js has loaded.
  //   return;
  // }
  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex w-full justify-center">
          <LockIcon />
        </div>
        <ExpressCheckoutElement
          options={{
            paymentMethodOrder: ['applePay', 'googlePay', 'link'],
            layout: { overflow: 'auto' },
          }}
          onConfirm={(event) => {
            // console.log({
            //   event,
            //   elements,
            //   clientSecret,
            //   orderNumber,
            //   shippingAddress,
            //   billingAddress,
            //   shipping,
            // });
            stripe
              ?.confirmPayment({
                redirect: 'if_required',
                elements,
                clientSecret,
                confirmParams: {
                  return_url: `${origin}/thank-you?order_number=${orderNumber}`,
                  receipt_email: customerInfo.email,
                },
              })
              .then(async (data) => {
                const emailInput = {
                  to: customerInfo.email,
                  name: {
                    firstName: shippingAddress.firstName,
                    fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                  },
                  orderInfo: {
                    orderDate: getCurrentDayInLocaleDateString(),
                    orderNumber,
                  },
                };
                if (data.error) {
                  const { error } = data;
                  if (
                    error.type === 'card_error' ||
                    error.type === 'validation_error'
                  ) {
                    console.error('Error:', error.message);
                    // setMessage(
                    //   error.message ||
                    //     "There's an error, but could not find error message"
                    // );
                  } else {
                    console.error('Error:', error.message);
                    // setMessage(
                    //   error.message || 'An unexpected error occurred.'
                    // );
                  }
                } else if (
                  data.paymentIntent &&
                  data.paymentIntent.status === 'succeeded'
                ) {
                  try {
                    const response = await fetch('/api/email/thank-you', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ emailInput }),
                    });
                    const emailResponse = await response.json(); // Making sure the await goes through and email is sent
                  } catch (error) {
                    console.error('Error:', error?.message);
                    // setMessage(
                    //   error?.message ||
                    //     "There's an error, but could not find error message"
                    // );
                  }
                }
                console.log('Confirm Payment Then:', data);
              })
              .catch((error) => {
                console.error('Confirm Payment Error:', error);
              })
              .finally(() => {
                router.push(
                  `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${clientSecret}`
                );
              });
          }}
        />
        <p className="mx-auto w-full text-center ">
          Secure, 1-click checkout with link
        </p>
      </section>
      <div className="mt-[26px] flex flex-col rounded-[8px] border border-[#DBDBDB] px-[19px] py-[25px] ">
        <h1 className="mb-[32px] font-[700]">Add Card</h1>
        <div className="flex flex-col gap-10">
          <span className="flex flex-col gap-1">
            <div
              className={
                `${cardNumberError.error ? `border-[red]` : ` border-[#2A2A2A]`} ` +
                paymentContainerStyle
              }
            >
              <CardNumberElement
                onChange={(e) => {
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
                  // updateCardNumberError({
                  //   ...cardNumberError,
                  //   visited: true,
                  // });

                  console.log({ e, cardExpiryError });
                }}
                options={{
                  style: { base: { fontSize: '16px' } },
                  placeholder: 'Card Number',
                  showIcon: false,
                }}
              />
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
                onChange={(e) => {
                  if (e.error) {
                    updateCardExpiryError({
                      ...cardExpiryError,
                      error: 'invalid',
                      message: e.error.message,
                      visited: true,
                    });
                  } else if (e.empty) {
                    console.log('EXPIRY EMPTY');
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
                }}
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
                onChange={(e) => {
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
                  // updateCardCvvError({
                  //   ...cardCvvError,
                  //   visited: true,
                  // });
                }}
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

          <CvvPopover />
        </div>
      </div>
    </>
  );
};
