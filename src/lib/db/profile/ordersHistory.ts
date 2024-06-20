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
  getOrderSubtotal,
  getOrderItemDiscount,
  getProductDiscount,
  getOrderTotalDiscount,
} from '@/lib/db/profile/utils/orderSummary';

import { TInitialProductDataDB } from '..';
import { Tables } from '../types';

// these types come directly from supabase models
export type TInitialOrdersDataDB = Tables<'_Orders'>;
export type TInitialOrderItemsDataDB = Tables<'orderItems_table'>;

export type TUserOrder = TInitialOrdersDataDB & {
  items: TOrderItem[];
  subtotal: number | string;
  total_discount: number | string;
};

export type TOrderItem = TInitialOrderItemsDataDB & {
  product: TOrderItemProduct;
  item_discount: number | string;
};

export type TOrderItemProduct = TInitialProductDataDB & {
  discount: number | string;
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
          // Filter items that belong to the current order and map them to include product information and discounts
          const items: TOrderItem[] = orderItems
            .filter((item) => item.order_id === order.id)
            .map((item) => {
              const {
                id: itemId,
                order_id,
                product_id,
                quantity,
                price,
              } = item;

              const product = products.find(
                (product) => product.id === product_id
              );

              if (!product) {
                // Handle case where product is not found
                console.error(`Product not found for item id ${itemId}`);
                return null;
              }

              const productWithDiscount: TOrderItemProduct = {
                ...product,
                discount: getProductDiscount(product), // Calculate and add a product discount property
              };

              return {
                id: itemId,
                order_id,
                product_id,
                quantity,
                price: formatMoneyAsNumber(price) || price,
                product: productWithDiscount,
                // Add an item discount property that's based on item quantity * product discount
                item_discount: getOrderItemDiscount({
                  ...item,
                  product: productWithDiscount, // Pass productWithDiscount instead of product
                }),
              };
            })
            .filter((item) => item !== null); // Remove null items if any

          // Calculate and format additional expected order properties (total amount, payment date, subtotal, total discount)
          const orderWithItemsProductsAndDiscounts = {
            ...order,
            total_amount:
              formatMoneyAsNumber(order.total_amount) || order.total_amount,
            payment_date:
              formatISODate(order.payment_date) || order.payment_date,
            items,
            subtotal: formatMoneyAsNumber(
              getOrderSubtotal({ ...order, items })
            ),
            total_discount: formatMoneyAsNumber(
              getOrderTotalDiscount({ ...order, items })
            ),
            total_original_amount: formatMoneyAsNumber(order.total_original_amount) || order.total_original_amount,
            total_discount_amount: formatMoneyAsNumber(order.total_discount_amount) || order.total_discount_amount,
          };

          return orderWithItemsProductsAndDiscounts;
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

Basically each order object contains a list of order items with each item mapping to one product

It outputs an array of orders with the following basic structure:

  Orders = [
    {
      id: 1245,
      order_date: Jan 1st 2024,
      items: [
        {
            id: 4124215,
            quantity: 1,
            product: {
            id: number,
            price: number,
            // .. more product properties
            },
            // .. more item properties
        },
        // .. more items
      ],
      // .. more order properties
    },
    // .. more orders
  ]


  Example of userOrders:
 [
    {
      id: 1972,
      order_id: 'CL-TEST-240614-MX-0040',
      order_date: '2024-06-14T20:27:03+00:00',
      total_amount: '639.85',
      status: 'COMPLETE',
      transaction_id: 'pi_3PRgiBDnAldfe1lt2B1Deono',
      payment_status: 'succeeded',
      payment_method: 'card',
      card_amount: 639.85,
      card_brand: 'visa',
      card_fingerprint: 'TQvfz2g4Iq6DtrG1',
      card_funding: 'credit',
      customer_id: 1284,
      payment_date: '06/14/2024',
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
      created_at: '2024-06-14T20:27:03.971098+00:00',
      updated_at: '2024-06-14T20:27:23.257+00:00',
      payment_method_id: 'pm_1PRgiSDnAldfe1ltY3Acgj4G',
      skus: 
        'CL-CC-CP-15-J-BKRD-STR-PP-100111,CL-SC-10-F-10-B-22-BE-1TO-10193,CL-SC-10-F-10-GR-1TO-10193',
      currency: 'usd',
      payment_gateway: 'stripe',
      payment_gateway_customer_id: null,
      wallet_type: null,
      billing_customer_name: 'John Lee',
      created_at_pst: '2024-06-14T13:27:03.971098+00:00',
      shipping_previous_status: null,
      shipping_status: null,
      shipping_status_last_updated_pst: null,
      shipping_service: null,
      shipping_status_last_updated: null,
      items: [
        {
          id: 1547,
          order_id: 1972,
          product_id: 114,
          quantity: 1,
          price: '159.95',
          product: {
            id: 114,
            sku: 'CL-CC-CP-15-J-BKRD-STR-PP-100111',
            type: 'Car Covers',
            make: 'Aston Martin',
            model: 'DB12',
            year_generation: '2024-2025',
            parent_generation: '2024-2025',
            submodel1: null,
            submodel2: null,
            submodel3: null,
            feature: 'http://www.coverland.com/custom-cover/01-bkrd-str-m.webp',
            product: 
              'http://www.coverland.com/custom-cover/01-bkrd-str-m.webp,http://www.coverland.com/pms/02-bkrd-str-m.webp,http://www.coverland.com/pms/03-bkrd-str-m.webp,http://www.coverland.com/pms/04-bkrd-str-m.webp,http://www.coverland.com/pms/05-bkrd-str-m.webp,http://www.coverland.com/pms/06-bkrd-str-m.webp,http://www.coverland.com/pms/07-bkrd-str-m.webp,http://www.coverland.com/pms/08-bkrd-str-m.webp,http://www.coverland.com/pms/09-bkrd-str-m.webp,http://www.coverland.com/pms/10-bkrd-str-m.webp,http://www.coverland.com/pms/11-bkrd-str-m.webp,http://www.coverland.com/pms/12-bkrd-str-m.webp',
            display_color: 'Black Red Stripe',
            msrp: 159.95,
            price: 320,
            quantity: '34',
            display_id: 'Premium Plus',
            make_slug: 'aston-martin',
            model_slug: 'db12',
            year_options: '2024,2025',
            banner: 
              'https://coverland.sfo3.cdn.digitaloceanspaces.com/pdpbanner/pdpbanner-aston-martin-db12-2024-100111.webp',
            product_video_carousel: 
              'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20360%20Square_Small-40XPIrsyzagRPC7jg5IsiK3vIav0SN.mp4',
            product_video_carousel_thumbnail: 
              'http://coverland.com/video/thumbnails/Challenger_Thumbnail.webp',
            product_video_zoom: 
              'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20Zoom%20Video_Small-a6PwN5MRo4nAHSsKZ5EzlQqwCtkfa3.mp4',
            product_video_360: 
              'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/Challenger%20360%20Video_Small-ZuVCNYnGLFHCWL0kGSLH134B4pSasz.mp4',
            display_set: null,
            discount: '160.05'
          },
          item_discount: '160.05'
        },
        {
          id: 1548,
          order_id: 1972,
          product_id: 27510,
          quantity: 1,
          price: '279.95',
          product: {
            id: 27510,
            sku: 'CL-SC-10-F-10-B-22-BE-1TO-10193',
            type: 'Seat Covers',
            make: 'Bentley',
            model: 'Flying Spur',
            year_generation: '2014-2023',
            parent_generation: '2014-2023',
            submodel1: null,
            submodel2: null,
            submodel3: null,
            feature: 
              'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-be-1to.webp',
            product: 
              'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-be-1to.webp',
            display_color: 'Beige',
            msrp: 279.95,
            price: 560,
            quantity: '110',
            display_id: 'Leather',
            make_slug: 'bentley',
            model_slug: 'flying-spur',
            year_options: '2014,2015,2016,2017,2018,2019,2020,2021,2022,2023',
            banner: null,
            product_video_carousel: null,
            product_video_carousel_thumbnail: null,
            product_video_zoom: null,
            product_video_360: null,
            display_set: 'Full Seat Set',
            discount: '280.05'
          },
          item_discount: '280.05'
        },
        {
          id: 1549,
          order_id: 1972,
          product_id: 21172,
          quantity: 1,
          price: '199.95',
          product: {
            id: 21172,
            sku: 'CL-SC-10-F-10-GR-1TO-10193',
            type: 'Seat Covers',
            make: 'Bentley',
            model: 'Flying Spur',
            year_generation: '2014-2023',
            parent_generation: '2014-2023',
            submodel1: null,
            submodel2: null,
            submodel3: null,
            feature: 
              'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp',
            product: 
              'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-gr-1to.webp',
            display_color: 'Gray',
            msrp: 199.95,
            price: 400,
            quantity: '59',
            display_id: 'Leather',
            make_slug: 'bentley',
            model_slug: 'flying-spur',
            year_options: '2014,2015,2016,2017,2018,2019,2020,2021,2022,2023',
            banner: null,
            product_video_carousel: null,
            product_video_carousel_thumbnail: null,
            product_video_zoom: null,
            product_video_360: null,
            display_set: 'Front Seats',
            discount: '200.05'
          },
          item_discount: '200.05'
        }
      ],
      subtotal: 1280,
      total_discount: '640.15'
    },
    ...
  ]



*/
