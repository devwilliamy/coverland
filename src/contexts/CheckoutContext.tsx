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
  orderId: number;
};

export type CardErrorData = {
  error: 'empty' | 'invalid' | null;
  message?: string;
  visited: boolean;
};

export type HeartlandCardInfo = {
  cardNumber: string;
  cardBin: string;
  cardLast4: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | string; // Extend as needed
  expiryMonth: string; // You can consider narrowing this to '01' | '02' | '03' | ... | '12'
  expiryYear: string; // If you want, you could restrict this to specific valid year ranges
  cardSecurityCode: string; // Could be boolean if it represents a true/false condition
};

export type CheckoutContextType = {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<CheckoutStep>>;
  nextStep: () => void;
  prevStep: () => void;
  shipping: number;
  setShipping: (shipping: number) => void;
  tax: number;
  setTax: (tax: number) => void;
  showTax: boolean;
  setShowTax: (showTax: boolean) => void;
  clientSecret: string;
  orderNumber: string;
  orderId: number;
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
  twoLetterStateCode: string;
  updateTwoLetterStateCode: (code: string) => void;
  billingTwoLetterStateCode: string;
  updateBillingTwoLetterStateCode: (code: string) => void;
  totalTax: string | null;
  updateTotalTax: (tax: string) => void;
  cardInfo: HeartlandCardInfo;
  updateCardInfo: (newCardInfo: Partial<HeartlandCardInfo>) => void;
  cardToken: string;
  updateCardToken: (newCardToken: string) => void;
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
  tax: 0,
  setTax: () => {},
  showTax: false,
  setShowTax: () => {},
  clientSecret: '',
  orderNumber: '',
  orderId: 0,
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
  twoLetterStateCode: '',
  updateTwoLetterStateCode: () => {},
  totalTax: null,
  updateTotalTax: () => {},
  billingTwoLetterStateCode: '',
  updateBillingTwoLetterStateCode: () => {},
  cardInfo: {
    cardNumber: '',
    cardBin: '',
    cardLast4: '',
    cardType: '',
    expiryMonth: '',
    expiryYear: '',
    cardSecurityCode: '',
  },
  updateCardInfo: () => {},
  cardToken: '',
  updateCardToken: () => {},
});

const CheckoutProvider: FC<CheckoutProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(CheckoutStep.CART);
  const [shipping, setShipping] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [showTax, setShowTax] = useState<boolean>(false);
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
    orderId: 0,
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

  const [twoLetterStateCode, setTwoLetterStateCode] = useState('');
  const updateTwoLetterStateCode = (code: string) => {
    setTwoLetterStateCode(code);
  };

  const [totalTax, setTotalTax] = useState<string | null>(null);
  const updateTotalTax = (tax: string) => {
    setTotalTax(tax);
  };

  const [billingTwoLetterStateCode, setBillingTwoLetterStateCode] =
    useState('');

  const updateBillingTwoLetterStateCode = (code: string) => {
    setBillingTwoLetterStateCode(code);
  };

  const [cardInfo, setCardInfo] = useState<HeartlandCardInfo>({
    cardNumber: '',
    cardBin: '',
    cardLast4: '',
    cardType: '',
    expiryMonth: '',
    expiryYear: '',
    cardSecurityCode: '',
  });

  const updateCardInfo = (newCardInfo: Partial<HeartlandCardInfo>) => {
    setCardInfo(() => ({
      ...cardInfo,
      ...newCardInfo,
    }));
  };

  const [cardToken, setCardToken] = useState<string>('');
  const updateCardToken = (newCardToken: string) => {
    setCardToken(newCardToken);
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
        tax,
        setTax,
        showTax,
        setShowTax,
        clientSecret: stripeData.clientSecret,
        orderNumber: stripeData.orderNumber,
        orderId: stripeData.orderId,
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
        twoLetterStateCode,
        updateTwoLetterStateCode,
        totalTax,
        updateTotalTax,
        billingTwoLetterStateCode,
        updateBillingTwoLetterStateCode,
        cardInfo,
        updateCardInfo,
        cardToken,
        updateCardToken,
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
