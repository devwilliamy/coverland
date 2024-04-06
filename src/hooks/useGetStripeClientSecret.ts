import { useCartContext } from '@/providers/CartProvider';
import { useEffect, useState } from 'react';

export default function useGetStripeClientSecret() {
  const [clientSecret, setClientSecret] = useState<any>();
  const { cartItems } = useCartContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stripe/payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: cartItems }),
        });

        const data = await response.json();
        console.log("Data:", data)
        setClientSecret(data.paymentIntent.clientSecret);
      } catch (error) {
        console.error('[GetStripeClientSecret]: ', error);
      }
    };
    fetchData();
  }, []);
  return clientSecret;
}
