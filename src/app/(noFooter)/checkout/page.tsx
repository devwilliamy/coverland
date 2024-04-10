import dynamic from 'next/dynamic';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Checkout = dynamic(() => import('@/components/checkout/Checkout'), {
  loading: () => <LoadingCheckout />,
  ssr: false,
});

const CheckoutPage = () => {
  return <Checkout />;
};

const LoadingCheckout = () => {
  return (
    <div className="flex flex-row items-center justify-center pt-10">
      <div className="text-lg font-normal">Your Cart is Loading...</div>
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
};
export default CheckoutPage;
