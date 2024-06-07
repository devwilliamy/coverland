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
import Image from 'next/image';
import OrderItemCard from '@/components/profile/orders/OrderItemCard';

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default async function Orders() {
  const orders: TInitialOrdersDataDB[] = await fetchUserRecentOrders(10);

  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('items', orders)

  return (
    <div>
      {/* <OrderItemCard/> */}
      <div>
        <h1 className="text-2xl font-bold mt-4">My Orders</h1>
        <p className="text-gray-500 text-sm mb-4">View, Manage and track orders</p>
      </div>
      <Card className="p-2">
        <CardHeader className="font-bold text-xl">
          Recent Orders
        </CardHeader>
        {orders.map((order: TInitialOrdersDataDB) => (
          <div key={order.id} className="flex justify-between border-t m-2 p-4">
            <div className="w-2/5">
              <div>Order Number #{order.id}</div>
              <div>Order Date {order.payment_date}</div>
              <div>Total Amount ${order.total_amount}</div>
            </div>
            <ul className="w-3/5">
              {order.items?.map((item: TInitialOrderItemsDataDB) => (
                <li key={item.id}>
                  <div className="flex m-2 justify-end">
                    <div className="w-2/5">
                      <div className="flex justify-end">
                        <Image
                            className="bg-gray-100 p-[6.5px]"
                            src={item.product?.feature}
                            width={175}
                            height={175}
                            alt="Picture of the Order Item"
                          />
                      </div>
                    </div>
                    <div className="w-2/5 pt-0 p-2 ml-1">
                      <div className="text-base font-bold lg:text-lg">
                        {`${item.product?.make} ${item.product?.model} ${item.product?.type}`}
                      </div>
                      <div className="text-sm font-normal false text-[#707070] lg:text-base">Color: {item.product?.display_color}</div>
                      {/* <div>Price: {item.product?.price}</div> */}
                      <div className="text-sm font-normal false text-[#707070] lg:text-base">Qty:{item.quantity} @ ${item.product?.msrp}</div>
                      <div className="text-sm font-normal false text-[#707070] lg:text-base">${item.price}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </div>
  );
}
