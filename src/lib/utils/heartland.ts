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

export const heartlandResponseCodeMap: Record<string, string> = {
  '02': 'CALL',
  '03': 'TERM ID ERROR',
  '04': 'HOLD-CALL', // MasterCard specific
  '05': 'DECLINE',
  '06': 'ERROR', // AMEX specific
  '12': 'INVALID TRANS',
  '13': 'AMOUNT ERROR',
  '14': 'CARD NO ERROR', // Commonly used, slightly varies as "CARD NO. ERROR" in Discover
  '15': 'NO SUCH ISSUER', // Not in Discover or AMEX
  '19': 'RE ENTER', // Visa specific
  '41': 'HOLD-CALL',
  '43': 'HOLD-CALL', // Not in Discover or AMEX
  '44': 'HOLD-CALL', // Discover and AMEX
  '51': 'DECLINE',
  '52': 'NO CHECK ACCOUNT', // Visa specific
  '53': 'NO SAVE ACCOUNT', // Visa specific
  '54': 'EXPIRED CARD',
  '56': 'INVALID TRANS', // Discover specific (repeated with different code)
  '57': 'SERV NOT ALLOWED', // Discover specific (repeated with different code)
  '58': 'SERV NOT ALLOWED',
  '61': 'DECLINE',
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
