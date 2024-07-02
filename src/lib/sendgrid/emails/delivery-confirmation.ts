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
