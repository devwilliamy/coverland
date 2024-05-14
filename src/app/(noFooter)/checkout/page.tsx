import { LoadingCheckout } from '@/components/checkout/LoadingCheckout';
import dynamic from 'next/dynamic';

const Checkout = dynamic(() => import('@/components/checkout/Checkout'), {
  loading: () => <LoadingCheckout />,
  ssr: false,
});

const CheckoutPage = () => {
  return <Checkout />;
};

export default CheckoutPage;
