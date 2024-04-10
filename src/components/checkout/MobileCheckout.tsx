import Payment from '@/components/checkout/Payment';
import Shipping from '@/components/checkout/Shipping';
import YourCart from '@/components/checkout/YourCart';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';

export default function MobileCheckout() {
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
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-24">
        <div className="w-full">
          <YourCart />
          <Shipping handleSelectTab={handleSelectTab} />
          <div className="pt-4">
            <div id="payment">
              {currentStep >= CheckoutStep.PAYMENT && <Payment />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
