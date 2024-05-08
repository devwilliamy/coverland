import { PaymentIntent, PaymentMethod } from '@stripe/stripe-js';

import {
  convertUnixTimestampToISOString,
  getCurrentTimeInISOFormat,
} from './date';
import { Tables } from '../db/types';
import { TPayPalCaptureOrder, PayPalCompleteOrder } from '../types/paypal';

type TOrdersDB = Tables<'_Orders'>;

export const mapPaymentIntentIdToOrder = (
  paymentIntentInput: PaymentIntent
) => {
  // Ignore metadata, it does exist
  const { metadata, currency, created, id, status, amount } =
    paymentIntentInput;
  return {
    order_id: metadata.orderId,
    order_date: convertUnixTimestampToISOString(created),
    total_amount: amount,
    currency: currency,
    status: 'PENDING',
    payment_gateway: 'stripe',
    transaction_id: id,
    payment_status: status,
    skus: metadata.skus,
  };
};

export const mapPaymentIntentAndMethodToOrder = (
  paymentIntentInput: PaymentIntent,
  paymentMethodInput: PaymentMethod,
  customer_id
) => {
  const {
    metadata,
    currency,
    created,
    id,
    status,
    amount,
    payment_method,
    shipping,
  } = paymentIntentInput;
  const { type, card, billing_details } = paymentMethodInput;
  return {
    order_id: metadata.orderId,
    order_date: convertUnixTimestampToISOString(created),
    total_amount: amount,
    currency,
    status: 'COMPLETE',
    payment_gateway: 'stripe',
    transaction_id: id,
    payment_status: status,
    payment_method_id: payment_method,
    payment_method: type,
    card_amount: amount,
    card_brand: card?.brand,
    card_fingerprint: card?.fingerprint,
    card_funding: card?.funding,
    customer_id,
    wallet_type: card?.wallet?.type || null,
    // payment_gateway_customer_id: payer.payer_id,
    payment_date: getCurrentTimeInISOFormat(),
    customer_name: shipping?.name,
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
    billing_customer_name: billing_details?.name,
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
  paymentIntentInput: PaymentIntent,
  paymentMethodInput: PaymentMethod
): CustomerInput => {
  const { shipping } = paymentIntentInput;
  const { billing_details } = paymentMethodInput;
  const splitName: string[] = billing_details?.name?.split(' ') || [];
  return {
    address: billing_details?.address?.line1,
    address_2: billing_details?.address?.line2,
    city: billing_details?.address?.city,
    last_name: splitName[splitName.length - 1],
    name: splitName[0],
    phone: billing_details?.phone,
    pincode: billing_details?.address?.postal_code,
    state: billing_details?.address?.state,
    email: billing_details.email,
    shipping_address: shipping?.address?.line1,
    shipping_address_2: shipping?.address?.line2,
    shipping_city: shipping?.address?.city,
    shipping_state: shipping?.address?.state,
    shipping_pincode: shipping?.address?.postal_code,
  };
};

export const mapPaypalCaptureCreateToOrder = (
  paypalPayload: TPayPalCaptureOrder
) => {
  const { id, status, purchase_units, create_time } = paypalPayload;
  const { reference_id: order_id, amount, items } = purchase_units[0];
  const skus = items.map((item) => item.sku);
  return {
    order_id,
    // order_date: create_time,
    total_amount: amount.value,
    currency: amount.currency_code.toLowerCase(),
    status,
    payment_gateway: 'paypal',
    transaction_id: id,
    skus,
  };
};

export const mapPaypalCompletionToOrder = (
  paypalPayload: PayPalCompleteOrder,
  phone: string,
  customer_id: string
) => {
  console.log('[mapPaypalCompletionToOrder,PaypalPayload]', paypalPayload);
  const { id, status, purchase_units, payment_source, payer } = paypalPayload;
  const { reference_id: order_id, shipping, payments } = purchase_units[0];
  return {
    order_id,
    // order_date: create_time,
    total_amount: payments?.captures[0]?.amount?.value,
    currency: payments?.captures[0]?.amount?.currency_code.toLowerCase(),
    status: status,
    payment_gateway: 'paypal',
    transaction_id: id,
    payment_status: payments?.captures[0]?.status,
    payment_method_id: payments?.captures[0]?.id,
    // payment_method: type,
    card_amount: payments?.captures[0]?.amount?.value,
    // card_brand: card?.brand,
    // card_fingerprint: payments.captures[0].id,
    // card_funding: card?.funding, // credit
    customer_id,
    payment_gateway_customer_id: payer.payer_id,
    payment_date: getCurrentTimeInISOFormat(),
    customer_name: shipping?.name?.full_name,
    customer_email: payment_source?.paypal?.email_address,
    customer_phone: phone || '', // currently don't actually see phone number
    shipping_address_line_1: shipping?.address?.address_line_1,
    shipping_address_line_2: shipping?.address?.address_line_2 || '', // currnetly don't see it
    shipping_address_city: shipping?.address?.admin_area_2,
    shipping_address_state: shipping?.address?.admin_area_1,
    shipping_address_postal_code: shipping?.address?.postal_code,
    shipping_address_country: shipping?.address?.country_code,
    billing_address_line_1:
      payment_source?.paypal?.address?.address_line_1 || '', // Currnetly don't see different billing
    billing_address_line_2:
      payment_source?.paypal?.address?.address_line_2 || '', // currnetly don't see it // Currnetly don't see different billing
    billing_address_city: payment_source?.paypal?.address?.admin_area_2 || '', // Currnetly don't see different billing
    billing_address_state: payment_source?.paypal?.address?.admin_area_1 || '', // Currnetly don't see different billing
    billing_address_postal_code:
      payment_source?.paypal?.address?.postal_code || '', // Currnetly don't see different billing
    billing_address_country: payment_source?.paypal?.address?.country_code, // Currnetly don't see different billing
    updated_at: getCurrentTimeInISOFormat(),
  };
};

export const mapPaypalCompletionToCustomer = (
  paypalPayload: PayPalCompleteOrder,
  phone: string
) => {
  // Note: Paypal doesn't give billing details back
  const { purchase_units, payment_source } = paypalPayload;
  const { shipping } = purchase_units[0];
  const splitName: string[] = shipping?.name?.full_name?.split(' ') || [];
  return {
    shipping_address: shipping?.address?.address_line_1,
    shipping_address_2: shipping?.address?.address_line_2 || '', // currnetly don't see it
    shipping_city: shipping?.address?.admin_area_2,
    last_name: splitName[splitName.length - 1],
    name: splitName[0],
    phone: phone,
    shipping_pincode: shipping?.address?.postal_code,
    shipping_state: shipping?.address?.admin_area_1,
    email: payment_source?.paypal?.email_address,
  };
};
