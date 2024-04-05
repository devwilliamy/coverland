import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import StripeForm from './StripeForm';
import useGetStripeClientSecret from '@/hooks/useGetStripeClientSecret';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function StripeFormWrapper() {
  const clientSecret = useGetStripeClientSecret();

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="px-6 pb-[20vh] md:w-4/12">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <StripeForm />
        </Elements>
      )}
    </div>
  );
}
