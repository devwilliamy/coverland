import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { addOrderToDb } from '@/lib/db';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { BsFillEnvelopeFill } from 'react-icons/bs';

async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { 'order-number': string } | undefined;
}) {
  const orderNumber = searchParams?.['order-number'];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent orderNumber={orderNumber} />
    </Suspense>
  );
}

export default OrderConfirmationPage;

const OrderConfirmationContent = ({
  orderNumber,
}: {
  orderNumber: string | undefined;
}) => {
  if (!orderNumber) {
    redirect('/');
  }

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Thank you for your order!</CardTitle>
        <CardDescription>
          Your order number is: <span>{orderNumber}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Your order confirmation has been sent to your email. Please contact us
          if you need any support.
        </p>
      </CardContent>
      <CardFooter className="text-center">
        <Link
          href="mailto:info@coverland.com"
          target="_blank"
          className="flex w-full items-center justify-center text-center"
        >
          <BsFillEnvelopeFill color="#000000" size={15} />
          <p className="hover-underline-animation ml-2 xl:ml-4">
            info@coverland.com
          </p>
        </Link>
      </CardFooter>
    </Card>
  );
};
