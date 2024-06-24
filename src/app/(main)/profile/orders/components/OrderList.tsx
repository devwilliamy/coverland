import OrderItem from './OrderItem';
import { Card, CardHeader } from '@/components/ui/card'; // Import your Card components
import { TUserOrder } from '@/lib/db/profile/ordersHistory';
import Link from 'next/link';

type OrderListProps = {
  orders: TUserOrder[];
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      <div className="pl-5 md:pl-2">
        <h1 className="mt-4 text-xl font-bold md:text-2xl">My Orders</h1>
        <p className="mb-4 text-sm text-gray-500">
          View and Manage orders
        </p>
      </div>
      <Card className="m-3 px-4 pt-4 md:py-0 md:px-8 md:m-1 md:my-4">
        <CardHeader className="my-4 p-0 text-xl md:my-6 font-bold">
          Recent Orders
        </CardHeader>
        {orders.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            You have no orders.
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="justify-between border-t md:py-10 md:pt-12 md:flex"
            >
              <div className="my-8 md:my-0 md:w-2/5">
                <div className="justify-left flex gap-2 mb-1">
                  <span className="min-w-[110px] text-base font-normal text-[#707070]">
                    Order Number
                  </span>
                  <span className="font-semibold">#{order.id}</span>
                </div>
                <div className="justify-left flex gap-2 mb-1">
                  <span className="min-w-[110px] text-base font-normal text-[#707070]">
                    Order Date
                  </span>
                  <span className="font-semibold">{order.payment_date}</span>
                </div>
                {/* <div className="justify-left flex gap-2">
                  <span className="mb-1 min-w-[110px] text-base font-normal text-[#707070]">
                    Total
                  </span>
                  <span className="font-semibold">${order.total_amount}</span>
                </div> */}
              </div>
              <ul className="">
                <div>
                  {order.items?.[0] && (
                    <OrderItem key={order.items[0].id} item={order.items[0]}/>
                  )}
                </div>
                <div className="my-6 mb-8 md:my-0 md:mt-4 max-w-[150px] md:ml-[185px]">
                  <Link href={`/profile/orders/${order.order_id}`} className='underline text-[#0C87B8]'>
                    {/* Provide aria-label for additional context */}
                    <div
                      className="order-link"
                      aria-label={`View details for Order ${order.order_id}`}
                    >
                      Check order details
                    </div>
                  </Link>
                </div>
              </ul>
            </div>
          ))
        )}
      </Card>
    </>
  );
};

export default OrderList;
