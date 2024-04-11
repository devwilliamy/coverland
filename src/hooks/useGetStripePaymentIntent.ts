import { useCartContext } from '@/providers/CartProvider';
import { useEffect, useState } from 'react';

export default function useGetStripePaymentIntent() {
  const [clientSecret, setClientSecret] = useState<any>();
  const [orderNumber, setOrderNumber] = useState('');
  const { cartItems, getTotalCartQuantity } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/stripe/payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: cartItems }),
        });

        const data = await response.json();
        setClientSecret(data.paymentIntent.client_secret);
        setOrderNumber(data.paymentIntent?.metadata?.orderId);
      } catch (error) {
        console.error('[GetStripeClientSecret]: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (cartItems && getTotalCartQuantity() > 0) {
      fetchData();
    }
  }, [cartItems, getTotalCartQuantity]);
  return { clientSecret, orderNumber, isLoading };
}
