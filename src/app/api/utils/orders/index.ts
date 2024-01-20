// const devURL = process.env.NEXT_PUBLIC_DEV_BASE_URL
// const orderConfirmationEmailURL = `${devURL}/api/emails/send-order-confirmation`
import { Stripe, loadStripe } from '@stripe/stripe-js';

const baseURL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
const orderConfirmationEmailURL = `${baseURL}/api/emails/send-order-confirmation`;

function formatDateString(dateString: any) {
  const date = new Date(dateString);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const handleOrderConfirmationEmail = async (order: any) => {
  const orderDateString = formatDateString(order.order_placed);
  const emailData = {
    to: order.shipping_address.email,
    subject: `Your receipt for Coverland order ${order.id}`,
    message: 'Here is the message body',
    orderData: {
      id: order.id,
      date: orderDateString,
      shipping_address: order.shipping_address,
      shipping_details: order.shipping_details,
      subtotal: order.subtotal,
      discount: order.discount,
      shipping: order.shipping_cost,
      order_total: order.total,
      items: order.items,
      // payment_details: order.payment_details,
      // payment_method: order.payment_details.cardNumber.slice(-4),
      // payment_expiry: order.payment_details.expDate,
    },
  };

  try {
    const response = await fetch(orderConfirmationEmailURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });
    await response.json();
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};

export default handleOrderConfirmationEmail;

let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};
