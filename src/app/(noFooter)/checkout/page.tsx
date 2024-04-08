'use client';
import { useState } from 'react';
import { useCheckoutViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import YourCartSection from '@/components/checkout/YourCart';
import Shipping from '@/components/checkout/Shipping';
import { Elements } from '@stripe/react-stripe-js';
import useGetStripeClientSecret from '@/hooks/useGetStripeClientSecret';
import { loadStripe } from '@stripe/stripe-js';

enum CheckoutStep {
  CART = 0,
  SHIPPING = 1,
  PAYMENT = 2,
  THANK_YOU = 3,
}

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#ed5f74',
    borderRadius: '5px',
    fontFamily:
      '--body-font-family: -apple-system, BlinkMacSystemFont, sans-serif',
    colorBackground: '#fafafa',
    borderColor: '#707070',
  },
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(CheckoutStep.CART);
  const clientSecret = useGetStripeClientSecret();

  const renderStep = () => {
    switch (currentStep) {
      case CheckoutStep.CART:
        return <YourCartSection />;
      case CheckoutStep.SHIPPING:
        return <Shipping />;
      case CheckoutStep.PAYMENT:
        return <Payment />;
      case CheckoutStep.THANK_YOU:
        return <ThankYou />;
      default:
        return null;
    }
  };

  const options = {
    clientSecret,
    appearance,
  };

  useCheckoutViewedGoogleTag();

  // const clientSecret = useGetStripeClientSecret();

  return (
    <div>
      {currentStep !== CheckoutStep.CART && (
        <button onClick={() => setCurrentStep(currentStep - 1)}>
          Previous
        </button>
      )}
      {currentStep !== CheckoutStep.THANK_YOU && (
        <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
      )}
      <Elements stripe={stripePromise} options={options}>
        {renderStep()}
      </Elements>
     
    </div>
  );
}
export default CheckoutPage;
