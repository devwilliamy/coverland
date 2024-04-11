'use client';
import { LoadingCheckout } from '@/components/checkout/LoadingCheckout';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { Elements } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#ed5f74',
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
  const { clientSecret: contextClientSecret  } = useCheckoutContext();
  console.log("ClientSecret:", clientSecret)
  console.log("contextClientSecret:", contextClientSecret)

  const options = {
    clientSecret: clientSecret ?? contextClientSecret,
    appearance,
  };
  return (
    <>
      {(clientSecret || contextClientSecret) ? (
        <Elements stripe={stripePromise} options={options}>
          {children}
        </Elements>
      ): <LoadingCheckout/>}
    </>
  );
}
