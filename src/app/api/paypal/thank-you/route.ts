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
  const searchParams = req.nextUrl.searchParams;
  const body = await req.text();
  console.log('searchParams', searchParams);
  const orderId = searchParams.get('ORDERID');
  const method = searchParams.get('METHOD'); // P or CC? Need to test for debit card
  const respMsg = searchParams.get('RESPMSG'); // payment_status

  if (respMsg !== 'Approved') {
    console.warn('Response Message Not Approved: ', searchparams);
  }
  try {
    const order =
      method === 'P'
        ? mapPaypalExpressCheckoutToorder(searchParams)
        : mapPaypalCreditCardToOrder(searchParams);
    const updatedOrder = await updateAdminPanelOrder(order, orderId);

    const redirectUrl = `${coverlandUrl}/thank-you?order_number=${orderId}&payment_gateway=paypal`;
    // If iframe window URL not the same as parent URL, propogate to parent
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
    card_brand: cardTypes[cardType || ''],
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
  Paypal Express Example
  searchParams URLSearchParams {
  'BILLTOCOUNTRY' => 'US',
  'AVSADDR' => 'Y',
  'TRANSTIME' => '2024-08-06 16:27:19',
  'TAX' => '0.00',
  'FIRSTNAME' => 'John',
  'EMAIL' => 'sb-fjfzf23357734@personal.example.com',
  'COUNTRYTOSHIP' => 'US',
  'AVSZIP' => 'Y',
  'STATETOSHIP' => 'CA',
  'SECURETOKENID' => '4d4096b775c64fc4a139db110e65dd0d',
  'AVSDATA' => 'YYY',
  'ORDERID' => 'CL-TEST-PRE-240806-SE-0546',    
  'TENDER' => 'P',
  'COUNTRY' => 'US',
  'LASTNAME' => 'Doe',
  'SHIPTOSTATE' => 'CA',
  'CORRELATIONID' => 'fe842a5e26d75',
  'TYPE' => 'S',
  'TOKEN' => 'EC-68G78087P0546740R',
  'FEEAMT' => '13.75',
  'SHIPTOZIP' => '95131',
  'BILLTOFIRSTNAME' => 'John',
  'ADDRESSTOSHIP' => '1 Main St',
  'CITYTOSHIP' => 'San Jose',
  'NAMETOSHIP' => 'John Doe',
  'SECURETOKEN' => '5nxo4ZPVHekun9VpG4OLi5gyP', 
  'SHIPTOCITY' => 'San Jose',
  'RESPMSG' => 'Approved',
  'BILLTOEMAIL' => 'sb-fjfzf23357734@personal.example.com',
  'AMT' => '379.90',
  'TRXTYPE' => 'S',
  'SHIPTOSTREET' => '1 Main St',
  'PENDINGREASON' => 'completed',
  'NAME' => 'John Doe',
  'SHIPTOCOUNTRY' => 'US',
  'PAYMENTTYPE' => 'instant',
  'PAYERID' => '4QVRTNUKY98CA',
  'ZIPTOSHIP' => '95131',
  'BILLTONAME' => 'John Doe',
  'TXID' => '10K11863PU5776713',
  'METHOD' => 'P',
  'PNREF' => 'B3PP3CE849BA',
  'BILLTOLASTNAME' => 'Doe',
  'RESULT' => '0',
  'PPREF' => '10K11863PU5776713' }
*/
const mapPaypalExpressCheckoutToorder = (searchParams: URLSearchParams) => {
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
  // Express Checkout Unique Below
  const avsAddr = searchParams.get('AVSADDR');
  const firstName = searchParams.get('FIRSTNAME');
  const email = searchParams.get('EMAIL');
  // const countryToShip = searchParams.get('COUNTRYTOSHIP'); // For Shipping we are taking from the website per CK
  const avsZip = searchParams.get('AVSZIP');
  // const stateToShip = searchParams.get('STATETOSHIP'); // For Shipping we are taking from the website per CK
  const lastName = searchParams.get('LASTNAME');
  // const shipToState = searchParams.get('SHIPTOSTATE'); // For Shipping we are taking from the website per CK
  // const correlationId = searchParams.get('CORRELATIONID');
  // const token = searchParams.get('TOKEN');
  const feeAmt = searchParams.get('FEEAMT');
  // const shipToZip = searchParams.get('SHIPTOZIP'); // For Shipping we are taking from the website per CK
  const billToFirstName = searchParams.get('BILLTOFIRSTNAME');
  // const addressToShip = searchParams.get('ADDRESSTOSHIP'); // For Shipping we are taking from the website per CK
  // const cityToShip = searchParams.get('CITYTOSHIP'); // For Shipping we are taking from the website per CK
  // const nameToShip = searchParams.get('NAMETOSHIP'); // For Shipping we are taking from the website per CK
  // const shipToCity = searchParams.get('SHIPTOCITY'); // For Shipping we are taking from the website per CK
  const billToEmail = searchParams.get('BILLTOEMAIL');
  // const shipToStreet = searchParams.get('SHIPTOSTREET'); // For Shipping we are taking from the website per CK
  const pendingReason = searchParams.get('PENDINGREASON');
  // const name = searchParams.get('NAME');
  // const shipToCountry = searchParams.get('SHIPTOCOUNTRY'); // For Shipping we are taking from the website per CK
  const paymentType = searchParams.get('PAYMENTTYPE'); // payment_method
  const payerId = searchParams.get('PAYERID'); // payment_gateway_customer_id
  // const zipToShip = searchParams.get('ZIPTOSHIP');
  const billToName = searchParams.get('BILLTONAME');
  // const txId = searchParams.get('TXID'); // payment_method_id
  // const billToLastName = searchParams.get('BILLTOLASTNAME');
  const ppRef = searchParams.get('PPREF'); // payment_method_id

  return {
    order_id: orderId,
    // order_date: create_time,
    total_amount: amount,
    currency: 'usd',
    status: respMsg === 'Approved' ? 'COMPLETED' : respMsg,
    payment_gateway: 'paypal',
    transaction_id: pnRef,
    payment_status: respMsg,
    payment_method_id: ppRef,
    payment_method: paymentType,
    card_amount: amount,
    // card_brand: cardTypes[cardType || ''],
    // card_fingerprint: payments.captures[0].id,
    // card_funding: card?.funding, // credit
    // customer_id,
    payment_gateway_customer_id: payerId,
    payment_date: transTime,
    // customer_name: shipping?.name?.full_name,
    // customer_email: payment_source?.paypal?.email_address,
    // customer_phone: phone || '', // currently don't actually see phone number
    // shipping_address_line_1: shipping?.address?.address_line_1,
    // shipping_address_line_2: shipping?.address?.address_line_2 || '', // currnetly don't see it
    // shipping_address_city: shipping?.address?.admin_area_2,
    // shipping_address_state: shipping?.address?.admin_area_1,
    // shipping_address_postal_code: shipping?.address?.postal_code,
    // shipping_address_country: country,
    billing_customer_name: billToName,
    // billing_address_line_1:
    // payment_source?.paypal?.address?.address_line_1 || '', // Currnetly don't see different billing
    // billing_address_line_2:
    // payment_source?.paypal?.address?.address_line_2 || '', // currnetly don't see it // Currnetly don't see different billing
    // billing_address_city: payment_source?.paypal?.address?.admin_area_2 || '', // Currnetly don't see different billing
    // billing_address_state: payment_source?.paypal?.address?.admin_area_1 || '', // Currnetly don't see different billing
    // billing_address_postal_code:
    // payment_source?.paypal?.address?.postal_code || '', // Currnetly don't see different billing
    billing_address_country: billToCountry, // Currnetly don't see different billing
    updated_at: getCurrentTimeInISOFormat(),
    notes: pendingReason,
  };
};
