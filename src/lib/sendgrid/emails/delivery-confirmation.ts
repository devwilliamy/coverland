import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { SHIPPING_METHOD } from '@/lib/constants';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { generateTrackingUrl } from '@/lib/utils/generateTrackingUrl';
import { formatISODate } from '@/lib/utils/date';
import { TUserOrder } from '@/lib/db/orders/getOrderByOrderId';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const sgFromEmail = process.env.SENDGRID_FROM_EMAIL;
const sgDeliveryConfirmationTemplateId =
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
  shipped_on?: string;
  delivered_on: string; //check for order.shipping_status == "delivered" and order.previous_status == "shipped"
  tracking_number: string;
  tracking_url: string;
  customer_name: string;
  order_detail_page?: string; // url to order detail page (order.id)
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

export const generateDynamicTemplateDataFromUserOrder = (
  order: TUserOrder
): DynamicTemplateData => {
  const {
    order_id,
    payment_date,
    updated_at,
    shipping_carrier,
    shipping_status,
    shipping_previous_status,
    shipping_status_last_updated,
    shipping_tracking_number,
    customer_name,
    items,
  } = order;

  const trademark = '\u2122';

  const main_data = {
    id: order_id,
    ordered_on: payment_date,
    // shipped_on: formatISODate(shipping_status_last_updated), // this is not inside _Orders table
    delivered_on: formatISODate(shipping_status_last_updated),
    shipping_status,
    // expected_delivery_on: myDeliveryFunction(payment_date), // need to add a function to convert order date into estimated delivery date
    tracking_number: shipping_tracking_number,
    tracking_url: generateTrackingUrl(
      shipping_tracking_number,
      shipping_carrier
    ),
    customer_name,
    // order_detail_page: `/order/${order_id}` // Example URL to order detail page
  };
  const {
    shipping_address_line_1,
    shipping_address_line_2,
    shipping_address_city,
    shipping_address_state,
    shipping_address_country,
    shipping_address_postal_code,
  } = order;

  const shipping_info = {
    full_name: customer_name,
    address_line1: shipping_address_line_1,
    address_line2: shipping_address_line_2,
    city: shipping_address_city,
    state: shipping_address_state,
    country: shipping_address_country,
    postal_code: shipping_address_postal_code,
  };

  // the order items are causing an error atm //
  /*
            const order_items = items.map(
        ({
          product: {
            fullProductName,
            display_id,
            type,
            make,
            model,
            year_generation,
            submodel1 = '',
            submodel2 = '',
            submodel3 = '',
            display_color,
            quantity,
            msrp,
            mainImage,
            feature,
            product,
            display_set,
          },
        }) => ({
          name: fullProductName || `${display_id} ${type}`,
          vehicle: `${make} ${model} ${year_generation} ${submodel1 || ''} ${submodel2 || ''} ${submodel3 || ''}`.trim(),
          color: display_color,
          quantity: quantity,
          price: msrp,
          total_price: formatMoneyAsNumber(msrp * quantity),
          img_url: mainImage || feature || product.split(',')[0],
          full_set:
            type === 'Seat Covers'
              ? isFullSet(display_set).toLowerCase() == 'full'
                ? 'Full Seat Set (Front + Rear Seat Set)'
                : 'Front Seats (Driver + Passenger seats)'
              : display_set,
        })
      );
      */

  return {
    main_data,
    // order_items,
    shipping_info,
  };
};