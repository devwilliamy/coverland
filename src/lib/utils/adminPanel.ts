import { PaymentIntent, PaymentMethod } from '@stripe/stripe-js';

import {
  convertUnixTimestampToISOString,
  getCurrentTimeInISOFormat,
} from './date';
import { Tables } from '../db/types';

type TOrdersDB = Tables<'_Orders'>;

export const mapPaymentIntentIdToOrder = (
  paymentIntentInput: PaymentIntent
) => {
  // Ignore metadata, it does exist
  const { metadata, created, id, status, amount } = paymentIntentInput;
  return {
    order_id: metadata.orderId,
    order_date: convertUnixTimestampToISOString(created),
    total_amount: amount,
    status: 'PENDING',
    transaction_id: id,
    payment_status: status,
    skus: metadata.skus,
  };
};

export const mapPaymentIntentAndMethodToOrder = (
  paymentIntentInput: PaymentIntent,
  paymentMethodInput: PaymentMethod
) => {
  const { metadata, created, id, status, amount, payment_method, shipping } =
    paymentIntentInput;
  const { type, card, billing_details } = paymentMethodInput;
  return {
    order_id: metadata.orderId,
    order_date: convertUnixTimestampToISOString(created),
    total_amount: amount,
    status: 'COMPLETE',
    transaction_id: id,
    payment_status: status,
    payment_method_id: payment_method,
    payment_method: type,
    card_amount: amount,
    card_brand: card?.brand,
    card_fingerprint: card?.fingerprint,
    card_funding: card?.funding,
    customer_id: null,
    payment_date: getCurrentTimeInISOFormat(),
    customer_name: billing_details.name,
    customer_email: billing_details.email,
    customer_phone: billing_details.phone,
    shipping_address_line_1: shipping?.address?.line1,
    shipping_address_line_2: shipping?.address?.line2,
    shipping_address_city: shipping?.address?.city,
    shipping_address_state: shipping?.address?.state,
    shipping_address_postal_code: shipping?.address?.postal_code,
    shipping_address_country: shipping?.address?.country,
    shipping_carrier: shipping?.carrier,
    shipping_tracking_number: shipping?.tracking_number,
    billing_address_line_1: billing_details?.address?.line1,
    billing_address_line_2: billing_details?.address?.line2,
    billing_address_city: billing_details?.address?.city,
    billing_address_state: billing_details?.address?.state,
    billing_address_postal_code: billing_details?.address?.postal_code,
    billing_address_country: billing_details?.address?.country,
    skus: metadata.skus,
    updated_at: getCurrentTimeInISOFormat(),
  };
};

type CustomerInput = {
  address?: string | null;
  address_2?: string | null;
  city?: string | null;
  created_at?: string;
  email?: string | null;
  id?: number;
  image_path?: string | null;
  last_name?: string | null;
  name?: string | null;
  password?: string | null;
  phone?: string | null;
  pincode?: string | null;
  state?: string | null;
};
export const mapPaymentMethodToCustomer = (
  paymentMethodInput: PaymentMethod
): CustomerInput => {
  const { billing_details } = paymentMethodInput;
  const splitName: string[] = billing_details?.name?.split(' ') || [];
  return {
    address: billing_details?.address?.line1,
    address_2: billing_details?.address?.line2,
    city: billing_details?.address?.city,
    last_name: splitName[splitName.length - 1],
    name: billing_details?.name,
    phone: billing_details?.phone,
    pincode: billing_details?.address?.postal_code,
    state: billing_details?.address?.state,
    email: billing_details.email
  };
};
