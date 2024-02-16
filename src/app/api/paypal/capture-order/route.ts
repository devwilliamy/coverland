import paypal from '@paypal/checkout-server-sdk';

import { PaypalClient, paypalClient } from '../utils';

export async function POST(req: Request) {
  const client = paypalClient();

  const body = await req.json();
  console.log(body);

  console.log('here');
  if (!body.orderID) {
    console.log('here');

    return Response.json({
      success: false,
      message: 'Please Provide Order ID',
    });
  }

  const { orderID } = body;
  console.log('here');

  const request = new paypal.orders.OrdersCaptureRequest(orderID);

  // const request = new paypal.orders.OrdersCaptureRequest(orderID);
  console.log('here');
  console.log(request);

  // request.requestBody({ payment_source: { token: body.token } });
  console.log('here');

  const response = await client.execute(request);
  console.log(response);
  console.log('here');
  console.log(response);

  if (!response) {
    console.log('here');

    return Response.json({
      success: false,
      message: 'Some Error Occured at backend',
    });
  }

  return Response.json({ success: true, data: response.result });
}
