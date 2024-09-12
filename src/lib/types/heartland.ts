export type HeartlandTransactionDetails = {
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
