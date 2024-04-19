import { Suspense } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  paypalCaptureOrder,
  paypalCreateOrder,
} from '@/app/(noFooter)/checkout/utils';
import { useCartContext } from '@/providers/CartProvider';
import { useRouter } from 'next/navigation';
import { useCheckoutContext } from '@/contexts/CheckoutContext';

export default function PayPalButtonSection() {
  const { clearLocalStorageCart, getTotalPrice, cartItems } = useCartContext();
  const { orderNumber, shipping, shippingAddress } = useCheckoutContext();
  const router = useRouter();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  console.log("[PaypalButtonSection]: ", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        currency: 'USD',
        intent: 'capture',
        components: 'buttons',
        disableFunding: 'card',
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <PayPalButtons
          style={{
            color: 'gold',
            shape: 'rect',
            label: 'pay',
            height: 50,
          }}
          createOrder={async () => {
            const data = await paypalCreateOrder(
              totalMsrpPrice,
              cartItems,
              orderNumber,
              shipping,
              shippingAddress
            );
            if (!data) {
              console.log('Error creating order');
              return '';
            }
            return data;
          }}
          onApprove={async (data) => {
            console.log("[PaypalButton Section] Data: ", data)
            const response = await paypalCaptureOrder(data.orderID);
            if (response.success) {
              // clearLocalStorageCart();
              router.push(
                `/thank-you?order_number=${orderNumber}&payment_gateway=paypal`
              );
            }
          }}
        />
      </Suspense>
    </PayPalScriptProvider>
  );
}
