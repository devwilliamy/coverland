import Payment from '@/components/checkout/Payment';
import Shipping from '@/components/checkout/Shipping';
import YourCart from '@/components/checkout/YourCart';
import { useCheckoutContext } from '@/contexts/CheckoutContext';
import { CheckoutStep } from '@/lib/types/checkout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import CartHeader from './CartHeader';
import { Separator } from '../ui/separator';

export default function MobileCheckout() {
  const { currentStep } = useCheckoutContext();
  const handleSelectTab = (title: string) => {
    if (document) {
      const el = document.getElementById(title);
      const elTop = el?.offsetTop;
      setTimeout(() => {
        window.scrollTo({
          top: elTop as number,
          behavior: 'instant',
        });
      }, 100);
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-24">
        <CartHeader />
        <Separator className="mt-5 w-full bg-[#C8C7C7]" />
        {/* <div> */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="my-4 px-4 text-xl font-medium">
              In Your Cart
            </AccordionTrigger>
            <AccordionContent>
              <YourCart />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <YourCart />
          <Shipping handleSelectTab={handleSelectTab} />
          <div className="pt-4">
            <div id="payment">
              {currentStep >= CheckoutStep.PAYMENT && <Payment />}
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
}
