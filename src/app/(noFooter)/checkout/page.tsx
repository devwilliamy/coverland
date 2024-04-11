import { LoadingCheckout } from '@/components/checkout/LoadingCheckout';
import dynamic from 'next/dynamic';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Checkout = dynamic(() => import('@/components/checkout/Checkout'), {
  loading: () => <LoadingCheckout />,
  ssr: false,
});

const CheckoutPage = () => {
  return <Checkout />;
};

export default CheckoutPage;
