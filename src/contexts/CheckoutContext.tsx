import {
  CheckoutStep,
  PaymentMethod,
  StripeAddress,
} from '@/lib/types/checkout';
import { PaymentMethodResult } from '@stripe/stripe-js';
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export type CustomerInfo = {
  email: string;
  phoneNumber: string;
};

export type StripeData = {
  paymentIntentId: string;
  clientSecret: string;
  orderNumber: string;
};

export type CardErrorData = {
  error: 'empty' | 'invalid' | null;
  message?: string;
  visited: boolean;
};

export type CheckoutContextType = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<CheckoutStep>>;
  nextStep: () => void;
  prevStep: () => void;
  shipping: number;
  setShipping: (shipping: number) => void;
  clientSecret: string;
  orderNumber: string;
  billingAddress: StripeAddress;
  updateAddressComplete: (address: StripeAddress) => void;
  updateBillingAddress: (address: StripeAddress) => void;
  shippingAddress: StripeAddress;
  isAddressComplete: boolean;
  updateShippingAddress: (
    address: StripeAddress,
    isBillingSameAsShipping: boolean
  ) => void;
  isShippingAddressShown: boolean;
  toggleIsShippingAddressShown: (isShown: boolean) => void;
  customerInfo: CustomerInfo;
  updateCustomerInfo: (info: Partial<CustomerInfo>) => void;
  isBillingSameAsShipping: boolean;
  updateIsBillingSameAsShipping: (value: boolean) => void;
  isEditingAddress: boolean;
  updateIsEditingAddress: (isEditing: boolean) => void;
  isReadyToPay: boolean;
  updateIsReadyToPay: (readyToPay: boolean) => void;
  paymentIntentId: string;
  setStripeData: (value: StripeData) => void;
  isReadyToShip: boolean;
  updateIsReadyToShip: (readyToShip: boolean) => void;
  paymentMethod: PaymentMethod;
  updatePaymentMethod: (paymentMethod: PaymentMethod) => void;
  cardNumberError: CardErrorData;
  cardExpiryError: CardErrorData;
  cardCvvError: CardErrorData;
  updateCardNumberError: (error: CardErrorData) => void;
  updateCardExpiryError: (error: CardErrorData) => void;
  updateCardCvvError: (error: CardErrorData) => void;
  stripePaymentMethod: PaymentMethodResult | null | undefined;
  updateStripePaymentMethod: (
    paymentMethod: PaymentMethodResult | null | undefined
  ) => void;
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
  billingAddress: {
    name: '',
    address: {
      country: '',
    },
  },
  isAddressComplete: false,
  updateAddressComplete: () => {},
  updateBillingAddress: () => {},
  shippingAddress: {
    name: '',
    address: {
      country: '',
    },
  },
  isEditingAddress: true,
  updateIsEditingAddress: () => {},
  updateShippingAddress: () => {},
  isShippingAddressShown: true,
  toggleIsShippingAddressShown: () => {},
  customerInfo: {
    email: '',
    phoneNumber: '',
  },
  updateCustomerInfo: () => {},
  isBillingSameAsShipping: true,
  updateIsBillingSameAsShipping: () => {},
  paymentIntentId: '',
  setStripeData: () => {},
  isReadyToPay: false,
  updateIsReadyToPay: () => {},
  isReadyToShip: false,
  updateIsReadyToShip: () => {},
  paymentMethod: 'creditCard',
  updatePaymentMethod: () => {},
  cardNumberError: { error: null, visited: false },
  cardExpiryError: { error: null, visited: false },
  cardCvvError: { error: null, visited: false },
  updateCardNumberError: () => {},
  updateCardExpiryError: () => {},
  updateCardCvvError: () => {},
  stripePaymentMethod: null,
  updateStripePaymentMethod: () => {},
});

const CheckoutProvider: FC<CheckoutProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(CheckoutStep.CART);
  const [shipping, setShipping] = useState<number>(0);
  const [isEditingAddress, setIsEditingAddress] = useState(true);
  const [isAddressComplete, setIsAddressComplete] = useState(false);
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
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    phoneNumber: '',
  });
  const [isShippingAddressShown, setIsShippingAddressShown] =
    useState<boolean>(true);
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] =
    useState<boolean>(true);
  const [stripeData, setStripeData] = useState({
    paymentIntentId: '',
    clientSecret: '',
    orderNumber: '',
  });
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('creditCard');
  const [cardNumberError, setCardNumberError] = useState<CardErrorData>({
    error: null,
    visited: false,
  });
  const [cardExpiryError, setCardExpiryError] = useState<CardErrorData>({
    error: null,
    visited: false,
  });
  const [cardCvvError, setCardCvvError] = useState<CardErrorData>({
    error: null,
    visited: false,
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateAddressComplete = (data: StripeAddress) => {
    if (
      // data.name &&
      data.firstName &&
      data.lastName &&
      data.address.line1 &&
      data.address.city &&
      data.address.state &&
      data.address.postal_code &&
      data.address.country &&
      data.phone
    ) {
      setIsAddressComplete(true);
      return;
    }
    setIsAddressComplete(false);
  };

  const updateIsEditingAddress = (isEditing: boolean) => {
    setIsEditingAddress(isEditing);
  };

  const updateBillingAddress = (address: StripeAddress) => {
    setBillingAddress({ ...billingAddress, ...address });
    updateAddressComplete(address);
  };

  const updateShippingAddress = (
    address: StripeAddress,
    isSameAsBilling = true
  ) => {
    setShippingAddress({ ...shippingAddress, ...address });
    if (isSameAsBilling) {
      setBillingAddress({ ...billingAddress, ...address });
    }
    updateAddressComplete(address);
  };

  const updateCustomerInfo = (info: Partial<CustomerInfo>) =>
    setCustomerInfo(() => ({
      ...customerInfo,
      ...info,
    }));

  const updateIsBillingSameAsShipping = (value: boolean) => {
    setIsBillingSameAsShipping(value);
    if (value) {
      updateBillingAddress(shippingAddress);
    }
  };

  const toggleIsShippingAddressShown = (isShown: boolean) => {
    setIsShippingAddressShown(isShown);
  };

  const updateIsReadyToPay = (isReadyToPay: boolean) => {
    if (
      shippingAddress.firstName &&
      shippingAddress.lastName &&
      shippingAddress.address.city &&
      shippingAddress.address.line1 &&
      shippingAddress.address.postal_code &&
      shippingAddress.address.state &&
      shippingAddress.address.country
    ) {
      setIsReadyToPay(isReadyToPay);
    }
  };

  const [isReadyToShip, setIsReadyToShip] = useState(false);
  const updateIsReadyToShip = (readyToShip: boolean) => {
    if (
      readyToShip &&
      shippingAddress.firstName &&
      shippingAddress.lastName &&
      shippingAddress.address.city &&
      shippingAddress.address.line1 &&
      shippingAddress.address.postal_code &&
      shippingAddress.address.state &&
      shippingAddress.address.country
    ) {
      setIsReadyToShip(true);
      return;
    }
    setIsReadyToShip(false);
  };

  const updatePaymentMethod = (paymentMethod: PaymentMethod) => {
    setPaymentMethod(paymentMethod);
  };

  const updateCardNumberError = (error: CardErrorData) => {
    setCardNumberError(error);
  };
  const updateCardExpiryError = (error: CardErrorData) => {
    setCardExpiryError(error);
  };
  const updateCardCvvError = (error: CardErrorData) => {
    setCardCvvError(error);
  };

  const [stripePaymentMethod, setStripePaymentMethod] = useState<
    PaymentMethodResult | null | undefined
  >(null);

  const updateStripePaymentMethod = (
    paymentMethod: PaymentMethodResult | null | undefined
  ) => {
    setStripePaymentMethod(paymentMethod);
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
        clientSecret: stripeData.clientSecret,
        orderNumber: stripeData.orderNumber,
        billingAddress,
        updateAddressComplete,
        updateBillingAddress,
        isShippingAddressShown,
        toggleIsShippingAddressShown,
        shippingAddress,
        isEditingAddress,
        updateIsEditingAddress,
        isAddressComplete,
        updateShippingAddress,
        customerInfo,
        updateCustomerInfo,
        isBillingSameAsShipping,
        updateIsBillingSameAsShipping,
        paymentIntentId: stripeData.paymentIntentId,
        setStripeData,
        isReadyToPay,
        updateIsReadyToPay,
        isReadyToShip,
        updateIsReadyToShip,
        paymentMethod,
        updatePaymentMethod,
        cardNumberError,
        cardExpiryError,
        cardCvvError,
        updateCardNumberError,
        updateCardExpiryError,
        updateCardCvvError,
        stripePaymentMethod,
        updateStripePaymentMethod,
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
