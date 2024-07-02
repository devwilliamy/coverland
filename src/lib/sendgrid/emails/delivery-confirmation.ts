import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { SHIPPING_METHOD } from '@/lib/constants';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { generateTrackingUrl } from '@/lib/utils/generateTrackingUrl';
import { formatISODate } from '@/lib/utils/date';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const sgFromEmail = process.env.SENDGRID_FROM_EMAIL;
const sgShippingConfirmationTemplateId =
  process.env.SENDGRID_DELIVERY_CONFIRMATION_EMAIL_TEMPLATE_ID;

let shipping_fee; // this is a placeholder for later iteration

const shippingConstants = {
  shipping_method: SHIPPING_METHOD,
  shipping_date: determineDeliveryByDate('EEE, LLL dd'), //this needs to be grabbed from somewhere or pass in a starting date
  delivery_fee: shipping_fee || 0,
};

export type DynamicTemplateData = {
  main_data: MainDeliveryEmailData;
  order_detail_page: string; // url to order detail page (order.id)
  order_items: OrderItem[];
  shipping_info: ShippingInfo;
};

export type MainDeliveryEmailData = {
  id: string;
  ordered_on: string;
  shipped_on: string; //check for order.shipping_status == "shipped" and order.previous_status == "unstarted"
  expected_delivery_on: string;
  tracking_number: string;
  tracking_url: string;
  customer_name: string;
  order_detail_page: string; // url to order detail page (order.id)
};

export type OrderItem = {
  name: string;
  vehicle: string;
  color: string;
  quantity: number;
  price: number;
  img_url: string;
};

export type ShippingInfo = {
  full_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  // shipping_method: string;
  // shipping_date: string;
  // delivery_fee: number;
  // free_delivery: boolean;
};
