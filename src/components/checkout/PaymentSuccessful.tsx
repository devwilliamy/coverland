import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const PaymentSuccessfulMessage = () => {
  return (
    <div className="mb-8 border-l-4 border-green-500 bg-green-50 p-4 text-green-700">
      <div className="mb-2 flex items-center">
        <AiOutlineLoading3Quarters className="mr-2 animate-spin" size={24} />
        <h3 className="font-bold">Payment Successful</h3>
      </div>
      <p>
        Your payment is successful. Please do not close this window or
        navigate away.
      </p>
      <p className="mt-2">
        You will be automatically redirected to the thank you page once the
        process is complete. This may take a few moments.
      </p>
      <p className="mt-2 font-semibold">
        Please wait for the confirmation page to ensure your order is processed
        successfully.
      </p>
    </div>
  );
};

export default PaymentSuccessfulMessage;
