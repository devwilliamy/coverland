import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(
  request: NextRequest,
  { params }: { params: { paymentMethodId: string } }
) {
  console.log('INSIDE GET:', params);
  const paymentMethodId = params.paymentMethodId;

  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
  console.log('==============================');
  console.log('[Payment-Method.GET]: ', paymentMethod);

  return NextResponse.json({ paymentMethod });
}
