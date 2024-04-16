import { Suspense } from 'react';
import { OrderConfirmationContent } from './components/OrderConfirmationContent';
import { supabaseDatabaseClient } from '@/lib/db/supabaseClients';
import { mapPaymentIntentAndMethodToOrder, mapPaymentMethodToCustomer } from '@/lib/utils/adminPanel';
import { createOrUpdateUser } from '@/lib/db/admin-panel/customers';

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

  // Get Payment Intent
  // If have time, extract this from API. Don't need
  const paymentIntentResponse = await fetch(
    `http://localhost:3000/api/stripe/payment-intent/${payment_intent}`
  );
  const { paymentIntent } = await paymentIntentResponse.json();

  // Get Payment Method
  // If have time, extract this from API. Don't need
  const { payment_method } = paymentIntent;
  const paymentMethodResponse = await fetch(
    `http://localhost:3000/api/stripe/payment-method/${payment_method}`
  );
  const { paymentMethod } = await paymentMethodResponse.json();


  // Customers Goes Here

  const customerInput = mapPaymentMethodToCustomer(paymentMethod)
  const createdCustomer = createOrUpdateUser(customerInput)
  // const createdCustomer = await fetch(
  //   `http://localhost:3000/api/admin-panel/users/`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
        
        
  //     }),
  //   }
  // );






  // Update Order Table
  // If have time, extract this from API. Don't need
  const mappedOrder = mapPaymentIntentAndMethodToOrder(
    paymentIntent,
    paymentMethod
  );
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

  // const orderNumber = searchParams?.['order-number'];

  // if (!orderNumber) {
  //   return redirect('/');
  // }

  async function handleOrderCompletion() {
    const orderTable = orderNumber?.includes('test')
      ? 'Test-Orders'
      : '_Orders';
    const { error } = await supabaseDatabaseClient
      .from(orderTable)
      .update({
        is_complete: true,
      })
      .eq('order_id', orderNumber);

    if (error) {
      console.error('Error updating order status:', error);
    }
    console.log('Order status updated');
  }

  async function getOrderInfo() {
    const orderTable = orderNumber?.includes('test')
      ? 'Test-Orders'
      : '_Orders';
    const { data, error } = await supabaseDatabaseClient
      .from(orderTable)
      .select('skus, total')
      .eq('order_id', orderNumber);

    if (error) {
      console.error('Error fetching order info:', error);
    }

    return data;
  }

  // await handleOrderCompletion();
  // const items = await getOrderInfo();

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
