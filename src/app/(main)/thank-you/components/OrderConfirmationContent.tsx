'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TEST_ORDER_NUMBER } from '@/lib/constants';
import { sendGTMEvent } from '@next/third-parties/google';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { BsFillEnvelopeFill } from 'react-icons/bs';

export const OrderConfirmationContent = ({
  orderNumber,
}: {
  orderNumber: string;
}) => {
  const [mounted, isMounted] = useState(false);

  useEffect(() => {
    isMounted(true);
  }, []);
  if (orderNumber === TEST_ORDER_NUMBER && mounted) {
    sendGTMEvent('event', 'order_confirmation', {
      value: 150,
      send_to: 'MlBiCOLG7JMZEJjesJIB',
      transaction_id: orderNumber,
    });
    sendGTMEvent({
      event: 'order_confirmation',
      value: 150,
      send_to: 'MlBiCOLG7JMZEJjesJIB',
      transaction_id: orderNumber,
    });
    console.log('GTM event sent');
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
