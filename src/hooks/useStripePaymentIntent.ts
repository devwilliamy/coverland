import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { mapPaymentIntentIdToOrder } from '@/lib/utils/adminPanel';
import { useCartContext } from '@/providers/CartProvider';
import { useEffect } from 'react';

export function useCreateStripePaymentIntent() {
  const { paymentIntentId, clientSecret, orderNumber, setStripeData } =
    useCheckoutContext();
  const { cartItems, getTotalCartQuantity } = useCartContext();
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

        const { paymentIntent } = await response.json();
        const mappedPaymentIntent = mapPaymentIntentIdToOrder(paymentIntent);
        const newOrderResponse = await fetch('/api/admin-panel/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order: mappedPaymentIntent }),
        });

        const newOrder = await newOrderResponse.json();

        await fetch('/api/admin-panel/order-items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: newOrder[0].id,
            skusWithQuantity: paymentIntent.metadata.skusWithQuantity,
          }),
        });

        setStripeData({
          paymentIntentId: paymentIntent?.id,
          clientSecret: paymentIntent?.client_secret,
          orderNumber: paymentIntent?.metadata?.orderId,
          orderId: newOrder[0].id,
        });
      } catch (error) {
        console.error('[GetStripeClientSecret]: ', error);
      } finally {
      }
    };
    if (cartItems && getTotalCartQuantity() > 0) {
      fetchData();
    }
  }, [cartItems, getTotalCartQuantity, setStripeData]);
  return {
    paymentIntentId,
    clientSecret,
    orderNumber,
  };
}
