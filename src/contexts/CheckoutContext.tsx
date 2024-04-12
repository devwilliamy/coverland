import { useCreateStripePaymentIntent } from '@/hooks/useStripePaymentIntent';
import { CheckoutStep, StripeAddress } from '@/lib/types/checkout';
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
  clientSecret: string;
  orderNumber: string;
  stripePaymentIntentLoading: boolean;
  billingAddress: StripeAddress;
  updateBillingAddress: (address: StripeAddress) => void;
  shippingAddress: StripeAddress;
  updateShippingAddress: (
    address: StripeAddress,
    isBillingSameAsShipping: boolean
  ) => void;
  customerEmail: string;
  updateCustomerEmail: (email: string) => void;
  isBillingSameAsShipping: boolean;
  updateIsBillingSameAsShipping: (value: boolean) => void;
  paymentIntentId: string;
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
  clientSecret: '',
  orderNumber: '',
  stripePaymentIntentLoading: false,
  billingAddress: {
    name: '',
    address: {
      country: '',
    },
  },
  updateBillingAddress: () => {},
  shippingAddress: {
    name: '',
    address: {
      country: '',
    },
  },
  updateShippingAddress: () => {},
  customerEmail: '',
  updateCustomerEmail: () => {},
  isBillingSameAsShipping: true,
  updateIsBillingSameAsShipping: () => {},
  paymentIntentId: '',
});

const CheckoutProvider: FC<CheckoutProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(CheckoutStep.CART);
  const [shipping, setShipping] = useState<number>(0);
  const [billingAddress, setBillingAddress] = useState<StripeAddress>({
    name: '',
    address: {
      country: '',
    },
  });
  const [shippingAddress, setShippingAddress] = useState<StripeAddress>({
    name: '',
    address: {
      country: '',
    },
  });
  const [customerEmail, setCustomerEmail] = useState<string>('');

  const [isBillingSameAsShipping, setIsBillingSameAsShipping] =
    useState<boolean>(true);

  const {
    paymentIntentId,
    clientSecret,
    orderNumber,
    isLoading: stripePaymentIntentLoading,
  } = useCreateStripePaymentIntent();

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBillingAddress = (address: StripeAddress) =>
    setBillingAddress({ ...billingAddress, ...address });

  const updateShippingAddress = (
    address: StripeAddress,
    isSameAsBilling = true
  ) => {
    setShippingAddress({ ...shippingAddress, ...address });
    if (isSameAsBilling) {
      setBillingAddress({ ...billingAddress, ...address });
    }
  };

  const updateCustomerEmail = (email: string) => setCustomerEmail(email);

  const updateIsBillingSameAsShipping = (value: boolean) => {
    setIsBillingSameAsShipping(value);
    if (value) {
      updateBillingAddress(shippingAddress);
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
        clientSecret,
        orderNumber,
        stripePaymentIntentLoading,
        billingAddress,
        updateBillingAddress,
        shippingAddress,
        updateShippingAddress,
        customerEmail,
        updateCustomerEmail,
        isBillingSameAsShipping,
        updateIsBillingSameAsShipping,
        paymentIntentId,
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
