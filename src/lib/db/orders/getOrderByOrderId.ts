import {
  ADMIN_PANEL_ORDERS,
  ADMIN_PANEL_ORDER_ITEMS,
  ADMIN_PANEL_PRODUCTS,
} from '../constants/databaseTableNames';

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createSupabaseServerClient, createSupabaseServerDatabaseClient } from '@/lib/db/supabaseClients';

import { formatISODate } from '@/lib/utils/date';
import { formatMoneyAsNumber } from '@/lib/utils/money';
import { getProductDiscount } from '@/lib/db/profile/utils/orderSummary';

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


async function fetchUserOrder(orderId: string): Promise<TUserOrder | null> {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);

    try {
      const { data, error } = await supabase
        .from<TUserOrder>(ADMIN_PANEL_ORDERS)
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) {
        console.error('Error fetching User Order from supabase:', error);
        return null;
      }

      return data || null;
    } catch (err) {
      console.error('Unexpected error fetching User Order:', err);
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

export async function fetchUserOrderById(
    orderId: string
  ): Promise<TUserOrder | null> {
    // fetch user order by id
    try {
      const order = await fetchUserOrder(orderId);
      if (!order) return null;
  
      try {
        const orderItems = await fetchOrderItems([order.id]);
        if (!orderItems) return null;
  
        const productIds = orderItems.map((item) => item.product_id);
  
        try {
          const products = await fetchOrderItemProducts(productIds);
          if (!products) return null;
  
          // Filter items that belong to the order and map them to include product information
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
  
          const orderWithItemsAndProducts = {
            ...order,
            total_amount:
              formatMoneyAsNumber(order.total_amount) || order.total_amount,
            payment_date: formatISODate(order.payment_date) || order.payment_date,
            items,
            total_original_amount:
              formatMoneyAsNumber(order.total_original_amount) ||
              order.total_original_amount,
            total_discount_amount:
              formatMoneyAsNumber(order.total_discount_amount) ||
              order.total_discount_amount,
          };
  
          return orderWithItemsAndProducts;
        } catch (err) {
          console.error('Unexpected error fetching products:', err);
          return null;
        }
      } catch (err) {
        console.error('Unexpected error fetching order items:', err);
        return null;
      }
    } catch (err) {
      console.error('Unexpected error fetching user order:', err);
      return null;
    }
  }
