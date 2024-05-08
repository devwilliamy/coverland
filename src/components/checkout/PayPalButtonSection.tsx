import { Suspense } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  paypalCaptureOrder,
  paypalCreateOrder,
} from '@/app/(noFooter)/checkout/utils';
import { useCartContext } from '@/providers/CartProvider';
import { useRouter } from 'next/navigation';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { mapPaypalCompletionToOrder } from '@/lib/utils/adminPanel';
import { updateAdminPanelOrder } from '@/lib/db/admin-panel/orders';
import {
  getSkusAndQuantityFromCartItems,
  getSkusFromCartItems,
} from '@/lib/utils/stripe';
import { postAdminPanelOrderItem } from '@/lib/db/admin-panel/orderItems';

export default function PayPalButtonSection() {
  const { clearLocalStorageCart, getTotalPrice, cartItems } = useCartContext();
  const { orderNumber, shipping, shippingAddress, customerInfo } =
    useCheckoutContext();
  const router = useRouter();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  console.log(
    '[PaypalButtonSection]: ',
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  );
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
            console.log('[PaypalButton Section] Data: ', data);
            // This will get the order from paypal
            const response = await paypalCaptureOrder(
              data.orderID,
              customerInfo.phoneNumber
            );
            // This gets the paypal order ready
            const mappedData = mapPaypalCompletionToOrder(
              response.data,
              customerInfo.phoneNumber
            );
            // console.log('[Paypal.paypalCreateOrder] mappedData: ', mappedData);
            // This takes paypal response and adds to order table
            const adminPanelOrder = await updateAdminPanelOrder(
              mappedData,
              mappedData.order_id
            );
            console.log(
              '[Paypal.paypalCreateOrder]: adminPanelOrder',
              adminPanelOrder
            );

            const skus = getSkusFromCartItems(cartItems);
            const skusWithQuantity = getSkusAndQuantityFromCartItems(cartItems);
            console.log('[postAdminPanelOrderItem] inputs:', {
              id: adminPanelOrder[0].id,
              skus: JSON.stringify(skusWithQuantity)
            });
            // Add To OrderItem Table
            postAdminPanelOrderItem(
              adminPanelOrder[0].id,
              JSON.stringify(skusWithQuantity)
            );
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
