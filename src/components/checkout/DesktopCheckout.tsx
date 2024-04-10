import { useCheckoutContext } from '@/contexts/CheckoutContext';
import CheckoutSummarySection from './CheckoutSummarySection';
import OrderReview from './OrderReview';
import { CheckoutStep } from '@/lib/types/checkout';
import YourCart from './YourCart';
import Shipping from './Shipping';
import Payment from './Payment';

export default function DesktopCheckout() {
  const { currentStep } = useCheckoutContext();

  const handleSelectTab = (title: string) => {
    if (document) {
      const el = document.getElementById(title);
      const elTop = el?.offsetTop;
      setTimeout(() => {
        window.scrollTo({
          top: elTop as number,
          behavior: 'instant',
        });
      }, 100);
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case CheckoutStep.CART:
        return <YourCart />;
      case CheckoutStep.SHIPPING:
        return <Shipping handleSelectTab={handleSelectTab} />;
      case CheckoutStep.PAYMENT:
        return <Payment />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-12 lg:py-4">
        <div className="w-full">{renderStep()}</div>
        <div className="hidden lg:flex lg:flex-col">
          <CheckoutSummarySection />
          <OrderReview />
        </div>
      </div>
    </>
  );
}
