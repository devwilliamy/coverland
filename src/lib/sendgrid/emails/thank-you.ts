import { TCartItem } from '@/lib/cart/useCart';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');


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
  taxes: number;
  total: number;
  cv_four_digits: string;
  cv_exp_date: string;
};

type ThankYouEmailInput = MailDataRequired & { dynamicTemplateData: DynamicTemplateData };

// // Example of using the types with the provided data
// const dyanmicTemplateData: DynamicTemplateData = {
//   first_name: "John",
//   order_date: "November 20, 2023",
//   order_number: "CL-00001",
//   order_items: [
//       {
//           name: "Premium Plus Custom Car Cover",
//           vehicle: "Ford Mustang 2019 Fastback",
//           color: "2-Tone Black & Gray",
//           quantity: 1,
//           price: 179.99,
//           img_url: "https://coverland.com/custom-cover/01-fomu12-bkrd-str-nm.webp"
//       },
//       {
//           name: "Premium Plus Custom Car Cover",
//           vehicle: "AMC Matador 2019 2-Door",
//           color: "2-Tone Black & Gray",
//           quantity: 1,
//           price: 179.99,
//           img_url: "https://cdn-icons-png.flaticon.com/512/1581/1581884.png"
//       }
//   ],
//   shipping_info: {
//       full_name: "John Newman",
//       address_line1: "2125 Chestnut Street",
//       city: "San Francisco",
//       state: "CA",
//       postal_code: "94123",
//       shipping_method: "Standard, free shipping",
//       shipping_date: "Wed, Nov 30"
//   },
//   total_item_quantity: 2,
//   subtotal: 550.00,
//   delivery_fee: "FREE",
//   taxes: 10.00,
//   total: 369.98,
//   cv_four_digits: "*4242",
//   cv_exp_date: "11/2026"
// };

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
  }) => ({
    name: fullProductName || `${display_id}\u2122 ${type}`,
    vehicle: `${make} ${model} ${year_generation} ${submodel1 || ''} ${submodel2 || ''} ${submodel3 || ''}`.trim(),
    color: display_color,
    quantity: quantity,
    price: msrp,
    img_url: mainImage || feature || product.split(',')[0],
  }));
};

const generateThankYouEmail = ({
  to,
  name,
  orderInfo,
  shippingInfo,
  billingInfo, 
}: ThankYouEmailInput) => ({
  // to: 'dev.william.coverland@gmail.com', // Change to your recipient
  to, // Change to your recipient
  from: 'info@coverland.com', // Process ENV
  // from: {email : process.env.FROM_EMAIL},
  // templateId: process.env.SENDGRID_THANK_YOU_EMAIL_TEMPLATE_ID || '', // need to add an error catch
  templateId: 'd-fe756cb7460345508833395151dc88bb', // Process ENV
  dynamicTemplateData: {
    // first_name: 'William',
    first_name: name.firstName,
    // order_date: 'April 20, 2024',
    order_date: orderInfo.orderDate,
    // order_number: 'CL-00002',
    order_number: orderInfo.orderNumber,
    shipping_info: {
      ...shippingInfo,
    },
    order_items: generateOrderItems(orderInfo.cartItems),
    // order_items: [
    //   {
    //     name: 'Premium Plus Custom Car Cover',
    //     vehicle: 'Ford Mustang 2019 Fastback',
    //     color: '2-Tone Black & Gray',
    //     quantity: 1,
    //     price: 179.99,
    //     img_url:
    //       'https://coverland.com/custom-cover/01-fomu12-bkrd-str-nm.webp',
    //   },
    //   {
    //     name: 'Premium Plus Custom Car Cover',
    //     vehicle: 'AMC Matador 2019 2-Door',
    //     color: '2-Tone Black & Gray',
    //     quantity: 1,
    //     price: 179.99,
    //     img_url: 'https://cdn-icons-png.flaticon.com/512/1581/1581884.png',
    //   },
    // ],
    // products: orderInfo.products,
    // full_name: 'William Yang',
    full_name: name.fullName,
    // address_line1: '2125 Chestnut Street',
    // address_line1: address.address_line1,
    // city: 'San Francisco',
    // state: 'CA',
    // postal_code: '94123',
    // shipping_method: 'Standard, free shipping',
    // shipping_date: 'Wed, Nov 30',
    // total_item_quantity: 2,
    // subtotal: 550.0,
    // delivery_fee: 'FREE',
    // taxes: 10.0,
    // total: 369.98,
    // cv_four_digits: '*4242',
    // cv_exp_date: '11/2026',
    total_item_quantity: orderInfo.totalItemQuantity,
    subtotal: orderInfo.subtotal,
    total_discount: orderInfo.totalDiscount,
    // taxes: orderInfo.taxes;
    total: orderInfo.total,
  },
});

export const sendThankYouEmail = async (emailInput: MailDataRequired) => {
  const msg = generateThankYouEmail(emailInput);
  try {
    await sgMail.send(msg);
    // console.log('Email sent', data);
    // return data;
  } catch (error) {
    console.error(error);

    // Check if err.response exists to get more details
    if (error.response) {
      console.log('Error Response:', error.response.body);

      // Log each error in the errors array
      if (error.response.body.errors) {
        error.response.body.errors.forEach((error: any) => {
          console.log('Error Detail:', error);
        });
      }
    }
  }
};
