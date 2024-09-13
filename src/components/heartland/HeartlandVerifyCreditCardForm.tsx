'use client';
import BillingAddress from '@/components/checkout/BillingAddress';
import { CvvPopover } from '@/components/checkout/CvvPopover';
import LoadingButton from '@/components/ui/loading-button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import handleHeartlandTokenSuccess from './handleHeartlandTokenSuccess';
import { useMediaQuery } from '@mantine/hooks';
import {
  HeartlandCreditCardFieldError,
  HeartlandPaymentDetailsResponse,
} from '@/lib/types/heartland';

type HeartlandVerifyCreditCardFormProps = {
  handleCardHasBeenVerified: () => void;
};
const HeartlandVerifyCreditCardForm: React.FC<
  HeartlandVerifyCreditCardFormProps
> = ({ handleCardHasBeenVerified }) => {
  const { shippingAddress, updateCardInfo, updateCardToken } =
    useCheckoutContext();
  const isMobile = useMediaQuery('(max-width:1024px)');
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<HeartlandCreditCardFieldError>({
    cardNumber: '',
    cardCvv: '',
    cardExp: '',
    general: '',
  });
  const resetError = () =>
    setError({
      cardNumber: '',
      cardCvv: '',
      cardExp: '',
      general: '',
    });

  useEffect(() => {
    if (!window.GlobalPayments) {
      const script = document.createElement('script');
      script.src = 'https://js.globalpay.com/v1/globalpayments.js';
      script.onload = () => {
        console.info('Global Payments script loaded');
        setScriptLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Global Payments script');
      };
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      console.info('Initializing payment form');

      window.GlobalPayments.configure({
        publicApiKey: process.env.NEXT_PUBLIC_HEARTLAND_PUBLIC_KEY,
      });

      const cardForm = window.GlobalPayments.ui.form({
        fields: {
          'card-holder-name': {
            placeholder: 'Jane Smith',
            target: '#credit-card-card-holder',
          },
          'card-number': {
            placeholder: 'Card Number',
            target: '#credit-card-card-number',
          },
          'card-expiration': {
            placeholder: 'MM / YYYY',
            target: '#credit-card-card-expiration',
          },
          'card-cvv': {
            placeholder: 'CVV',
            target: '#credit-card-card-cvv',
          },
          submit: {
            value: 'Submit',
            target: '#credit-card-submit',
            text: 'CONTINUE TO ORDER REVIEW',
          },
        },
        styles: {
          // Your styles here
          input: {
            display: 'flex',
            'border-width': '1px',
            'border-radius': '8px',
            'padding-left': '17px',
            'padding-right': '17px',
            'padding-top': '19px',
            'padding-bottom': '19px',
            'align-items': 'center',
            'font-size': '14px',
            // 'background-color': 'red',
            // 'max-width': '620px',
            width: '100%',
          },
          '#secure-payment-field.card-number': {
            // 'background-color': 'blue',
            'max-width': '270px',
          },
          '#secure-payment-field.card-cvv': {
            // 'background-color': 'blue',
            'max-width': isMobile ? '270px' : '80px',
          },
          '#secure-payment-field.card-expiration': {
            'max-width': isMobile ? '270px' : '80px',
          },
          '#secure-payment-field.submit': {
            margin: '0',
            'margin-bottom': '12px', // 3 * 4px = 12px
            'max-height': '48px',
            'min-height': '48px',
            width: '100%',
            'align-self': 'flex-end',
            'justify-self': 'flex-end',
            'border-radius': '0.5rem', // 8px
            'background-color': '#1A1A1A',
            'text-align': 'center',
            'font-size': '1rem', // 16px
            'font-weight': '700',
            'text-transform': 'uppercase',
            'line-height': '17px',
            color: 'white',
          },
          '#secure-payment-field.submit:hover': {
            'background-color': 'rgba(26, 26, 26, 0.9)',
          },
          '#secure-payment-field.submit:disabled': {
            'background-color': '#D6D6D6',
            color: '#767676',
          },
        },
      });

      cardForm.ready(() => {
        console.log('Registration of all credit card fields occurred');
      });

      cardForm.on(
        'token-success',
        async (resp: HeartlandPaymentDetailsResponse) => {
          // console.info('Token Success Resp:', resp);
          setIsLoading(true);
          updateCardInfo(resp.details);
          updateCardToken(resp.paymentReference);
          resetError();
          // Temporarily taking out until I get a response on verify card
          // const response = await handleHeartlandTokenSuccess(
          //   resp,
          //   setError,
          //   resetError,
          //   error,
          //   shippingAddress
          // );

          if (
            // response?.response?.responseCode === '00' &&
            // response?.response?.responseMessage === 'Success'
            true
          ) {
            handleCardHasBeenVerified();
          } else if (response?.response) {
            setError({
              ...error,
              general: `${response.response.responseCode} - ${response.response.responseMessage}`,
            });
          } else {
            // Handle case when response or response.response is undefined
            setError((prevError) => ({
              ...prevError,
              general:
                'Unexpected error: Could not verify your card. Please contact our support team.',
            }));
          }
          setIsLoading(false);
        }
      );

      cardForm.on('token-error', (resp: any) => {
        console.error('resp.error', resp);
        resetError();
        if (error && resp.reasons[0]) {
          switch (resp.reasons[0].code) {
            case 'INVALID_CARD_NUMBER':
              setError({
                ...error,
                cardNumber: resp.reasons[0].message,
              });
              break;
            case 'INVALID_CARD_EXPIRATION_DATE':
              setError({
                ...error,
                cardExp: resp.reasons[0].message,
              });
              break;
            default:
              setError({
                ...error,
                general: resp.reasons[0].message,
              });
              break;
          }
        }
      });

      cardForm.on('card-number', 'register', () => {
        console.info('Registration of Card Number occurred');
      });
    }
  }, [scriptLoaded]);

  const buttonStyle = `mb-3 w-full lg:max-w-[307px] font-[700] rounded-lg text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-center uppercase m-0 max-h-[48px] min-h-[48px] self-end justify-self-end text-[16px] leading-[17px]`;

  return (
    <div>
      <form id="payment-form" action="#payment-form">
        <div className="max-w-[620px]">
          <div className="mt-[26px] flex w-full flex-col rounded-[8px] border border-[#DBDBDB] px-[19px] py-[25px]">
            <h1 className="mb-[32px] font-[700]">Add Card</h1>
            {scriptLoaded ? (
              <div className="flex w-full flex-col lg:flex-row lg:gap-4">
                <div id="credit-card-card-holder" className="hidden"></div>
                <div className="flex flex-col">
                  <div id="credit-card-card-number"></div>
                  {error.cardNumber && (
                    <p className="pl-1 pt-2 text-[red]"> {error.cardNumber}</p>
                  )}
                </div>
                <div className="mt-8 flex flex-col lg:mt-0">
                  <div
                    id="credit-card-card-expiration"
                    className="lg:max-w-[115px]"
                  ></div>
                  {error.cardExp && (
                    <p className="pl-1 pt-2 text-[red]"> {error.cardExp}</p>
                  )}
                </div>
                <div className="mt-8 flex flex-col lg:mt-0">
                  <div
                    id="credit-card-card-cvv"
                    className="lg:max-w-[115px]"
                  ></div>
                  {error.cardCvv && (
                    <p className="pl-1 pt-2 text-[red]"> {error.cardCvv}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4 ">
                <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin" />
              </div>
            )}
            <div
              className={`flex-column flex ${isLoading ? 'justify-between' : 'flex-row-reverse'}`}
            >
              {isLoading ? (
                <>
                  <div className="flex pt-8 text-[green]">
                    Verifying your card...
                    <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" />
                  </div>
                  <div className="flex pr-2 pt-8 lg:justify-end">
                    <CvvPopover />
                  </div>
                </>
              ) : (
                <div className="flex pr-2 pt-8 lg:justify-start">
                  <CvvPopover />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <BillingAddress />
          </div>

          <div className="flex w-full flex-col items-center justify-center pt-12 lg:flex-row lg:justify-end">
            {error.general && (
              <p className="px-2 py-2 font-bold text-[red]"> {error.general}</p>
            )}

            <div id="credit-card-submit"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeartlandVerifyCreditCardForm;
