import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { BsFillEnvelopeFill } from 'react-icons/bs';

type OrderConfirmationContentProps = {
  orderNumber: string;
};

export const OrderConfirmationContent = ({
  orderNumber,
}: OrderConfirmationContentProps) => {

  // useThankYouViewedGoogleTag(orderNumber);

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
          Your order confirmation has been sent to your email. 
          Please contact us
          if you need any support.
        </p>
      </CardContent>
      <CardFooter className="text-center">
        <Link
          href="mailto:cs@coverland.com"
          target="_blank"
          className="flex w-full items-center justify-center text-center"
        >
          <BsFillEnvelopeFill color="#000000" size={15} />
          <p className="hover-underline-animation ml-2 xl:ml-4">
            cs@coverland.com
          </p>
        </Link>
      </CardFooter>
    </Card>
  );
};
