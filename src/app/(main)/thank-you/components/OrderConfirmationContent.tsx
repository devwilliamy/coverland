'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useGetStripePaymentIntent from '@/hooks/useGetStripePaymentIntent';
import { useThankYouViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useCartContext } from '@/providers/CartProvider';
import { sendGTMEvent } from '@next/third-parties/google';
import { useStripe } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsFillEnvelopeFill } from 'react-icons/bs';
// const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type OrderConfirmationContentProps = {
  // orderNumber: string;
  items: any;
  clientSecret: string;
};

export const OrderConfirmationContent = ({
  // orderNumber,
  items,
  clientSecret,
}: OrderConfirmationContentProps) => {
  const [mounted, isMounted] = useState(false);
  const [message, setMessage] = useState('');
  // const [orderNumber, setOrderNumber] = useState('');
  const stripe = useStripe();

  const { clearLocalStorageCart } = useCartContext();
  const { orderNumber } = useGetStripePaymentIntent();

  useEffect(() => {
    isMounted(true);
    // clearLocalStorageCart();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await stripe?.retrievePaymentIntent(clientSecret);
      const paymentIntent = response?.paymentIntent;
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    };
    if (stripe) {
      fetchData();
    } else {
      console.log('No stripe found');
    }
  }, [stripe, clientSecret]);

  useThankYouViewedGoogleTag(items, orderNumber);

  mounted &&
    !!items &&
    sendGTMEvent({
      event: 'order_confirmation',
      value: items[0]?.total,
      transaction_id: orderNumber,
      items: items[0]?.skus,
    });

  return (
    <Card className="text-center">
      <CardHeader>
        Message: {message}
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
