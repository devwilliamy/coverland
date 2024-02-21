import paypal from '@paypal/checkout-server-sdk';

import { PaypalClient } from '../utils';

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
  console.log(orderID);
  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await PaypalClient.execute(request);

    console.log(response);
  } catch (error) {
    console.log(error);
  }

  return Response.json({ success: true, data: '' });
}
