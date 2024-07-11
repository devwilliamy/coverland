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
import Image from 'next/image';
import VisaBlue from '@/images/checkout/VisaLogoBlue.webp';
import Mastercard from '@/images/checkout/MastercardIcon.webp';
import { useRouter } from 'next/navigation';
import ApplePayIcon from './icons/ApplePayIcon';
import GooglePayIcon from './icons/GooglePayIcon';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { SHIPPING_METHOD } from '@/lib/constants';
import { TermsOfUseStatement } from './TermsOfUseStatement';

export default function Payment({
  handleChangeAccordion,
}: {
  handleChangeAccordion: (accordionTitle: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  // const [isEditingAddress, setIsEditingAddress] = useState(false);
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
    isEditingAddress,
    updateIsEditingAddress,
  } = useCheckoutContext();

  const shippingInfo = {
    shipping_method: SHIPPING_METHOD,
    shipping_date: determineDeliveryByDate('EEE, LLL dd'),
    delivery_fee: shipping,
  };

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

  const buttonStyle = `sticky bottom-0 mb-3 w-full max-w-[390px] rounded-lg ${isDisabledCard ? 'bg-[#1A1A1A]/90' : 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/90'} text-center uppercase m-0 max-h-[48px] min-h-[48px] max-w-[350px] self-end justify-self-end text-[16px] leading-[17px]`;
  // const buttonStyle = `mb-3 w-full lg:max-w-[307px] font-[700] rounded-lg text-white disabled:bg-[#D6D6D6] disabled:text-[#767676] bg-[#1A1A1A] hover:bg-[#1A1A1A]/90  bg: text-center uppercase m-0 max-h-[48px] min-h-[48px] self-end justify-self-end text-[16px] leading-[17px]`;

  return (
    <section>
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
              setIsEditingAddress={updateIsEditingAddress}
            />
          </div>
        ) : (
          <div className="py-[15px]">
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
    </section>
  );
}
