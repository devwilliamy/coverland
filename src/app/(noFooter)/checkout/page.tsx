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
  const [currentStep, setCurrentStep] = useState(CheckoutStep.PAYMENT);
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

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <>
            {isMobile ? (
              <MobileCheckout />
            ) : (
              <>
                {currentStep !== CheckoutStep.CART && (
                  <button onClick={() => setCurrentStep(currentStep - 1)}>
                    Previous
                  </button>
                )}
                {currentStep !== CheckoutStep.THANK_YOU && (
                  <button onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                  </button>
                )}
                <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-24">
                  <div className="w-full">{renderStep()}</div>
                  <div className="hidden lg:flex lg:flex-col">
                    <CheckoutSummarySection
                      totalMsrpPrice={totalMsrpPrice}
                      orderSubtotal={orderSubtotal}
                      totalDiscountedPrice={totalDiscountedPrice}
                      cartItems={cartItems}
                      clearLocalStorageCart={clearLocalStorageCart}
                    />
                    <OrderReview />
                  </div>
                </div>
              </>
            )}
          </>
        </Elements>
      )}
    </div>
  );
}
export default CheckoutPage;
