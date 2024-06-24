import {
  ADMIN_PANEL_ORDERS,
  ADMIN_PANEL_ORDER_ITEMS,
  ADMIN_PANEL_PRODUCTS,
} from '../constants/databaseTableNames';

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';

import { formatISODate } from '@/lib/utils/date';
import { formatMoney } from '@/lib/db/profile/utils/money';
import { formatMoneyAsNumber } from '@/lib/utils/money';
import {
  getProductDiscount,
} from '@/lib/db/profile/utils/orderSummary';

import { TInitialProductDataDB } from '..';
import { Tables } from '../types';

// these types come directly from supabase models
export type TInitialOrdersDataDB = Tables<'_Orders'>;
export type TInitialOrderItemsDataDB = Tables<'orderItems_table'>;

export type TUserOrder = TInitialOrdersDataDB & {
  items: TOrderItem[];
};

export type TOrderItem = TInitialOrderItemsDataDB & {
  product: TOrderItemProduct;
};

export type TOrderItemProduct = TInitialProductDataDB & {
  discount: number | string; // there is no discount property in the supabase model for Products
};

async function fetchUserOrders(
  ordersQuantity: number
): Promise<TUserOrder[] | null> {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error('No user is logged in');
      return null;
    }

    // user object has unique UUID ('user_id') in supabase
    const userId = user.id;

    try {
      const { data, error } = await supabase
        .from<Order>(ADMIN_PANEL_ORDERS)
        // if you want to grab orderItems by order ids only
        // .select('id')
        // this returns an inner join between orders and auth.users
        // .select('*, users(*)')
        .select('*')
        // filter by logged-in user_id (currently does not exist in Users table, need to add it?)
        // .eq('user_id', userId)
        .eq('customer_email', user?.email)
        .in('status', ['COMPLETE', 'COMPLETED'])
        .order('payment_date', { ascending: false }) // Order by latest date in descending order
        .limit(ordersQuantity);

      if (error) {
        console.error('Error fetching User Orders from supabase:', error);
        return null;
      }

      return data || [];
    } catch (err) {
      console.error('Unexpected error fetching User Orders:', err);
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

async function fetchOrderItems(
  orderIds: number[]
): Promise<TOrderItem[] | null> {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from<OrderItem>(ADMIN_PANEL_ORDER_ITEMS)
      .select('*')
      .in('order_id', orderIds);

    if (error) {
      console.error('Error fetching order items from supabase:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching order items:', err);
    return null;
  }
}

async function fetchOrderItemProducts(
  productIds: number[]
): Promise<TOrderItemProduct[] | null> {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from<Product>(ADMIN_PANEL_PRODUCTS)
      .select('*')
      .in('id', productIds);

    if (error) {
      console.error('Error fetching products from supabase:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error fetching products:', err);
    return null;
  }
}

export async function fetchUserRecentOrders(
  ordersQuantity: number
): Promise<TUserOrder[] | null> {
  // fetch recent user orders
  try {
    const orders = await fetchUserOrders(ordersQuantity);
    if (!orders) return null;

    const orderIds = orders.map((order) => order.id);

    try {
      const orderItems = await fetchOrderItems(orderIds);
      if (!orderItems) return null;

      const productIds = orderItems.map((item) => item.product_id);

      try {
        const products = await fetchOrderItemProducts(productIds);
        if (!products) return null;

        // Create a final userOrders object that contains all desired data (items, products, discounts, subtotal, etc.)
        const userOrders = orders.map((order) => {
          // Filter items that belong to the current order and map them to include product information
          const items = orderItems
            .filter((item) => item.order_id === order.id)
            .map((item) => {
              const product = products.find(
                (product) => product.id === item.product_id
              );

              if (!product) {
                // Handle case where product is not found
                console.error(`Product not found for item id ${item.id}`);
                return null;
              }

              const productWithDiscount: TOrderItemProduct = {
                ...product,
                discount: getProductDiscount(product), // Calculate and add a product discount property
              };

              return {
                ...item,
                price: formatMoneyAsNumber(item.price) || item.price,
                product: productWithDiscount,
              };
            })
            .filter((item) => item !== null); // Remove null items if any

          // Calculate and format additional expected order properties (total amount, payment date, etc.)
          const orderWithItemsAndProducts = {
            ...order,
            total_amount:
              formatMoneyAsNumber(order.total_amount) || order.total_amount,
            payment_date:
              formatISODate(order.payment_date) || order.payment_date,
            items,
            total_original_amount:
              formatMoneyAsNumber(order.total_original_amount) ||
              order.total_original_amount,
            total_discount_amount:
              formatMoneyAsNumber(order.total_discount_amount) ||
              order.total_discount_amount,
          };

          return orderWithItemsAndProducts;
        });

        console.log(userOrders);

        return userOrders;
      } catch (err) {
        console.error('Unexpected error fetching products:', err);
        return null;
      }
    } catch (err) {
      console.error('Unexpected error fetching order items:', err);
      return null;
    }
  } catch (err) {
    console.error('Unexpected error fetching user orders:', err);
    return null;
  }
}

/* 
The purpose of this file is to fetch a list of user orders, with their items and related products

fetchUserOrders() returns an array of user orders, with all order items and their associated products

It outputs an array of orders with the following basic structure:

  userOrders = [
    {
      id: 1245,
      order_date: Jan 1st 2024,
      ...
      items: [
        {
            id: 4124215,
            quantity: 1,
            ...
            product: {
            id: number,
            price: number,
            discount: number,
            ...
            },
        },
        ... more items
      ],
    },
    ... more orders
  ]


  Example of userOrders:
  [
    {
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
      customer_name: 'John Lee',
      customer_email: 'john.l.coverland@gmail.com',
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
      billing_customer_name: 'John Lee',
      created_at_pst: '2024-06-19T15:40:00.604703+00:00',
      shipping_previous_status: null,
      shipping_status: null,
      shipping_status_last_updated_pst: null,
      shipping_service: null,
      shipping_status_last_updated: null,
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
        },
        {
          id: 2405,
          order_id: 2332,
          created_at: '2024-06-19T22:40:01.615391+00:00',
          product_id: 32794,
          quantity: 2,
          price: '559.90',
          original_price: 1120,
          discount_amount: 560.1,
          product: {
            id: 32794,
            sku: 'CL-SC-10-F-10-B-32-GR-1TO-20005',
            parent_generation: '2017-2024',
            year_generation: '2017-2024',
            make: 'Alfa Romeo',
            model: 'Stelvio',
            submodel1: null,
            submodel2: null,
            submodel3: null,
            feature: 
              'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp',
            product: 
              'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-gr-1to.webp',
            product_video_carousel_thumbnail: null,
            product_video_carousel: null,
            product_video_zoom: null,
            product_video_360: null,
            banner: null,
            type: 'Seat Covers',
            year_options: '2017,2018,2019,2020,2021,2022,2023,2024',
            make_slug: 'alfa-romeo',
            model_slug: 'stelvio',
            msrp: 279.95,
            price: 560,
            quantity: '0',
            display_color: 'Gray',
            display_id: 'Leather',
            display_set: 'Full Seat Set',
            'skulabs SKU': 'CA-SC-10-F-10-B-32-GR-1TO',
            discount: '280.05'
          }
        },
        {
          id: 2406,
          order_id: 2332,
          created_at: '2024-06-19T22:40:01.615391+00:00',
          product_id: 23287,
          quantity: 8,
          price: '1599.60',
          original_price: 3200,
          discount_amount: 1600.4,
          product: {
            id: 23287,
            sku: 'CL-SC-10-F-10-GR-1TO-20005',
            parent_generation: '2017-2024',
            year_generation: '2017-2024',
            make: 'Alfa Romeo',
            model: 'Stelvio',
            submodel1: null,
            submodel2: null,
            submodel3: null,
            feature: 
              'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp',
            product: 
              'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-gr-1to.webp',
            product_video_carousel_thumbnail: null,
            product_video_carousel: null,
            product_video_zoom: null,
            product_video_360: null,
            banner: null,
            type: 'Seat Covers',
            year_options: '2017,2018,2019,2020,2021,2022,2023,2024',
            make_slug: 'alfa-romeo',
            model_slug: 'stelvio',
            msrp: 199.95,
            price: 400,
            quantity: '21',
            display_color: 'Gray',
            display_id: 'Leather',
            display_set: 'Front Seats',
            'skulabs SKU': 'CA-SC-10-F-10-GR-1TO',
            discount: '200.05'
          }
        }
      ]
    },
    ... more orders
  ]


*/
