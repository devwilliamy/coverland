import { StripeCustomCheckoutAddress } from '@stripe/stripe-js';
import { Address } from 'globalpayments-api';

export const convertStripeAddressToHeartlandAddress = (
  address: StripeCustomCheckoutAddress,
  type: number
): Address => {
  return {
    type, // 0: Billing, 1: Shipping,
    streetAddress1: address.line1 || '',
    streetAddress2: address.line2 || '',
    streetAddress3: '',
    city: address.city || '',
    state: address.state || '',
    province: address.state || '',
    postalCode: address.postal_code || '',
    country: address.country || '',
    countryCode: address.country || '',
  };
};

// You can find the response codes here:
// https://cert.api2.heartlandportico.com/Gateway/PorticoDevGuide/build/PorticoDeveloperGuide/#Issuer%20Response%20Codes.html
// Can find the gateway codes here:
// https://cert.api2.heartlandportico.com/Gateway/PorticoDevGuide/build/PorticoDeveloperGuide/#Gateway%20Response%20Codes.html
// We'll be focused on issuer response codes here though.
export const heartlandResponseCodeMap: Record<string, string> = {
  '02': 'CALL', // Want to make sure cardholder is in possession of card
  '03': 'TERM ID ERROR',
  '04': 'HOLD-CALL', // Issuer would like merchant to take possession of card
  '05': 'DECLINE -- EXCEEDED LIMITS', // Exceeded credit line
  '06': 'ERROR', // AMEX specific
  '12': 'INVALID TRANS',
  '13': 'AMOUNT ERROR',
  '14': 'CARD NO. ERROR. RE-ENTER.', // Commonly used, slightly varies as "CARD NO. ERROR" in Discover
  '15': 'NO SUCH ISSUER', // Not in Discover or AMEX
  '19': 'RE ENTER', // Visa specific
  '41': 'HOLD-CALL', // Lost card
  '43': 'HOLD-CALL', // Stolen Card
  '44': 'HOLD-CALL', // Pick up card
  '51': 'DECLINE', // Insufficient funds
  '52': 'NO CHECK ACCOUNT', // Visa specific
  '53': 'NO SAVE ACCOUNT', // Visa specific
  '54': 'EXPIRED CARD',
  '56': 'INVALID TRANS', // Discover specific (repeated with different code)
  '57': 'SERV NOT ALLOWED', // Discover specific (repeated with different code)
  '58': 'SERV NOT ALLOWED',
  '61': 'DECLINE -- INSUFFICIENT FUNDS / EXCEEDED LIMITS', // Insufficient funds or Exceeded withdraw limit
  '62': 'DECLINE',
  '63': 'SEC VIOLATION', // MasterCard specific
  '65': 'DECLINE',
  '78': 'NO ACCOUNT', // AMEX specific
  '91': 'NO REPLY',
  '96': 'SYSTEM ERROR',
  EC: 'CID FORMAT ERROR',
  EB: 'CHECK DIGIT ERR', // Visa specific
  N7: 'CVV2 MISMATCH',
  R1: 'STOP RECURRING', // Visa specific
};
