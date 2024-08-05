import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const partner = process.env.PAYPAL_PAYFLOW_PARTNER;
const pwd = process.env.PAYPAL_PAYFLOW_PWD;
const vendor = process.env.PAYPAL_PAYFLOW_VENDOR;
const user = process.env.PAYPAL_PAYFLOW_USER;
export default async function PaypalForm() {
  const uuid = uuidv4().replace(/-/g, '');

  console.log('uuidv4', uuid);
  const getSecureToken = async () => {
    try {
      const response = await fetch('https://pilot-payflowpro.paypal.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Set the content type to URL-encoded form data
        },
        // No CC
        body: `PARTNER=${partner}&PWD=${pwd}&VENDOR=${vendor}&USER=${user}&TENDER=C&TRXTYPE=S&AMT=1.03&CREATESECURETOKEN=Y&SECURETOKENID=${uuid}&ORDERNUMBER=CL-TEST-WY-123`,
      });
      const result = await response.text();
      console.log(result);
      const params = new URLSearchParams(result);

      // Extract the SECURETOKEN value
      const secureToken = params.get('SECURETOKEN');

      if (secureToken) {
        console.log('Secure Token:', secureToken); // Output: Secure Token: 4Zj4CVU6ANEKHgXENZl9YgAoE
        return secureToken;
      } else {
        console.error('Secure Token not found in the response.');
        return '';
      }
      // Handle the response from the server
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };
  const secureToken = await getSecureToken();

  return (
    <div>
      Paypal
      <iframe
        src={`https://pilot-payflowlink.paypal.com/?SECURETOKEN=${secureToken}&SECURETOKENID=${uuid}`}
        width="600"
        height="400"
        frameBorder="0"
        allowtransparency="true"
      >
        Your browser does not support iframes.
      </iframe>
      {/* <input type="hidden" name="LOGIN" value="2coverland" /> */}
      {/* <input type="hidden" name="PARTNER" value="hps" /> */}
      {/* <form
        action={`https://pilot-payflowlink.paypal.com/?SECURETOKEN=${secureToken}&SECURETOKENID=${uuid}`}
        method="POST"
      >
        <input type="hidden" name="AMOUNT" value="10.00" />
        <input type="hidden" name="TYPE" value="S" />
        <input
          type="hidden"
          name="DESCRIPTION"
          value="YourProductDescription"
        />
        <input type="hidden" name="INVOICE" value="UniqueInvoiceID" />
        <input type="hidden" name="CURRENCY" value="USD" />
        <input
          type="hidden"
          name="RETURNURL"
          value="http://localhost:3000/checkout/thank-you"
        />
        <input
          type="hidden"
          name="CANCELURL"
          value="http://localhost:3000/checkout/cancel"
        />
        <input
          type="hidden"
          name="ERRORURL"
          value="http://localhost:3000/checkout/error"
        />
        <input type="submit" value="Pay Now" />
      </form> */}
    </div>
  );
}

// https://payflowlink.paypal.com/?SECURETOKEN=1aMXeBlOlj0K618SbEBPsAQpG&SECURETOKENID=5469e06a7c364d21a3bac1d6a17542c6
