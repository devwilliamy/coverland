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
  city: string;
  state: string;
  postal_code: string;
  shipping_method: string;
  shipping_date: string;
};

type DynamicTemplateData = {
  first_name: string;
  order_date: string;
  order_number: string;
  order_items: OrderItem[];
  shipping_info: ShippingInfo;
  total_item_quantity: number;
  subtotal: number;
  delivery_fee: string;
  taxes: number;
  total: number;
  cv_four_digits: string;
  cv_exp_date: string;
};

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

const generateThankYouEmail = ({
  to,
  name,
  orderInfo,
  address,
  shippingInfo,
  billingInfo, 
}: MailDataRequired) => ({
  // to: 'dev.william.coverland@gmail.com', // Change to your recipient
  to, // Change to your recipient
  from: 'info@coverland.com', // Process ENV
  templateId: 'd-bd1f970dc40e436f8a25176e65c94e72', // Process ENV
  dynamicTemplateData: {
    // first_name: 'William',
    first_name: name.firstName,
    // order_date: 'April 20, 2024',
    order_date: orderInfo.orderDate,
    // order_number: 'CL-00002',
    order_number: orderInfo.orderNumber,
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
  }
};
