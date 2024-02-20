'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { sendGTMEvent } from '@next/third-parties/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsFillEnvelopeFill } from 'react-icons/bs';

export const OrderConfirmationContent = ({
  orderNumber,
  items,
}: {
  orderNumber: string;
  items: any;
}) => {
  const [mounted, isMounted] = useState(false);

  useEffect(() => {
    isMounted(true);
  }, []);

  if (orderNumber.includes('test') && mounted) {
    sendGTMEvent({
      event: 'order_confirmation',
      value: items[0].total,
      transaction_id: orderNumber,
      items: items[0].skus,
    });
    console.log('GTM event sent');
  }

  mounted && console.log('items', items);

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
