import {
  ADMIN_PANEL_ORDERS,
  ADMIN_PANEL_ORDER_ITEMS,
  ADMIN_PANEL_PRODUCTS,
} from '../constants/databaseTableNames';

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';

import { formatISODate } from '@/lib/db/profile/utils/date';
import { formatMoney } from '@/lib/db/profile/utils/money';
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
}[];

async function fetchUserOrders(
  ordersQuantity: number
): Promise<TUserOrders[] | null> {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
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

    return data;
  } catch (err) {
    console.error('Unexpected error fetching User Orders:', err);
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
): Promise<TUserOrders[]> {
  // fetch recent user orders
  const orders = await fetchUserOrders(ordersQuantity);
  if (!orders) return;

  const orderIds = orders.map((order) => order.id);

  const orderItems = await fetchOrderItems(orderIds);
  if (!orderItems) return;

  const productIds = orderItems.map((item) => item.product_id);

  const products = await fetchOrderItemProducts(productIds);
  if (!products) return;

  // Combine the data as needed
  const userOrdersWithItemsAndProducts = orders.map((order) => {
    const items = orderItems
      .filter((item) => item.order_id === order.id)
      .map((item) => {
        const product = products.find(
          (product) => product.id === item.product_id
        );
        return {
          id: item.id,
          order_id: item.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: formatMoney(item.price) || item.price,
          product: product,
        };
      });

    return {
      id: order.id,
      total_amount: formatMoney(order.total_amount) || order.total_amount,
      payment_date: formatISODate(order.payment_date) || order.payment_date,
      items: items,
    };
  });

  return userOrdersWithItemsAndProducts;
}
