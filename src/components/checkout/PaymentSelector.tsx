import { PaymentMethod } from '@/lib/types/checkout';
import { CreditCard } from 'lucide-react';
import PayPalIcon from '../PDP/components/icons/PayPalIcon';
import GooglePayIcon from '../PDP/components/icons/GooglePayIcon';
import Klarna from '@/images/checkout/Klarna-Black.webp';
import Image from 'next/image';
import { FaApplePay } from 'react-icons/fa';
import ApplePayIcon from './ApplePayIcon';
import KlarnaIcon from './KlarnaIcon';
import CheckoutCard from './CheckoutCard';

type PaymentSelectorProps = {
  selectedPaymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
};

const inputStyle = 'min-w-[18px] min-h-[18px] flex';

function isIOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // iOS detection
  return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
}

// Example usage
if (isIOS()) {
  console.log('This is an iOS device');
} else {
  console.log('This is not an iOS device');
}

const selctionStyle = `grid gap-2.5 grid-cols-[auto_58px_1fr] min-h-[30px] max-h-[30px] place-items-center`;

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
  return (
    <div className="my-[26px] flex flex-col gap-[10px] text-[16px] font-[400] leading-[27px]">
      {/* CARD */}
      <div
        className={`grid grid-cols-[auto_24px_1fr] place-items-center gap-2.5`}
      >
        <input
          type="radio"
          id="creditCard"
          name="paymentMethod"
          value="creditCard"
          checked={selectedPaymentMethod === 'creditCard'}
          onChange={() => onPaymentMethodChange('creditCard')}
          className={inputStyle}
        />
        <CheckoutCard />
        <label htmlFor="creditCard" className="w-full text-left">
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
      {isIOS() && (
        <div className={selctionStyle}>
          <input
            type="radio"
            id="applePay"
            name="paymentMethod"
            value="applePay"
            checked={selectedPaymentMethod === 'applePay'}
            onChange={() => onPaymentMethodChange('applePay')}
            className={inputStyle}
          />
          <ApplePayIcon />
        </div>
      )}
      <div className={selctionStyle}>
        <input
          type="radio"
          id="paypalInput"
          name="paymentMethod"
          value="paypal"
          checked={selectedPaymentMethod === 'googlePay'}
          onChange={() => onPaymentMethodChange('googlePay')}
          className={inputStyle}
        />
        <GooglePayIcon />
      </div>
      <div className={selctionStyle}>
        <input
          type="radio"
          id="klarnaInput"
          name="paymentMethod"
          value="klarna"
          checked={selectedPaymentMethod === 'klarna'}
          onChange={() => onPaymentMethodChange('klarna')}
          className={inputStyle}
        />
        <KlarnaIcon />
        <h2 className="w-full text-left"> 4 interest-free payments</h2>
      </div>
    </div>
  );
};

export default PaymentSelector;
