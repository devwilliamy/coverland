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
import { useState } from 'react';

export default function MobileCheckout() {
  const { currentStep } = useCheckoutContext();
  const [value, setValue] = useState(['shipping']);
  const handleSelectTab = (title: string) => {
    if (document) {
      const el = document.getElementById(title);
      const elTop = el?.offsetTop as number - 200;
      const timeout = value.includes("payment") ? 0 : 250
      console.log("elTop", elTop)
      setTimeout(() => {
        window.scrollTo({
          top: elTop as number,
          behavior: 'smooth',
        });
      }, timeout);
    }
  };

  const handleChangeAccordion = (value: string) => setValue((p) => [...p, value]);
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-24">
        <CartHeader />
        <Separator className="mt-5 w-full bg-[#C8C7C7]" />
        {/* <div> */}
        <Accordion
          type="multiple"
          // collapsible
          className="w-full"
          value={value}
          onValueChange={setValue}
        >
          <AccordionItem value="cart">
            <AccordionTrigger className="my-4 px-4 text-xl font-medium">
              In Your Cart
            </AccordionTrigger>
            <AccordionContent>
              <YourCart />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger className="my-4 px-4 text-xl font-medium">
              Shipping
            </AccordionTrigger>
            <AccordionContent>
              <Shipping handleChangeAccordion={handleChangeAccordion} handleSelectTab={handleSelectTab} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment" id="payment">
            <AccordionTrigger className="my-4 px-4 text-xl font-medium">
              Payment
            </AccordionTrigger>
            <AccordionContent>
              <Payment />
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
