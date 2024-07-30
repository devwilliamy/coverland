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
          fetch('/api/heartland/credit', {
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

// import { useEffect } from 'react';

// const PaymentForm = () => {
//   useEffect(() => {
//     // Load the external script
//     const script = document.createElement('script');
//     script.src = 'https://js.globalpay.com/v1/globalpayments.js';
//     script.async = true;
//     script.onload = () => {
//       // Configure the account
//       window.GlobalPayments.configure({
//         publicApiKey: 'process.env.',
//       });

//       // Create the card form
//       const cardForm = window.GlobalPayments.creditCard.form('#credit-card');

//       cardForm.on('token-success', (resp) => {
//         // Create a hidden input element for the token
//         const token = document.createElement('input');
//         token.type = 'hidden';
//         token.name = 'payment_token';
//         token.value = resp.paymentReference;

//         // Submit the form with the token
//         const form = document.getElementById('payment-form');
//         form.appendChild(token);
//         form.submit();
//       });

//       cardForm.on('token-error', (resp) => {
//         // Handle the error
//         console.error('Token error:', resp);
//         // Show error to the consumer (you can customize this part)
//       });
//     };
//     document.body.appendChild(script);

//     // Cleanup function to remove the script when the component is unmounted
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <form id="payment-form" action="/your-backend-endpoint" method="POST">
//       <div id="credit-card"></div>
//       <button type="submit">Pay Now</button>
//     </form>
//   );
// };

// export default PaymentForm;
