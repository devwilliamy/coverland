import { Order } from '@paypal/checkout-server-sdk/lib/orders/lib';
import { PaypalClient } from './utils';
import paypal from '@paypal/checkout-server-sdk';

export async function POST(req: Request) {
  const body = await req.json();
  if (req.method != 'POST') {
    return Response.json({ success: false, message: 'Not Found' });
  }

  if (!body.order_price || !body.user_id) {
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
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: body.order_price + '',
          },
        },
      ],
    });

    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      return new Response('Backend error', {
        status: 500,
      });
    }
    console.log(response);

    return Response.json({ data: response.result as Order });
  } catch (err) {
    console.log('Err at Create Order: ', err);
    return new Response('Order creation error', {
      status: 500,
    });
  }

  //   const { orderID } = req.query;
  //   const request = new paypal.orders.OrdersGetRequest(orderID as string);
  //   const response = await PaypalClient.execute(request);
}
