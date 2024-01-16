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
import blackLogo from '@/images/logos/logo-black.png';
import Image from 'next/image';

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
    <Card className="flex flex-col items-center px-[10vh] my-10 rounded-none border-0 shadow-transparent">
      <Card
        className="flex flex-col text-left
        rounded-none border-0 shadow-transparent
        "
      >
        <div
          className="flex w-full justify-center
        border-t-2 border-t-gray-300 border-b-2
        border-b-gray-300 py-[4.5vh]
        
        "
        >
          <Image alt="black-coverland-logo " src={blackLogo} />
        </div>
        <CardHeader className="p-0  ">
          <CardDescription className="my-10 text-2xl font-thin">
            Order #<span>{orderNumber}</span>
          </CardDescription>
        </CardHeader>
        <CardTitle className="text-6xl font-black uppercase">
          Thanks for your order NAME
        </CardTitle>

        <CardContent className="
        my-10 w-full p-0 text-left
        border-b-2 border-b-gray-300
        ">
          <p className="text-2xl font-black text-black ">
            Placed Month D, YYYY
          </p>
          <p className="mt-5 text-2xl font-thin text-gray-500 mb-[5vh]">
            Sit back and let us handle it. We'll reach out soon to let you know
            order has shipped.
          </p>
        </CardContent>
        <CardFooter
          className="flex flex-col items-start gap-[2vh] p-0 pb-[5vh]
         text-left border-b-2 border-b-gray-300
         "
        >
          <p className=""> Call Us toll-free: </p>
          <p className=""> 1-800-799-5164 </p>
          <p className=""> Mon-Fri 9am-5pm PST </p>
          <div className="flex items-center gap-2">
            <BsFillEnvelopeFill color="#000000" size={15} />
            <a href='mailto:info@coverland.com' className="hover-underline-animation">info@coverland.com</a>
          </div>
        </CardFooter>
      </Card>
    </Card>
  );
}

export default OrderConfirmationPage;
