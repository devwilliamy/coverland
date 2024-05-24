import { Suspense } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  paypalCaptureOrder,
  paypalCreateOrder,
} from '@/app/(noFooter)/checkout/utils';
import { useCartContext } from '@/providers/CartProvider';
import { useRouter } from 'next/navigation';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import {
  mapPaypalCompletionToCustomer,
  mapPaypalCompletionToOrder,
} from '@/lib/utils/adminPanel';
import { updateAdminPanelOrder } from '@/lib/db/admin-panel/orders';
import {
  getSkusAndQuantityFromCartItems,
  getSkusFromCartItems,
} from '@/lib/utils/stripe';
import { postAdminPanelOrderItem } from '@/lib/db/admin-panel/orderItems';
import { createOrUpdateUser } from '@/lib/db/admin-panel/customers';
import { getCurrentDayInLocaleDateString } from '@/lib/utils/date';
import {
  handlePurchaseGoogleTag,
  useThankYouViewedGoogleTag,
} from '@/hooks/useGoogleTagDataLayer';

export default function PayPalButtonSection() {
  const { clearLocalStorageCart, getTotalPrice, cartItems } = useCartContext();
  const { orderNumber, shipping, shippingAddress, customerInfo } =
    useCheckoutContext();
  const router = useRouter();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  // console.log(
  //   '[PaypalButtonSection]: ',
  //   process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  // );
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
            // debugger
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
            // debugger
            // console.log('[PaypalButton Section] Data: ', data);
            // This will get the order from paypal
            const response = await paypalCaptureOrder(
              data.orderID,
              customerInfo.phoneNumber
            );
            // console.log("Response:", response)
            const customerInput = mapPaypalCompletionToCustomer(
              response.data,
              customerInfo.phoneNumber
            );
            // Create Customer for Paypal
            const createdCustomer =
              (await createOrUpdateUser(customerInput)) || [];

            // This gets the paypal order ready
            const mappedData = mapPaypalCompletionToOrder(
              response.data,
              customerInfo.phoneNumber,
              createdCustomer[0].id
            );
            // debugger;

            // console.log('[Paypal.paypalCreateOrder] mappedData: ', mappedData);
            // This takes paypal response and adds to order table
            const adminPanelOrder = await updateAdminPanelOrder(
              mappedData,
              mappedData.order_id
            );
            // console.log(
            //   '[Paypal.paypalCreateOrder]: adminPanelOrder',
            //   adminPanelOrder
            // );
            const skus = getSkusFromCartItems(cartItems);
            const skusWithQuantity = getSkusAndQuantityFromCartItems(cartItems);
            // console.log('[postAdminPanelOrderItem] inputs:', {
            //   id: adminPanelOrder[0].id,
            //   skus: JSON.stringify(skusWithQuantity)
            // });
            // Add To OrderItem Table
            await postAdminPanelOrderItem(
              adminPanelOrder[0].id,
              JSON.stringify(skusWithQuantity)
            );
            if (response.success) {
              // clearLocalStorageCart();
              const emailInput = {
                to: customerInfo.email,
                name: {
                  firstName: shippingAddress.firstName,
                  fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                },
                orderInfo: {
                  orderDate: getCurrentDayInLocaleDateString(),
                  orderNumber,
                  // products
                },
                // address,
                // shippingInfo,
                // billingInfo,
              };
              const emailResponse = await fetch('/api/email/thank-you', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailInput }),
              });
              const enhancedGoogleCovnersionInput = {
                email: customerInfo.email || '',
                phone_number: shippingAddress.phone || '',
                first_name: shippingAddress.firstName || '',
                last_name: shippingAddress.lastName || '',
                address_line1: shippingAddress.address.line1 || '',
                city: shippingAddress.address.city || '',
                state: shippingAddress.address.state || '',
                postal_code: shippingAddress.address.postal_code || '',
                country: shippingAddress.address.country || '',
              };
              handlePurchaseGoogleTag(
                cartItems,
                orderNumber,
                getTotalPrice().toFixed(2),
                clearLocalStorageCart,
                enhancedGoogleCovnersionInput
              );
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
