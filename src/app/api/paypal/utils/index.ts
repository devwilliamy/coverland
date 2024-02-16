import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID ?? '';
const clientSecret = process.env.PAYPAL_SECRET_ID ?? '';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
export const PaypalClient = new paypal.core.PayPalHttpClient(environment);

export const paypalCreateOrder = async () => {
  try {
    const response = await fetch('/api/paypal', {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json', // Specify the content type in the headers
      },
      body: JSON.stringify({
        user_id: '123',
        order_price: 100,
      }), // Convert the JavaScript object to a JSON string
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Assuming the server responds with JSON
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const paypalCaptureOrder = async (orderID: string) => {
  try {
    const response = await fetch('/api/paypal/capture-order', {
      method: 'POST', // Specify the method
      headers: {
        'Content-Type': 'application/json', // Specify the content type in the headers
      },
      body: JSON.stringify({
        orderID,
      }), // Convert the JavaScript object to a JSON string
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
