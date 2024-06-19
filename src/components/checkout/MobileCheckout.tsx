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
import { Separator } from '../ui/separator';
import { useEffect, useState } from 'react';
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
import { getCurrentDayInLocaleDateString } from '@/lib/utils/date';
import { v4 as uuidv4 } from 'uuid';
import { hashData } from '@/lib/utils/hash';
import { getCookie } from '@/lib/utils/cookie';
import {
  CreatePaymentMethodKlarnaData,
  PaymentMethodCreateParams,
  PaymentRequestShippingOption,
} from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import PayPalButtonSection from './PayPalButtonSection';
import { generateSkuLabOrderInput } from '@/lib/utils/skuLabs';
import { handlePurchaseGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import PayWithKlarnaWhite from './PayWithKlarnaWhite';
import { ReadyCheck } from './ReadyCheck';
import { getTotalDiscountPrice } from '@/lib/utils/calculations';
import { SHIPPING_METHOD } from '@/lib/constants';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';

export default function MobileCheckout() {
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

  const shippingInfo = {
    shipping_method: SHIPPING_METHOD,
    shipping_date: determineDeliveryByDate('EEE, LLL dd'),
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

  const handleConversions = async () => {
    // SendGrid Thank You Email
    // V-----------------------V--- RE IMPLEMENT CONVERSIONS BELOW ---V----------------------- V
    //
    // ->
  };

  const handleGetTax = async () => {
    let taxItems = [];
    let count = 0;
    setIsLoading(true);

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
    const response = await fetch('/api/taxjar/sales-tax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bodyData }),
    });

    const taxRes = await response.json();
    const amount_to_collect = taxRes?.tax?.amount_to_collect;
    updateTotalTax(amount_to_collect);

    const taxSum = Number(Number(cartMSRP) + Number(amount_to_collect)).toFixed(
      2
    );
    const totalWithTax = convertPriceToStripeFormat(taxSum);
    console.log({ totalWithTax, orderSubtotal, totalTax, cartMSRP });

    await fetch('/api/stripe/payment-intent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        amount: totalWithTax,
      }),
    });

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

    const origin = window.location.origin;
    const taxSum = Number(Number(cartMSRP) + Number(totalTax)).toFixed(2);
    const totalWithTax = convertPriceToStripeFormat(taxSum);
    console.log({ totalWithTax, orderSubtotal, totalTax, cartMSRP });

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
    // console.log({
    //   id,
    //   retrievedSecret,
    //   stripePaymentMethod: stripePaymentMethod?.paymentMethod,
    // });

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

    const customerBilling = {
      address: billingAddress.address,
      email: customerInfo.email,
      phone: customerInfo.phoneNumber,
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
        const klarnaPaymentResult = await stripe.confirmKlarnaPayment(
          retrievedSecret,
          {
            payment_method: {
              type: 'klarna',
              billing_details: customerBilling,
            } as CreatePaymentMethodKlarnaData,
            return_url: `${origin}/checkout`,
            shipping: customerShipping,
          },
          // Enable if wanting to open new window
          { handleActions: false }
        );

        const klarnaWindowLeft = window.innerWidth / 2 - 430 / 2;
        const y = window.outerHeight / 2 + window.screenY - 700 / 2;
        const x = window.outerWidth / 2 + window.screenX - 430 / 2;

        const klarnaWindow = window.open(
          'about:blank',
          'Klarna Payment',
          `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${x}, height=${y}, left=${klarnaWindowLeft}, top=100,`
        );

        klarnaWindow?.addEventListener('beforeUnload', () => {
          setIsLoading(false);
        });

        klarnaWindow?.addEventListener('close', async () => {
          console.log('closeD');

          const isSuccessful =
            (await stripe.retrievePaymentIntent(retrievedSecret)).paymentIntent
              ?.status === 'succeeded';
          console.log('Payment window closed.');

          if (isSuccessful) {
            handleConversions();
            router.push(
              `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
            );
          }
          setIsLoading(false);
          clearInterval(interval);
        });

        // console.log({
        //   status: result?.paymentIntent?.status,
        //   errors: result?.error,
        // });

        klarnaWindow?.document.location.replace(
          String(
            klarnaPaymentResult.paymentIntent?.next_action?.redirect_to_url?.url
          )
        );

        if (!klarnaWindow) {
          console.log('[NO KLARNA WINDOW]');
          return;
        }

        const interval = klarnaWindow.setInterval(async () => {
          if (
            klarnaWindow?.location.href &&
            klarnaWindow?.location.href
              .toString()
              .startsWith(`${origin}/checkout`)
          ) {
            klarnaWindow.close();
            setIsLoading(false);
            clearInterval(interval);
          }
          // if (klarnaWindow.closed) {
          //   // const isSuccessful =
          //   //   (await stripe.retrievePaymentIntent(retrievedSecret))
          //   //     .paymentIntent?.status === 'succeeded';
          //   // console.log('Payment window closed.');

          //   // if (isSuccessful) {
          //   //   handleConversions();
          //   //   setIsLoading(false);
          //   //   router.push(
          //   //     `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
          //   //   );
          //   // }
          // }
        }, 1000);

        break;
      case 'googlePay':
        console.log();

        const googlePayResult = await stripe.confirmPayment({
          elements,
          clientSecret: retrievedSecret,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                ...customerBilling,
                address:
                  customerBilling.address as PaymentMethodCreateParams.BillingDetails.Address,
              },
            },
            shipping: customerShipping,
          },
          redirect: 'if_required',
        });
        const isSuccessful =
          (await stripe.retrievePaymentIntent(retrievedSecret)).paymentIntent
            ?.status === 'succeeded';

        console.log('Payment window closed.');
        if (isSuccessful) {
          handleConversions();
          setIsLoading(false);
          router.push(
            `/thank-you?order_number=${orderNumber}&payment_intent=${id}&payment_intent_client_secret=${client_secret}`
          );
        }
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
  }, [isCartEmpty, isReadyToPay, shippingAddress]);

  const [cardPaymentReq, setCardPaymentReq] = useState<any>();

  const createGooglePayPaymentRequest = async () => {
    setIsLoading(true);
    const { country, city } = shippingAddress.address;
    const totalWithTax = getTotalPrice() + shipping + totalTax;
    const formattedTotalWithTax = convertPriceToStripeFormat(totalWithTax);
    console.log({
      totalWithTax,
      formattedTotalTax: formattedTotalWithTax,
      totalTax,
    });

    const paymentReq = stripe?.paymentRequest({
      country,
      currency: 'usd',
      total: { amount: formattedTotalWithTax, label: 'GOOGLE PAY PAYMENT' },
      disableWallets: ['applePay'],
      shippingOptions: [] as PaymentRequestShippingOption[],
    });
    const canMakePayment = await paymentReq?.canMakePayment();
    console.log({ canMakePayment });

    if (canMakePayment) {
      // paymentReq?.show();
      setCardPaymentReq(paymentReq);
      // console.log('[SUCCESSFULLY SET PAYMENT REQ]');
    }
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (paymentMethod == 'googlePay') {
      async () => {
        await handleGetTax();
        await createGooglePayPaymentRequest();
      };
    }
  }, [paymentMethod, totalTax]);

  return (
    <>
      <div className="flex flex-col lg:flex lg:flex-row lg:px-24">
        <CartHeader />
        <Separator className="mt-5 w-full bg-[#C8C7C7]" />
        {currentStep === CheckoutStep.CART ? (
          <>
            <YourCart />
          </>
        ) : (
          <Accordion
            type="multiple"
            // collapsible
            className="w-full"
            value={value}
            onValueChange={setValue}
          >
            <AccordionItem value="cart">
              <AccordionTrigger className="my-4 px-4 text-xl font-medium">
                In Your Cart
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4">
                  <InYourCart />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="my-4 px-4 text-xl font-medium">
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
                className={`${(!isReadyToShip || isEditingAddress) && 'disabled cursor-default text-[grey] hover:no-underline'} my-4 px-4 text-xl font-medium`}
              >
                <h2 className="flex gap-2">
                  <span>Payment</span>
                  {isReadyToPay && <ReadyCheck />}
                </h2>
              </AccordionTrigger>
              <AccordionContent>
                <Payment handleChangeAccordion={handleChangeAccordion} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="orderReview" id="orderReview">
              <AccordionTrigger
                onClick={(e) => {
                  if (
                    !isAddressComplete ||
                    isEditingAddress ||
                    !isReadyToPay ||
                    !isReadyToShip
                  ) {
                    e.preventDefault();
                  }
                  handleSelectTab('orderReview');
                }}
                className={`${(!isAddressComplete || isEditingAddress || !isReadyToPay || !isReadyToShip) && 'disabled cursor-default text-[grey] hover:no-underline'} my-4 px-4 text-xl font-medium`}
              >
                Order Review
              </AccordionTrigger>
              <AccordionContent>
                <section className="flex w-full flex-col px-4">
                  {cartItems.map((cartItem, i) => (
                    <div
                      key={i}
                      className="pb-3 lg:border-b lg:border-t lg:pt-3 lg:transition-colors lg:hover:bg-muted/50 lg:data-[state=selected]:bg-muted"
                    >
                      <OrderReviewItem item={cartItem} withPrice />
                    </div>
                  ))}
                  <div className="mt-4 lg:hidden">
                    <PriceBreakdown />
                  </div>
                  {paymentMethod === 'creditCard' && (
                    <>
                      <p className="pb-[40px] text-[14px] font-[400] text-[#767676]">
                        By Clicking the “Submit Payment” button, you confirm
                        that you have read, understand, and accept our Terms of
                        use,{' '}
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
                        // className={`mb-3 w-full rounded-lg ${isDisabled ? 'bg-[#BE1B1B]/90' : 'bg-[#BE1B1B]'} text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
                        className={`mb-3 w-full rounded-lg bg-black text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
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
                        <p className="font-[500] text-[red]">{message}</p>
                      )}
                    </>
                  )}
                  {paymentMethod === 'paypal' && <PayPalButtonSection />}
                  {paymentMethod === 'googlePay' && (
                    <ExpressCheckoutElement
                      options={{
                        paymentMethodOrder: ['applePay', 'googlePay'],
                        buttonType: { applePay: 'order', googlePay: 'order' },
                        wallets: { googlePay: 'always', applePay: 'always' },
                      }}
                      onConfirm={async (e) => {
                        handleSubmit();
                        console.log(e);
                      }}
                    />
                  )}
                  {paymentMethod === 'klarna' && (
                    <Button
                      // disabled={isDisabled}
                      variant={'default'}
                      // className={`mb-3 w-full rounded-lg ${isDisabled ? 'bg-[#BE1B1B]/90' : 'bg-[#BE1B1B]'} text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
                      className={`mb-3 w-full rounded-lg bg-black text-base font-bold uppercase text-white sm:h-[48px] lg:h-[55px] lg:text-xl`}
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </>
  );
}
