import { mapPaymentIntentIdToOrder } from '@/lib/utils/adminPanel';
import { useCartContext } from '@/providers/CartProvider';
import { useEffect, useState } from 'react';

export function useCreateStripePaymentIntent() {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [orderNumber, setOrderNumber] = useState<string>('');
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

        const { paymentIntent } = await response.json();
        const mappedPaymentIntent = mapPaymentIntentIdToOrder(paymentIntent);
        await fetch('/api/admin-panel/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order: mappedPaymentIntent }),
        });

        setPaymentIntentId(paymentIntent?.id);
        setClientSecret(paymentIntent?.client_secret);
        setOrderNumber(paymentIntent?.metadata?.orderId);
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
  return { paymentIntentId, clientSecret, orderNumber, isLoading };
}
