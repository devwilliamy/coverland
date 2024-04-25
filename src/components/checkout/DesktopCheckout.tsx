import { useCheckoutContext } from '@/contexts/CheckoutContext';
import CheckoutSummarySection from './CheckoutSummarySection';
import OrderReview from './OrderReview';
import { CheckoutStep } from '@/lib/types/checkout';
import YourCart from './YourCart';
import Shipping from './Shipping';
import Payment from './Payment';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useState } from 'react';
import CartHeader from './CartHeader';

export default function DesktopCheckout() {
  const { currentStep } = useCheckoutContext();
  const [value, setValue] = useState(['shipping']);

  const handleChangeAccordion = (value: string) =>
    setValue((p) => [...p, value]);

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

  const handleEmailClicl = async () => {
    const response = await fetch('/api/email/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  return (
    <>
      <button onClick={handleEmailClicl}>Send Mail</button>
      <div className="flex flex-col md:flex md:flex-row md:gap-12 md:px-12 lg:px-12 lg:py-4">
        <div className="w-2/3">
          {currentStep === CheckoutStep.CART ? (
            <>
              <CartHeader />
              <YourCart />
            </>
          ) : (
            <>
              <Accordion
                type="multiple"
                // collapsible
                className="w-full"
                value={value}
                onValueChange={setValue}
              >
                <AccordionItem value="shipping">
                  <AccordionTrigger className="-mt-2 mb-4 px-4 text-xl font-medium">
                    Shipping
                  </AccordionTrigger>
                  <AccordionContent>
                    <Shipping
                      handleChangeAccordion={handleChangeAccordion}
                      handleSelectTab={handleSelectTab}
                    />
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
            </>
          )}
        </div>
        <div className="hidden lg:flex lg:w-1/3 lg:flex-col">
          <CheckoutSummarySection />
          <OrderReview />
        </div>
      </div>
    </>
  );
}
