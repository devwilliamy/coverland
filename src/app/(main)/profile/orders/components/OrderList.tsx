import OrderItem from './OrderItem';
import { Card, CardHeader } from '@/components/ui/card'; // Import your Card components
import { TInitialOrdersDataDB } from '@/lib/db/profile/ordersHistory';

type OrderListProps = {
  orders: TInitialOrdersDataDB[];
};

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      <div className="pl-5 md:pl-3">
        <h1 className="mt-4 text-xl font-bold md:text-2xl">My Orders</h1>
        <p className="mb-4 text-sm text-gray-500">
          View, Manage and track orders
        </p>
      </div>
      <Card className="m-3 p-2 md:m-1 md:mb-4">
        <CardHeader className="p-2 py-4 text-xl font-bold md:p-4">
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
              className="justify-between border-t p-4 pl-2 md:m-2 md:flex"
            >
              <div className="mb-8 mt-6 md:my-4 md:w-2/5">
                <div className="justify-left flex gap-2">
                  <span className="mb-1 min-w-[110px] text-base font-normal text-[#707070]">
                    Order Number
                  </span>
                  <span className="font-semibold">#{order.id}</span>
                </div>
                <div className="justify-left flex gap-2">
                  <span className="mb-1 min-w-[110px] text-base font-normal text-[#707070]">
                    Order Date
                  </span>
                  <span className="font-semibold">{order.payment_date}</span>
                </div>
                <div className="justify-left flex gap-2">
                  <span className="mb-1 min-w-[110px] text-base font-normal text-[#707070]">
                    Total
                  </span>
                  <span className="font-semibold">{order.total_amount}</span>
                </div>
              </div>
              <ul className="md:mt-2 md:w-3/5">
                {order.items?.map((item) => (
                  <OrderItem key={item.id} item={item} />
                ))}
              </ul>
            </div>
          ))
        )}
      </Card>
    </>
  );
};

export default OrderList;
