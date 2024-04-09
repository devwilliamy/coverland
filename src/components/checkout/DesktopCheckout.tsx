import { useCheckoutContext } from '@/contexts/CheckoutContext';
import CheckoutSummarySection from './CheckoutSummarySection';
import NextButton from './NextButton';
import OrderReview from './OrderReview';
import { CheckoutStep } from '@/lib/types/checkout';
import { useCartContext } from '@/providers/CartProvider';
import YourCart from './YourCart';
import Shipping from './Shipping';
import Payment from './Payment';

export default function DesktopCheckout() {
  const { currentStep, nextStep, prevStep } = useCheckoutContext();
  const {
    cartItems,
    getTotalPrice,
    getOrderSubtotal,
    getTotalDiscountPrice,
    getTotalCartQuantity,
    clearLocalStorageCart,
  } = useCartContext();

  const totalMsrpPrice = getTotalPrice().toFixed(2) as unknown as number;
  const totalDiscountedPrice = getTotalDiscountPrice().toFixed(
    2
  ) as unknown as number;
  const orderSubtotal = getOrderSubtotal().toFixed(2) as unknown as number;
  const cartQuantity = getTotalCartQuantity();
  const renderStep = () => {
    switch (currentStep) {
      case CheckoutStep.CART:
        return <YourCart />;
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
  return (
    <>
      {currentStep !== CheckoutStep.CART && (
        <button onClick={prevStep}>Previous</button>
      )}
      {currentStep !== CheckoutStep.THANK_YOU && (
        <button onClick={nextStep}>Next</button>
      )}

      <NextButton />
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
          <OrderReview currentStep={currentStep} />
        </div>
      </div>
    </>
  );
}
