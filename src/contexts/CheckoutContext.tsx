import { CheckoutStep } from '@/lib/types/checkout';
import { FC, createContext, useContext, useState } from 'react';

export type CheckoutContextType = {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
};

export type CheckoutProviderProps = {
  children: React.ReactNode;
};

export const CheckoutContext = createContext<CheckoutContextType>({
  currentStep: 0,
  nextStep: () => {},
  prevStep: () => {},
});

const CheckoutProvider: FC<CheckoutProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(CheckoutStep.CART);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep !== 0) {
        setCurrentStep(currentStep - 1);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        nextStep,
        prevStep,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

function useCheckoutContext() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    console.error(
      "'useCheckoutContext must be used within a CheckoutContextProvider'"
    );
    throw new Error(
      'useCheckoutContext must be used within a CheckoutContextProvider'
    );
  }

  return context;
}

export { CheckoutProvider, useCheckoutContext };
