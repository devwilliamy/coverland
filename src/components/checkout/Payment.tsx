import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '../ui/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import PaymentSelector from './PaymentSelector';
import BillingAddress from './BillingAddress';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import { CreditCardSection } from './CreditCardSection';
// import Klarna from '@/images/checkout/Klarna-Black.webp';
import PayPalIcon from './icons/PayPalIcon';
import { SelectedCardLogo } from './SelectedCardLogo';
import LoadingButton from '../ui/loading-button';
import PaymentProcessingMessage from './PaymentProcessing';

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
    customerInfo,
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

  const buttonStyle = `mb-3 w-full lg:max-w-[307px] font-[700] rounded-lg text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-center uppercase m-0 max-h-[48px] min-h-[48px] self-end justify-self-end text-[16px] leading-[17px]`;

  const handleContinueWithCard = () => {
    setIsLoading(true);
    setMessage('');
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
      .catch((error) => {
        console.error('Unknown error caught: ', error.message);
        setMessage(error.message);
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
            <p className="text-base font-medium"> Payment Method</p>
            <div className="flex py-5">
              {paymentMethod === 'paypal' && (
                <div className="flex items-center gap-2">
                  <PayPalIcon />
                </div>
              )}
              {paymentMethod === 'creditCard' && (
                <div className="flex items-center gap-2">
                  {stripePaymentMethod &&
                    stripePaymentMethod.paymentMethod?.card && (
                      <div className="flex items-center gap-2 text-base leading-[27px] text-[#767676]">
                        <div className="flex max-h-[16px] max-w-[48px] items-center">
                          <SelectedCardLogo
                            brand={stripePaymentMethod.paymentMethod.card.brand}
                          />
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
            <p className="text-base font-medium"> Billing Details</p>
            <div className="pb-[26px] text-base font-[400] leading-[27px] text-[#767676]">
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
              className="flex max-h-fit cursor-pointer font-medium underline hover:text-[#0C87B8]"
              onClick={handleEditPayment}
            >
              Edit
            </p>
          </div>
        </span>
      ) : (
        <>
          <h2 className="pb-[26px] text-base font-medium leading-[27px]">
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
      <div className="my-[36px] flex w-full flex-col items-center justify-center lg:my-[48px] lg:flex-row lg:justify-end">
        {message && (
          <p className="w-full text-center font-medium text-[red]">{message}</p>
        )}
        {paymentMethod === 'creditCard' && !isReadyToPay && (
          <LoadingButton
            className={buttonStyle}
            isDisabled={isDisabledCard}
            isLoading={isLoading}
            onClick={handleContinueWithCard}
            buttonText={'Continue to Order Review'}
          />
        )}
        {(paymentMethod === 'klarna' ||
          paymentMethod === 'googlePay' ||
          paymentMethod === 'applePay' ||
          paymentMethod === 'paypal') &&
          !isReadyToPay && (
            <LoadingButton
              className={buttonStyle}
              isLoading={isLoading}
              onClick={() => {
                handleChangeAccordion('orderReview');
                updateIsReadyToPay(true);
              }}
              buttonText={'Continue to Order Review'}
            />
          )}
      </div>
    </section>
  );
}
