// app/order/[order_id]/page.tsx
import {
  TUserOrder,
  fetchAllUserOrders,
} from '@/lib/db/profile/ordersHistory';
import OrderItem from '../components/OrderItem';
import { Card, CardHeader } from '@/components/ui/card';
import { getFullCountryName } from '@/lib/db/profile/utils/shipping';

type OrderDetailProps = {
  params: { orderId: string };
};

const OrderDetailPage = async ({ params }: OrderDetailProps) => {
  const orders: TUserOrder[] | null = await fetchAllUserOrders(); // option to pass in a number of orders to be retrieved

  if (!orders) {
    return <div className="m-2">Order not found</div>;
  }

  const order: TUserOrder | undefined = orders.find(
    (order) => order.id.toString() === params.orderId
  );

  if (!order) {
    return <div className="m-2">Order not found</div>;
  }

  return (
    <>
      <div className="py-10 md:py-14 max-w-[984px] md:mx-auto">
        <h1 className="mt-4 md:mt-0 text-center text-3xl font-bold">Order Details</h1>
      </div>
      <Card className="m-4 px-5 py-8 md:px-10 md:m-1 md:mb-8 max-w-[984px] md:mx-auto rounded-[8px]">
        <CardHeader className="p-0 pb-8 text-base block font-bold">
          Ordered on {order.payment_date} <span className="mx-2">|</span> Order
          #{order.id}
        </CardHeader>
        <div className="border-t">
          <ul className="py-2 md:pt-8 md:pb-0">
            {order.items?.map((item) => (
              <OrderItem key={item.id} item={item} marginClass="md:mb-10" version="short"/>
            ))}
          </ul>
        </div>
        <div className="border-t text-base leading-7">
          <div className="justify-between md:flex">
            <div className="mt-8 md:mt-10 text-[#707070]">
              <div className="mb-1 font-bold text-black">Shipping Address</div>
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
            <div className="mt-8 md:mt-10 md:min-w-[223px]">
              <div className="mb-1 font-bold">Order Summary</div>
              <div className="mb-1 flex justify-between">
                <div>Order Subtotal</div>
                <div>${order.total_original_amount?.toFixed(2)}</div>
              </div>
              <div className="mb-1 flex justify-between">
                <div>Sale-discount</div>
                <div>- ${order.total_discount_amount}</div>
              </div>
              <div className="mt-2 pt-2 flex justify-between border-t md:pt-3 md:mt-3 font-bold">
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
