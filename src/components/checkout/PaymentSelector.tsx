import { PaymentMethod } from '@/lib/types/checkout';
import { CreditCard } from 'lucide-react';
// import PayPalIcon from '../PDP/components/icons/PayPalIcon';
// import GooglePayIcon from '../PDP/components/icons/GooglePayIcon';
import Klarna from '@/images/checkout/Klarna-Black.webp';
import Image from 'next/image';
import { FaApplePay } from 'react-icons/fa';
import CheckoutCard from './icons/CheckoutCard';
import PayPalIcon from './icons/PayPalIcon';
import ApplePayIcon from './icons/ApplePayIcon';
import GooglePayIcon from './icons/GooglePayIcon';
import KlarnaIcon from './icons/KlarnaIcon';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
// import ApplePayIcon from './ApplePayIcon';
// import KlarnaIcon from './KlarnaIcon';
// import CheckoutCard from './CheckoutCard';

type PaymentSelectorProps = {
  selectedPaymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
};

const inputStyle = 'min-w-[18px] min-h-[18px] flex';

const selctionStyle = `grid gap-2.5 grid-cols-[auto_58px_1fr] min-h-[30px] max-h-[30px] place-items-center`;

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
 
  return (
    <div className="flex flex-col gap-[10px]">
      {/* CARD */}
      <div
        className={`grid grid-cols-[auto_24px_1fr] place-items-center gap-2.5 text-[16px]`}
      >
        <input
          type="radio"
          id="creditCard"
          name="paymentMethod"
          value="creditCard"
          checked={selectedPaymentMethod === 'creditCard'}
          onChange={() => {
            onPaymentMethodChange('creditCard');
          }}
          className={inputStyle}
        />
        <CheckoutCard />
        <label htmlFor="creditCard" className="w-full text-left ">
          Credit Card
        </label>
      </div>

      <div className={selctionStyle}>
        <input
          type="radio"
          id="paypalInput"
          name="paymentMethod"
          value="paypal"
          checked={selectedPaymentMethod === 'paypal'}
          onChange={() => onPaymentMethodChange('paypal')}
          className={inputStyle}
        />
        <PayPalIcon />
      </div>
    </div>
  );
};

export default PaymentSelector;
