import React from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';

const PayPalPaymentInstructions = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 text-yellow-800">
      <div className="flex items-center mb-2">
        <CreditCard className="mr-2" size={24} />
        <h3 className="font-bold">PayPal Payment Instructions</h3>
      </div>
      <p className="mb-2">
        You're about to be redirected to PayPal to complete your payment. Please follow these steps:
      </p>
      <ol className="list-decimal list-inside mb-2">
        <li>Log in to your PayPal account and complete the payment.</li>
        <li>After payment, you'll be returned to our site automatically.</li>
        <li>Wait for the confirmation page to load completely.</li>
      </ol>
      <div className="flex items-start mt-3 text-red-600">
        <AlertCircle className="mr-2 mt-1 flex-shrink-0" size={20} />
        <p>
          <strong>Important:</strong> Do not close the PayPal window or our site until you see the confirmation page. This ensures your order is processed successfully.
        </p>
      </div>
    </div>
  );
};

export default PayPalPaymentInstructions;