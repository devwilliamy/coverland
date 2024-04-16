import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(
  request: NextRequest,
  { params }: { params: { paymentIntentId: string } }
) {
  const paymentIntentId = params.paymentIntentId;
  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId as string
  );
  console.log('==============================');
  console.log('[Payment-Intent.GET]: ', paymentIntent);

  return NextResponse.json({ paymentIntent });
}
