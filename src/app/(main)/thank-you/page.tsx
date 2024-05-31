
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
import { updateAdminPanelOrder } from '@/lib/db/admin-panel/orders';

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
    // Get payment intent & payment method.
    const paymentIntent = await getPaymentIntent(payment_intent);
    const { payment_method } = paymentIntent;
    const paymentMethod = await getPaymentMethod(payment_method as string);

    // Make customer info
    const customerInput = mapPaymentMethodToCustomer(
      paymentIntent as PaymentIntent,
      paymentMethod as PaymentMethod
    );

    // Create customer in customers table (this will only work for stripe ATM)
    const createdCustomer = (await createOrUpdateUser(customerInput)) || [];
    const mappedOrder = mapPaymentIntentAndMethodToOrder(
      paymentIntent as PaymentIntent,
      paymentMethod as PaymentMethod,
      createdCustomer[0].id
    );

    // Update Order in Orders table
    const updatedOrderResponse = await updateAdminPanelOrder(
      mappedOrder,
      mappedOrder.order_id
    );

    // Add To OrderItem Table
    // await postAdminPanelOrderItem(
    //   updatedOrderResponse[0].id,
    //   paymentIntent.metadata.skusWithQuantity
    // );
  } else if (payment_gateway === 'paypal') {
    // If Paypal needs to do something here...
    // Oh, order items and customer have to be updated here

    // JK. Probably do whatever needs to be done here in PayPalButtonSection.tsx onApprove 
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
