import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';

const clientId = process.env.PAYPAL_CLIENT_ID ?? '';
const clientSecret = process.env.PAYPAL_CLIENT_SECRET ?? '';
const isProduction = process.env.NODE_ENV === 'production';
const productionEnvironment = new paypal.core.LiveEnvironment(
  clientId,
  clientSecret
);

const environment = isProduction
  ? productionEnvironment
  : new paypal.core.SandboxEnvironment(clientId, clientSecret);
// Move this into another folder
export const PaypalClient = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: Request) {
  if (req.method != 'POST') {
    return Response.json({ success: false, message: 'Not Found' });
  }

  const body = await req.json();

  if (!body.orderID) {
    return Response.json({
      success: false,
      message: 'Please Provide Order ID',
    });
  }

  const { orderID } = body;
  try {
    // console.log(
    //   '[api.paypal.capture-order.route POST] creating paypal order:',
    //   orderID
    // );
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    // console.log('[api.paypal.capture-order.route POST] request:', request);

    const response = await PaypalClient.execute(request);

    // console.log('[api.paypal.capture-order.route POST] RESPONSE', response); // One of the useful repnoses
    return Response.json({ success: true, data: response.result });
  } catch (error) {
    console.error(error);
    console.error(
      'error with client_id:',
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    );
    return NextResponse.json(
      { error: `An unexpected error occurred: ${error}` },
      { status: 500 }
    );
  }
}
