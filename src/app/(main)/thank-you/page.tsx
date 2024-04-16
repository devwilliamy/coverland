import { Suspense } from 'react';
import { OrderConfirmationContent } from './components/OrderConfirmationContent';
import { supabaseDatabaseClient } from '@/lib/db/supabaseClients';
import { mapPaymentIntentAndMethodToOrder, mapPaymentMethodToCustomer } from '@/lib/utils/adminPanel';
import { createOrUpdateUser } from '@/lib/db/admin-panel/customers';
import { getPaymentIntent } from '@/lib/stripe/paymentIntent';
import { getPaymentMethod } from '@/lib/stripe/paymentMethod';
import { PaymentIntent, PaymentMethod } from '@stripe/stripe-js';

type PaymentIntentSuccessParams = {
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: string;
    'order-number': string;
  };
};

// Old one
type OrderConfirmationParams = {
  searchParams: { 'order-number': string };
};
async function OrderConfirmationPage({
  searchParams,
}: PaymentIntentSuccessParams) {
  const payment_intent = searchParams.payment_intent;
  const clientSecret = searchParams.payment_intent_client_secret;
  const orderNumber = searchParams['order-number'];
  if (!clientSecret) {
    return;
  }

  const paymentIntent = await getPaymentIntent(payment_intent)
  
  const { payment_method } = paymentIntent;
  const paymentMethod = await getPaymentMethod(payment_method as string)

  const customerInput = mapPaymentMethodToCustomer(paymentMethod as PaymentMethod)
  const createdCustomer = await createOrUpdateUser(customerInput) || []
  
  
  const mappedOrder = mapPaymentIntentAndMethodToOrder(
    paymentIntent as PaymentIntent,
    paymentMethod as PaymentMethod
  );

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
        customer_id: createdCustomer.length > 1 && createdCustomer[0].id
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <StripeElementWrapper clientSecret={clientSecret}> */}
      <OrderConfirmationContent
        orderNumber={orderNumber}
        clientSecret={clientSecret}
      />
      {/* </StripeElementWrapper> */}
    </Suspense>
  );
}

export default OrderConfirmationPage;
