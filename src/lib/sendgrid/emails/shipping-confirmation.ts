import sgMail, { MailDataRequired } from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
const sgFromEmail = process.env.SENDGRID_FROM_EMAIL;
const sgShippingConfirmationTemplateId = process.env.SENDGRID_SHIPPING_CONFIRMATION_EMAIL_TEMPLATE_ID;
import { formatMoneyAsNumber } from '@/lib/utils/money';
// import fetchUserOrderById
// import { TUserOrder, TOrderItem, TOrderItemProduct, fetchUserOrderById } from '@/lib/db/profile/ordersHistory';
import { SHIPPING_METHOD } from '@/lib/constants';
import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';
import { generateTrackingUrl } from '@/lib/utils/generateTrackingUrl';


const shippingConstants = {
    shipping_method: SHIPPING_METHOD,
    shipping_date: determineDeliveryByDate('EEE, LLL dd'), //this needs to be grabbed from somewhere or pass in a starting date
    delivery_fee: shipping || 0,
  };

type DynamicTemplateData = {
    main_data: MainShippingData;
    order_detail_page: string // url to order detail page (order.id)
    order_items: OrderItem[];
    shipping_info: ShippingInfo;
  };

  type MainShippingEmailData = {
    id: string;
    ordered_on: string;
    shipped_on: string; //check for order.shipping_status == "shipped" and order.previous_status == "unstarted"
    expected_delivery_on: string;
    tracking_number: string;
    tracking_url: string;
    customer_name: string;
    order_detail_page: string // url to order detail page (order.id)
  }

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

  
const testOrder = {
    id: 2332,
    order_id: 'CL-TEST-240619-MX-0093',
    order_date: '2024-06-19T22:39:59+00:00',
    total_amount: '2479.40',
    status: 'COMPLETE',
    transaction_id: 'pi_3PTXAZDnAldfe1lt4YzgZD8Z',
    payment_status: 'succeeded',
    payment_method: 'card',
    card_amount: 2479.4,
    card_brand: 'visa',
    card_fingerprint: 'TQvfz2g4Iq6DtrG1',
    card_funding: 'credit',
    customer_id: 1284,
    payment_date: '06/19/2024',
    customer_name: 'John Doe',
    customer_email: 'john.doe.coverland@gmail.com',
    customer_phone: null,
    shipping_address_line_1: '4242 Main Street',
    shipping_address_line_2: 'PO Box 424',
    shipping_address_city: 'Norwalk',
    shipping_address_state: 'CA',
    shipping_address_postal_code: '42424',
    shipping_address_country: 'US',
    shipping_carrier: null,
    shipping_tracking_number: null,
    billing_address_line_1: '4242 Main Street',
    billing_address_line_2: 'PO Box 424',
    billing_address_city: 'Norwalk',
    billing_address_state: 'CA',
    billing_address_postal_code: '42424',
    billing_address_country: 'US',
    notes: null,
    created_at: '2024-06-19T22:40:00.604703+00:00',
    updated_at: '2024-06-19T22:44:55.667+00:00',
    payment_method_id: 'pm_1PTXFDDnAldfe1ltpgV6tZSB',
    skus: 
      'CL-CC-CP-15-H-BKGR-STR-PP-100118,CL-SC-10-F-10-B-32-GR-1TO-20005,CL-SC-10-F-10-GR-1TO-20005',
    currency: 'usd',
    payment_gateway: 'stripe',
    payment_gateway_customer_id: null,
    wallet_type: null,
    billing_customer_name: 'John Doe',
    created_at_pst: '2024-06-19T15:40:00.604703+00:00',
    shipping_previous_status: "unstarted",
    shipping_status: "shipped",
    shipping_status_last_updated_pst: "2024-06-21 13:29:32.845",
    shipping_service: "Ground",
    shipping_status_last_updated: "2024-06-21 20:29:32.845+00",
    total_original_amount: 4960,
    total_discount_amount: '2480.60',
    items: [
      {
        id: 2404,
        order_id: 2332,
        created_at: '2024-06-19T22:40:01.615391+00:00',
        product_id: 2403,
        quantity: 2,
        price: '359.90',
        original_price: 720,
        discount_amount: 360.1,
        // associated order item product object here: //
        product: {
          id: 2403,
          sku: 'CL-CC-CP-15-H-BKGR-STR-PP-100118',
          parent_generation: '2005-2024',
          year_generation: '2005-2024',
          make: 'Aston Martin',
          model: 'Vantage',
          submodel1: null,
          submodel2: null,
          submodel3: null,
          feature: 'http://www.coverland.com/custom-cover/01-bkgr-str-m.webp',
          product: 
            'http://www.coverland.com/custom-cover/01-bkgr-str-m.webp,http://www.coverland.com/pms/02-bkgr-str-m.webp,http://www.coverland.com/pms/03-bkgr-str-m.webp,http://www.coverland.com/pms/04-bkgr-str-m.webp,http://www.coverland.com/pms/05-bkgr-str-m.webp,http://www.coverland.com/pms/06-bkgr-str-m.webp,http://www.coverland.com/pms/07-bkgr-str-m.webp,http://www.coverland.com/pms/08-bkgr-str-m.webp,http://www.coverland.com/pms/09-bkgr-str-m.webp,http://www.coverland.com/pms/10-bkgr-str-m.webp,http://www.coverland.com/pms/11-bkgr-str-m.webp,http://www.coverland.com/pms/12-bkgr-str-m.webp',
          product_video_carousel_thumbnail: 
            'http://coverland.com/video/thumbnails/Challenger_Thumbnail.webp',
          product_video_carousel: 
            'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20360%20Square_Small-40XPIrsyzagRPC7jg5IsiK3vIav0SN.mp4',
          product_video_zoom: 
            'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20Zoom%20Video_Small-a6PwN5MRo4nAHSsKZ5EzlQqwCtkfa3.mp4',
          product_video_360: 
            'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20360%20Video_Small-ZuVCNYnGLFHCWL0kGSLH134B4pSasz.mp4',
          banner: 
            'https://coverland.sfo3.cdn.digitaloceanspaces.com/pdpbanner/pdpbanner-aston-martin-vantage-2005-2024-100118.webp',
          type: 'Car Covers',
          year_options: 
            '2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024',
          make_slug: 'aston-martin',
          model_slug: 'vantage',
          msrp: 179.95,
          price: 360,
          quantity: '25',
          display_color: 'Black Gray Stripe',
          display_id: 'Premium Plus',
          display_set: null,
          'skulabs SKU': 'CC-CP-15-H-BKGR-STR',
          discount: '180.05'
        }
      }
    ]
  };

const generateDynamicTemplateDataFromUserOrder = (order: TUserOrder): DynamicTemplateData => {
    const main_data = order.map(({
        order_id,
        payment_date,
        updated_at,
        shipping_carrier,
        shipping_status,
        shipping_previous_status,
        shipping_status_last_updated,
        customer_name,
        shipping_tracking_number,
      }) => ({
        id: order_id,
        ordered_on: payment_date,
        shipped_on: shipping_status_last_updated,
        shipping_status,
        // expected_delivery_on: myDeliveryFunction(payment_date), // need to add a function to convert order date into estimated delivery date
        tracking_number: shipping_tracking_number,
        tracking_url: generateTrackingUrl(shipping_tracking_number, shipping_carrier),
        customer_name,
        // order_detail_page: `/order/${id}` // Example URL to order detail page
      }));

    const shipping_info = order.map(({
        customer_name, 
        shipping_address_line_1,
        shipping_address_line_2, 
        shipping_address_city,
        shipping_address_state,
        shipping_address_country,
        shipping_address_postal_code,
    }) => ({
        full_name: customer_name,
        address_line1: shipping_address_line_1,
        address_line2: shipping_address_line_2,
        city: shipping_address_city,
        state: shipping_address_state,
        country: shipping_address_country,
        postal_code: shipping_address_postal_code,
    }));

    const combinedShippingInfo: ShippingInfo = shipping_info.map(info => ({
        ...info,
        ...shippingConstants,
      }));

    const order_items = items.map(({
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

    return {
        main_data,
        order_items,
        shipping_info: combinedShippingInfo,
    }
}

const test_dynamic_template_data = generateDynamicTemplateDataFromUserOrder(testOrder)

const testData = {
    to: testOrder.customer_email,
    test_dynamic_template_data
}

const generateSendGridApiPayload(data): MailDataRequired => {
    {
        from: { email: sgFromEmail },
        template_id: sgShippingConfirmationTemplateId,   
        personalizations: [
            to: [{email: data.to}], // data.to
            dynamic_template_data: data.dynamic_template_data,
        ]
    },
}

export const sendShippingConfirmationEmailToSendGrid = async (data: MailDataRequired) => {
    try{
        await sgMail.send(data);
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
}