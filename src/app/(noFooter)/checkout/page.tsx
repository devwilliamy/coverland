'use client';
import { useState } from 'react';
import { useCheckoutViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import YourCartSection from '@/components/checkout/YourCart';
import Shipping from '@/components/checkout/Shipping';
import { Elements } from '@stripe/react-stripe-js';
import useGetStripePaymentIntent from '@/hooks/useGetStripePaymentIntent';
import { loadStripe } from '@stripe/stripe-js';
import Payment from '@/components/checkout/Payment';
import CheckoutSummarySection from '@/components/checkout/CheckoutSummarySection';
import { useCartContext } from '@/providers/CartProvider';
import OrderReview from '@/components/checkout/OrderReview';
import { useMediaQuery } from '@mantine/hooks';
import MobileCheckout from '@/app/(main)/[productType]/components/MobileCheckout';
import { CheckoutStep } from '@/lib/types/checkout';
import {
  CheckoutProvider,
  useCheckoutContext,
} from '@/contexts/CheckoutContext';
import DesktopCheckout from '@/components/checkout/DesktopCheckout';

const appearance = {
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
  // const [currentStep, setCurrentStep] = useState(CheckoutStep.CART);
  const { currentStep, nextStep, prevStep } = useCheckoutContext();
  console.log('CurrentStep:', { currentStep, nextStep, prevStep });

  const { clientSecret } = useGetStripePaymentIntent();
  const {
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    clearLocalStorageCart,
  } = useCartContext();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const totalDiscountedPrice = getTotalDiscountPrice().toFixed(
    2
  ) as unknown as number;
  const orderSubtotal = getOrderSubtotal().toFixed(2) as unknown as number;
  const cartQuantity = getTotalCartQuantity();

  const options = {
    clientSecret,
    appearance,
  };

  useCheckoutViewedGoogleTag();

  return (
    <div>
      {clientSecret && (
        <CheckoutProvider>
          <Elements stripe={stripePromise} options={options}>
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
        </CheckoutProvider>
      )}
    </div>
  );
}
export default CheckoutPage;
