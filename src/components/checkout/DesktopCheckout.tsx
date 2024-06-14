import { useCheckoutContext } from '@/contexts/CheckoutContext';
import CheckoutSummarySection from './CheckoutSummarySection';
import OrderReview from './OrderReview';
import { CheckoutStep, StripeAddress } from '@/lib/types/checkout';
import YourCart from './YourCart';
import Shipping from './Shipping';
import Payment from './Payment';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useEffect, useState } from 'react';
import CartHeader from './CartHeader';
import { handlePurchaseGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { getCookie } from '@/lib/utils/cookie';
import { getCurrentDayInLocaleDateString } from '@/lib/utils/date';
import { hashData } from '@/lib/utils/hash';
import { generateSkuLabOrderInput } from '@/lib/utils/skuLabs';
import {
  convertPriceToStripeFormat,
  getSkusFromCartItems,
  getSkuQuantityPriceFromCartItemsForMeta,
  convertPriceFromStripeFormat,
} from '@/lib/utils/stripe';
import { useCartContext } from '@/providers/CartProvider';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CreatePaymentMethodKlarnaData } from '@stripe/stripe-js';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { ReadyCheck } from './ReadyCheck';
import OrderReviewItem from './OrderReviewItem';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import PayPalButtonSection from './PayPalButtonSection';
import PayWithKlarnaWhite from './PayWithKlarnaWhite';
import PriceBreakdown from './PriceBreakdown';
import { Separator } from '../ui/separator';

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

export default function DesktopCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const {
    cartItems,
    getTotalPrice,
    clearLocalStorageCart,
    getTotalCartQuantity,
    getOrderSubtotal,
  } = useCartContext();
  const {
    billingAddress,
    currentStep,
    customerInfo,
    shipping,
    shippingAddress,
    orderNumber,
    paymentMethod,
    updatePaymentMethod,
    paymentIntentId,
    isAddressComplete,
    isEditingAddress,
    isReadyToPay,
    isReadyToShip,
    stripePaymentMethod,
    twoLetterStateCode,
    totalTax,
    updateTotalTax,
  } = useCheckoutContext();
  // const { orderNumber, paymentIntentId, paymentMethod, updatePaymentMethod } = useCheckoutContext();
  const orderSubtotal = getOrderSubtotal().toFixed(2);
  const cartMSRP = getTotalPrice() + shipping;
  const totalMsrpPrice = convertPriceToStripeFormat(getTotalPrice() + shipping);
  const isCartEmpty = getTotalCartQuantity() === 0;
  const [value, setValue] = useState(['shipping']);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSelectTab = (title: string) => {
    if (document) {
      const el = document.getElementById(title);
      const elTop = (el?.offsetTop as number) - 200;
      // When payment is selected, need a little delay so screen will scroll to it when it opens
      // If it's already open, don't need to wait.
      const timeout = value.includes('payment') ? 0 : 250;
      setTimeout(() => {
        window.scrollTo({
          top: elTop as number,
          behavior: 'smooth',
        });
      }, timeout);
    }
  };

  const handleChangeAccordion = (value: string) =>
    setValue((p) => [...p, value]);

  const handleConversions = async () => {
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
        // products
      },
      // address,
      // shippingInfo,
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
        error?.message || "There's an error, but could not find error message"
      );
    }
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
    if (process.env.NEXT_PUBLIC_IS_PREVIEW !== 'PREVIEW') {
      const skuLabOrderInput = generateSkuLabOrderInput({
        orderNumber,
        cartItems,
        totalMsrpPrice: convertPriceFromStripeFormat(totalMsrpPrice),
        shippingAddress,
        customerInfo,
      });

      // SKU Labs Order Creation
      // Post Items
      const skuLabCreateOrderResponse = await fetch('/api/sku-labs/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: skuLabOrderInput }),
      });
    }

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
  };

  const handleGetTax = async () => {
    let taxItems = [];
    let count = 0;
    for (const item of cartItems) {
      taxItems.push({
        id: item.id ? item.id : count,
        quantity: item.quantity,
        unit_price: item.msrp,
        discount: 0,
      });
      count++;
    }

    const bodyData = {
      to_country: shippingAddress.address.country,
      to_zip: shippingAddress.address.postal_code,
      to_state: twoLetterStateCode,
      // amount: orderSubtotal,
      shipping: 0,
      line_items: taxItems,
    };
    setIsLoading(true);
    const response = await fetch('/api/taxjar/sales-tax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bodyData }),
    });
    const taxRes = await response.json();
    updateTotalTax(taxRes?.tax?.amount_to_collect);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    if (totalTax == '0') {
      await handleGetTax();
    }

    const origin = window.location.origin;
    const taxSum = Number(Number(cartMSRP) + Number(totalTax)).toFixed(2);
    const totalWithTax = convertPriceToStripeFormat(taxSum);
    // console.log({ totalWithTax, orderSubtotal, totalTax, cartMSRP });

    const response = await fetch('/api/stripe/payment-intent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        amount: totalWithTax,
      }),
    });

    const data = await response.json();
    const { id, client_secret } = data.paymentIntent;
    const retrievedSecret = client_secret;
    console.log({
      id,
      retrievedSecret,
      stripePaymentMethod: stripePaymentMethod?.paymentMethod,
    });

    const customerShipping = {
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
    };

    switch (paymentMethod) {
      case 'creditCard':
        stripe
          .confirmCardPayment(String(retrievedSecret), {
            // payment_method: { card: CardNumber as StripeCardNumberElement },
            payment_method: stripePaymentMethod?.paymentMethod?.id,
            shipping: customerShipping,
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
              handleConversions();

              const { id, client_secret } = result.paymentIntent;
              setIsLoading(false);
              router.push(
                `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
              );
            }
          });
        break;
      case 'klarna':
        const result = await stripe.confirmKlarnaPayment(
          retrievedSecret,
          {
            payment_method: {
              type: 'klarna',
              billing_details: {
                address: billingAddress.address,
                email: customerInfo.email,
                phone: customerInfo.phoneNumber,
                name: billingAddress.name,
              },
            } as CreatePaymentMethodKlarnaData,
            return_url: `${origin}/checkout`,
            shipping: customerShipping,
          },
          // Enable if wanting to open new window
          { handleActions: false }
        );

        const klarnaWindow = window.open(
          'about:blank',
          'Klarna Payment',
          'left=200,top=100,width=430,height=700'
        );

        klarnaWindow?.addEventListener('beforeUnload', () => {
          setIsLoading(false);
        });

        console.log({
          status: result?.paymentIntent?.status,
          errors: result?.error,
        });

        klarnaWindow?.document.location.replace(
          String(result.paymentIntent?.next_action?.redirect_to_url?.url)
        );

        const interval = setInterval(async () => {
          if (!klarnaWindow) {
            console.log('[NO KLARNA WINDOW]');
            clearInterval(interval);
          }
          if (
            klarnaWindow?.location.href &&
            klarnaWindow?.location.href
              .toString()
              .startsWith(`${origin}/checkout`)
          ) {
            console.log({ url: klarnaWindow.location.href });
            klarnaWindow.close();
            setIsLoading(false);
            clearInterval(interval);
          }
          if (klarnaWindow?.closed) {
            const isSuccessful =
              (await stripe.retrievePaymentIntent(retrievedSecret))
                .paymentIntent?.status === 'succeeded';
            console.log('Payment window closed.');

            if (isSuccessful) {
              console.log({
                status: isSuccessful,
              });
              const emailInput = {
                to: customerInfo.email,
                name: {
                  firstName: shippingAddress.firstName,
                  fullName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                },
                orderInfo: {
                  orderDate: getCurrentDayInLocaleDateString(),
                  orderNumber,
                },
              };
              console.log({ shippingAddress });
              handleConversions();
              setIsLoading(false);
              router.push(
                `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
              );
            }
          }
        }, 1000);

        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if ((!isAddressComplete || isEditingAddress) && !isReadyToShip) {
      setValue(['shipping']);
    }
  }, [isAddressComplete, isEditingAddress, isReadyToShip]);

  useEffect(() => {
    if (isReadyToShip && !isReadyToPay) {
      setValue(['payment']);
    }
  }, [isReadyToShip, isReadyToPay]);

  useEffect(() => {
    if (!isCartEmpty && isReadyToPay) {
      handleGetTax();
    }
  }, [isCartEmpty, isReadyToPay]);

  const isDisabled = !isValidShippingAddress(shippingAddress);
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-12 lg:py-4">
        <div className="w-2/3">
          {currentStep === CheckoutStep.CART ? (
            <>
              <CartHeader />
              <YourCart />
            </>
          ) : (
            <>
              <Accordion
                type="multiple"
                // collapsible
                className="w-full"
                value={value}
                onValueChange={setValue}
              >
                <AccordionItem value="shipping">
                  <AccordionTrigger className="-mt-2 mb-4 px-4 text-[24px] font-medium">
                    <h2 className="flex gap-2">
                      <span>Shipping</span>
                      {isReadyToShip && <ReadyCheck />}
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Shipping
                      handleChangeAccordion={handleChangeAccordion}
                      handleSelectTab={handleSelectTab}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="payment" id="payment">
                  <AccordionTrigger
                    onClick={(e) => {
                      if (!isReadyToShip || isEditingAddress) {
                        e.preventDefault();
                      }
                      handleSelectTab('payment');
                    }}
                    className={`${(!isReadyToShip || isEditingAddress) && 'disabled cursor-default text-[grey] hover:no-underline'} my-4 px-4 text-[24px] font-medium`}
                    // disabled={isDisabled}
                  >
                    <h2 className="flex gap-2">
                      <span>Payment</span>
                      {isReadyToPay && <ReadyCheck />}
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Payment handleChangeAccordion={handleChangeAccordion} />
                    {isReadyToPay && (
                      <>
                        <Separator className="my-[30px] bg-[#DBDBDB]" />
                        <section className="flex w-full flex-col px-4">
                          {paymentMethod === 'creditCard' && (
                            <>
                              <p className="pb-[40px] text-[14px] font-[400] text-[#767676]">
                                By Clicking the “Submit Payment” button, you
                                confirm that you have read, understand, and
                                accept our Terms of use,{' '}
                                <a href="" className="underline">
                                  Privacy Policy,
                                </a>{' '}
                                <a href="" className="underline">
                                  Return Policy
                                </a>
                              </p>
                              <Button
                                // disabled={isDisabled}
                                variant={'default'}
                                className={`mb-3 w-full rounded-lg bg-black text-base font-bold uppercase text-white sm:h-[48px] lg:mb-[70px] lg:h-[55px] lg:max-w-[307px] lg:self-end lg:text-xl`}
                                onClick={(e) => {
                                  setIsLoading(true);
                                  handleSubmit();
                                }}
                              >
                                {isLoading ? (
                                  <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                  'Submit Payment'
                                )}
                              </Button>
                              {message && (
                                <p className="font-[500] text-[red]">
                                  {message}
                                </p>
                              )}
                            </>
                          )}
                          {paymentMethod === 'paypal' && (
                            <PayPalButtonSection />
                          )}
                          {paymentMethod === 'klarna' && (
                            <Button
                              // disabled={isDisabled}
                              variant={'default'}
                              className={`mb-3 w-full rounded-lg bg-black text-base font-bold uppercase text-white sm:h-[48px] lg:mb-[70px] lg:h-[55px] lg:text-xl`}
                              onClick={(e) => {
                                setIsLoading(true);
                                handleSubmit();
                              }}
                            >
                              {isLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                              ) : (
                                <PayWithKlarnaWhite />
                              )}
                            </Button>
                          )}
                        </section>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>
        <div className="hidden lg:flex lg:w-1/3 lg:flex-col">
          <CheckoutSummarySection />
          <OrderReview />
        </div>
      </div>
    </>
  );
}
