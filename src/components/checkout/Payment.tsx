import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import OrderReview from './OrderReview';
import PriceBreakdown from './PriceBreakdown';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PayPalButtonSection from './PayPalButtonSection';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import PaymentSelector from './PaymentSelector';
import { PaymentMethod, StripeAddress } from '@/lib/types/checkout';
import BillingAddress from './BillingAddress';
import { useCartContext } from '@/providers/CartProvider';
import {
  convertPriceFromStripeFormat,
  convertPriceToStripeFormat,
  getSkuQuantityPriceFromCartItemsForMeta,
  getSkusFromCartItems,
} from '@/lib/utils/stripe';
import { getCurrentDayInLocaleDateString } from '@/lib/utils/date';
import { useRouter } from 'next/navigation';
import { handlePurchaseGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { hashData } from '@/lib/utils/hash';
import { getCookie } from '@/lib/utils/cookie';
import { v4 as uuidv4 } from 'uuid';
import { generateSkuLabOrderInput } from '@/lib/utils/skuLabs';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { SHIPPING_METHOD } from '@/lib/constants';

function isValidShippingAddress({ address }: StripeAddress) {
  return (
    address &&
    address.line1 !== '' &&
    // address.address_line_2 &&
    // address.line2 !== '' &&
    address.city !== '' &&
    address.state !== '' &&
    address.postal_code !== '' &&
    address.country !== ''
  );
}

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('creditCard');
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [paypalSuccessMessage, setPaypalSuccessMessage] = useState<string>('');
  const { orderNumber, paymentIntentId } = useCheckoutContext();
  const { billingAddress, shippingAddress, customerInfo, shipping } =
    useCheckoutContext();
  const {
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    clearLocalStorageCart,
    isCartPreorder,
    cartPreorderDate,
    getTotalPreorderDiscount
  } = useCartContext();
  const preorderDate = isCartPreorder ? cartPreorderDate : undefined;
  const shippingInfo = {
    shipping_method: SHIPPING_METHOD,
    shipping_date: determineDeliveryByDate('EEE, LLL dd', preorderDate),
    delivery_fee: shipping,
  };
  const totalMsrpPrice = convertPriceToStripeFormat(getTotalPrice() + shipping);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const origin = window.location.origin;
    const response = await fetch('/api/stripe/payment-intent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        amount: totalMsrpPrice,
      }),
    });
    const data = await response.json();
    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          shipping: {
            name: shippingAddress.name,
            phone: shippingAddress.phone,
            address: {
              city: shippingAddress.address.city as string,
              country: shippingAddress.address.country as string,
              line1: shippingAddress.address.line1 as string,
              line2: shippingAddress.address.line2 as string,
              postal_code: shippingAddress.address.postal_code as string,
              state: shippingAddress.address.state as string,
            },
          },
          // Make sure to change this to your payment completion page
          // return_url: `${origin}/thank-you?order_number=${orderNumber}`,
          receipt_email: customerInfo.email,
          payment_method_data: {
            billing_details: {
              email: customerInfo.email,
              name: billingAddress.name,
              phone: billingAddress.phone,
              address: {
                city: billingAddress.address.city as string,
                country: billingAddress.address.country as string,
                line1: billingAddress.address.line1 as string,
                line2: billingAddress.address.line2 as string,
                postal_code: billingAddress.address.postal_code as string,
                state: billingAddress.address.state as string,
              },
            },
          },
        },
      })
      .then(async function (result) {
        if (result.error) {
          const { error } = result;
          if (
            error.type === 'card_error' ||
            error.type === 'validation_error'
          ) {
            console.error('Error:', error.message);
            setMessage(
              error.message ||
                "There's an error, but could not find error message"
            );
          } else {
            console.error('Error:', error.message);
            setMessage(error.message || 'An unexpected error occurred.');
          }
        } else if (
          result.paymentIntent &&
          result.paymentIntent.status === 'succeeded'
        ) {
          // SendGrid Thank You Email
          const emailInput = {
            to: customerInfo.email,
            name: {
              firstName: shippingAddress.firstName,
              fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            },
            orderInfo: {
              orderDate: getCurrentDayInLocaleDateString(),
              orderNumber,
              cartItems, // note: cartItems transformed to orderItems inside generateThankYouEmail
              // products
              totalItemQuantity: getTotalCartQuantity(),
              subtotal: getOrderSubtotal().toFixed(2),
              total: (getTotalPrice() + shipping).toFixed(2), // may need to add taxes later
              totalDiscount: getTotalDiscountPrice().toFixed(2),
              totalPreorderDiscount: getTotalPreorderDiscount().toFixed(2),
              isPreorder: isCartPreorder,
              hasDiscount: parseFloat(getTotalDiscountPrice().toFixed(2)) > 0,
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
          try {
            const response = await fetch('/api/email/thank-you', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ emailInput }),
            });
            const emailResponse = await response.json(); // Making sure the await goes through and email is sent
          } catch (error) {
            console.error('Error:', error?.message);
            setMessage(
              error?.message ||
                "There's an error, but could not find error message"
            );
          }
          if (process.env.NEXT_PUBLIC_IS_PREVIEW !== 'PREVIEW') {
            // Meta Conversion API
            const skus = getSkusFromCartItems(cartItems);
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
              totalMsrpPrice: convertPriceFromStripeFormat(totalMsrpPrice),
              shippingAddress,
              customerInfo,
              paymentMethod: 'Stripe',
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

            // Google Conversion API
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

          const { id, client_secret } = result.paymentIntent;
          router.push(
            `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isDisabled =
    !isValidShippingAddress(shippingAddress) || isEditingAddress;

  return (
    <div className="px-4">
      <div className="mb-10 lg:hidden">{/* <PromoCode /> */}</div>
      <div className="pb-5">Select Payment Method</div>
      <div className="pb-5">
        <PaymentSelector
          selectedPaymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
        />
      </div>
      {paymentMethod === 'creditCard' ? (
        <>
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement
              id="payment-element"
              // onChange={(e) => {
              //   if (e.complete) {
              //     console.log('e.value', e.value);
              //   }
              // }}
            />
          </form>
          <div className="pt-4">
            <BillingAddress
              isEditingAddress={isEditingAddress}
              setIsEditingAddress={setIsEditingAddress}
            />
          </div>
        </>
      ) : (
        <div>You will be redirected to the PayPal site upon checkout.</div>
      )}
      <div className="lg:hidden">
        <OrderReview />
      </div>
      <div className="mt-3 lg:hidden">
        <PriceBreakdown />
      </div>
      {paymentMethod === 'creditCard' ? (
        <div className="lg:flex lg:items-center lg:justify-center">
          <div className="my-4 w-full justify-center md:flex md:flex-col lg:w-[350px]">
            <Button
              disabled={isDisabled}
              variant={'default'}
              className={`mb-3 w-full rounded-lg ${isDisabled ? 'bg-[#BE1B1B]/90' : 'bg-[#BE1B1B]'} text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
              onClick={(e) => {
                setIsLoading(true);
                handleSubmit(e);
              }}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                'Checkout'
              )}
            </Button>
          </div>
        </div>
      ) : (
        <>
          <PayPalButtonSection
            setPaypalSuccessMessage={setPaypalSuccessMessage} 
            setMessage={setMessage}
          />
          <div className="text-md font-bold text-green-700">{paypalSuccessMessage}</div>
        </>
      )}
      {message && (
        <div className="font-base flex items-center justify-center text-lg text-red-500">
          Error: {message}
        </div>
      )}
    </div>
  );
}
