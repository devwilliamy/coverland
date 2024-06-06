// import { Tables } from '../types';
import {  ADMIN_PANEL_ORDERS, ADMIN_PANEL_ORDER_ITEMS } from '../constants/databaseTableNames';
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

export async function getAllCompleteOrders() {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabaseDatabaseClient
    .from(ADMIN_PANEL_ORDERS)
    .select('*')
    .eq('customer_email', user?.email)
    .eq('status', 'COMPLETE');

  if (error) {
    throw new Error(error.message);
  }

  console.log("orders", data[0]);
  return data;
}

export async function getOrderItemsByOrderId(id) {
    const { data, error } = await supabaseDatabaseClient
    .from(ADMIN_PANEL_ORDER_ITEMS)
    .select('*')
    .eq('order_id', id);

  if (error) {
    throw new Error(error.message);
  }

  console.log("order items", data);
}