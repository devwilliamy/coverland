import {
  TUserOrder,
  fetchUserRecentOrders,
} from '@/lib/db/profile/ordersHistory';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';

import OrderList from './components/OrderList';

const OrdersPage = async () => {
  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  let orders: TUserOrder[] = [];

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login');
    }
  } catch (error) {
    console.error('Error getting user:', error);
    redirect('/login'); // Redirect to login page in case of error
  }

  try {
    const fetchedOrders = await fetchUserRecentOrders(4);
    if (!fetchedOrders) {
      console.error('fetchUserRecentOrders failed to find the orders');
      return; // Ensure function exits early if orders were not found
    }
    orders = fetchedOrders;
  } catch (error) {
    console.error('Error fetching recent orders:', error);
  }

  return <OrderList orders={orders} />;
};

export default OrdersPage;
