import { HeartlandCardInfo } from "@/contexts/CheckoutContext";

/**
 * @example
 * amount: "0.00",
  accountDataSource: "@",
  authCode: "",
  authorizedAmount: "0.00",
  batchCloseDate: null,
  cardSwiped: "N",
  cardType: "Visa",
  deviceId: "7508557",
  issuerTransactionId: "425618681921000",
  gatewayResponseCode: "00",
  gatewayResponseMessage: "Success",
  gratuityAmount: "0",
  maskedCardNumber: "411111*********1111",
  originalTransactionId: "0",
  referenceNumber: "425618681921",
  responseDate: "2024-09-13T01:40:41.280Z",
  serviceName: "CreditAccountVerify",
  settlementAmount: "0",
  siteTrace: "",
  status: "I",
  transactionDate: null,
  transactionId: "200074610908",
  username: "777704047279SK",
  uniqueDeviceId: "",
  emvChipCondition: "",
  cavvResponseCode: "",
  tokenPanLastFour: "",
  companyName: "",
  customerFirstName: "",
  customerLastName: ""
 */
export type HeartlandTransactionDetailsSummary = {
  amount: string;
  accountDataSource: string;
  authCode: string;
  authorizedAmount: string;
  batchCloseDate: string | null;
  cardSwiped: 'Y' | 'N';
  cardType: 'Visa' | 'MasterCard' | 'Amex' | 'Discover' | string; // Extend with more card types as needed
  deviceId: string;
  issuerTransactionId: string;
  gatewayResponseCode: string;
  gatewayResponseMessage: string;
  gratuityAmount: string;
  maskedCardNumber: string;
  originalTransactionId: string;
  referenceNumber: string;
  responseDate: string; // ISO format date
  serviceName: string;
  settlementAmount: string;
  siteTrace: string;
  status: string; // You could restrict this to known status codes like 'I', 'C', etc.
  transactionDate: string | null;
  transactionId: string;
  username: string;
  uniqueDeviceId: string;
  emvChipCondition: string;
  cavvResponseCode: string;
  tokenPanLastFour: string;
  companyName: string;
  customerFirstName: string;
  customerLastName: string;
};

type HeartlandTransactionReference = {
  authCode: string;
  transactionId: string;
  paymentMethodType: number;
};

/**
 * @example
 * cardBrandTransactionId: "004256672414891",
  responseCode: "00",
  responseMessage: "Success",
  referenceNumber: "425618681921",
  cvnResponseMessage: "Match.",
  cvnResponseCode: "M",
  cardType: "Visa",
  avsResponseMessage: "AVS Not Requested.",
  avsResponseCode: "0",
  transactionReference: {
    authCode: "54238A",
    transactionId: "200074610908",
    paymentMethodType: 2
  }
 */
export type HeartlandCardTransaction = {
  cardBrandTransactionId: string;
  responseCode: string;
  responseMessage: string;
  referenceNumber: string;
  cvnResponseMessage: string;
  cvnResponseCode: string;
  cardType: 'Visa' | 'MasterCard' | 'Amex' | 'Discover' | string; // Extend with more card types as needed
  avsResponseMessage: string;
  avsResponseCode: string;
  transactionReference: HeartlandTransactionReference;
};

type HeartlandPaymentDetails = {
  cardNumber: string;
  cardBin: string;
  cardLast4: string;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | string; // Extend as needed
  cardSecurityCode: boolean;
  expiryMonth: string; // Could narrow down to specific months like '01' to '12'
  expiryYear: string; // Could narrow down to a range of years if needed
};

/**
 * @example
 * 
  details: {
    cardNumber: "411111*********1111",
    cardBin: "411111",
    cardLast4: "1111",
    cardType: "visa",
    cardSecurityCode: true,
    expiryMonth: "12",
    expiryYear: "2034"
  },
  paymentReference: "supt_6ONz5QYtKNVhwpmnSAVIpbKH"
 */
export type HeartlandPaymentDetailsResponse = {
  details: HeartlandCardInfo;
  paymentReference: string;
};

export type HeartlandCreditCardFieldError = {
  cardNumber: string;
  cardCvv: string;
  cardExp: string;
  general: string;
}
