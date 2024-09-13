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
