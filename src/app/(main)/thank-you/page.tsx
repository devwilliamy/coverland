import { Suspense } from 'react';
import { OrderConfirmationContent } from './components/OrderConfirmationContent';
import { redirect } from 'next/navigation';
import { handleAddOrderId } from '@/app/api/utils/orders';

async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { 'order-number': string } | undefined;
}) {
  const orderNumber = searchParams?.['order-number'];

  if (!orderNumber) {
    return redirect('/');
  }

  const validOrderNumber =
    (orderNumber?.length === 9 &&
      !isNaN(Number(orderNumber?.slice(3))) &&
      orderNumber?.slice(0, 3) === 'CL-') ||
    orderNumber?.slice(0, 5) === 'CL-P-';
  console.log(validOrderNumber);

  if (validOrderNumber) await handleAddOrderId(orderNumber);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent orderNumber={orderNumber} />
    </Suspense>
  );
}

export default OrderConfirmationPage;
