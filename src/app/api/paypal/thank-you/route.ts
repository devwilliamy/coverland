import { updateAdminPanelOrder } from '@/lib/db/admin-panel/orders';
import { getCurrentTimeInISOFormat } from '@/lib/utils/date';
import { NextRequest, NextResponse } from 'next/server';

const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW';

const coverlandUrl = isPreview
  ? process.env.NEXT_PUBLIC_HOSTNAME
  : 'https://coverland.com';

/*
  Paypal Type Information
  TRXTYPE
    approved Authorization (TRXTYPE=A)
    approved Sale (TRXTYPE=S), Delayed Capture (TRXTYPE=D), Refund (TRXTYPE=C) or Force (TRXTYPE=F)
    approved Void (TRXTYPE=V)
  CARDTYPE
    - 0 = Visa
    - 1 = Mastercard
    - 2 = Discover
    - 3 = American Express
    - 4 = Diner's Club
    - 5 = JCB
    - 9 = Maestro (Switch)
*/

export async function GET(req: NextRequest, res: NextResponse) {
  console.log('REquest:', req);
  const searchParams = req.nextUrl.searchParams;
  const body = await req.text();
  console.log('body', body);
  console.log('searchParams', searchParams);
  // const tax = searchParams.get('TAX');
  const secureToken = searchParams.get('SECURETOKEN');
  // const avsData = searchParams.get('AVSDATA');
  const country = searchParams.get('COUNTRY');
  const amount = searchParams.get('AMT'); // card_amount
  const account = searchParams.get('ACCT'); // 4 digit card number
  // const authCode = searchParams.get('AUTHCODE');
  const pnRef = searchParams.get('PNREF'); // transaction_id
  // const tender = searchParams.get('TENDER'); // P or CC? Need to test for debit card
  // const trxType = searchParams.get('TRXTYPE');
  const result = searchParams.get('RESULT'); // 0 is good, everything else means bad.
  const orderId = searchParams.get('ORDERID');
  // const secureTokenId = searchParams.get('SECURETOKENID');
  // const iavs = searchParams.get('IAVS');
  const billToCountry = searchParams.get('BILLTOCOUNTRY'); // billing_address_country
  const expDate = searchParams.get('EXPDATE'); // card exp
  const respMsg = searchParams.get('RESPMSG'); // payment_status
  const method = searchParams.get('METHOD'); // P or CC? Need to test for debit card
  const transTime = searchParams.get('TRANSTIME'); // payment_date
  // const hostCode = searchParams.get('HOSTCODE');
  const cardType = searchParams.get('CARDTYPE'); // card_brand
  const type = searchParams.get('TYPE');

  try {
    // Take the order and update orders
    const order = mapPaypalCreditCardToOrder(searchParams);
    const updatedOrder = await updateAdminPanelOrder(order, orderId);

    // Check on RESPMSG = 'Approved' or I guess result???

    // Maybe check if METHOD = 'CC'  vs 'P'

    // CC should save
    /*
      Secure token, acct, pnref 
    */
    // I think  for 'P' can save billing stuff from them

    // If not approved or not result 0, then maybe throw an error? or at least log the searhc params and see what's up

    // Remember to test failures and errors and handle those accordingly

    const redirectUrl = `${coverlandUrl}/thank-you?order_number=${orderId}&payment_gateway=paypal`;
    const htmlContent = `
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Redirecting...</title>
   </head>
   <body>
     <script>
       if (window.top !== window.self) {
         window.top.location.href = '${redirectUrl}';
       } else {
         window.location.href = '${redirectUrl}';
       }
     </script>
   </body>
   </html>
 `;
    return new Response(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (err) {
    console.log('Err at Create Order: ', err);
    return new Response('Order creation error', {
      status: 500,
    });
  }
}

const mapPaypalCreditCardToOrder = (searchParams: URLSearchParams) => {
  // const tax = searchParams.get('TAX');
  const secureToken = searchParams.get('SECURETOKEN');
  // const avsData = searchParams.get('AVSDATA');
  const country = searchParams.get('COUNTRY');
  const amount = searchParams.get('AMT'); // card_amount
  const account = searchParams.get('ACCT'); // 4 digit card number
  // const authCode = searchParams.get('AUTHCODE');
  const pnRef = searchParams.get('PNREF'); // transaction_id
  // const tender = searchParams.get('TENDER'); // P or CC? Need to test for debit card
  // const trxType = searchParams.get('TRXTYPE');
  const result = searchParams.get('RESULT'); // 0 is good, everything else means bad.
  const orderId = searchParams.get('ORDERID');
  // const secureTokenId = searchParams.get('SECURETOKENID');
  // const iavs = searchParams.get('IAVS');
  const billToCountry = searchParams.get('BILLTOCOUNTRY'); // billing_address_country
  const expDate = searchParams.get('EXPDATE'); // card exp
  const respMsg = searchParams.get('RESPMSG'); // payment_status
  const method = searchParams.get('METHOD'); // P or CC? Need to test for debit card
  const transTime = searchParams.get('TRANSTIME'); // payment_date
  // const hostCode = searchParams.get('HOSTCODE');
  const cardType = searchParams.get('CARDTYPE'); // card_brand
  const type = searchParams.get('TYPE');

  return {
    order_id: orderId,
    // order_date: create_time,
    total_amount: amount,
    currency: 'usd',
    status: respMsg === 'Approved' ? 'COMPLETED' : respMsg,
    payment_gateway: 'paypal',
    transaction_id: pnRef,
    payment_status: respMsg,
    payment_method_id: '',
    payment_method: 'card',
    card_amount: amount,
    card_brand: cardTypes[cardType || ""],
    // card_fingerprint: payments.captures[0].id,
    // card_funding: card?.funding, // credit
    // customer_id,
    // payment_gateway_customer_id: payer.payer_id,
    payment_date: transTime,
    // customer_name: shipping?.name?.full_name,
    // customer_email: payment_source?.paypal?.email_address,
    // customer_phone: phone || '', // currently don't actually see phone number
    // shipping_address_line_1: shipping?.address?.address_line_1,
    // shipping_address_line_2: shipping?.address?.address_line_2 || '', // currnetly don't see it
    // shipping_address_city: shipping?.address?.admin_area_2,
    // shipping_address_state: shipping?.address?.admin_area_1,
    // shipping_address_postal_code: shipping?.address?.postal_code,
    shipping_address_country: country,
    // billing_address_line_1:
    //   payment_source?.paypal?.address?.address_line_1 || '', // Currnetly don't see different billing
    // billing_address_line_2:
    //   payment_source?.paypal?.address?.address_line_2 || '', // currnetly don't see it // Currnetly don't see different billing
    // billing_address_city: payment_source?.paypal?.address?.admin_area_2 || '', // Currnetly don't see different billing
    // billing_address_state: payment_source?.paypal?.address?.admin_area_1 || '', // Currnetly don't see different billing
    // billing_address_postal_code:
    //   payment_source?.paypal?.address?.postal_code || '', // Currnetly don't see different billing
    billing_address_country: billToCountry, // Currnetly don't see different billing
    updated_at: getCurrentTimeInISOFormat(),
  };
};

const cardTypes: Record<string, string> = {
  '0': 'Visa',
  '1': 'Mastercard',
  '2': 'Discover',
  '3': 'American Express',
  '4': "Diner's Club",
  '5': 'JCB',
  '9': 'Maestro (Switch)',
};

/*
  Example Paypal CC 
  {
        'BILLTOCOUNTRY' => 'US',
        'SECURETOKEN' => '4wQdtsMLfwU2luUNGtk1dXgev',
        'RESPMSG' => 'Approved',
        'AMT' => '1.02',
        'TRANSTIME' => '2024-08-06 15:36:50',   
        'TAX' => '0.00',
        'TRXTYPE' => 'S',
        'ACCT' => '0005',
        'SECURETOKENID' => '5fe499ff1c8f400e9364c639f82f24b2',
        'AVSDATA' => 'XXN',
        'ORDERID' => 'CL-TEST-124',
        'TENDER' => 'CC',
        'COUNTRY' => 'US',
        'EXPDATE' => '1234',
        'HOSTCODE' => '00',
        'IAVS' => 'N',
        'METHOD' => 'CC',
        'PNREF' => 'B93S0FA19E99',
        'CARDTYPE' => '3',
        'TYPE' => 'S',
        'RESULT' => '0',
        'AUTHCODE' => '01010A' },
      hash: ''
    }
*/
