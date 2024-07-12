import { useElements, useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import PaymentSelector from './PaymentSelector';
import BillingAddress from './BillingAddress';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import { CreditCardSection } from './CreditCardSection';
// import Klarna from '@/images/checkout/Klarna-Black.webp';
import PayPalIcon from './icons/PayPalIcon';
import Image from 'next/image';
import VisaBlue from '@/images/checkout/VisaLogoBlue.webp';
import Mastercard from '@/images/checkout/MastercardIcon.webp';
import { useRouter } from 'next/navigation';
import ApplePayIcon from './icons/ApplePayIcon';
import GooglePayIcon from './icons/GooglePayIcon';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { SHIPPING_METHOD } from '@/lib/constants';
import { useCartContext } from '@/providers/CartProvider';
import { convertPriceToStripeFormat } from '@/lib/utils/stripe';

export default function Payment({
  handleChangeAccordion,
}: {
  handleChangeAccordion: (accordionTitle: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [paypalSuccessMessage, setPaypalSuccessMessage] = useState<string>('');

  const {
    billingAddress,
    shippingAddress,
    customerInfo,
    shipping,
    updateIsReadyToPay,
    isReadyToPay,
    paymentMethod,
    updatePaymentMethod,
    cardNumberError,
    cardExpiryError,
    cardCvvError,
    stripePaymentMethod,
    updateStripePaymentMethod,
    orderNumber,
    paymentIntentId,
    isBillingSameAsShipping,
    twoLetterStateCode,
    billingTwoLetterStateCode,
  } = useCheckoutContext();
  const {
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    clearLocalStorageCart,
    isCartPreorder,
    cartPreorderDate,
    getTotalPreorderDiscount,
  } = useCartContext();
  // const preorderDate = isCartPreorder ? cartPreorderDate : undefined;
  // const shippingInfo = {
  //   shipping_method: SHIPPING_METHOD,
  //   shipping_date: determineDeliveryByDate('EEE, LLL dd', preorderDate),
  //   delivery_fee: shipping,
  // };
  // const totalMsrpPrice = convertPriceToStripeFormat(getTotalPrice() + shipping);

  const isDisabledCard =
    isEditingAddress ||
    Boolean(cardNumberError.error || !cardNumberError.visited) ||
    Boolean(cardExpiryError.error || !cardExpiryError.visited) ||
    Boolean(cardCvvError.error || !cardCvvError.visited);

  const customerBilling = {
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
  };

  const determineBrandLogo = (brand: string) => {
    switch (brand) {
      case 'visa':
        return <Image alt="Visa" src={VisaBlue} />;
      case 'mastercard':
        return <Image alt="Mastercard" src={Mastercard} />;
      default:
        return null;
    }
  };

  const buttonStyle = `mb-3 w-full lg:max-w-[307px] font-[700] rounded-lg text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] bg-[#1A1A1A] hover:bg-[#1A1A1A]/90  bg: text-center uppercase m-0 max-h-[48px] min-h-[48px] self-end justify-self-end text-[16px] leading-[17px]`;

  const handleContinueWithCard = () => {
    setIsLoading(true);
    const cardNumberElement = elements?.getElement(
      'cardNumber'
    ) as StripeCardNumberElement;

    stripe
      ?.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: customerBilling,
      })
      .then((paymentMethod) => {
        if (paymentMethod.error) {
          console.error(paymentMethod.error.message, paymentMethod.error);
          setMessage(String(paymentMethod.error.message));
          return;
        }
        if (paymentMethod.paymentMethod?.type === 'card') {
          updateStripePaymentMethod(paymentMethod);
          updateIsReadyToPay(true);
          handleChangeAccordion('orderReview');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditPayment = () => {
    updateIsReadyToPay(false);
  };

  return (
    <section>
      {/* <div className="mb-10 lg:hidden"><PromoCode /></div> */}
      {isReadyToPay ? (
        <span className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-base font-[500]"> Payment Method</p>
            <div className="flex py-5">
              {paymentMethod === 'paypal' && (
                <div className="flex items-center gap-2">
                  <PayPalIcon />
                </div>
              )}
              {paymentMethod === 'applePay' && (
                // <div>You will be redirected to Apple Pay upon checkout.</div>
                <ApplePayIcon />
              )}
              {paymentMethod === 'googlePay' && (
                // <div>You will be redirected to Google Pay upon checkout.</div>
                <GooglePayIcon />
              )}
              {paymentMethod === 'klarna' && (
                <div className="flex items-center gap-2 ">
                  <div className="flex min-w-[70px] max-w-[70px]">
                    {/* <Image
                      alt="Klarna"
                      src={Klarna}
                      className="-mx-4 -my-2 object-cover"
                    /> */}
                  </div>

                  <h2> 4 interest-free payments</h2>
                </div>
              )}
              {paymentMethod === 'creditCard' && (
                <div className="flex items-center gap-2">
                  {stripePaymentMethod &&
                    stripePaymentMethod.paymentMethod?.card && (
                      <div className="flex items-center gap-2 text-[16px] leading-[27px] text-[#767676]">
                        <div className="flex max-h-[16px] max-w-[48px]">
                          {determineBrandLogo(
                            stripePaymentMethod.paymentMethod.card.brand
                          )}
                        </div>
                        <div className="flex">
                          <p>
                            {stripePaymentMethod.paymentMethod.card.last4} Exp:{' '}
                            {stripePaymentMethod.paymentMethod.card.exp_month}/
                            {stripePaymentMethod.paymentMethod.card.exp_year}
                          </p>
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
            <p className="text-base font-[500]"> Billing Details</p>
            <div className="pb-[26px] text-[16px] font-[400] leading-[27px] text-[#767676]">
              <p>{customerBilling.name}</p>

              <p>{customerBilling.address.line1}</p>
              <p>
                {customerBilling.address.city} {customerBilling.address.state}{' '}
                {customerBilling.address.postal_code}
              </p>
            </div>
          </div>
          <div>
            <p
              className="flex max-h-fit cursor-pointer font-[500] underline hover:text-[#0C87B8]"
              onClick={handleEditPayment}
            >
              Edit
            </p>
          </div>
        </span>
      ) : (
        <>
          <h2 className="pb-[26px] text-[16px] font-[500] leading-[27px]">
            Select Payment Method
          </h2>
          <PaymentSelector
            selectedPaymentMethod={paymentMethod}
            onPaymentMethodChange={updatePaymentMethod}
          />
          {paymentMethod === 'creditCard' ? (
            <div className="flex flex-col gap-4">
              <form id="payment-form">
                <CreditCardSection />
              </form>

              <BillingAddress
                isEditingAddress={isEditingAddress}
                setIsEditingAddress={setIsEditingAddress}
              />
            </div>
          ) : (
            <div className="pt-[15px]">
              {paymentMethod === 'paypal' && (
                <div>
                  You will be redirected to the PayPal site upon checkout.
                </div>
              )}
              {paymentMethod === 'applePay' && (
                <div>You will be redirected to Apple Pay upon checkout.</div>
              )}
              {paymentMethod === 'googlePay' && (
                <div>You will be redirected to Google Pay upon checkout.</div>
              )}
              {paymentMethod === 'klarna' && (
                <div>You will be redirected to Klarna upon checkout.</div>
              )}
            </div>
          )}
        </>
      )}
      {/* Continue To Order Review Button */}
      {paymentMethod === 'creditCard' && !isReadyToPay && (
        <div className="my-[48px] flex w-full  items-center justify-center lg:justify-end">
          <Button
            variant={'default'}
            className={buttonStyle}
            disabled={isDisabledCard}
            onClick={async () => handleContinueWithCard()}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              'Continue to Order Review'
            )}
          </Button>
        </div>
      )}
      {(paymentMethod === 'klarna' ||
        paymentMethod === 'googlePay' ||
        paymentMethod === 'applePay' ||
        paymentMethod === 'paypal') &&
        !isReadyToPay && (
          <div className="my-[48px] flex w-full items-center justify-center lg:justify-end">
            <Button
              variant={'default'}
              className={buttonStyle}
              onClick={async (e) => {
                handleChangeAccordion('orderReview');
                updateIsReadyToPay(true);
              }}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                'Continue to Order Review'
              )}
            </Button>
          </div>
        )}

      {/* {message && (
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
      )} */}
    </section>
  );
}
// .then(async function (result) {
//   if (result.error) {
//     const { error } = result;
//     if (
//       error.type === 'card_error' ||
//       error.type === 'validation_error'
//     ) {
//       console.error('Error:', error.message);
//       setMessage(
//         error.message ||
//           "There's an error, but could not find error message"
//       );
//     } else {
//       console.error('Error:', error.message);
//       setMessage(error.message || 'An unexpected error occurred.');
//     }
//   } else if (
//     result.paymentIntent &&
//     result.paymentIntent.status === 'succeeded'
//   ) {
//     // SendGrid Thank You Email
//     const emailInput = {
//       to: customerInfo.email,
//       name: {
//         firstName: shippingAddress.firstName,
//         fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
//       },
//       orderInfo: {
//         orderDate: getCurrentDayInLocaleDateString(),
//         orderNumber,
//         cartItems, // note: cartItems transformed to orderItems inside generateThankYouEmail
//         // products
//         totalItemQuantity: getTotalCartQuantity(),
//         subtotal: getOrderSubtotal().toFixed(2),
//         total: (getTotalPrice() + shipping).toFixed(2), // may need to add taxes later
//         totalDiscount: getTotalDiscountPrice().toFixed(2),
//         totalPreorderDiscount: getTotalPreorderDiscount().toFixed(2),
//         isPreorder: isCartPreorder,
//         hasDiscount: parseFloat(getTotalDiscountPrice().toFixed(2)) > 0,
//       },
//       shippingInfo: {
//         city: shippingAddress.address.city as string,
//         country: shippingAddress.address.country as string,
//         address_line1: shippingAddress.address.line1 as string,
//         address_line2: shippingAddress.address.line2 as string,
//         postal_code: shippingAddress.address.postal_code as string,
//         state: shippingAddress.address.state as string,
//         full_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
//         shipping_method: shippingInfo.shipping_method as string,
//         shipping_date: shippingInfo.shipping_date as string,
//         delivery_fee: shippingInfo.delivery_fee.toFixed(2) as number,
//         free_delivery: shippingInfo.delivery_fee === 0,
//       },
//       // billingInfo,
//     };
//     try {
//       const response = await fetch('/api/email/thank-you', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ emailInput }),
//       });
//       const emailResponse = await response.json(); // Making sure the await goes through and email is sent
//     } catch (error) {
//       console.error('Error:', error?.message);
//       setMessage(
//         error?.message ||
//           "There's an error, but could not find error message"
//       );
//     }
//     if (process.env.NEXT_PUBLIC_IS_PREVIEW !== 'PREVIEW') {
//       // Meta Conversion API
//       const skus = getSkusFromCartItems(cartItems);
//       const skusWithQuantityMsrpForMeta =
//         getSkuQuantityPriceFromCartItemsForMeta(cartItems);
//       const eventID = uuidv4();

//       const metaCPIEvent = {
//         event_name: 'Purchase',
//         event_time: Math.floor(Date.now() / 1000),
//         event_id: eventID,
//         action_source: 'website',
//         user_data: {
//           em: [hashData(customerInfo.email)],
//           ph: [hashData(shippingAddress.phone || '')],
//           ct: [hashData(shippingAddress.address.city || '')],
//           country: [hashData(shippingAddress.address.country || '')],
//           fn: [hashData(shippingAddress.firstName || '')],
//           ln: [hashData(shippingAddress.lastName || '')],
//           st: [hashData(shippingAddress.address.state || '')],
//           zp: [hashData(shippingAddress.address.postal_code || '')],
//           fbp: getCookie('_fbp'),
//           // client_ip_address: '', // Replace with the user's IP address
//           client_user_agent: navigator.userAgent, // Browser user agent string
//         },
//         custom_data: {
//           currency: 'USD',
//           value: parseFloat(getTotalPrice().toFixed(2)),
//           order_id: orderNumber,
//           content_ids: skus.join(','),
//           contents: skusWithQuantityMsrpForMeta,
//         },
//         event_source_url: origin,
//       };
//       const metaCAPIResponse = await fetch('/api/meta/event', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ metaCPIEvent }),
//       });
//       // Track the purchase event
//       if (typeof fbq === 'function') {
//         fbq(
//           'track',
//           'Purchase',
//           {
//             value: parseFloat(getTotalPrice().toFixed(2)),
//             currency: 'USD',
//             contents: skusWithQuantityMsrpForMeta,
//             content_type: 'product',
//           },
//           { eventID }
//         );
//       }

//       // Microsoft Conversion API Tracking
//       if (typeof window !== 'undefined') {
//         window.uetq = window.uetq || [];

//         window.uetq.push('set', {
//           pid: {
//             em: customerInfo.email,
//             ph: customerInfo.phoneNumber,
//           },
//         });
//         window.uetq.push('event', 'purchase', {
//           revenue_value: parseFloat(getTotalPrice().toFixed(2)),
//           currency: 'USD',
//           pid: {
//             em: customerInfo.email,
//             ph: customerInfo.phoneNumber,
//           },
//         });
//       }

//       const skuLabOrderInput = generateSkuLabOrderInput({
//         orderNumber,
//         cartItems,
//         totalMsrpPrice: convertPriceFromStripeFormat(totalMsrpPrice),
//         shippingAddress,
//         customerInfo,
//         paymentMethod: 'Stripe',
//       });

//       // SKU Labs Order Creation
//       // Post Items
//       const skuLabCreateOrderResponse = await fetch(
//         '/api/sku-labs/orders',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ order: skuLabOrderInput }),
//         }
//       );

//       // Google Conversion API
//       const enhancedGoogleConversionInput = {
//         email: customerInfo.email || '',
//         phone_number: shippingAddress.phone || '',
//         first_name: shippingAddress.firstName || '',
//         last_name: shippingAddress.lastName || '',
//         address_line1: shippingAddress.address.line1 || '',
//         city: shippingAddress.address.city || '',
//         state: shippingAddress.address.state || '',
//         postal_code: shippingAddress.address.postal_code || '',
//         country: shippingAddress.address.country || '',
//       };

//       handlePurchaseGoogleTag(
//         cartItems,
//         orderNumber,
//         getTotalPrice().toFixed(2),
//         clearLocalStorageCart,
//         enhancedGoogleConversionInput
//       );
//     }

//     const { id, client_secret } = result.paymentIntent;
//     router.push(
//       `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
//     );
