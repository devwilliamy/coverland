import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { TCartItem } from '@/lib/cart/useCart';
// import { getStripe } from '../utils/orders';
import Stripe from 'stripe';
import { handleAddOrderId } from '../utils/orders';

// NlSkeS0v is 99% off for Dev testing, UQpfBHt7 is 100% off
// fnUHD0s8 is 99% off for Prod (for Google Tag Testing)
const devPromoCodes = ['UQpfBHt7', 'NlSkeS0v'];

const checkPromoCode = (promoCode: string, isDev: boolean): boolean => {
  return isDev ? devPromoCodes.includes(promoCode) : promoCode === 'fnUHD0s8';
};
export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const headersList = headers();
  const { cartItems, promoCode } = await req.json();
  const isDev = process.env.NODE_ENV !== 'production';
  const generateOrderId = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    if (isDev) {
      return `CL-test-${randomNumber}`;
    }
    return `CL-${randomNumber}`;
  };
  const isValidPromoCode = checkPromoCode(promoCode, isDev);
  const coupon = isValidPromoCode ? promoCode : '';

  // Femi was having it for Ford Roadster, apply coupon code. If not, blank it out
  // I changed it to just check if inputted promo code is a valid one ATM.
  // const discountCode =
  // cartItems[0].sku === 'CL-CC-CN-15-F-BKRD-STR-PP-101001' ? coupon : '';

  const order_id = generateOrderId();
  const lineItems = cartItems.map((item: TCartItem) => {
    const unitAmount = item.msrp
      ? parseInt((parseFloat(item.msrp) * 100).toFixed(0))
      : 0;

    const itemName = `${item.year_generation} ${item.make} ${item.model} ${
      item.submodel1 ? item.submodel1 : ''
    } ${item.submodel2 ? item.submodel2 : ''} Car Cover ${item.display_id} ${
      item.display_color
    } ${item.sku} ${order_id}`;

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: itemName,
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    };
  });

  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'pay',
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${headersList.get(
      'origin'
    )}/thank-you?order-number=${order_id}`,
    cancel_url: `${headersList.get('origin')}/checkout`,
    billing_address_collection: 'required',
  };
  if (coupon) {
    params.discounts = [{ coupon }];
  }

  try {
    const session = await stripe?.checkout.sessions.create(params);
    await handleAddOrderId({ order_id, cartItems });
    console.log('Order ID added to DB');

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}
