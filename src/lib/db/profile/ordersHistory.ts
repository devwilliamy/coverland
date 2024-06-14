import {  ADMIN_PANEL_ORDERS, ADMIN_PANEL_ORDER_ITEMS, ADMIN_PANEL_PRODUCTS } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
// import { get } from 'http';

import { formatISODate } from '@/lib/db/profile/utils/date';
import { formatMoney } from '@/lib/db/profile/utils/money';
import { getOrderSubtotal, getOrderItemDiscount, getProductDiscount, getOrderTotalDiscount } from '@/lib/db/profile/utils/orderSummary';

import { TInitialProductDataDB } from '..';
import { Tables } from '../types';

// these types model the entire database tables, in case other columns will be used inside User Profile > Orders in the future
export type TInitialOrdersDataDB = Tables<'_Orders'>;
export type TInitialOrderItemsDataDB = Tables<'orderItems_table'>;

// These custom types are utilized on the actual Profile > Order page and only contain columns that are necessary
export type TOrderItemProduct = {
    id: number;
    name: string;
    price: number;
};

export type TOrderItem = {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    product?: TInitialProductDataDB; // Optional because it will be added after fetching
};

export type TUserOrders = {
    id: number;
    payment_date: string;
    total_amount: number;
    items?: TInitialOrderItemsDataDB[]; // Optional because it will be added after fetching
};

async function fetchUserOrders(ordersQuantity: number): Promise<TInitialOrdersDataDB[] | null> {
    const cookieStore: ReadonlyRequestCookies = cookies();
    const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.error('No user is logged in');
        return null;
    }

    // console.log('Logged in user:', user);
    // user object has unique UUID ('user_id') in supabase
    const userId = user.id;

    const { data, error } = await supabase
        .from<Order>(ADMIN_PANEL_ORDERS)
        // if you want to grab orderItems by order ids only
        // .select('id')
        // this returns a inner join between orders and auth.users
        // .select('*, users(*)')
        .select('*')
        // filter by logged in user_id (currently does not exist in Users table, need to add it?)
        // .eq('user_id', userId)
        .eq('customer_email', user?.email)
        .eq('status', 'COMPLETE')
        .order('payment_date', { ascending: false }) // Order by latest date in descending order
        .limit(ordersQuantity);

    if (error) {
        console.error('Error fetching order IDs:', error);
        return null;
    }

    // return data.map(order => order.id);
    return data
}

async function fetchOrderItems(orderIds: number[]): Promise<TOrderItem[] | null> {
    const cookieStore: ReadonlyRequestCookies = cookies();
    const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
    const { data, error } = await supabase
        .from<OrderItem>(ADMIN_PANEL_ORDER_ITEMS)
        .select('*')
        .in('order_id', orderIds);

    if (error) {
        console.error('Error fetching order items:', error);
        return null;
    }

    return data;
}

async function fetchOrderItemProducts(productIds: number[]): Promise<TOrderItemProduct[] | null> {
    const cookieStore: ReadonlyRequestCookies = cookies();
    const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
    const { data, error } = await supabase
        .from<Product>(ADMIN_PANEL_PRODUCTS)
        .select('*')
        .in('id', productIds);

    if (error) {
        console.error('Error fetching products:', error);
        return null;
    }

    return data;
}

export async function fetchUserRecentOrders(ordersQuantity: number): Promise<TUserOrders[]> {
    // fetch recent user orders
    const orders = await fetchUserOrders(ordersQuantity);
    if (!orders) return;

    const orderIds = orders.map(order => order.id);
    // console.log('Fetched order IDs:', orderIds);

    const orderItems = await fetchOrderItems(orderIds);
    if (!orderItems) return;

    const productIds = orderItems.map(item => item.product_id);
    // console.log('Fetched product IDs:', productIds);

    const products = await fetchOrderItemProducts(productIds);
    if (!products) return;

    // Combine the data as needed
    const userOrdersWithItemsAndProducts = orders.map(order => {
        const items = orderItems.filter(item => item.order_id === order.id).map(item => {
            const product = products.find(product => product.id === item.product_id);
    
            if (!product) {
                // Handle case where product is not found
                console.error(`Product not found for item id ${item.id}`);
                return null;
            }
    
            const productWithDiscount = {
                ...product,
                discount: getProductDiscount(product),  // Calculate product discount first
            };
    
            return {
                id: item.id,
                order_id: item.order_id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: formatMoney(item.price) || item.price,
                product: productWithDiscount,
                item_discount: getOrderItemDiscount({
                    ...item,
                    product: productWithDiscount,  // Pass the product with discount to the item discount function
                }),
            };
        }).filter(item => item !== null); // Remove null items if any
    
        const orderWithItems = {
            ...order,
            total_amount: formatMoney(order.total_amount) || order.total_amount,
            payment_date: formatISODate(order.payment_date) || order.payment_date,
            items: items,
        };
    
        return {
            ...orderWithItems,
            subtotal: getOrderSubtotal(orderWithItems),  // Calculate subtotal last based on the constructed orderWithItems
            total_discount: getOrderTotalDiscount(orderWithItems), // Same with total discount
        };
    });

    console.log('Orders with their items and products:', userOrdersWithItemsAndProducts);

    // userOrdersWithItemsAndProducts.forEach(order => {
    //     console.log('order items', order.items)
    //     order.items.forEach(item => { 
    //         console.log('product item', item) 
    //     })     
    // })

    return userOrdersWithItemsAndProducts;
}

// fetchOrdersWithItemsAndProducts();

/* 
  The purpose of this file is to fetch a list of user orders, with their items and related product

  It outputs an Orders Array of order objects with the following basic structure:

  Orders: Array<{
      id: 1245,
      order_date: Jan 1st 2024,
      items: [
        {
            id: 4124215,
            quantity: 1,
            product: {
            id: number,
            price: number,
            // more product properties
            },
            // more item properties
        },
        // more items
      ],
      // more order properties
  }

  Basically each order object contains a list of items with each item mapping to one product


  Examples:
  {
    id: 1564,
    order_id: 'CL-TEST-240612-SE-0098',
    order_date: '2024-06-12T18:18:59+00:00',
    total_amount: '$999.75',
    status: 'COMPLETE',
    transaction_id: 'pi_3PQvl9DnAldfe1lt3NVsviVL',
    payment_status: 'succeeded',
    payment_method: 'card',
    card_amount: 999.75,
    card_brand: 'visa',
    card_fingerprint: 'TQvfz2g4Iq6DtrG1',
    card_funding: 'credit',
    customer_id: 1284,
    payment_date: '06/12/2024',
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
    created_at: '2024-06-12T18:18:59.847307+00:00',
    updated_at: '2024-06-12T18:45:38.703+00:00',
    payment_method_id: 'pm_1PQvleDnAldfe1ltjRJw99ZS',
    skus: 'CL-SC-10-F-10-BE-1TO-20031,CL-SC-10-F-10-GR-1TO-10275',
    currency: 'usd',
    payment_gateway: 'stripe',
    payment_gateway_customer_id: null,
    wallet_type: null,
    billing_customer_name: 'John Lee',
    created_at_pst: '2024-06-12T11:18:59.847307+00:00',
    items: [ [Object], [Object] ], // ** These are the order items **
    subtotal: 2000,
    total_discount: 1000.25
  }



example of order items:

order items [
  {
    id: 975,
    order_id: 1599,
    product_id: 20144,
    quantity: 4,
    price: '$799.80',
    product: {
      id: 20144,
      sku: 'CL-SC-10-F-10-BE-1TO-20031',
      type: 'Seat Covers',
      make: 'BMW',
      model: 'X3',
      year_generation: '2011-2024',
      parent_generation: '2011-2024',
      submodel1: null,
      submodel2: null,
      submodel3: null,
      feature: 'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-be-1to.webp',
      product: 'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-be-1to.webp',
      display_color: 'Beige',
      msrp: 199.95,
      price: 400,
      quantity: '110',
      display_id: 'Leather',
      make_slug: 'bmw',
      model_slug: 'x3',
      year_options: '2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024',
      banner: null,
      product_video_carousel: null,
      product_video_carousel_thumbnail: null,
      product_video_zoom: null,
      product_video_360: null,
      display_set: 'Front Seats',
      discount: 200.05
    },
    item_discount: 800.2
  },
  {
    id: 976,
    order_id: 1599,
    product_id: 21254,
    quantity: 1,
    price: '$199.95',
    product: {
      id: 21254,
      sku: 'CL-SC-10-F-10-GR-1TO-10275',
      type: 'Seat Covers',
      make: 'BMW',
      model: 'i4',
      year_generation: '2022-2024',
      parent_generation: '2022-2024',
      submodel1: null,
      submodel2: null,
      submodel3: null,
      feature: 'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp',
      product: 'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-gr-1to.webp',
      display_color: 'Gray',
      msrp: 199.95,
      price: 400,
      quantity: '59',
      display_id: 'Leather',
      make_slug: 'bmw',
      model_slug: 'i4',
      year_options: '2022,2023,2024',
      banner: null,
      product_video_carousel: null,
      product_video_carousel_thumbnail: null,
      product_video_zoom: null,
      product_video_360: null,
      display_set: 'Front Seats',
      discount: 200.05
    },
    item_discount: 200.05
  }
]



*/