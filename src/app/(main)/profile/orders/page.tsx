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
  const orders: TInitialOrdersDataDB[] = await fetchUserRecentOrders(4);

  const cookieStore: ReadonlyRequestCookies = cookies();
  const supabase: SupabaseClient = createSupabaseServerClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const trademarkSymbol = '\u2122';

  console.log('items', orders);

  return (
    <div className="">
      {/* <OrderItemCard/> */}
      <div className="pl-5 md:pl-3">
        <h1 className="mt-4 text-xl md:text-2xl font-bold">My Orders</h1>
        <p className="mb-4 text-sm text-gray-500">
          View, Manage and track orders
        </p>
      </div>
      <Card className="p-2 mb-4">
        <CardHeader className="text-xl md:text-xl font-bold p-4 pt-2 pb-2 lg:p-6">Recent Orders</CardHeader>
        {orders.map((order: TInitialOrdersDataDB) => (
          <div key={order.id} className="md:m-2 md:flex justify-between border-t p-4">
            <div className="md:w-2/5">
              <div className="flex justify-left gap-2">
                <span className="false mb-1 text-base font-normal text-[#707070] md:text-base min-w-[110px]">Order Number</span><span className="font-semibold">#{order.id}</span>
              </div>
              <div className="flex justify-left gap-2">
                <span className="false mb-1 text-base font-normal text-[#707070] md:text-base min-w-[110px]">Order Date</span><span className="font-semibold">{order.payment_date}</span>
              </div>
              <div className="flex justify-left gap-2">
                <span className="false mb-1 text-base font-normal text-[#707070] md:text-base min-w-[110px]">Total</span><span className="font-semibold">{order.total_amount}</span>
              </div>
            </div>
            <ul className="md:w-3/5">
              {order.items?.map((item: TInitialOrderItemsDataDB) => (
                <li key={item.id}>
                  <div className="m-2 md:flex justify-end">
                    <div className="md:w-2/5">
                      <div className="md:flex justify-end">
                        <Image
                          className="bg-gray-100 p-[6.5px]"
                          src={item.product?.feature}
                          width={150}
                          height={150}
                          alt="Picture of the Order Item"
                        />
                      </div>
                    </div>
                    <div className="md:ml-5 md:w-3/5 pt-0 md:max-w-[325px]">
                      <div className="false mb-1 text-base font-bold md:text-base">
                        {`${item.product?.display_id}${trademarkSymbol} ${item.product?.type}`}
                      </div>
                      {/* <div className="false mb-1 text-base font-normal text-[#707070] md:text-base">
                        {`${item.product?.display_id}${trademarkSymbol} ${item.product?.type}`}
                      </div> */}
                      <div className="false mb-1 text-base font-normal text-[#707070] md:text-base">
                        Vehicle: {item.product?.make} {item.product?.model}{' '}
                        {item.product?.year_generation}{' '}
                        {item.product?.submodel1}
                      </div>
                      <div className="false mb-1 text-base font-normal text-[#707070] md:text-base">
                        Color: {item.product?.display_color}
                      </div>
                      {/* <div>Price: {item.product?.price}</div> */}
                      <div className="false mb-1 text-base font-normal text-[#707070] md:text-base">
                        Qty:{item.quantity} @ ${item.product?.msrp}
                      </div>
                      <div className="false text-base font-normal text-[#707070] md:text-base">
                        {item.price}
                      </div>
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
