// app/order/[order_id]/page.tsx
import { TUserOrder, fetchUserOrderById } from '@/lib/db/profile/ordersHistory';
import OrderItem from '../components/OrderItem';
import { Card, CardHeader } from '@/components/ui/card';
import { getFullCountryName } from '@/lib/db/profile/utils/shipping';
import { formatPhoneNumber } from '@/lib/db/profile/utils/phone';
import { generateTrackingUrl } from '@/lib/utils/generateTrackingUrl';

type OrderDetailProps = {
  params: { orderId: number };
};

const OrderDetailPage = async ({ params }: OrderDetailProps) => {
  const order: TUserOrder | null = await fetchUserOrderById(params.orderId); // option to pass in a number of orders to be retrieved

  // if there is no user, it will say Order not found - might want to change the UX here evemtually
  // if (!user) {
  //   return <div className="m-2">Order not found</div>;
  // }

  // there may be a small optimization where we can find the order by id through the fetched Orders list if it's already cached
  // const order: TUserOrder | undefined = orders.find(
  //   (order) => order.id.toString() === params.orderId
  // );

  if (!order) {
    return <div className="m-2">Order not found</div>;
  }

  const hasShippingDetails =
    order.shipping_tracking_number && order.shipping_carrier;

  return (
    <>
      <div className="max-w-[984px] py-10 md:mx-auto md:py-14">
        <h1 className="mt-4 text-center text-3xl font-bold md:mt-0">
          Order Details
        </h1>
      </div>
      <Card className="m-4 max-w-[984px] rounded-[8px] px-5 py-8 md:m-1 md:mx-auto md:mb-8 md:px-10">
        <CardHeader className="block p-0 pb-8 text-base font-bold">
          Ordered on {order.payment_date} <span className="mx-2">|</span> Order
          #{order.order_id}
        </CardHeader>
        <div className="justify-between border-t md:flex md:pt-8">
          <ul className="py-2 md:py-0">
            {order.items?.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                marginClass="md:mb-10"
                version="short"
              />
            ))}
          </ul>
          <div className="pb-8">
            <ul className="flex flex-col items-center">
              {hasShippingDetails && (
                <a
                  href={generateTrackingUrl(
                    order.shipping_tracking_number,
                    order.shipping_carrier
                  )}
                  target="_blank"
                >
                  <button class="h-[40px] w-[235px] rounded bg-black px-4 py-2 text-sm font-bold tracking-wider text-white">
                    TRACK PACKAGE
                  </button>
                </a>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t text-base leading-7">
          <div className="justify-between md:flex">
            <div className="mt-8 text-[#707070] md:mt-10">
              <div className="mb-1 font-bold text-black">Shipping Address</div>
              <div>{order.shipping_address_line_1}</div>
              <div>{order.shipping_address_line_2}</div>
              <div>
                {order.shipping_address_city}, {order.shipping_address_state}{' '}
                {order.shipping_address_postal_code}
              </div>
              <div>{getFullCountryName(order.shipping_address_country)}</div>
              <div>{formatPhoneNumber(order.customer_phone)}</div>
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
              <div className="mt-2 flex justify-between border-t pt-2 font-bold md:mt-3 md:pt-3">
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
