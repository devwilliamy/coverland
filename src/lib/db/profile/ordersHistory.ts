// import { Tables } from '../types';
import {  ADMIN_PANEL_ORDERS, ADMIN_PANEL_ORDER_ITEMS, ADMIN_PANEL_PRODUCTS } from '../constants/databaseTableNames';
import { supabaseDatabaseClient } from '../supabaseClients';
// import { slugToCoverType } from '@/lib/constants';
// import { slugify } from '@/lib/utils';

// export type TSeatCoverDataDB = Tables<'seat_covers'>;

// URL: supabase.com/dashboard/project/<project_id>/api?pages=tables-intro
//If the table you want to access isn't listed in TableRow,
//generate new types in the Supabase dashboard to update
//them and replace the types.ts file in this folder

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
import { get } from 'http';

const cookieStore: ReadonlyRequestCookies = cookies();
const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);

async function fetchOrders(): Promise<number[] | null> {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from<Order>(ADMIN_PANEL_ORDERS)
        // .select('id')
        .select('*')
        .eq('customer_email', user?.email)
        .eq('status', 'COMPLETE');

    if (error) {
        console.error('Error fetching order IDs:', error);
        return null;
    }

    // return data.map(order => order.id);
    return data
}

async function fetchOrderItems(orderIds: number[]): Promise<OrderItem[] | null> {
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

async function fetchProducts(productIds: number[]): Promise<Product[] | null> {
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

export async function fetchOrdersWithItemsAndProducts() {
    const orders = await fetchOrders();
    if (!orders) return;

    const orderIds = orders.map(order => order.id);
    console.log('Fetched order IDs:', orderIds);

    const orderItems = await fetchOrderItems(orderIds);
    if (!orderItems) return;

    const productIds = orderItems.map(item => item.product_id);
    console.log('Fetched product IDs:', productIds);

    const products = await fetchProducts(productIds);
    if (!products) return;

    // Combine the data as needed
    const ordersWithItemsAndProducts = orders.map(order => {
        const items = orderItems.filter(item => item.order_id === order.id).map(item => {
            const product = products.find(product => product.id === item.product_id);
            return {
                id: item.id,
                order_id: item.order_id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                product: product
            };
        });

        return {
            id: order.id,
            total_amount: order.total_amount,
            created_at: order.created_at,
            items: items
        };
    });

    console.log('Orders with their items and products:', ordersWithItemsAndProducts);

    ordersWithItemsAndProducts.forEach(order => {
        console.log('order items', order.items)
        order.items.forEach(item => { 
            // console.log('product item', item) 
        })     
    })

    return ordersWithItemsAndProducts;
}

// fetchOrdersWithItemsAndProducts();