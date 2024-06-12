import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormEvent, useState, useEffect } from 'react';
import OrderReview from './OrderReview';
import PriceBreakdown from './PriceBreakdown';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import PaymentSelector from './PaymentSelector';
import BillingAddress from './BillingAddress';
import { useCartContext } from '@/providers/CartProvider';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import { NewCheckout } from './NewCheckout';
import Klarna from '@/images/checkout/Klarna-Black.webp';
import Image from 'next/image';
import { CreditCard } from 'lucide-react';
import PayPalIcon from '../PDP/components/icons/PayPalIcon';
import VisaBlue from '@/images/checkout/VisaLogoBlue.webp';
import VisaWhite from '@/images/checkout/VisaLogoWhite.webp';
import Mastercard from '@/images/checkout/MastercardIcon.webp';
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

// function isValidShippingAddress({ address }: StripeAddress) {
//   return (
//     address &&
//     address.line1 !== '' &&
//     // address.address_line_2 &&
//     // address.line2 !== '' &&
//     address.city !== '' &&
//     address.state !== '' &&
//     address.postal_code !== '' &&
//     address.country !== ''
//   );
// }

export default function Payment({
  handleChangeAccordion,
}: {
  handleChangeAccordion: (accordionTitle: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const [paymentMethod, setPaymentMethod] =
  //   useState<PaymentMethod>('creditCard');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [message, setMessage] = useState<string>('');
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
  } = useCheckoutContext();
  const { getTotalPrice, clearLocalStorageCart } = useCartContext();
  const totalMsrpPrice = convertPriceToStripeFormat(getTotalPrice() + shipping);

  const isDisabledCard =
    isEditingAddress ||
    Boolean(cardNumberError.error || !cardNumberError.visited) ||
    Boolean(cardExpiryError.error || !cardExpiryError.visited) ||
    Boolean(cardCvvError.error || !cardCvvError.visited);

  useEffect(() => {
    console.log({
      isDisabledCard,
      isEditingAddress,
      cardVisited: cardNumberError,
      expiryVisited: cardExpiryError,
      cvvVisited: cardCvvError,
    });
  }, [cardNumberError, cardExpiryError, cardCvvError]);

  const { name } = shippingAddress;
  const { city, line1, state, postal_code, country } = shippingAddress.address;
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

  
  //   stripe
  //     .confirmPayment({
  //       elements,
  //       redirect: 'if_required',
  //       confirmParams: {
  //         shipping: {
  //           name: shippingAddress.name,
  //           phone: shippingAddress.phone,
  //           address: {
  //             city: shippingAddress.address.city as string,
  //             country: shippingAddress.address.country as string,
  //             line1: shippingAddress.address.line1 as string,
  //             line2: shippingAddress.address.line2 as string,
  //             postal_code: shippingAddress.address.postal_code as string,
  //             state: shippingAddress.address.state as string,
  //           },
  //         },
  //         // Make sure to change this to your payment completion page
  //         // return_url: `${origin}/thank-you?order_number=${orderNumber}`,
  //         receipt_email: customerInfo.email,
  //         payment_method_data: {
  //           billing_details: {
  //             email: customerInfo.email,
  //             name: billingAddress.name,
  //             phone: billingAddress.phone,
  //             address: {
  //               city: billingAddress.address.city as string,
  //               country: billingAddress.address.country as string,
  //               line1: billingAddress.address.line1 as string,
  //               line2: billingAddress.address.line2 as string,
  //               postal_code: billingAddress.address.postal_code as string,
  //               state: billingAddress.address.state as string,
  //             },
  //           },
  //         },
  //       },
  //     })
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
      //         // products
      //       },
      //       // address,
      //       // shippingInfo,
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

      //     // Meta Conversion API
      //     const skus = getSkusFromCartItems(cartItems);
      //     const skusWithQuantityMsrpForMeta =
      //       getSkuQuantityPriceFromCartItemsForMeta(cartItems);
      //     const eventID = uuidv4();

      //     const metaCPIEvent = {
      //       event_name: 'Purchase',
      //       event_time: Math.floor(Date.now() / 1000),
      //       event_id: eventID,
      //       action_source: 'website',
      //       user_data: {
      //         em: [hashData(customerInfo.email)],
      //         ph: [hashData(shippingAddress.phone || '')],
      //         ct: [hashData(shippingAddress.address.city || '')],
      //         country: [hashData(shippingAddress.address.country || '')],
      //         fn: [hashData(shippingAddress.firstName || '')],
      //         ln: [hashData(shippingAddress.lastName || '')],
      //         st: [hashData(shippingAddress.address.state || '')],
      //         zp: [hashData(shippingAddress.address.postal_code || '')],
      //         fbp: getCookie('_fbp'),
      //         // client_ip_address: '', // Replace with the user's IP address
      //         client_user_agent: navigator.userAgent, // Browser user agent string
      //       },
      //       custom_data: {
      //         currency: 'USD',
      //         value: parseFloat(getTotalPrice().toFixed(2)),
      //         order_id: orderNumber,
      //         content_ids: skus.join(','),
      //         contents: skusWithQuantityMsrpForMeta,
      //       },
      //       event_source_url: origin,
      //     };
      //     const metaCAPIResponse = await fetch('/api/meta/event', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ metaCPIEvent }),
      //     });
      //     // Track the purchase event
      //     if (typeof fbq === 'function') {
      //       fbq(
      //         'track',
      //         'Purchase',
      //         {
      //           value: parseFloat(getTotalPrice().toFixed(2)),
      //           currency: 'USD',
      //           contents: skusWithQuantityMsrpForMeta,
      //           content_type: 'product',
      //         },
      //         { eventID }
      //       );
      //     }

      //     // Microsoft Conversion API Tracking
      //     if (typeof window !== 'undefined') {
      //       window.uetq = window.uetq || [];

      //       window.uetq.push('set', {
      //         pid: {
      //           em: customerInfo.email,
      //           ph: customerInfo.phoneNumber,
      //         },
      //       });
      //       window.uetq.push('event', 'purchase', {
      //         revenue_value: parseFloat(getTotalPrice().toFixed(2)),
      //         currency: 'USD',
      //         pid: {
      //           em: customerInfo.email,
      //           ph: customerInfo.phoneNumber,
      //         },
      //       });
      //     }
      //     if (process.env.NEXT_PUBLIC_IS_PREVIEW !== 'PREVIEW') {
      //       const skuLabOrderInput = generateSkuLabOrderInput({
      //         orderNumber,
      //         cartItems,
      //         totalMsrpPrice: convertPriceFromStripeFormat(totalMsrpPrice),
      //         shippingAddress,
      //         customerInfo,
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
      //     }

      //     // Google Conversion API
      //     const enhancedGoogleConversionInput = {
      //       email: customerInfo.email || '',
      //       phone_number: shippingAddress.phone || '',
      //       first_name: shippingAddress.firstName || '',
      //       last_name: shippingAddress.lastName || '',
      //       address_line1: shippingAddress.address.line1 || '',
      //       city: shippingAddress.address.city || '',
      //       state: shippingAddress.address.state || '',
      //       postal_code: shippingAddress.address.postal_code || '',
      //       country: shippingAddress.address.country || '',
      //     };

      //     handlePurchaseGoogleTag(
      //       cartItems,
      //       orderNumber,
      //       getTotalPrice().toFixed(2),
      //       clearLocalStorageCart,
      //       enhancedGoogleConversionInput
      //     );

      //     const { id, client_secret } = result.paymentIntent;
      //     router.push(
      //       `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
      //     );
      //   }
      // })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

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

  return (
    <section className="px-4 ">
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
                <div>You will be redirected to Apple Pay upon checkout.</div>
              )}
              {paymentMethod === 'googlePay' && (
                <div>You will be redirected to Google Pay upon checkout.</div>
              )}
              {paymentMethod === 'klarna' && (
                <div className="flex items-center gap-2 ">
                  <Image
                    alt="Klarna"
                    src={Klarna}
                    className="-mx-2 -my-2 min-w-[70px] max-w-[70px]"
                  />
                  <h2> 4 interest-free payments</h2>
                </div>
              )}
              {paymentMethod === 'creditCard' && (
                <div className="flex items-center gap-2">
                  {/* <CreditCard />
                  <p className="">Credit Card</p> */}

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
            <div className="text-[16px] font-[400] leading-[27px] text-[#767676]">
              <p>{name}</p>

              <p>{line1}</p>
              <p>
                {city} {state} {postal_code}
              </p>
            </div>
          </div>
          <div>
            <p
              className="flex max-h-fit cursor-pointer font-[500] underline hover:text-[#0C87B8]"
              onClick={() => updateIsReadyToPay(false)}
            >
              Edit
            </p>
          </div>
        </span>
      ) : (
        <>
          <h2 className="text-[16px] font-[500] leading-[27px]">
            Select Payment Method
          </h2>
          <PaymentSelector
            selectedPaymentMethod={paymentMethod}
            onPaymentMethodChange={updatePaymentMethod}
          />
          {paymentMethod === 'creditCard' && (
            <div className="flex flex-col gap-4">
              <form
                id="payment-form"
                // onSubmit={handleSubmit}
              >
                <NewCheckout />
                {/* <PaymentElement id="payment-element" /> */}
              </form>

              <BillingAddress
                isEditingAddress={isEditingAddress}
                setIsEditingAddress={setIsEditingAddress}
              />
            </div>
          )}
          {paymentMethod === 'paypal' && (
            <div>You will be redirected to the PayPal site upon checkout.</div>
          )}
          {paymentMethod === 'applePay' && (
            <div>You will be redirected to Apple Pay upon checkout.</div>
          )}
          {paymentMethod === 'googlePay' && (
            <div>You will be redirected to Google Pay upon checkout.</div>
          )}
          {paymentMethod === 'klarna' && (
            <div className="lg:flex lg:items-center lg:justify-center">
              <div className="my-4 w-full justify-center md:flex md:flex-col lg:w-[350px]">
                <div>You will be redirected to Klarna upon checkout.</div>
                <Button
                  // disabled={isDisabledCard}
                  variant={'default'}
                  className={`mb-3 w-full rounded-lg ${isDisabledCard ? 'bg-[#BE1B1B]/90' : 'bg-[#BE1B1B]'} text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
                  onClick={(e) => {
                    // setIsLoading(true);
                    // handleSubmit(e);
                    updateIsReadyToPay(true);
                    handleChangeAccordion('orderReview');
                  }}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    'Continue to Order Review'
                  )}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
      {/* Continue To Order Review Button */}
      {paymentMethod === 'creditCard' && !isReadyToPay && (
        <div className="lg:flex lg:items-center lg:justify-center">
          <div className="my-4 w-full justify-center md:flex md:flex-col lg:w-[350px]">
            <Button
              disabled={isDisabledCard}
              variant={'default'}
              className={`mb-3 w-full rounded-lg ${isDisabledCard ? 'bg-[#BE1B1B]/90' : 'bg-[#BE1B1B]'} text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
              onClick={async (e) => {
                setIsLoading(true);
                // handleSubmit(e);
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
                    if (paymentMethod.paymentMethod?.type === 'card') {
                      updateIsReadyToPay(true);
                    }
                    console.log({ paymentMethod });
                    updateStripePaymentMethod(paymentMethod);
                    handleChangeAccordion('orderReview');
                    setIsLoading(false);
                  });
              }}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                'Continue to Order Review'
              )}
            </Button>
          </div>
        </div>
      )}
      {paymentMethod === 'paypal' && !isReadyToPay && (
        <div className="lg:flex lg:items-center lg:justify-center">
          <div className="my-4 w-full justify-center md:flex md:flex-col lg:w-[350px]">
            <Button
              disabled={isDisabledCard}
              variant={'default'}
              className={`mb-3 w-full rounded-lg ${isDisabledCard ? 'bg-[#BE1B1B]/90' : 'bg-[#BE1B1B]'} text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
              onClick={async (e) => {
                // setIsLoading(true);
                // handleSubmit(e);
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
        </div>
      )}

      {message && (
        <div className="font-base flex items-center justify-center text-lg text-red-500">
          Error: {message}
        </div>
      )}
    </section>
  );
}
