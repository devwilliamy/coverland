import { Suspense } from 'react';
import { OrderConfirmationContent } from './components/OrderConfirmationContent';
import {
  mapPaymentIntentAndMethodToOrder,
  mapPaymentMethodToCustomer,
} from '@/lib/utils/adminPanel';
import { createOrUpdateUser } from '@/lib/db/admin-panel/customers';
import { getPaymentIntent } from '@/lib/stripe/paymentIntent';
import { getPaymentMethod } from '@/lib/stripe/paymentMethod';
import { PaymentIntent, PaymentMethod } from '@stripe/stripe-js';
// import { Button } from '@/components/ui/button';
// import { redirect } from 'next/navigation';

type PaymentIntentSuccessParams = {
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: string;
    order_number: string;
    payment_gateway?: 'paypal' | 'stripe';
  };
};

async function OrderConfirmationPage({
  searchParams,
}: PaymentIntentSuccessParams) {
  const payment_intent = searchParams.payment_intent;
  const clientSecret = searchParams.payment_intent_client_secret;
  const orderNumber = searchParams.order_number;
  const payment_gateway = searchParams.payment_gateway || '';
  // tbh don't really need this maybe send in a stripe payment_gateway
  if (clientSecret) {
    const paymentIntent = await getPaymentIntent(payment_intent);

    const { payment_method } = paymentIntent;
    const paymentMethod = await getPaymentMethod(payment_method as string);

    const customerInput = mapPaymentMethodToCustomer(
      paymentMethod as PaymentMethod
    );
    const createdCustomer = (await createOrUpdateUser(customerInput)) || [];

    const mappedOrder = mapPaymentIntentAndMethodToOrder(
      paymentIntent as PaymentIntent,
      paymentMethod as PaymentMethod
    );

    console.log('Stripe Complete:', {
      paymentIntent,
      paymentMethod,
      createdCustomer,
    });

    // const updatedOrder = await updatedOrderResponse(mappedOrder, order_id, customer_id)
    const updatedOrderResponse = await fetch(
      `http://localhost:3000/api/admin-panel/orders/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: mappedOrder,
          order_id: mappedOrder.order_id,
          customer_id: createdCustomer.length > 1 && createdCustomer[0].id,
        }),
      }
    );

    const { data: updatedOrder } = await updatedOrderResponse.json();

    // Add To OrderItem Table
    await fetch(`http://localhost:3000/api/admin-panel/order-items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: updatedOrder[0].id,
        skusWithQuantity: paymentIntent.metadata.skusWithQuantity,
      }),
    });
  } else if (payment_gateway === 'paypal') {
    // If Paypal needs to do something here...
  } else {
    return (
      <div className="flex flex-row items-center justify-center py-10 text-xl font-bold">
        Order not found
        {/* <Button onClick={() => redirect('/')}>Return Home</Button> */}
      </div>
    );
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent orderNumber={orderNumber} />
    </Suspense>
  );
}

export default OrderConfirmationPage;
