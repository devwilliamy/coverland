'use client';
import { LoadingCheckout } from '@/components/checkout/LoadingCheckout';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { useCreateStripePaymentIntent } from '@/hooks/useStripePaymentIntent';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#000000',
    borderRadius: '5px',
    colorBackground: '#fafafa',
  },
};

export default function StripeElementWrapper({
  children,
  clientSecret,
}: {
  children: React.ReactNode;
  clientSecret?: string;
}) {
  useCreateStripePaymentIntent();
  const { clientSecret: contextClientSecret } = useCheckoutContext();
  const options = {
    clientSecret: clientSecret ?? contextClientSecret,
    appearance,
  };
  return (
    <>
      {clientSecret || contextClientSecret ? (
        <Elements
          stripe={stripePromise}
          options={options}
          key={options.clientSecret}
        >
          {children}
        </Elements>
      ) : (
        <LoadingCheckout />
      )}
    </>
  );
}
