'use client';
import { useCheckoutViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { Elements } from '@stripe/react-stripe-js';
import useGetStripePaymentIntent from '@/hooks/useGetStripePaymentIntent';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import { useMediaQuery } from '@mantine/hooks';
import MobileCheckout from '@/app/(main)/[productType]/components/MobileCheckout';
import {
  CheckoutProvider,
  useCheckoutContext,
} from '@/contexts/CheckoutContext';
import DesktopCheckout from '@/components/checkout/DesktopCheckout';

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#ed5f74',
    borderRadius: '5px',
    colorBackground: '#fafafa',
  },
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutPage() {
  const { clientSecret } = useGetStripePaymentIntent();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  useCheckoutViewedGoogleTag();

  return (
    <div>
      {clientSecret && (
        <CheckoutProvider>
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance }}
            >
              <>
                {isMobile ? (
                  <MobileCheckout />
                ) : (
                  <>
                    <DesktopCheckout />
                  </>
                )}
              </>
            </Elements>
          )}
        </CheckoutProvider>
      )}
    </div>
  );
}
export default CheckoutPage;
