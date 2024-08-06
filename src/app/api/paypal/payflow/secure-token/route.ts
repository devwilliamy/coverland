import { v4 as uuidv4 } from 'uuid';

const partner = process.env.PAYPAL_PAYFLOW_PARTNER;
const pwd = process.env.PAYPAL_PAYFLOW_PWD;
const vendor = process.env.PAYPAL_PAYFLOW_VENDOR;
const user = process.env.PAYPAL_PAYFLOW_USER;
const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW';
const payflowUrl = isPreview
  ? 'https://pilot-payflowpro.paypal.com'
  : 'https://payflowpro.paypal.com';

export async function POST(req: Request) {
    console.log("IsPreview: ", isPreview)
  const body = await req.json();
  const uuid = uuidv4().replace(/-/g, '');
  console.log('uuidv4', uuid);

  if (!body.amount || !body.orderId || !body.currency) {
    return Response.json({
      success: false,
      message: 'Please Provide amount And order id and currency',
    });
  }

  const { amount, orderId, currency } = body;

  try {
    const response = await fetch(payflowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to URL-encoded form data
      },
      // No CC
      body: `PARTNER=${partner}&PWD=${pwd}&VENDOR=${vendor}&USER=${user}&TENDER=C&TRXTYPE=S&AMT=${amount}&CURRENCY=${currency}&CREATESECURETOKEN=Y&SECURETOKENID=${uuid}&ORDERID=${orderId}`,
    });
    const result = await response.text();
    console.log(result);
    const params = new URLSearchParams(result);

    // Extract the SECURETOKEN value
    const secureToken = params.get('SECURETOKEN');

    if (secureToken) {
      console.log('Secure Token:', secureToken); // Output: Secure Token: 4Zj4CVU6ANEKHgXENZl9YgAoE
      return Response.json({ data: { secureToken, secureTokenId: uuid } });
    } else {
      console.error('Secure Token not found in the response.');
      return Response.json({ error: 'Secure Token not found in the response' });
    }
  } catch (err) {
    console.log('Secure Token Caught Error: ', err);
    return Response.json(
      { error: 'Secure Token Caught Error' },
      { status: 500 }
    );
  }
}
