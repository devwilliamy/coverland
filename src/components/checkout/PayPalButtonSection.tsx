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
import { generateSkuLabOrderInput } from '@/lib/utils/skuLabs';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { SHIPPING_METHOD } from '@/lib/constants';

type PaypalButtonSectionProps = {
  setPaypalSuccessMessage: (message: string) => void;
  setMessage: (message: string) => void;
};
export default function PayPalButtonSection({
  setPaypalSuccessMessage,
  setMessage,
}: PaypalButtonSectionProps) {
  const {
    orderNumber,
    shipping,
    shippingAddress,
    customerInfo,
    totalTax,
    billingAddress,
    isBillingSameAsShipping,
  } = useCheckoutContext();
  const shippingInfo = {
    shipping_method: SHIPPING_METHOD,
    shipping_date: determineDeliveryByDate('EEE, LLL dd'),
    delivery_fee: shipping,
  };
  const {
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    clearLocalStorageCart,
  } = useCartContext();
  const router = useRouter();
  const totalMsrpPrice = Number(getTotalPrice().toFixed(2));
  const totalWithTax = Number(totalMsrpPrice + Number(totalTax).toFixed(2));

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
            height: 55,
          }}
          className="w-full lg:max-w-[350px] lg:self-end lg:text-xl"
          createOrder={async () => {
            setMessage(''); // If there was an error message previously, reset it
            const data = await paypalCreateOrder(
              totalMsrpPrice,
              cartItems,
              orderNumber,
              shipping,
              shippingAddress,
              isBillingSameAsShipping ? shippingAddress : billingAddress,
              Number(totalTax)
            );
            if (!data) {
              console.log('Error creating order');
              return '';
            }
            return data;
          }}
          onApprove={async (data) => {
            // Leaving debugger and logs here due to frequent Paypal debugging
            // debugger
            // console.log('[PaypalButton Section] Data: ', data);
            // This will get the order from paypal

            let response;
            try {
              response = await paypalCaptureOrder(
                data.orderID,
                customerInfo.phoneNumber
              );
              // console.log('Response:', response);
            } catch (error) {
              // debugger;
              throw error;
            }

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
              setMessage('');
              setPaypalSuccessMessage(
                'Paypal Payment Accepted, please wait for the page to finish loading.'
              );

              const emailInput = {
                to: customerInfo.email,
                name: {
                  firstName: shippingAddress.firstName,
                  fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                },
                orderInfo: {
                  orderDate: getCurrentDayInLocaleDateString(),
                  orderNumber,
                  cartItems,
                  // products
                  totalItemQuantity: getTotalCartQuantity(),
                  subtotal: getOrderSubtotal().toFixed(2),
                  total: (getTotalPrice() + shipping).toFixed(2), // may need to add taxes later
                  totalDiscount: getTotalDiscountPrice().toFixed(2),
                  hasDiscount:
                    parseFloat(getTotalDiscountPrice().toFixed(2)) > 0,
                },
                shippingInfo: {
                  city: shippingAddress.address.city as string,
                  country: shippingAddress.address.country as string,
                  address_line1: shippingAddress.address.line1 as string,
                  address_line2: shippingAddress.address.line2 as string,
                  postal_code: shippingAddress.address.postal_code as string,
                  state: shippingAddress.address.state as string,
                  full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                  shipping_method: shippingInfo.shipping_method as string,
                  shipping_date: shippingInfo.shipping_date as string,
                  delivery_fee: shippingInfo.delivery_fee.toFixed(2) as number,
                  free_delivery: shippingInfo.delivery_fee === 0,
                },
                // billingInfo,
              };
              const emailResponse = await fetch('/api/email/thank-you', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailInput }),
              });

              if (process.env.NEXT_PUBLIC_IS_PREVIEW !== 'PREVIEW') {
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

                const skuLabOrderInput = generateSkuLabOrderInput({
                  orderNumber,
                  cartItems,
                  totalMsrpPrice,
                  shippingAddress,
                  customerInfo,
                  paymentMethod: 'Paypal',
                });

                // SKU Labs Order Creation
                // Post Items
                const skuLabCreateOrderResponse = await fetch(
                  '/api/sku-labs/orders',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ order: skuLabOrderInput }),
                  }
                );

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
              }

              router.push(
                `/thank-you?order_number=${orderNumber}&payment_gateway=paypal`
              );
            }
          }}
          onError={(error) => {
            console.error(`[Paypal Error]:`, error);
            if (error.message?.includes('popup close')) {
              console.error(
                `[PaypalButtonSection] Error: Popup closed unexpectedly`
              );
              setMessage('Popup closed unexpectedly');
            } else if (error?.message) {
              setMessage(error?.message);
            } else {
              setMessage('Unexpected Error Occurred');
            }
          }}
        />
      </Suspense>
    </PayPalScriptProvider>
  );
}
