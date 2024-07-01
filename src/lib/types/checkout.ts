import { StripeCustomCheckoutAddress } from '@stripe/stripe-js';

export type StripeAddress = {
  name: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  address: StripeCustomCheckoutAddress;
  phone?: string | undefined;
};

export enum CheckoutStep {
  CART = 0,
  // SHIPPING = 1,
  // PAYMENT = 2,
  // THANK_YOU = 3,
  CHECKOUT = 1,
}

export type PaymentMethod =
  | 'creditCard'
  | 'paypal'
  | 'applePay'
  | 'googlePay'
  | 'klarna';
