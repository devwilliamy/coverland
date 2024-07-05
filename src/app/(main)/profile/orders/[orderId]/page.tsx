// app/order/[order_id]/page.tsx
import { TUserOrder, fetchUserOrderById } from '@/lib/db/profile/ordersHistory';
import OrderItem from '../components/OrderItem';
import { Card, CardHeader } from '@/components/ui/card';
import { getFullCountryName } from '@/lib/db/profile/utils/shipping';
import { formatPhoneNumber } from '@/lib/db/profile/utils/phone';
import { capitalizeString } from '@/lib/utils/stringFuncs';
import { generateTrackingUrl } from '@/lib/utils/generateTrackingUrl';
import Image from 'next/image';
import cardLogo from '@/images/profile/orders/card.svg';

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

  const getPaymentMethodDetails = (order) => {
    const paymentMethods = {
      link: {
        alt: 'Card Link',
        text: 'Card Link',
        logo: cardLogo,
        size: 22,
      },
      card: {
        alt: `${order.card_brand} Card`,
        text: capitalizeString(order.card_brand) || 'Card',
        brandLogos: {
          visa: { logo: '/images/profile/orders/visa.svg', size: 35 },
          mastercard: {
            logo: '/images/profile/orders/mc_symbol.svg',
            size: 33,
          },
          amex: { logo: '/images/profile/orders/amex.svg', size: 28 },
          discover: {
            logo: '/images/profile/orders/discover-icon.webp',
            size: 35,
          },
        },
      },
      klarna: {
        alt: 'Klarna Logo',
        text: capitalizeString(order.payment_method) || 'Klarna',
        logo: '/images/profile/orders/klarna.svg',
        size: 35,
      },
      paypal: {
        alt: 'PayPal',
        text: 'PayPal',
        logo: '/images/profile/orders/paypal-color-icon.webp',
        size: 35,
      },
      default: {
        alt: 'Card',
        text: 'Card',
        logo: cardLogo,
        size: 22,
      },
    };

    const walletTypes = {
      google_pay: {
        text: 'Google Pay',
        logo: '/images/profile/orders/google_pay.svg',
        size: 40,
      },
      apple_pay: {
        text: 'Apple Pay',
        logo: '/images/profile/orders/apple_pay.svg',
        size: 35,
      },
    };

    const method =
      order.payment_method ||
      (order.payment_gateway === 'paypal' ? 'paypal' : 'default');
    const paymentMethod = paymentMethods[method] || paymentMethods.default;

    if (method === 'card' && order.card_brand) {
      const brandDetails = paymentMethod.brandLogos[order.card_brand];
      if (brandDetails) {
        paymentMethod.logo = brandDetails.logo;
        paymentMethod.size = brandDetails.size;
      }
    }

    if (order.wallet_type && walletTypes[order.wallet_type]) {
      const wallet = walletTypes[order.wallet_type];
      paymentMethod.logo = wallet.logo;
      paymentMethod.text = wallet.text;
      paymentMethod.size = wallet.size;
    }

    return paymentMethod;
  };

  const paymentMethodDetails = getPaymentMethodDetails(order);
  const {
    logo: paymentMethodLogo,
    alt: paymentMethodAlt,
    text: paymentMethodText,
    size: paymentLogoSize,
  } = paymentMethodDetails;

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
          <div className={`${order.shipping_tracking_number ? 'pb-8' : ''}`}>
            <ul className="flex flex-col items-center">
              {hasShippingDetails && (
                <a
                  href={generateTrackingUrl(
                    order.shipping_tracking_number,
                    order.shipping_carrier
                  )}
                  target="_blank"
                >
                  <button className="h-[40px] w-[235px] rounded bg-black px-4 py-2 text-sm font-bold tracking-wider text-white">
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
            <div className="mt-8 text-[#707070] md:mt-10">
              <div className="mb-1 font-bold text-black">Payment Method</div>
              <div className="inline-flex">
                <Image
                  src={paymentMethodLogo}
                  alt={`${paymentMethodAlt} logo`}
                  layout="intrinsic"
                  width={paymentLogoSize}
                  height={paymentLogoSize}
                />
                <span className="pl-2">{paymentMethodText}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-10 md:min-w-[223px]">
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
