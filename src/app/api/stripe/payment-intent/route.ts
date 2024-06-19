import { TCartItem } from '@/lib/cart/useCart';
import { getMsrpTotal, getOrderSubtotal, getTotalDiscountPrice } from '@/lib/utils/calculations';
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

const calculateOrderTotalOriginalAmount = (items: TCartItem[]) => {
  return getOrderSubtotal(items);
};

const calculateOrderTotalDiscountAmount = (items: TCartItem[]) => {
  return getTotalDiscountPrice(items);
};

export async function POST(request: NextRequest) {
  const { items, promoCode } = await request.json();
  const isDev = process.env.NODE_ENV !== 'production';
  const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW'
  const uniqueId = (isDev || isPreview) ? 'TEST' : 'XXXX';
  const orderId = await generateOrderId(items, uniqueId);
  const lineItems = generateLineItemsForStripe(items, orderId);
  const justTheProductName: string[] = lineItems.map(item => item?.price_data?.product_data?.name);
  const justTheProductNameString = JSON.stringify(justTheProductName)
  const skus = getSkusFromCartItems(items);
  const skusWithQuantity = getSkusAndQuantityFromCartItems(items);
  // Create a PaymentIntent with the order amount and currency
  
  const justTheProductNameStringNoSpace = justTheProductNameString.replace(/\s+/g, '')
  // If Line Item is too long, get rid of the spaces (500 Max)
  const finalLineItem = justTheProductNameString.length >= 500 ? justTheProductNameStringNoSpace : justTheProductNameString
  // If Line Item is still too long, truncate it (500 Max)
  const veryFinalLineItem = finalLineItem.length >= 500 ? finalLineItem.slice(0, 500) : finalLineItem
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
      skusWithQuantity: JSON.stringify(skusWithQuantity),
      line_items: veryFinalLineItem,
      total_original_amount: calculateOrderTotalOriginalAmount(items).toFixed(2).toString(), // Stripe Payment Intent API requires all metadata to be sent as a string
      total_discount_amount: calculateOrderTotalDiscountAmount(items).toFixed(2).toString(),
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
