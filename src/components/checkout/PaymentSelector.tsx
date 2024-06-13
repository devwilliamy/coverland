import { PaymentMethod } from '@/lib/types/checkout';
import { CreditCard } from 'lucide-react';
import PayPalIcon from '../PDP/components/icons/PayPalIcon';
import GooglePayIcon from '../PDP/components/icons/GooglePayIcon';
import Klarna from '@/images/checkout/Klarna-Black.webp';
import Image from 'next/image';
import { FaApplePay } from 'react-icons/fa';

type PaymentSelectorProps = {
  selectedPaymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
};

const inputStyle = 'w-[18px] h-[18px]';

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

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
  return (
    <div className="my-[26px] flex flex-col gap-[10px] text-[16px] font-[400] leading-[27px]">
      {isIOS() && (
        <div className="flex items-center gap-2 ">
          <input
            type="radio"
            id="applePay"
            name="paymentMethod"
            value="applePay"
            checked={selectedPaymentMethod === 'applePay'}
            onChange={() => onPaymentMethodChange('applePay')}
            className={inputStyle}
          />
          <FaApplePay  className="max-h-[30px] max-w-[60px]" />
          {/* <label htmlFor="applePay"></label> */}
        </div>
      )}

      <div className="flex items-center gap-2 ">
        <input
          type="radio"
          id="creditCard"
          name="paymentMethod"
          value="creditCard"
          checked={selectedPaymentMethod === 'creditCard'}
          onChange={() => onPaymentMethodChange('creditCard')}
          className={inputStyle}
        />
        <CreditCard />
        <label htmlFor="creditCard">Credit Card</label>
      </div>

      <div className="flex items-center gap-2 ">
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
      <div className="flex items-center gap-2 ">
        <input
          type="radio"
          id="klarnaInput"
          name="paymentMethod"
          value="klarna"
          checked={selectedPaymentMethod === 'klarna'}
          onChange={() => onPaymentMethodChange('klarna')}
          className={inputStyle}
        />
        <Image alt="Klarna" src={Klarna} className="-mx-2 max-w-[70px]" />
        <h2> 4 interest-free payments</h2>
      </div>
      <div className="flex items-center gap-2 ">
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
    </div>
  );
};

export default PaymentSelector;
