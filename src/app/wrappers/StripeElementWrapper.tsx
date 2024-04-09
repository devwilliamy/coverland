'use client';
import useGetStripePaymentIntent from '@/hooks/useGetStripePaymentIntent';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#ed5f74',
    borderRadius: '5px',
    colorBackground: '#fafafa',
  },
};

export default function StripeElementWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { clientSecret } = useGetStripePaymentIntent();
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
