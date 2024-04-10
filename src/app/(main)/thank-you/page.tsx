import { Suspense } from 'react';
import { OrderConfirmationContent } from './components/OrderConfirmationContent';
import { supabaseDatabaseClient } from '@/lib/db/supabaseClients';
import StripeElementWrapper from '@/app/wrappers/StripeElementWrapper';

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
  const clientSecret = searchParams.payment_intent_client_secret;
  const orderNumber = searchParams['order-number'];
  if (!clientSecret) {
    return;
  }

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
      <StripeElementWrapper clientSecret={clientSecret}>
        <OrderConfirmationContent
          orderNumber={orderNumber}
          clientSecret={clientSecret}
        />
      </StripeElementWrapper>
    </Suspense>
  );
}

export default OrderConfirmationPage;
