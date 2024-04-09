import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';

export default function NextButton() {
  const { currentStep, nextStep } = useCheckoutContext();
  return (
    <>
      {currentStep !== CheckoutStep.THANK_YOU && (
        <button onClick={nextStep}>Next</button>
      )}
    </>
  );
}
