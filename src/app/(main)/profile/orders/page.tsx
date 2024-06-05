import { getAllCompleteOrders } from '@/lib/db/profile/ordersHistory';

import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';

export default async function Orders() {
  const orders = await getAllCompleteOrders();

  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.order_id}</li>
        ))}
      </ul>
    </div>
  );
}
