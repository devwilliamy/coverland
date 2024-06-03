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
  getSkuQuantityPriceFromCartItemsForMeta,
  getSkusAndQuantityFromCartItems,
  getSkusFromCartItems,
} from '@/lib/utils/stripe';
import { createOrUpdateUser } from '@/lib/db/admin-panel/customers';
import { getCurrentDayInLocaleDateString } from '@/lib/utils/date';
import { handlePurchaseGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { hashData } from '@/lib/utils/hash';
import { getCookie } from '@/lib/utils/cookie';
import { v4 as uuidv4 } from 'uuid';

export default function PayPalButtonSection() {
  const { clearLocalStorageCart, getTotalPrice, cartItems } = useCartContext();
  const { orderNumber, shipping, shippingAddress, customerInfo } =
    useCheckoutContext();
  const router = useRouter();
  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;

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

            if (response.success) {
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

              const skusWithQuantityMsrpForMeta =
                getSkuQuantityPriceFromCartItemsForMeta(cartItems);
              const eventID = uuidv4();

              const metaCPIEvent = {
                event_name: 'Purchase',
                event_time: Math.floor(Date.now() / 1000),
                event_id: eventID,
                action_source: 'website',
                user_data: {
                  em: [hashData(customerInfo.email)],
                  ph: [hashData(shippingAddress.phone || '')],
                  ct: [hashData(shippingAddress.address.city || '')],
                  country: [hashData(shippingAddress.address.country || '')],
                  fn: [hashData(shippingAddress.firstName || '')],
                  ln: [hashData(shippingAddress.lastName || '')],
                  st: [hashData(shippingAddress.address.state || '')],
                  zp: [hashData(shippingAddress.address.postal_code || '')],
                  fbp: getCookie('_fbp'),
                  // client_ip_address: '', // Replace with the user's IP address
                  client_user_agent: navigator.userAgent, // Browser user agent string
                },
                custom_data: {
                  currency: 'USD',
                  value: parseFloat(getTotalPrice().toFixed(2)),
                  order_id: orderNumber,
                  content_ids: skus.join(','),
                  contents: skusWithQuantityMsrpForMeta,
                },
                event_source_url: origin,
              };

              const metaCAPIResponse = await fetch('/api/meta/event', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ metaCPIEvent }),
              });
              // Track the purchase event
              if (typeof fbq === 'function') {
                fbq(
                  'track',
                  'Purchase',
                  {
                    value: parseFloat(getTotalPrice().toFixed(2)),
                    currency: 'USD',
                    contents: skusWithQuantityMsrpForMeta,
                    content_type: 'product',
                  },
                  { eventID }
                );
              }
              // Microsoft Conversion API Tracking
              if (typeof window !== 'undefined') {
                window.uetq = window.uetq || [];
                window.uetq.push('set', {
                  pid: {
                    em: customerInfo.email,
                    ph: customerInfo.phoneNumber,
                  },
                });
                window.uetq.push('event', 'purchase', {
                  revenue_value: parseFloat(getTotalPrice().toFixed(2)),
                  currency: 'USD',
                  pid: {
                    em: customerInfo.email,
                    ph: customerInfo.phoneNumber,
                  },
                });
              }

              const enhancedGoogleConversionInput = {
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
                enhancedGoogleConversionInput
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
