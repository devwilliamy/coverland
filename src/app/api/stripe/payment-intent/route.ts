import { TCartItem } from '@/lib/cart/useCart';
import { getMsrpTotal } from '@/lib/utils/calculations';
import {
  convertPriceToStripeFormat,
  generateLineItemsForStripe,
  generateOrderId,
  getSkusAndQuantityFromCartItems,
  getSkusFromCartItems,
} from '@/lib/utils/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const calculateOrderAmount = (items: TCartItem[]) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return convertPriceToStripeFormat(getMsrpTotal(items));
};

export async function POST(request: NextRequest) {
  const { items, promoCode } = await request.json();
  const isDev = process.env.NODE_ENV !== 'production';
  const uniqueId = isDev ? 'TEST' : 'XXXX';
  const orderId = await generateOrderId(items, uniqueId);
  // const lineItems = generateLineItemsForStripe(items, orderId);
  const skus = getSkusFromCartItems(items);
  const skusWithQuantity = getSkusAndQuantityFromCartItems(items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      orderId,
      skus: skus.join(','),
      skusWithQuantity: JSON.stringify(skusWithQuantity)
    },
  });

  return NextResponse.json({
    paymentIntent,
  });
}

export async function PUT(request: NextRequest) {
  const { paymentIntentId, amount } = await request.json();

  const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
    amount,
  });

  return NextResponse.json({
    paymentIntent,
  });
}
