'use client';

import BillingAddress from '@/components/checkout/BillingAddress';
import { CvvPopover } from '@/components/checkout/CvvPopover';
import LoadingButton from '@/components/ui/loading-button';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import handleHeartlandTokenSuccess from './handleHeartlandTokenSuccess';

const VerifyForm: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [amount, setAmount] = useState('0');
  const [address, setAddress] = useState({
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [error, setError] = useState({
    cardNumber: '',
    cardCvv: '',
    cardExp: '',
    general: '',
  });

  const resetError = () =>
    setError({
      cardNumber: '',
      cardCvv: '',
      cardExp: '',
      general: '',
    });

  const handleChange = (e) => {
    console.log('HANDLE CHANGE:', {
      name: e.target.name,
      value: e.target.value,
      address,
    });
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };
  const { shippingAddress } = useCheckoutContext();
  useEffect(() => {
    if (!window.GlobalPayments) {
      const script = document.createElement('script');
      script.src = 'https://js.globalpay.com/v1/globalpayments.js';
      script.onload = () => {
        console.log('Global Payments script loaded');
        setScriptLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Global Payments script');
      };
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      console.log('Initializing payment form');

      window.GlobalPayments.configure({
        publicApiKey: process.env.NEXT_PUBLIC_HEARTLAND_PUBLIC_KEY,
      });

      const cardForm = window.GlobalPayments.ui.form({
        fields: {
          'card-holder-name': {
            placeholder: 'Jane Smith',
            target: '#credit-card-card-holder',
          },
          'card-number': {
            placeholder: 'Card Number',
            target: '#credit-card-card-number',
          },
          'card-expiration': {
            placeholder: 'MM / YYYY',
            target: '#credit-card-card-expiration',
          },
          'card-cvv': {
            placeholder: 'CVV',
            target: '#credit-card-card-cvv',
          },
          submit: {
            value: 'CONTINUE TO ORDER REVIEW',
            target: '#credit-card-submit',
          },
        },
        styles: {
          // Your styles here
          input: {
            display: 'flex',
            'border-width': '1px',
            'border-radius': '8px',
            'padding-left': '17px',
            'padding-right': '17px',
            'padding-top': '19px',
            'padding-bottom': '19px',
            'align-items': 'center',
            // 'background-color': 'red',
            // 'max-width': '620px',
            width: '100%',
          },
          '#secure-payment-field.card-number': {
            // 'background-color': 'blue',
            'max-width': '270px',
          },
          '#secure-payment-field.card-cvv': {
            // 'background-color': 'blue',
            'max-width': '80px',
          },
          '#secure-payment-field.card-expiration': {
            'max-width': '80px',
          },
          '#secure-payment-field.submit': {
            margin: 0,
            'margin-bottom': '12px', // 3 * 4px = 12px
            'max-height': '48px',
            'min-height': '48px',
            width: '100%',
            'align-self': 'flex-end',
            'justify-self': 'flex-end',
            'border-radius': '0.5rem', // 8px
            'background-color': '#1A1A1A',
            'text-align': 'center',
            'font-size': '1rem', // 16px
            'font-weight': 700,
            'text-transform': 'uppercase',
            'line-height': '17px',
            color: 'white',
          },
          '#secure-payment-field.submit:hover': {
            'background-color': 'rgba(26, 26, 26, 0.9)',
          },
          '#secure-payment-field.submit:disabled': {
            'background-color': '#D6D6D6',
            color: '#767676',
          },
        },
      });

      cardForm.ready(() => {
        console.log('Registration of all credit card fields occurred');
      });

      cardForm.on('token-success', (resp: any) =>
        handleHeartlandTokenSuccess(
          resp,
          setError,
          resetError,
          error,
          shippingAddress
        )
      );
      cardForm.on('token-error', (resp: any) => {
        console.log('resp.error', resp);
        resetError();
        if (error && resp.reasons[0]) {
          switch (resp.reasons[0].code) {
            case 'INVALID_CARD_NUMBER':
              setError({
                ...error,
                cardNumber: resp.reasons[0].message,
              });
              break;
            case 'INVALID_CARD_EXPIRATION_DATE':
              setError({
                ...error,
                cardExp: resp.reasons[0].message,
              });
              break;
            default:
              setError({
                ...error,
                general: resp.reasons[0].message,
              });
              break;
          }
        }
      });

      cardForm.on('card-number', 'register', () => {
        console.log('Registration of Card Number occurred');
      });
    }
  }, [scriptLoaded]);

  return (
    <div>
      <form id="payment-form" action="#payment-form">
        <div className="max-w-[620px]">
          <div className="mt-[26px] flex w-full flex-col rounded-[8px] border border-[#DBDBDB] px-[19px] py-[25px]">
            <h1 className="mb-[32px] font-[700]">Add Card</h1>
            {scriptLoaded ? (
              <div className="flex w-full flex-col lg:flex-row lg:gap-4">
                <div id="credit-card-card-holder" className="hidden"></div>
                <div className="flex flex-col">
                  <div id="credit-card-card-number"></div>
                  {error.cardNumber && (
                    <p className="pl-1 pt-2 text-[red]"> {error.cardNumber}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <div
                    id="credit-card-card-cvv"
                    className="max-w-[115px]"
                  ></div>
                  {error.cardCvv && (
                    <p className="pl-1 pt-2 text-[red]"> {error.cardCvv}</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <div
                    id="credit-card-card-expiration"
                    className="max-w-[115px]"
                  ></div>
                  {error.cardExp && (
                    <p className="pl-1 pt-2 text-[red]"> {error.cardExp}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin" />
              </div>
            )}
            <div className="flex pr-2 pt-4 lg:justify-end">
              <CvvPopover />
            </div>
          </div>
          <div className="pt-4">
            <BillingAddress />
          </div>
          <div className="flex w-full flex-col items-center justify-center pt-12 lg:flex-row lg:justify-end">
            <div id="credit-card-submit"></div>
          </div>
        </div>
      </form>
 
    </div>
  );
};

export default VerifyForm;

/*

VERIFY DEBUG: {
  token: 'supt_as9BwRXDa9qjJPcGsP7qzeua',   
  cardInfo: {
    cardNumber: '356600******7321',
    cardBin: '356600',
    cardLast4: '7321',
    cardType: 'jcb',  
    expiryMonth: '03',
    expiryYear: '3333',
    cardSecurityCode: 'true'
  },
  address: { postalCode: '' },
  additionalInformation: { companyName: '', postalCode: '' }      
}
Transaction {
  authorizedAmount: undefined,
  avsAddressResponse: undefined,
  balanceAmount: undefined,
  pointsBalanceAmount:
 undefined,
  cardBrandTransactionId: '073122275700498',
  commercialIndicator:
 undefined,
  responseCode: '00', 
  responseMessage: 'Success',
  transactionDescriptor: undefined,
  referenceNumber: '421316191745',
  recurringDataCode: undefined,
  cvnResponseMessage: 'Match.',
  cvnResponseCode: 'M',
  cavvResponseCode: undefined,
  multiCapture: undefined,
  multiCapturePaymentCount: undefined,      
  multiCaptureSequence: undefined,
  cardLast4: undefined,
  cardType: 'Disc',   
  avsResponseMessage: 'AVS Not Requested.', 
  avsResponseCode: '0',
  availableBalance: undefined,
  transactionReference: TransactionReference {
    authCode: '007489',
    orderId: undefined,
    transactionId: '200071933013',
    paymentMethodType:
 2,
    clientTransactionId: undefined
  },
  token: undefined,   
  giftCard: undefined,
  clientTransactionId:
 undefined,
  timestamp: undefined,
  batchId: undefined, 
  batchSeqNbr: undefined,
  payFacData: undefined,
  payerDetails: undefined,
  fingerprint: undefined,
  fingerprintIndicator: undefined,
  tokenUsageMode: undefined,
  cardDetails: undefined,
  threeDSecure: undefined,
  accountNumberLast4: undefined,
  accountType: undefined,
  cardIssuerResponse: undefined
}
TransactionSummary {  
  amount: '0.00',     
  currency: undefined,
  merchantId: undefined,
  merchantHierarchy: undefined,
  merchantName: undefined,
  merchantDbaName: undefined,
  accountDataSource: '@',
  accountNumberLast4: undefined,
  accountType: undefined,
  aquirerReferenceNumber: undefined,        
  authCode: '',       
  authorizedAmount: '0.00',
  batchCloseDate: Invalid Date,
  batchSequenceNumber:
 undefined,
  brandReference: undefined,
  cardHolderName: undefined,
  cardSwiped: 'N',    
  cardType: 'Disc',   
  channel: undefined, 
  clerkId: undefined, 
  clientTransactionId:
 undefined,
  convenienceAmt: undefined,
  country: undefined, 
  deviceId: '7508557',
  depositStatus: undefined,
  depositReference: undefined,
  depositTimeCreated: undefined,
  entryMode: undefined,
  issuerResponseCode: undefined,
  issuerResponseMessage: undefined,
  issuerTransactionId:
 '421316191745000',   
  gatewayResponseCode:
 '00',
  gatewayResponseMessage: 'Success',        
  gratuityAmount: '0',
  maskedCardNumber: '356600******7321',     
  originalTransactionId: '0',
  orderId: undefined, 
  paymentType: undefined,
  poNumber: undefined,
  referenceNumber: '421316191745',
  responseDate: 2024-08-01T05:27:58.980Z,   
  serviceName: 'CreditAccountVerify',       
  settlementAmount: '0',
  shippingAmt: undefined,
  siteTrace: '',      
  status: 'I',        
  taxAmount: undefined,
  taxType: undefined, 
  transactionDate: Invalid Date,
  transactionLocalDate: undefined,
  transactionId: '200071933013',
  transactionStatus: undefined,
  transactionType: undefined,
  username: '777704047279SK',
  description: undefined,
  invoiceNumber: undefined,
  customerId: undefined,
  uniqueDeviceId: '', 
  transactionDescriptor: undefined,
  giftCurrency: undefined,
  maskedAlias: undefined,
  paymentMethodKey: undefined,
  scheduleId: undefined,
  oneTimePayment: undefined,
  recurringDataCode: undefined,
  surchargeAmount: undefined,
  fraudRuleInfo: undefined,
  repeatCount: undefined,
  emvChipCondition: '',
  hasEmvTags: undefined,
  hasEcomPaymentData: undefined,
  cavvResponseCode: '',
  tokenPanLastFour: '',
  companyName: '',    
  customerFirstName: '',
  customerLastName: '',
  debtRepaymentIndicator: undefined,        
  captureAmount: undefined,

  */