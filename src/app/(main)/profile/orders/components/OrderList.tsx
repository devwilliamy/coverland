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
      <div className="max-w-[984px] pl-5 md:mx-auto md:pl-2">
        <h1 className="mt-4 text-2xl font-bold md:mt-10 md:text-3xl">
          My Orders
        </h1>
        <p className="mb-5 pt-1 text-sm text-gray-500 md:text-base">
          View and manage orders
        </p>
      </div>
      <Card className="m-4 max-w-[984px] rounded-[8px] px-5 pt-8 md:m-1 md:mx-auto md:my-4 md:px-10">
        <CardHeader className="p-0 pb-3 text-xl font-bold md:pb-6 md:text-xl">
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
              className="justify-between border-t md:flex md:py-10 md:pt-12"
            >
              <div className="my-5 text-base md:my-0 md:w-2/5">
                <div className="justify-left mb-1 flex gap-4 md:gap-2">
                  <span className="min-w-[110px] font-normal text-[#707070]">
                    Order Number
                  </span>
                  <span className="font-semibold">#{order.order_id}</span>
                </div>
                <div className="justify-left mb-1 flex gap-4 md:gap-2">
                  <span className="min-w-[110px] font-normal text-[#707070]">
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
                  {order.items?.map((item) => (
                    <OrderItem key={item.id} item={item} version={"regular"} />
                  ))}
                </div>
                <div className="my-6 mb-8 max-w-[165px] text-base md:my-0 md:ml-[187px] md:mt-4">
                  <Link
                    href={`/profile/orders/${order.id}`}
                    className="text-[#0C87B8] underline"
                  >
                    {/* Provide aria-label for additional context */}
                    <div
                      className="order-link"
                      aria-label={`View details for Order ${order.id}`}
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
