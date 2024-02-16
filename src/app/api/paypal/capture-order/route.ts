import paypal from '@paypal/checkout-server-sdk';

import { NextApiRequest, NextApiResponse } from 'next';
import { PaypalClient } from '../utils';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.orderID)
    return res
      .status(400)
      .json({ success: false, message: 'Please Provide Order ID' });

  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({ payment_source: { token: req.body.token } });
  const response = await PaypalClient.execute(request);
  if (!response) {
    return res
      .status(500)
      .json({ success: false, message: 'Some Error Occured at backend' });
  }

  res.status(200).json({ success: true });
}
