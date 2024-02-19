import paypal from '@paypal/checkout-server-sdk';

import { PaypalClient } from '../utils';

export async function POST(req: Request) {
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

  // const request = new paypal.orders.OrdersCaptureRequest(orderID);
  // console.log(request);

  // request.requestBody({ payment_source: { token: body.token } });

  // console.log(response);
  // console.log('here');
  // console.log(response);

  // if (!response) {
  //   console.log('here');

  //   return Response.json({
  //     success: false,
  //     message: 'Some Error Occured at backend',
  //   });
  // }

  return Response.json({ success: true, data: '' });
}
