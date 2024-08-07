'use client';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { useCartContext } from '@/providers/CartProvider';
import { useEffect, useRef, useState } from 'react';
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
  const { orderNumber, billingAddress } = useCheckoutContext();
  const { getTotalPrice } = useCartContext();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const iframeRef = useRef(null);

  // useEffect(() => {
  //   // Reload the iframe when the component mounts
  //   if (iframeRef.current) {
  //     console.log("Tryin to reload the iframe")
  //     iframeRef.current.src += '';
  //   }
  // }, []);

  // useEffect(() => {
  //   const handlePageShow = () => {
  //     if (iframeRef.current) {
  //       // Reload the iframe to ensure it is in a functional state
  //       iframeRef.current.src = iframeRef.current.src;
  //     }
  //   };

  //   window.addEventListener('pageshow', handlePageShow);

  //   return () => {
  //     window.removeEventListener('pageshow', handlePageShow);
  //   };
  // }, []);

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Force a full page reload if the page was loaded from the cache
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/paypal/payflow/secure-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalMsrpPrice,
            orderId: orderNumber,
            currency: 'USD',
            billingAddress,
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
        setSecureToken(secureToken);
        setSecureTokenId(secureTokenId);
      } catch (error) {
        console.error('Fetch error: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [billingAddress]);

  return (
    <div className="-ml-8 lg:ml-0">
      {isLoading ? (
        <div className="h-[550px]">
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
          height="550"
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
