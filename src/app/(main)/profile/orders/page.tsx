import { fetchOrdersWithItemsAndProducts } from '@/lib/db/profile/ordersHistory';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/db/supabaseClients';
import Image from 'next/image';
import OrderItemCard from '@/components/profile/orders/OrderItemCard';

export default async function Orders() {
  const orders = await fetchOrdersWithItemsAndProducts();

  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <OrderItemCard/>
      <h1>Welcome, {user?.email}</h1>
      <h1 className='text-2xl font-bold'>My Orders</h1>
      <p className='text-gray-500'>View, Manage and track orders</p>
      <h2>Recent Orders</h2>
            {orders.map(order => (
                <div key={order.id}>
                    <h2>Order ID: {order.id}</h2>
                    <p>Total Amount: {order.total_amount}</p>
                    <p>Date: {order.created_at}</p>
                    <h3>Items:</h3>
                    <ul>
                        {order.items?.map(item => (
                            <li key={item.id}>
                                <p>Product Name: {`${item.product?.make} ${item.product?.model} ${item.product?.type}`}</p>
                                <Image
                                    src={item.product?.feature}
                                    width={200}
                                    height={200}
                                    alt="Picture of the Order Item"
                                />
                                {/* <p>Price: {item.product?.price}</p> */}
                                <p>Quantity: {item.quantity}</p>
                                <p>Price (Discounted): {item.product?.msrp}</p>
                                <p>Subtotal: {item.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
      {/* <div className='flex flex-col'>
        <h1 className="items-center text-lg text-center font-extrabold">Orders History</h1>
        <ul className="items-center text-center">
            {orders.map((order) => (
            <ul
                className='mb-2'
                key={order.id}
                >
                <li className="font-bold">{order.order_id}</li>
                <li>{`${order.payment_method} ${order.card_brand}`}</li>
                <li>{`$${order.total_amount}`}</li>
                <li>{`${order.order_date}`}</li>
            </ul>
            ))}
        </ul>
      </div> */}
    </div>
  );
}
