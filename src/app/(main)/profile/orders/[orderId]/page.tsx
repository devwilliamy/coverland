// app/order/[order_id]/page.tsx
import {
  TUserOrder,
  fetchUserRecentOrders,
} from '@/lib/db/profile/ordersHistory';
import OrderItem from '../components/OrderItem';
import { Card, CardHeader } from '@/components/ui/card';

type OrderDetailProps = {
  params: { orderId: string };
};

const OrderDetailPage = async ({ params }: OrderDetailProps) => {
  const orders: TUserOrder[] | null = await fetchUserRecentOrders(4); // number of orders to be retrieved

  if (!orders) {
    return <div className="m-2">Order not found</div>;
  }

  const order: TUserOrder | undefined = orders.find(
    (order) => order.order_id.toString() === params.orderId
  );

  if (!order) {
    return <div className="m-2">Order not found</div>;
  }

  return (
    <div>
      <div className="pl-5 md:pl-3">
        <h1 className="mt-4 text-2xl font-bold text-center">Order Details</h1>
      </div>
      <Card className="m-3 p-2 md:m-1 md:mb-4">
        <CardHeader className="p-2 pb-4 pt-4 text-xl font-bold md:p-4 md:text-xl">
          Ordered on {order.payment_date} | Order #{order.order_id}
        </CardHeader>
        <p>Total Amount: {order.total_amount}</p>
        <div className="border-t">
          <ul>
            {order.items?.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <div className="border-t">
          <div className="flex">
            <div>
              <div className="font-bold">Shipping Address</div>
              <div>{order.shipping_address_line_1}</div>
              <div>{order.shipping_address_line_2}</div>
              <div>
                {order.shipping_address_city} {order.shipping_address_state}{' '}
                {order.shipping_address_postal_code}
              </div>
              <div>{order.shipping_address_country}</div>
            </div>
            <div>
              <div className="font-bold">Payment Method</div>
              <div>Pending</div>
            </div>
            <div>
              <div className="font-bold">Order Summary</div>
              <div>Order Subtotal ${order.subtotal}</div>
              <div>Sale-discount ${order.total_discount}</div>
              <div>Order total ${order.total_amount}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrderDetailPage;
