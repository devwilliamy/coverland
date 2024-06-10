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

  // console.log('items', orders);

  return (
    <div className="">
      {/* <OrderItemCard/> */}
      <div className="pl-5 md:pl-3">
        <h1 className="mt-4 text-xl font-bold md:text-2xl">My Orders</h1>
        <p className="mb-4 text-sm text-gray-500">
          View, Manage and track orders
        </p>
      </div>
      <Card className="m-1 p-2 md:m-0 md:mb-4">
        <CardHeader className="p-2 pb-4 pt-4 text-xl font-bold md:p-4 md:text-xl">
          Recent Orders
        </CardHeader>
        {orders.map((order: TInitialOrdersDataDB) => (
          <div
            key={order.id}
            className="justify-between border-t p-4 pl-2 md:m-2 md:flex"
          >
            <div className="mb-8 mt-6 md:mb-4 md:mt-4 md:w-2/5">
              <div className="justify-left flex gap-2">
                <span className="mb-1 min-w-[110px] text-base font-normal text-gray-500 md:text-base">
                  Order Number
                </span>
                <span className="font-semibold">#{order.id}</span>
              </div>
              <div className="justify-left flex gap-2">
                <span className="mb-1 min-w-[110px] text-base font-normal text-gray-500 md:text-base">
                  Order Date
                </span>
                <span className="font-semibold">{order.payment_date}</span>
              </div>
              <div className="justify-left flex gap-2">
                <span className="mmb-1 min-w-[110px] text-base font-normal text-gray-500 md:text-base">
                  Total
                </span>
                <span className="font-semibold">{order.total_amount}</span>
              </div>
            </div>
            <ul className="md:w-3/5">
              {order.items?.map((item: TInitialOrderItemsDataDB) => (
                <li key={item.id}>
                  <div className="justify-end md:m-0 md:flex">
                    <div className="mb-4 mt-4 md:mb-2 md:mt-2 md:w-2/5">
                      <div className="justify-end md:flex">
                        <Image
                          className="bg-gray-100 p-[6.5px]"
                          src={item.product?.feature}
                          width={155}
                          height={155}
                          alt="Picture of the Order Item"
                        />
                      </div>
                    </div>
                    <div className="mb-4 mt-4 pt-0 md:mb-2 md:ml-5 md:mt-2 md:w-3/5 md:max-w-[325px]">
                      <div className="mb-1 text-base font-bold md:text-base">
                        {`${item.product?.display_id}${trademarkSymbol} ${item.product?.type}`}
                      </div>
                      {/* <div className="mb-1 text-base font-normal text-[#707070] md:text-base">
                        {`${item.product?.display_id}${trademarkSymbol} ${item.product?.type}`}
                      </div> */}
                      <div className="mb-1 text-base font-normal text-[#707070] md:text-base">
                        Vehicle: {item.product?.make} {item.product?.model}{' '}
                        {item.product?.year_generation}{' '}
                        {item.product?.submodel1}
                      </div>
                      <div className="mb-1 text-base font-normal text-[#707070] md:text-base">
                        Color: {item.product?.display_color}
                      </div>
                      {/* <div>Price: {item.product?.price}</div> */}
                      <div className="mb-1 text-base font-normal text-[#707070] md:text-base">
                        Qty:{item.quantity} @ ${item.product?.msrp}
                      </div>
                      <div className="text-base font-normal text-[#707070] md:text-base">
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
