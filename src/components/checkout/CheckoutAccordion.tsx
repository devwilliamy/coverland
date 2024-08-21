'use client';
import Payment from '@/components/checkout/Payment';
import Shipping from '@/components/checkout/Shipping';
import YourCart from '@/components/checkout/YourCart';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import CartHeader from './CartHeader';
import { MouseEvent, useEffect, useState } from 'react';
import InYourCart from './InYourCart';
import { useCartContext } from '@/providers/CartProvider';
import OrderReviewItem from './OrderReviewItem';
import PriceBreakdown from './PriceBreakdown';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import {
  ExpressCheckoutElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  convertPriceFromStripeFormat,
  convertPriceToStripeFormat,
  getSkuQuantityPriceFromCartItemsForMeta,
  getSkusFromCartItems,
} from '@/lib/utils/stripe';
import {
  getCurrentDayInLocaleDateString,
  weeksFromCurrentDate,
} from '@/lib/utils/date';
import { v4 as uuidv4 } from 'uuid';
import { hashData } from '@/lib/utils/hash';
import { getCookie } from '@/lib/utils/cookie';
import { useRouter } from 'next/navigation';
import PayPalButtonSection from './PayPalButtonSection';
import { generateSkuLabOrderInput } from '@/lib/utils/skuLabs';
import { handlePurchaseGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { SHIPPING_METHOD } from '@/lib/constants';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { ReadyCheck } from './icons/ReadyCheck';
import { useMediaQuery } from '@mantine/hooks';
import CheckoutSummarySection from './CheckoutSummarySection';
import OrderReview from './OrderReview';
import { formatToE164 } from '@/lib/utils';
import { TermsOfUseStatement } from './TermsOfUseStatement';
import { generateTrustPilotPayload } from '@/lib/trustpilot';

export default function CheckoutAccordion() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const {
    cartItems,
    getCartTotalPrice,
    clearLocalStorageCart,
    getTotalCartQuantity,
    getOrderSubtotal,
    getTotalDiscountPrice,
    isCartPreorder,
    cartPreorderDate,
    getTotalPreorderDiscount,
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
    updateCustomerInfo,
    clientSecret,
    tax,
  } = useCheckoutContext();

  const orderSubtotal = getOrderSubtotal().toFixed(2);
  const orderTotal = (getCartTotalPrice() + shipping + tax).toFixed(
    2
  ) as unknown as number;
  const orderTotalStripeFormat = convertPriceToStripeFormat(orderTotal);
  const isCartEmpty = getTotalCartQuantity() === 0;
  const [value, setValue] = useState(['shipping']);
  const [isLoading, setIsLoading] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState('');
  const [paypalSuccessMessage, setPaypalSuccessMessage] = useState('');
  const preorderDate = isCartPreorder ? cartPreorderDate : undefined;
  const preOrderTimeDifferenceText: string = isCartPreorder
    ? `approximately ${weeksFromCurrentDate(cartPreorderDate)} weeks from the date of purchase.`
    : 'noted above.'; // If some random failure happens with checkTimeDifference, default here

  const shippingInfo = {
    shipping_method: SHIPPING_METHOD,
    shipping_date: determineDeliveryByDate('EEE, LLL dd', preorderDate),
    delivery_fee: shipping,
  };

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

  const handleConversions = async (id: any, client_secret: any) => {
    const formattedPhone = formatToE164(customerInfo.phoneNumber);
    // -------------------- SendGrid Thank You Email ------------------------
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
        total: orderTotal, // may need to add taxes later
        totalDiscount: getTotalDiscountPrice().toFixed(2),
        totalPreorderDiscount: getTotalPreorderDiscount().toFixed(2),
        isPreorder: isCartPreorder,
        preorder_text: isCartPreorder
          ? 'Please note that this item is a pre-order. ' +
            'We will notify you with the exact fulfillment date once the item is shipped. ' +
            `The estimated fulfillment timeframe is ${preOrderTimeDifferenceText} ` +
            'We appreciate your patience and look forward to delivering your order!'
          : '',
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
        delivery_fee: shippingInfo.delivery_fee.toFixed(2) as unknown as number,
        free_delivery: shippingInfo.delivery_fee === 0,
      },
      trustPilot: generateTrustPilotPayload(
        shippingAddress.name,
        customerInfo.email,
        orderNumber,
        cartItems
      ),
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
      setSubmitErrorMessage(
        error?.message || "There's an error, but could not find error message"
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
          ph: [hashData(formattedPhone || '')],
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
          value: parseFloat(getCartTotalPrice().toFixed(2)),
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
            value: parseFloat(getCartTotalPrice().toFixed(2)),
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
            ph: formattedPhone,
          },
        });
        window.uetq.push('event', 'purchase', {
          revenue_value: parseFloat(getCartTotalPrice().toFixed(2)),
          currency: 'USD',
          pid: {
            em: customerInfo.email,
            ph: formattedPhone,
          },
        });
      }

      const skuLabOrderInput = generateSkuLabOrderInput({
        orderNumber,
        cartItems,
        orderTotal,
        shippingAddress,
        customerInfo,
        paymentMethod: 'Stripe',
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

      // Google Conversion API
      const enhancedGoogleConversionInput = {
        email: customerInfo.email || '',
        phone_number: formattedPhone || '',
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
        getCartTotalPrice().toFixed(2),
        clearLocalStorageCart,
        enhancedGoogleConversionInput
      );
    }

    router.push(
      `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
    );
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const formattedPhone = formatToE164(customerInfo.phoneNumber);

    updateCustomerInfo({
      ...customerInfo,
      phoneNumber: formattedPhone,
    });

    const response = await fetch('/api/stripe/payment-intent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        amount: orderTotalStripeFormat,
      }),
    });

    const data = await response.json();
    const { id, client_secret } = data.paymentIntent;
    const retrievedSecret = client_secret;

    const customerShipping = {
      name: shippingAddress.name,
      phone: formattedPhone,
      address: {
        city: shippingAddress.address.city as string,
        country: shippingAddress.address.country as string,
        line1: shippingAddress.address.line1 as string,
        line2: shippingAddress.address.line2 as string,
        postal_code: shippingAddress.address.postal_code as string,
        state: shippingAddress.address.state as string,
      },
    };

    const customerBilling = {
      address: billingAddress.address,
      email: customerInfo.email,
      phone: formattedPhone,
      name: billingAddress.name,
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
                setSubmitErrorMessage(
                  error.message ||
                    "There's an error, but could not find error message"
                );
              } else {
                console.error('Error:', error.message);
                setSubmitErrorMessage(
                  error.message || 'An unexpected error occurred.'
                );
              }
            } else if (
              result.paymentIntent &&
              result.paymentIntent.status === 'succeeded'
            ) {
              handleConversions(id, client_secret);
            }
            setIsLoading(false);
          });
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
    setSubmitErrorMessage('');
  }, [isReadyToShip, isReadyToPay]);

  const accordionTriggerStyle = `py-10 font-[500] text-[24px] leading-[12px]`;

  const isMobile = useMediaQuery('(max-width: 1023px)');

  const handleSelectOrderReview = (e: MouseEvent<HTMLElement>) => {
    if (
      !isAddressComplete ||
      isEditingAddress ||
      !isReadyToPay ||
      !isReadyToShip
    ) {
      e.preventDefault();
    }
    handleSelectTab('orderReview');
  };

  const handleSelectPaymentTab = (e: MouseEvent<HTMLElement>) => {
    if (!isReadyToShip || isEditingAddress) {
      e.preventDefault();
    }
    handleSelectTab('payment');
  };

  return (
    <div className="flex flex-col items-center">
      {!isMobile && currentStep !== CheckoutStep.CART && (
        <div className="w-full py-[80px] text-center text-[24px] font-[700] leading-[12px]">
          Checkout
        </div>
      )}
      <div className="flex w-full max-w-[1080px] pt-2 lg:gap-[70px] lg:px-[24px] lg:pt-0 ">
        <div className="flex w-full flex-col lg:w-2/3 ">
          {currentStep === CheckoutStep.CART ? (
            <>
              <div className={isMobile ? 'mb-[32px]' : 'mb-[42px]'}>
                <CartHeader />
              </div>
              <YourCart />
            </>
          ) : (
            <>
              <Accordion
                type="multiple"
                // collapsible
                className="w-full px-4"
                value={value}
                onValueChange={setValue}
              >
                {isMobile && (
                  <AccordionItem value="cart">
                    <AccordionTrigger className={accordionTriggerStyle}>
                      In Your Cart
                    </AccordionTrigger>
                    <AccordionContent>
                      <InYourCart />
                    </AccordionContent>
                  </AccordionItem>
                )}

                <AccordionItem value="shipping">
                  <AccordionTrigger
                    className={
                      accordionTriggerStyle + `${!isMobile && ' pt-0'}`
                    }
                  >
                    <h2 className="flex items-center gap-2">
                      <span>Shipping</span>
                      {isReadyToShip && <ReadyCheck />}
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="py-0">
                    <Shipping
                      handleChangeAccordion={handleChangeAccordion}
                      handleSelectTab={handleSelectTab}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment" id="payment">
                  <AccordionTrigger
                    onClick={handleSelectPaymentTab}
                    className={
                      accordionTriggerStyle +
                      `${(!isReadyToShip || isEditingAddress) && 'disabled cursor-default text-[grey] hover:no-underline'}`
                    }
                  >
                    <h2 className="flex items-center gap-2">
                      <span>Payment</span>
                      {isReadyToPay && <ReadyCheck />}
                    </h2>
                  </AccordionTrigger>
                  <AccordionContent className="py-0">
                    <Payment handleChangeAccordion={handleChangeAccordion} />
                    {!isMobile && isReadyToPay && (
                      <div className="flex flex-col">
                        {paymentMethod === 'creditCard' && (
                          <>
                            <TermsOfUseStatement />
                            <div className="mb-[70px] flex flex-col self-end">
                              {submitErrorMessage && (
                                <p className="w-full text-center font-[500] text-[red]">
                                  {submitErrorMessage}
                                </p>
                              )}
                              {paypalSuccessMessage && (
                                <div className="font-base flex items-center justify-center text-lg text-red-500">
                                  Error: {paypalSuccessMessage}
                                </div>
                              )}
                              <Button
                                variant={'default'}
                                className={` min-h-[48px] w-full min-w-[307px] rounded-lg bg-black text-base font-bold uppercase text-white lg:max-w-[307px]`}
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
                            </div>
                          </>
                        )}
                        {paymentMethod === 'paypal' && (
                          <div className={`flex flex-col gap-[26px]`}>
                            {submitErrorMessage && (
                              <p className="w-full  text-center font-[500] text-[red]">
                                {submitErrorMessage}
                              </p>
                            )}
                            <div className="w-full max-w-[307px] self-end justify-self-end pb-[26px]">
                              <PayPalButtonSection
                                setPaypalSuccessMessage={
                                  setPaypalSuccessMessage
                                }
                                setMessage={setSubmitErrorMessage}
                              />
                            </div>
                          </div>
                        )}
                        {(paymentMethod === 'applePay' ||
                          paymentMethod === 'googlePay') && (
                          <div className="w-full max-w-[307px] self-end justify-self-end">
                            <ExpressCheckoutElement
                              options={{
                                paymentMethodOrder: ['applePay', 'googlePay'],
                                buttonType: {
                                  applePay: 'order',
                                  googlePay: 'order',
                                },
                                wallets:
                                  paymentMethod === 'applePay'
                                    ? { googlePay: 'never', applePay: 'always' }
                                    : {
                                        googlePay: 'always',
                                        applePay: 'never',
                                      },
                              }}
                              onConfirm={async (e) => {
                                await handleSubmit();
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                {isMobile && (
                  <AccordionItem value="orderReview" id="orderReview">
                    <AccordionTrigger
                      onClick={handleSelectOrderReview}
                      className={
                        accordionTriggerStyle +
                        `${(!isAddressComplete || isEditingAddress || !isReadyToPay || !isReadyToShip) && 'disabled cursor-default text-[grey] hover:no-underline'}`
                      }
                    >
                      Order Review
                    </AccordionTrigger>
                    <AccordionContent>
                      <section className="flex flex-col">
                        {cartItems.map((cartItem, i) => (
                          <div
                            key={i}
                            className="mb-4 lg:border-b lg:border-t lg:pt-3 lg:transition-colors lg:hover:bg-muted/50 lg:data-[state=selected]:bg-muted"
                          >
                            <OrderReviewItem item={cartItem} />
                          </div>
                        ))}
                        <div className="mt-4 lg:hidden">
                          <PriceBreakdown />
                        </div>
                        {paymentMethod === 'creditCard' && (
                          <>
                            <TermsOfUseStatement />
                            {submitErrorMessage && (
                              <p className="text-center font-[500] text-[red]">
                                {submitErrorMessage}
                              </p>
                            )}

                            <Button
                              variant={'default'}
                              className={`mb-[70px] min-h-[48px] w-full rounded-lg bg-black text-base font-bold uppercase text-white`}
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
                          </>
                        )}
                        {submitErrorMessage && (
                          <p className="text-center font-[500] text-[red]">
                            {submitErrorMessage}
                          </p>
                        )}
                        {paypalSuccessMessage && (
                          <div className="font-base flex items-center justify-center text-lg text-[green]">
                            {paypalSuccessMessage}
                          </div>
                        )}
                        {paymentMethod === 'paypal' && (
                          <PayPalButtonSection
                            setPaypalSuccessMessage={setPaypalSuccessMessage}
                            setMessage={setSubmitErrorMessage}
                          />
                        )}
                      </section>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </>
          )}
        </div>
        {!isMobile && (
          <div className="flex lg:w-1/3 lg:flex-col">
            <CheckoutSummarySection />
            <OrderReview />
          </div>
        )}
      </div>
    </div>
  );
}
