import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import PaymentSelector from './PaymentSelector';
import BillingAddress from './BillingAddress';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import { NewCheckout } from './NewCheckout';
import Klarna from '@/images/checkout/Klarna-Black.webp';
import Image from 'next/image';
import PayPalIcon from '../PDP/components/icons/PayPalIcon';
import VisaBlue from '@/images/checkout/VisaLogoBlue.webp';
import Mastercard from '@/images/checkout/MastercardIcon.webp';
import { useRouter } from 'next/navigation';

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
    billingTwoLetterStateCode,
  } = useCheckoutContext();

  const isDisabledCard =
    isEditingAddress ||
    Boolean(cardNumberError.error || !cardNumberError.visited) ||
    Boolean(cardExpiryError.error || !cardExpiryError.visited) ||
    Boolean(cardCvvError.error || !cardCvvError.visited);

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
  const buttonStyle = `mb-3 w-full rounded-lg ${isDisabledCard ? 'bg-[#1A1A1A]/90' : 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/90'} text-center uppercase m-0 max-h-[48px] min-h-[48px] max-w-[350px] self-end justify-self-end text-[16px] leading-[17px]`;

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
                  <div className="flex min-w-[70px] max-w-[70px]">
                    <Image
                      alt="Klarna"
                      src={Klarna}
                      className="-mx-4 -my-2 object-cover"
                    />
                  </div>

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
              <p>{customerBilling.name}</p>

              <p>{customerBilling.address.line1}</p>
              <p>
                {customerBilling.address.city}{' '}
                {billingTwoLetterStateCode ?? customerBilling.address.state}{' '}
                {customerBilling.address.postal_code}
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
            <div>You will be redirected to Klarna upon checkout.</div>
          )}
        </>
      )}
      {/* Continue To Order Review Button */}
      {paymentMethod === 'creditCard' && !isReadyToPay && (
        <div className="my-[48px] flex w-full items-center justify-center lg:justify-end">
          <Button
            variant={'default'}
            className={buttonStyle}
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
        <div className="font-base flex items-center justify-center text-lg text-red-500">
          Error: {message}
        </div>
      )} */}
    </section>
  );
}
