'use client';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { useCartContext } from '@/providers/CartProvider';
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
  const { orderNumber } = useCheckoutContext();
  const { getTotalPrice } = useCartContext();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/paypal/payflow/secure-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // amount: totalMsrpPrice,
            amount: '1025.00',
            orderId: orderNumber,
            currency: 'USD',
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
    <div className="-ml-8 lg:ml-0">
      {isLoading ? (
        <div className="h-[600px]">
          <div className="flex h-96 min-w-full animate-pulse items-center justify-center rounded-md bg-[#F0F0F0]/25">
            <AiOutlineLoading3Quarters
              className="h-8 w-8 animate-spin"
              fill="#BE1B1B"
              opacity={1.0}
            />
          </div>
        </div>
      ) : (
        <iframe
          src={`${payflowUrl}/?SECURETOKEN=${secureToken}&SECURETOKENID=${secureTokenId}`}
          width="600"
          height="400"
          // scrolling="no"
          frameBorder="0"
          allowtransparency="true"
        >
          Your browser does not support iframes.
        </iframe>
      )}
    </div>
  );
}
