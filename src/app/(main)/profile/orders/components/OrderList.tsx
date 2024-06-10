// components/OrderList.tsx
import OrderItem from './OrderItem';
import { Card, CardHeader } from '@/components/ui/card'; // Import your Card components
// import { TInitialOrdersDataDB, TInitialOrderItemsDataDB } from '@/types';
import { TInitialOrdersDataDB, TInitialOrderItemsDataDB } from '@/lib/db/profile/ordersHistory';

interface OrderListProps {
  orders: TInitialOrdersDataDB[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <>
      <div className="pl-5 md:pl-3">
        <h1 className="mt-4 text-xl md:text-2xl font-bold">My Orders</h1>
        <p className="mb-4 text-sm text-gray-500">View, Manage and track orders</p>
      </div>
      <Card className="p-2 m-3 md:m-1 md:m-0 md:mb-4">
        <CardHeader className="text-xl md:text-xl font-bold p-2 pt-4 pb-4 md:p-4">Recent Orders</CardHeader>
        {orders.map((order) => (
          <div key={order.id} className="md:m-2 md:flex justify-between border-t p-4 pl-2">
            <div className="mt-6 mb-8 md:mt-4 md:mb-4 md:w-2/5">
              <div className="flex justify-left gap-2">
                <span className="mb-1 text-base font-normal text-[#707070] md:text-base min-w-[110px]">Order Number</span>
                <span className="font-semibold">#{order.id}</span>
              </div>
              <div className="flex justify-left gap-2">
                <span className="mb-1 text-base font-normal text-[#707070] md:text-base min-w-[110px]">Order Date</span>
                <span className="font-semibold">{order.payment_date}</span>
              </div>
              <div className="flex justify-left gap-2">
                <span className="mb-1 text-base font-normal text-[#707070] md:text-base min-w-[110px]">Total</span>
                <span className="font-semibold">{order.total_amount}</span>
              </div>
            </div>
            <ul className="md:w-3/5 md:mt-2">
              {order.items?.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </>
  );
};

export default OrderList;
