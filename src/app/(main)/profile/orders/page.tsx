import {
  TUserOrders,
  TOrderItem,
  TOrderItemProduct,
  TInitialOrderItemsDataDB,
  TInitialOrdersDataDB,
  TInitialProductDataDB,
  fetchUserRecentOrders,
} from '@/lib/db/profile/ordersHistory';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';


import OrderList from './components/OrderList';
// import { TInitialOrdersDataDB } from '@/types';

const OrdersPage = async () => {
  const orders: TInitialOrdersDataDB[] = await fetchUserRecentOrders(4);

  return <OrderList orders={orders} />;
};

export default OrdersPage;
