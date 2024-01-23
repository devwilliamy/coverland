import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { TCartItems } from '@/lib/cart/useCart';
// import { getStripe } from '../utils/orders';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const headersList = headers();
  const { cartItems } = await req.json();

  const generateOrderId = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return `CL-${randomNumber}`;
  };

  const order_id = generateOrderId();
  const lineItems = cartItems.map((item: TCartItems) => {
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

  try {
    const session = await stripe?.checkout.sessions.create(params);

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}
