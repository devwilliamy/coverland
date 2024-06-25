'use client';
import { useMediaQuery } from '@mantine/hooks';
import MobileCheckout from '@/components/checkout/MobileCheckout';
import { CheckoutProvider } from '@/contexts/CheckoutContext';
import DesktopCheckout from '@/components/checkout/DesktopCheckout';
import StripeElementWrapper from '@/app/wrappers/StripeElementWrapper';
import { useCartContext } from '@/providers/CartProvider';
import EmptyCheckout from '@/components/checkout/EmptyCheckout';
import { useCheckoutViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';
export default function Checkout() {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { getTotalCartQuantity } = useCartContext();
  useCheckoutViewedGoogleTag();

  return (
    <CheckoutProvider>
      {getTotalCartQuantity() === 0 ? (
        <EmptyCheckout />
      ) : (
        <StripeElementWrapper>
          <>
            <MobileCheckout />
            {/* {isMobile ? (
              <MobileCheckout />
            ) : (
              <>
                <DesktopCheckout />
              </>
            )} */}
          </>
        </StripeElementWrapper>
      )}
    </CheckoutProvider>
  );
}
