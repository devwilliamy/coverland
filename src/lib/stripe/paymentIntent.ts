import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const getPaymentIntent = async (paymentIntentId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId as string
  );
  return paymentIntent;
};

type UpdatePaymentIntentParams = {
  paymentIntentId: string;
  amount: number;
  metadata: any;
};

export const updateStripePaymentIntent = async ({
  paymentIntentId,
  amount,
  metadata,
}: UpdatePaymentIntentParams): Promise<void> => {
  try {
    const response = await fetch('/api/stripe/payment-intent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        amount,
        metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // You can parse and return the response data if needed
    // const data = await response.json();
    // return data;
  } catch (error) {
    console.error('Error updating payment intent:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
};
