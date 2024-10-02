'use client';
import { useMediaQuery } from '@mantine/hooks';
import CheckoutAccordion from '@/components/checkout/CheckoutAccordion';
import { CheckoutProvider } from '@/contexts/CheckoutContext';
import DesktopCheckout from '@/components/checkout/DesktopCheckout';
import StripeElementWrapper from '@/app/wrappers/StripeElementWrapper';
import { useCartContext } from '@/providers/CartProvider';
import EmptyCheckout from '@/components/checkout/EmptyCheckout';
import { useCheckoutViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useQuery } from '@apollo/client';
import { FETCH_CART } from '@/lib/graphql/queries/cart';
import { LoadingCheckout } from './LoadingCheckout';
export default function Checkout() {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { getTotalCartQuantity } = useCartContext();
  useCheckoutViewedGoogleTag();
  const cartId = localStorage.getItem('shopifyCartId');
  const { loading, error, data } = useQuery(FETCH_CART, {
    variables: { cartId },
    skip: !cartId,
  });

  if (!cartId) return <EmptyCheckout />;
  if (loading) return <LoadingCheckout />;
  if (error) return <p>Error loading cart: {error.message}</p>;

  const cart = data?.cart;
  return (
    <CheckoutProvider>
      <CheckoutAccordion />
    </CheckoutProvider>
  );
}
