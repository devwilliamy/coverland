import { StripeAddress } from '@/lib/types/checkout';
import { formatToE164 } from '@/lib/utils';
import { createOrUpdateUser } from '../admin-panel/customers';
import { getCurrentTimeInISOFormat } from '@/lib/utils/date';
import { updateAdminPanelOrder } from '../admin-panel/orders';

export async function updateOrdersShipping(
  stripeAddress: StripeAddress,
  email: string,
  orderId: string
) {
  // Map Address To Customer
  const shippingCustomerDTO = mapShippingAddressToCustomer(
    stripeAddress,
    email
  );
  // Create Customer
  const customer = await createOrUpdateUser(shippingCustomerDTO);
  // Map to Order
  const shippingOrderDTO = mapShippingToOrder(
    stripeAddress,
    email,
    customer[0].id
  );
  // Update Order
  const updatedOrderResponse = await updateAdminPanelOrder(
    shippingOrderDTO,
    orderId
  );
}

export async function updateOrdersBilling(
  stripeAddress: StripeAddress,
  email: string,
  orderId: string
) {
  // Map Address To Customer
  const billingCustomerDTO = mapBillingAddressToCustomer(stripeAddress, email);
  // Create Customer
  const customer = await createOrUpdateUser(billingCustomerDTO);
  // Map to Order
  const billingOrderDTO = mapBillingToOrder(
    stripeAddress,
    email,
    customer[0].id
  );
  // Update Order
  const updatedOrderResponse = await updateAdminPanelOrder(
    billingOrderDTO,
    orderId
  );
}

function mapShippingAddressToCustomer(
  stripeAddress: StripeAddress,
  email: string
) {
  const { firstName, lastName, address, phone } = stripeAddress;
  const formattedPhone = formatToE164(phone ?? '');
  return {
    shipping_address: address?.line1,
    shipping_address_2: address?.line2 || '', // currnetly don't see it
    shipping_city: address?.postal_code,
    last_name: lastName,
    name: firstName,
    phone: formattedPhone,
    shipping_pincode: address?.postal_code,
    shipping_state: address?.state,
    email: email,
  };
}

function mapBillingAddressToCustomer(
  stripeAddress: StripeAddress,
  email: string
) {
  const { address } = stripeAddress;
  return {
    address: address?.line1,
    address_2: address?.line2 || '', // currently don't see it
    city: address?.postal_code,
    pincode: address?.postal_code,
    state: address?.state,
    email,
  };
}

function mapShippingToOrder(
  stripeAddress: StripeAddress,
  email: string,
  customer_id: number
) {
  const { name, address, phone } = stripeAddress;
  const formattedPhone = formatToE164(phone ?? '');
  return {
    customer_id,
    customer_name: name,
    customer_email: email,
    customer_phone: formattedPhone,
    shipping_address_line_1: address?.line1,
    shipping_address_line_2: address?.line2 || '', // currnetly don't see it
    shipping_address_city: address?.postal_code,
    shipping_address_state: address?.state,
    shipping_address_postal_code: address?.postal_code,
    shipping_address_country: address?.country,
    updated_at: getCurrentTimeInISOFormat(),
  };
}

function mapBillingToOrder(
  stripeAddress: StripeAddress,
) {
  const { name, address } = stripeAddress;
  return {
    billing_customer_name: name,
    billing_address_line_1: address?.line1,
    billing_address_line_2: address?.line2 || '', // currently don't see it
    billing_address_city: address?.city,
    billing_address_state: address?.state,
    billing_address_postal_code: address?.postal_code,
    billing_address_country: address?.country,
    updated_at: getCurrentTimeInISOFormat(),
  };
}
