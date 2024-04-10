import Payment from '@/components/checkout/Payment';
import Shipping from '@/components/checkout/Shipping';
import YourCart from '@/components/checkout/YourCart';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import { useState } from 'react';

export default function MobileCheckout() {
  // const [currentStep, setCurrentStep] = useState(CheckoutStep.SHIPPING);
  const { currentStep } = useCheckoutContext()
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-24">
        <div className="w-full">
          <YourCart />
          <Shipping />
          <div className="pt-4">
            {currentStep >= CheckoutStep.PAYMENT && <Payment />}
          </div>
        </div>
      </div>
    </>
  );
}
