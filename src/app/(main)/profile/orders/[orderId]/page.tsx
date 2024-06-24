// app/order/[order_id]/page.tsx
import {
  TUserOrder,
  fetchUserRecentOrders,
} from '@/lib/db/profile/ordersHistory';
import OrderItem from '../components/OrderItem';
import { Card, CardHeader } from '@/components/ui/card';
import { getFullCountryName } from '@/lib/db/profile/utils/shipping';

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
    <>
      <div className="py-2 md:py-12 max-w-[1000px] md:mx-auto">
        <h1 className="mt-4 text-center text-2xl font-bold">Order Details</h1>
      </div>
      <Card className="m-3 px-4 pb-6 md:m-1 md:mb-8 max-w-[1000px] md:mx-auto md:px-8 md:py-0">
        <CardHeader className="text-xl block px-0 py-8 font-bold">
          Ordered on {order.payment_date} <span className="mx-2">|</span> Order
          #{order.order_id}
        </CardHeader>
        <div className="border-t">
          <ul className="py-2 md:py-8 md:pb-10">
            {order.items?.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
        <div className="border-t mt-4">
          <div className="justify-between md:m-4 md:mt-6 md:flex">
            <div className="mt-6 text-[#707070]">
              <div className="mb-2 font-bold text-black">Shipping Address</div>
              <div>{order.shipping_address_line_1}</div>
              <div>{order.shipping_address_line_2}</div>
              <div>
                {order.shipping_address_city} {order.shipping_address_state}{' '}
                {order.shipping_address_postal_code}
              </div>
              <div>{getFullCountryName(order.shipping_address_country)}</div>
            </div>
            {/* <div className="mt-6 text-[#707070]">
              <div className="font-bold text-black">Payment Method</div>
              <div>Pending</div>
            </div> */}
            <div className="mt-6 md:m-4 md:mt-6 md:min-w-[210px]">
              <div className="mb-1 font-bold">Order Summary</div>
              <div className="mb-1 flex justify-between">
                <div>Order Subtotal</div>
                <div>${order.total_original_amount?.toFixed(2)}</div>
              </div>
              <div className="mb-1 flex justify-between">
                <div>Sale-discount</div>
                <div>- ${order.total_discount_amount}</div>
              </div>
              <div className="mt-3 flex justify-between border-t pt-3 font-bold">
                <div>Order Total</div>
                <div>${order.total_amount}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default OrderDetailPage;
