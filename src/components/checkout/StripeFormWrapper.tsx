import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import StripeForm from './StripeForm';
import useGetStripePaymentIntent from '@/hooks/useGetStripePaymentIntent';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function StripeFormWrapper() {
  const { clientSecret } = useGetStripePaymentIntent();

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="px-6 pb-[20vh]">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripeForm />
        </Elements>
      )}
    </div>
  );
}
