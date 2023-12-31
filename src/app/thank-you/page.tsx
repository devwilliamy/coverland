import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { BsFillEnvelopeFill } from 'react-icons/bs';

function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { 'order-number': string } | undefined;
}) {
  console.log(searchParams);
  if (!searchParams || !searchParams['order-number']) {
    redirect('/');
  }
  const orderNumber = searchParams['order-number'];
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
          className="w-full text-center flex justify-center items-center"
        >
          <BsFillEnvelopeFill color="#000000" size={15} />
          <p className="ml-2 xl:ml-4 hover-underline-animation">
            info@coverland.com
          </p>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default OrderConfirmationPage;
