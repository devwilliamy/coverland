'use client';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

const partner = process.env.PAYPAL_PAYFLOW_PARTNER;
const pwd = process.env.PAYPAL_PAYFLOW_PWD;
const vendor = process.env.PAYPAL_PAYFLOW_VENDOR;
const user = process.env.PAYPAL_PAYFLOW_USER;
const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW';

const payflowUrl = isPreview
  ? 'https://pilot-payflowlink.paypal.com'
  : 'https://payflowlink.paypal.com';
export default function PaypalForm() {
  const [secureToken, setSecureToken] = useState('');
  const [secureTokenId, setSecureTokenId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/paypal/payflow/secure-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: '1.01',
            orderId: 'CL-TEST-123',
          }),
        });
        if (!response.ok) {
          // Handle error response
          console.error('Error:', response.statusText);
          return;
        }

        // Process the response
        const {
          data: { secureToken, secureTokenId },
        } = await response.json();
        // const { secureToken, secureTokenId } = data.data;
        console.log('Secure Token:', { secureToken, secureTokenId });
        setSecureToken(secureToken);
        setSecureTokenId(secureTokenId);
      } catch (error) {
        console.error('Fetch error: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      Paypal
      {isLoading ? (
        <div className="h-[600px]">
          <div className="flex h-96 min-w-full animate-pulse items-center justify-center rounded-md bg-[#F0F0F0]/25">
            <AiOutlineLoading3Quarters
              className="animate-spin h-8 w-8"
              fill="#BE1B1B"
              opacity={1.0}
            />
          </div>
        </div>
      ) : (
        <>
          <iframe
            src={`${payflowUrl}/?SECURETOKEN=${secureToken}&SECURETOKENID=${secureTokenId}`}
            width="600"
            height="400"
            frameBorder="0"
            allowtransparency="true"
          >
            Your browser does not support iframes.
          </iframe>
          <form
            action={`${payflowUrl}/?SECURETOKEN=${secureToken}&SECURETOKENID=${secureTokenId}`}
            method="POST"
          >
            <input type="hidden" name="AMOUNT" value="10.00" />
            <input type="hidden" name="TYPE" value="S" />
            <input
              type="hidden"
              name="DESCRIPTION"
              value="YourProductDescription"
            />
            <input type="hidden" name="INVOICE" value="UniqueInvoiceID" />
            <input type="hidden" name="CURRENCY" value="USD" />
            <input
              type="hidden"
              name="RETURNURL"
              value="http://localhost:3000/checkout/thank-you"
            />
            <input
              type="hidden"
              name="CANCELURL"
              value="http://localhost:3000/checkout/cancel"
            />
            <input
              type="hidden"
              name="ERRORURL"
              value="http://localhost:3000/checkout/error"
            />
            <input type="submit" value="Pay Now" />
          </form>
        </>
      )}
    </div>
  );
}

// https://payflowlink.paypal.com/?SECURETOKEN=1aMXeBlOlj0K618SbEBPsAQpG&SECURETOKENID=5469e06a7c364d21a3bac1d6a17542c6
