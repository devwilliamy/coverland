import { PaymentMethod } from "@/lib/types/checkout";

type PaymentSelectorProps = {
  selectedPaymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
}) => {
  return (
    <div>
      <ul>
        <li>
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
            checked={selectedPaymentMethod === 'creditCard'}
            onChange={() => onPaymentMethodChange('creditCard')}
          />
          <label htmlFor="creditCard" className="pl-2">Credit Card</label>
        </li>
        <li>
          <input
            type="radio"
            id="paypalInput"
            name="paymentMethod"
            value="paypal"
            checked={selectedPaymentMethod === 'paypal'}
            onChange={() => onPaymentMethodChange('paypal')}
          />
          <label htmlFor="paypal" className="pl-2">PayPal</label>
        </li>
      </ul>
    </div>
  );
};

export default PaymentSelector;
