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
import { LockKeyhole } from 'lucide-react';

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

  const paymentContainerStyle = `border rounded-[8px] px-[17px] py-[19px]`;
  // if (!stripe || !elements) {
  //   // Stripe.js hasn't yet loaded.
  //   // Make sure to disable form submission until Stripe.js has loaded.
  //   return;
  // }
  const express = elements?.getElement('expressCheckout');
  express?.focus();
  console.log({ express });

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex w-full justify-center">
          <LockIcon />
        </div>
        {/* <div className="h-full w-full"> */}
        <ExpressCheckoutElement
          className="h-full w-full min-w-[100vw]"
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
            // stripe
            //   ?.confirmPayment({
            //     redirect: 'if_required',
            //     elements,
            //     clientSecret,
            //     confirmParams: {
            //       return_url: `${origin}/thank-you?order_number=${orderNumber}`,
            //       receipt_email: customerInfo.email,
            //     },
            //   })
            //   .then(async (data) => {
            //     const emailInput = {
            //       to: customerInfo.email,
            //       name: {
            //         firstName: shippingAddress.firstName,
            //         fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            //       },
            //       orderInfo: {
            //         orderDate: getCurrentDayInLocaleDateString(),
            //         orderNumber,
            //       },
            //     };
            //     if (data.error) {
            //       const { error } = data;
            //       if (
            //         error.type === 'card_error' ||
            //         error.type === 'validation_error'
            //       ) {
            //         console.error('Error:', error.message);
            //         // setMessage(
            //         //   error.message ||
            //         //     "There's an error, but could not find error message"
            //         // );
            //       } else {
            //         console.error('Error:', error.message);
            //         // setMessage(
            //         //   error.message || 'An unexpected error occurred.'
            //         // );
            //       }
            //     } else if (
            //       data.paymentIntent &&
            //       data.paymentIntent.status === 'succeeded'
            //     ) {
            //       try {
            //         const response = await fetch('/api/email/thank-you', {
            //           method: 'POST',
            //           headers: {
            //             'Content-Type': 'application/json',
            //           },
            //           body: JSON.stringify({ emailInput }),
            //         });
            //         const emailResponse = await response.json(); // Making sure the await goes through and email is sent
            //       } catch (error) {
            //         console.error('Error:', error?.message);
            //         // setMessage(
            //         //   error?.message ||
            //         //     "There's an error, but could not find error message"
            //         // );
            //       }
            //     }
            //     console.log('Confirm Payment Then:', data);
            //   })
            //   .catch((error) => {
            //     console.error('Confirm Payment Error:', error);
            //   })
            //   .finally(() => {
            //     router.push(
            //       `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${clientSecret}`
            //     );
            //   });
          }}
        />
        {/* </div> */}
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
              <div className="w-full">
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

                    console.log({ e, cardExpiryError });
                  }}
                  options={{
                    style: { base: { fontSize: '16px' } },
                    placeholder: 'Card Number',
                    showIcon: false,
                  }}
                />
              </div>
              <svg
                width="17"
                height="22"
                viewBox="0 0 17 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="self-end"
              >
                <path
                  d="M2.58594 21.9603C2.03594 21.9603 1.56527 21.7614 1.17394 21.3636C0.781937 20.9651 0.585938 20.4864 0.585938 19.9273V9.76228C0.585938 9.20321 0.781937 8.72444 1.17394 8.32597C1.56527 7.92818 2.03594 7.72928 2.58594 7.72928H3.58594V5.69628C3.58594 4.29012 4.0736 3.09132 5.04894 2.09989C6.0236 1.10914 7.2026 0.61377 8.58594 0.61377C9.96927 0.61377 11.1486 1.10914 12.1239 2.09989C13.0986 3.09132 13.5859 4.29012 13.5859 5.69628V7.72928H14.5859C15.1359 7.72928 15.6069 7.92818 15.9989 8.32597C16.3903 8.72444 16.5859 9.20321 16.5859 9.76228V19.9273C16.5859 20.4864 16.3903 20.9651 15.9989 21.3636C15.6069 21.7614 15.1359 21.9603 14.5859 21.9603H2.58594ZM2.58594 19.9273H14.5859V9.76228H2.58594V19.9273ZM8.58594 16.8778C9.13594 16.8778 9.60694 16.6789 9.99894 16.2811C10.3903 15.8826 10.5859 15.4039 10.5859 14.8448C10.5859 14.2857 10.3903 13.8069 9.99894 13.4085C9.60694 13.0107 9.13594 12.8118 8.58594 12.8118C8.03594 12.8118 7.56527 13.0107 7.17394 13.4085C6.78194 13.8069 6.58594 14.2857 6.58594 14.8448C6.58594 15.4039 6.78194 15.8826 7.17394 16.2811C7.56527 16.6789 8.03594 16.8778 8.58594 16.8778ZM5.58594 7.72928H11.5859V5.69628C11.5859 4.84919 11.2943 4.12917 10.7109 3.53621C10.1276 2.94325 9.41927 2.64677 8.58594 2.64677C7.7526 2.64677 7.04427 2.94325 6.46094 3.53621C5.8776 4.12917 5.58594 4.84919 5.58594 5.69628V7.72928Z"
                  fill="#343434"
                />
              </svg>
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

          <div className="flex lg:col-span-3 lg:items-end lg:justify-self-end">
            <CvvPopover />
          </div>
        </div>
      </div>
    </>
  );
};
