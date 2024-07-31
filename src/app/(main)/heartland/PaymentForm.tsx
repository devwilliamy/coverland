'use client';

import React, { useEffect, useState } from 'react';

const PaymentForm: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

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
            placeholder: '•••• •••• •••• ••••',
            target: '#credit-card-card-number',
          },
          'card-expiration': {
            placeholder: 'MM / YYYY',
            target: '#credit-card-card-expiration',
          },
          'card-cvv': {
            placeholder: '•••',
            target: '#credit-card-card-cvv',
          },
          submit: {
            value: 'Submit',
            target: '#credit-card-submit',
          },
        },
        styles: {
          // Your styles here
        },
      });

      cardForm.ready(() => {
        console.log('Registration of all credit card fields occurred');
      });

      cardForm.on('token-success', (resp: any) => {
        console.log('Token-Success:', resp);
        if (!resp.details.cardSecurityCode) {
          alert('CVV is required!');
        } else if (!resp.details.expiryMonth || !resp.details.expiryYear) {
          alert('Expiry date required!');
        } else {
          const token = resp.paymentReference;
          const companyName = (
            document.getElementById('company') as HTMLInputElement
          ).value;
          const additionalInformation = { companyName };
          const cardInfo = {
            cardNumber: resp.details.cardNumber,
            cardBin: resp.details.cardBin,
            cardLast4: resp.details.cardLast4,
            cardType: resp.details.cardType,
            expiryMonth: resp.details.expiryMonth,
            expiryYear: resp.details.expiryYear,
            cardSecurityCode: JSON.stringify(resp.details.cardSecurityCode),
          };

          console.log('DBUG:', { token, cardInfo });

          // fetch('/api/heartland/credit', {
          fetch('/api/heartland/credit/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, cardInfo, additionalInformation }),
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

      cardForm.on('token-error', (resp: any) => {
        alert('There was an error: ' + resp.error.message);
      });

      cardForm.on('card-number', 'register', () => {
        console.log('Registration of Card Number occurred');
      });
    }
  }, [scriptLoaded]);

  return (
    <div>
      <form id="payment-form" action="#payment-form">
        <label htmlFor="billing-zip">Billing Zip Code</label>
        <input id="billing-zip" name="billing-zip" type="tel" />
        <div>
          <label htmlFor="company">Company Name: </label>
          <input id="company" name="company" type="text" />
        </div>
        <div id="credit-card-card-holder"></div>
        <div id="credit-card-card-number"></div>
        <div id="credit-card-card-cvv"></div>
        <div id="credit-card-card-expiration"></div>
        <div id="credit-card-submit"></div>
      </form>
    </div>
  );
};

export default PaymentForm;


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
