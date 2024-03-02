import { Suspense } from 'react';
import { OrderConfirmationContent } from './components/OrderConfirmationContent';
import { redirect } from 'next/navigation';
import { supabaseDatabaseClient } from '@/lib/db/supabaseClients';

async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { 'order-number': string };
}) {
  const orderNumber = searchParams?.['order-number'];

  if (!orderNumber) {
    return redirect('/');
  }

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

  await handleOrderCompletion();
  const items = await getOrderInfo();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent orderNumber={orderNumber} items={items} />
    </Suspense>
  );
}

export default OrderConfirmationPage;
