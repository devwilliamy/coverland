import { CheckoutStep } from '@/lib/types/checkout';
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type CheckoutContextType = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<CheckoutStep>>;
  nextStep: () => void;
  prevStep: () => void;
  shipping: number;
  setShipping: (shipping: number) => void;
};

export type CheckoutProviderProps = {
  children: React.ReactNode;
};

export const CheckoutContext = createContext<CheckoutContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  nextStep: () => {},
  prevStep: () => {},
  shipping: 0,
  setShipping: () => {},
});

const CheckoutProvider: FC<CheckoutProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(CheckoutStep.SHIPPING);
  const [shipping, setShipping] = useState<number>(0);
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
        setCurrentStep,
        shipping,
        setShipping,
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
