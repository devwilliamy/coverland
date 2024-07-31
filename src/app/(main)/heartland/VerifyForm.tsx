'use client';

import BillingAddress from '@/components/checkout/BillingAddress';
import { CvvPopover } from '@/components/checkout/CvvPopover';
import LoadingButton from '@/components/ui/loading-button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const VerifyForm: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [amount, setAmount] = useState('0');
  const [address, setAddress] = useState({
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [error, setError] = useState({
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

  const handleChange = (e) => {
    console.log('HANDLE CHANGE:', {
      name: e.target.name,
      value: e.target.value,
      address,
    });
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (!window.GlobalPayments) {
      const script = document.createElement('script');
      script.src = 'https://js.globalpay.com/v1/globalpayments.js';
      script.onload = () => {
        console.log('Global Payments script loaded');
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
      console.log('Initializing payment form');

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
            value: 'CONTINUE TO ORDER REVIEW',
            target: '#credit-card-submit',
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
            'max-width': '80px',
          },
          '#secure-payment-field.card-expiration': {
            'max-width': '80px',
          },
          '#secure-payment-field.submit': {
            margin: 0,
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
            'font-weight': 700,
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

      cardForm.on('token-success', (resp: any) => {
        resetError();
        console.log('Addres:', address);
        console.log('Token-Success:', resp);
        if (!resp.details.cardSecurityCode) {
          setError({
            ...error,
            cardCvv: 'CVV is required!',
          });
        } else if (!resp.details.expiryMonth || !resp.details.expiryYear) {
          setError({
            ...error,
            cardExp: 'Expiry date is required!',
          });
        } else {
          const token = resp.paymentReference;

          const companyName = (
            document.getElementById('streetAddress1') as HTMLInputElement
          ).value;
          const postalCode = (
            document.getElementById('postalCode') as HTMLInputElement
          ).value;
          const additionalInformation = { companyName, postalCode };
          const cardInfo = {
            cardNumber: resp.details.cardNumber,
            cardBin: resp.details.cardBin,
            cardLast4: resp.details.cardLast4,
            cardType: resp.details.cardType,
            expiryMonth: resp.details.expiryMonth,
            expiryYear: resp.details.expiryYear,
            cardSecurityCode: JSON.stringify(resp.details.cardSecurityCode),
          };

          console.log('VERIFY FORM DEBUG:', {
            token,
            cardInfo,
            address,
            additionalInformation,
          });

          const newAddress = {
            postalCode,
          };

          // fetch('/api/heartland/credit', {
          fetch('/api/heartland/credit/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token,
              cardInfo,
              additionalInformation,
              address: newAddress,
              amount,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Response failed');
              }
              return response.json();
            })
            .then((data) => {
              console.log('Payment Successful:', data);
              alert('Payment Successful!');
            })
            .catch((error) => {
              console.error('Payment failed:', error);
              alert('Payment failed!');
            });
        }
      });
      /*
{
    "error": true,
    "reasons": [
        {
            "code": "INVALID_CARD_NUMBER",
            "message": "Card number is invalid."
        }
    ]

    {
    "error": true,
    "reasons": [
        {
            "code": "INVALID_CARD_EXPIRATION_DATE",
            "message": "Card expiration year is invalid."
        }
    ]
}
}
*/
      cardForm.on('token-error', (resp: any) => {
        console.log('resp.error', resp);
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
        console.log('Registration of Card Number occurred');
      });
    }
  }, [scriptLoaded]);

  return (
    <div>
      <form id="payment-form" action="#payment-form">
        <div className="flex max-w-[600px]">
          <div>
            <label htmlFor="streetAddress1">Street Address: </label>
            <input
              id="streetAddress1"
              name="streetAddress1"
              type="text"
              className="border-2 border-black"
              value={address.streetAddress1}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="postalCode">Billing Zip Code</label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            className="border-2 border-black"
            value={address.postalCode}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="amount">Amount: </label>
            <input
              id="amount"
              name="amount"
              type="text"
              className="border-2 border-black"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
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
                <div className="flex flex-col">
                  <div
                    id="credit-card-card-cvv"
                    className="max-w-[115px]"
                  ></div>
                  {error.cardCvv && (
                    <p className="pl-1 pt-2 text-[red]"> {error.cardCvv}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <div
                    id="credit-card-card-expiration"
                    className="max-w-[115px]"
                  ></div>
                  {error.cardExp && (
                    <p className="pl-1 pt-2 text-[red]"> {error.cardExp}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin" />
              </div>
            )}
            <div className="flex pr-2 pt-4 lg:justify-end">
              <CvvPopover />
            </div>
          </div>
          <div className="pt-4">
            <BillingAddress />
          </div>
          <div className="flex w-full flex-col items-center justify-center pt-12 lg:flex-row lg:justify-end">
            <div id="credit-card-submit"></div>
          </div>
        </div>
      </form>
      {/* <LoadingButton
        className="m-0 mb-3 max-h-[48px] min-h-[48px] w-full self-end justify-self-end rounded-lg bg-[#1A1A1A]  text-center text-base font-[700] uppercase leading-[17px] text-white hover:bg-[#1A1A1A]/90 disabled:bg-[#D6D6D6] disabled:text-[#767676] lg:max-w-[307px]"
        // isDisabled={isDisabledCard}
        // isLoading={isLoading}
        onClick={handleContinueWithCard}
        buttonText={'Continue to Order Review'}
      /> */}
    </div>
  );
};

export default VerifyForm;

/* Examples */
/* <div className="mx-auto mt-[26px] max-w-[620px] rounded-[8px] border border-[#DBDBDB] p-[19px]">
        <h1 className="mb-[32px] font-[700]">Add Card</h1>
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="rounded-[8px] border border-[#DBDBDB] p-4">
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              className="w-full border-0 p-0 focus:outline-none focus:ring-0"
              placeholder="1234 5678 9101 1121"
            />
          </div>
          <div className="rounded-[8px] border border-[#DBDBDB] p-4">
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              className="w-full border-0 p-0 focus:outline-none focus:ring-0"
              placeholder="123"
            />
          </div>
          <div className="rounded-[8px] border border-[#DBDBDB] p-4">
            <label className="block text-sm font-medium text-gray-700">
              MM / YY
            </label>
            <input
              type="text"
              className="w-full border-0 p-0 focus:outline-none focus:ring-0"
              placeholder="12 / 23"
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full rounded-[8px] border border-gray-400 bg-gray-100 px-4 py-2 hover:bg-gray-200">
            Submit
          </button>
        </div>
      </div>
      <div className="mx-auto mt-[26px] max-w-[620px] rounded-[8px] border border-[#DBDBDB] p-[19px]">
        <h1 className="mb-[32px] font-[700]">Add Card</h1>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="mb-4 flex-1 rounded-[8px] border border-[#DBDBDB] p-4 lg:mb-0">
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              className="w-full border-0 p-0 focus:outline-none focus:ring-0"
              placeholder="1234 5678 9101 1121"
            />
          </div>
          <div className="mb-4 flex-1 rounded-[8px] border border-[#DBDBDB] p-4 lg:mb-0">
            <label className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              className="w-full border-0 p-0 focus:outline-none focus:ring-0"
              placeholder="123"
            />
          </div>
          <div className="flex-1 rounded-[8px] border border-[#DBDBDB] p-4">
            <label className="block text-sm font-medium text-gray-700">
              MM / YY
            </label>
            <input
              type="text"
              className="w-full border-0 p-0 focus:outline-none focus:ring-0"
              placeholder="12 / 23"
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full rounded-[8px] border border-gray-400 bg-gray-100 px-4 py-2 hover:bg-gray-200">
            Submit
          </button>
        </div>
      </div> */
