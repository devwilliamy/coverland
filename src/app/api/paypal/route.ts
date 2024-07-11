import { Order } from '@paypal/checkout-server-sdk/lib/orders/lib';
import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID ?? '';
const clientSecret = process.env.PAYPAL_CLIENT_SECRET ?? '';
const isProduction = process.env.NODE_ENV === 'production';
const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW';
const productionEnvironment = new paypal.core.LiveEnvironment(
  clientId,
  clientSecret
);

const environment = !isPreview
  ? productionEnvironment
  : new paypal.core.SandboxEnvironment(clientId, clientSecret);
export const PaypalClient = new paypal.core.PayPalHttpClient(environment);

//TODO: More robust error handling, we should add additional validation for orderID
//TODO: And use more semantic error codes
export async function POST(req: Request) {
  if (req.method != 'POST') {
    return Response.json({ success: false, message: 'Not Found' });
  }
  const body = await req.json();

  if (!body.order_price || !body.purchase_units || !body.user_id) {
    return Response.json({
      success: false,
      message: 'Please Provide order_price And User ID',
    });
  }

  try {
    const request = new paypal.orders.OrdersCreateRequest();

    request.headers['Prefer'] = 'return=representation';
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: body.purchase_units,
      payer: body.payer,
    });
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      return new Response('Backend error', {
        status: 500,
      });
    }
    // console.log('api/paypal/route POST: ', response); // Also useful

    return Response.json({ data: response.result as Order });
  } catch (err) {
    console.log('Err at Create Order: ', err);
    return new Response('Order creation error', {
      status: 500,
    });
  }
}
