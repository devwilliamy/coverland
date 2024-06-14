import { TCartItem } from '@/lib/cart/useCart';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { formatMoneyAsNumber, trimToWholeNumber } from '@/lib/utils/money';
import { isFullSet } from '@/lib/utils';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const sgFromEmail = process.env.SENDGRID_FROM_EMAIL;
const sgThankYouEmailTemplateId = process.env.SENDGRID_THANK_YOU_EMAIL_TEMPLATE_ID;


type OrderItem = {
  name: string;
  vehicle: string;
  color: string;
  quantity: number;
  price: number;
  img_url: string;
};

type ShippingInfo = {
  full_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  shipping_method: string;
  shipping_date: string;
  delivery_fee: number;
  free_delivery: boolean;
};

type DynamicTemplateData = {
  first_name: string;
  order_date: string;
  order_number: string;
  order_items: OrderItem[];
  shipping_info: ShippingInfo;
  total_item_quantity: number;
  subtotal: number;
  total_discount: number;
  // taxes: number;
  total: number;
  cv_four_digits: string;
  cv_exp_date: string;
};

const trademark = "\u2122";
/**
 * example obj SendGrid expects us to send (there are more parameters available inside MailDataRequired type):
 * 
 * thankYouEmailInput: ThankYouEmailInput = {
  to: 'pVWu5@example.com',
  from: 'hello@notreal.com',
  templateId: 'sg-124124-1259149asf9124124',
    dynamicTemplateData: {
      first_name: "John",
      order_date: "November 20, 2023",
      order_number: "CL-00001",
      order_items: [
        {
          name: "Premium Plus Custom Car Cover",
          vehicle: "Ford Mustang 2019 Fastback",
          color: "2-Tone Black & Gray",
          quantity: 1,
          price: 179.99,
          total_price: 179.99,
          img_url: "https://coverland.com/custom-cover/01-fomu12-bkrd-str-nm.webp"
        },
        {
          name: "Premium Plus Custom Car Cover",
          vehicle: "AMC Matador 2019 2-Door",
          color: "2-Tone Black & Gray",
          quantity: 3,
          price: 179.99,
          total_price: 539.97,
          img_url: "https://cdn-icons-png.flaticon.com/512/1581/1581884.png"
        }
      ],
      shipping_info: {
        full_name: "John Newman",
        address_line1: "2125 Chestnut Street",
        city: "San Francisco",
        state: "CA",
        postal_code: "94123",
        shipping_method: "Standard, free shipping",
        shipping_date: "Wed, Nov 30",
        delivery_fee: 0.00,
        free_delivery: true
      },
      total_item_quantity: 4,
      subtotal: 1440.00,
      total_discount: 720.04,
      has_discount: true,
      taxes: 10.00,
      total: 719.96,
      cv_four_digits: "*4242",
      cv_exp_date: "11/2026"
    }
  }
 */
type ThankYouEmailInput = MailDataRequired & { dynamicTemplateData: DynamicTemplateData };

const generateOrderItems = (cartItems: TCartItem[]) => {
  return cartItems.map(({ 
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
  }) => ({
    name: fullProductName || `${display_id}${trademark} ${type}`,
    vehicle: `${make} ${model} ${year_generation} ${submodel1 || ''} ${submodel2 || ''} ${submodel3 || ''}`.trim(),
    color: display_color,
    quantity: quantity,
    price: msrp,
    total_price: formatMoneyAsNumber(msrp * quantity),
    img_url: mainImage || feature || product.split(',')[0],
    full_set: type === 'Seat Covers' ? isFullSet(display_set).toLowerCase() == "full" ? "Full Seat Set (Front + Rear Seat Set)": 'Front Seats (Driver +  Passenger seats)' : display_set,
  }));
};

const generateThankYouEmail = ({
  to,
  name,
  orderInfo,
  shippingInfo,
  billingInfo, 
}: ThankYouEmailInput) => ({
  to, // Change to your recipient
  from: sgFromEmail,
  templateId: sgThankYouEmailTemplateId, // Process ENV
  dynamicTemplateData: {
    first_name: name.firstName,
    order_date: orderInfo.orderDate,
    order_number: orderInfo.orderNumber,
    shipping_info: {
      ...shippingInfo,
    },
    order_items: generateOrderItems(orderInfo.cartItems),
    full_name: name.fullName,
    total_item_quantity: orderInfo.totalItemQuantity,
    subtotal: formatMoneyAsNumber(orderInfo.subtotal),
    // total_discount: trimToWholeNumber(orderInfo.totalDiscount), // option to change to cleaner discount format i.e. $720.04 -> $720
    total_discount: orderInfo.totalDiscount,
    has_discount: orderInfo.hasDiscount,
    // taxes: orderInfo.taxes, // not yet implemented
    total: formatMoneyAsNumber(orderInfo.total),
  },
});

export const sendThankYouEmail = async (emailInput: MailDataRequired) => {
  const msg = generateThankYouEmail(emailInput);
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    // Check if err.response exists to get more details
    if (error.response) {
      console.error('Error Response:', error.response.body);

      // Log each error in the errors array
      if (error.response.body.errors) {
        error.response.body.errors.forEach((error: any) => {
          console.error('Error Detail:', error);
        });
      }
    }
  }
};