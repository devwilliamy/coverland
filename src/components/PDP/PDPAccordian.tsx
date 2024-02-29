import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { track } from '@vercel/analytics';

export function PDPAccordion() {
  return (
    <>
      <div className="min-h-[60vh] bg-[#F9F9FB] px-2 md:p-8 lg:max-h-none lg:p-14">
        <h3 className="hidden text-center text-2xl font-black uppercase text-[#1A1A1A] md:text-3xl lg:text-5xl">
          q&a
        </h3>
        <Accordion type="single" collapsible className="w-full ">
          <div className=" hidden h-[137px] w-full flex-col text-center text-[45px] font-black lg:flex  ">
            Q&A
          </div>
          <AccordionItem value="item-1">
            <AccordionTrigger
              className="text-left text-base font-black  text-[#1A1A1A] md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() =>
                track('Opened Q&A:Why is this car cover a good choice?')
              }
            >
              Why is this car cover a good choice?
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              If you are looking for the best of the best on the market,
              you&apos;ve found the right one. Engineered to fight off rain,
              sun, and dust, it keeps your car in pristine condition for years.
              It&apos;s a must-have for long-lasting car care protection.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              className="py-4 text-left text-base font-black text-[#1A1A1A] md:py-6 md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() =>
                track('Opened Q&A:How many laters does your car cover have?')
              }
            >
              How many layers does your car cover have?
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              Our car cover features a cutting-edge single-layer design, free of
              bonding welds, offering all the benefits of multilayered materials
              without the drawbacks. This design forms a tight bond, eliminating
              the risk of material separation and ensuring optimal performance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger
              className="py-4 text-left text-base font-black text-[#1A1A1A] md:py-6 md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() =>
                track('Opened Q&A:What special features does this cover have?')
              }
            >
              What special features does this cover have?{' '}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              Beyond weather protection, it also guards against bird droppings
              and tree sap. Additionally, this car cover&apos;s design prevents
              moisture buildup, ensuring top-tier care for your car.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger
              className="py-4 text-left text-base font-black text-[#1A1A1A] md:py-6 md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() => track('Opened Q&A:Will this fit my car?')}
            >
              Will this fit my car?{' '}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              Our car covers are specially designed for a precise fit, offering
              ultimate protection for your vehicle.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger
              className="py-4 text-left text-base font-black text-[#1A1A1A] md:py-6 md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() =>
                track('Opened Q&A:What if I&apos;m not happy with it?')
              }
            >
              What if I&apos;m not happy with it?{' '}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              No worries! We prioritize your happiness. If you&apos;re not
              completely satisfied, you&apos;re covered by our free 30-day
              return policy, along with a 60-day full money-back guarantee. Shop
              with confidence!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger
              className="py-4 text-left text-base font-black text-[#1A1A1A] md:py-6 md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() =>
                track(
                  'Opened Q&A:Is it safe to leave my car covered outside in heavy rain?'
                )
              }
            >
              Is it safe to leave my car covered outside in heavy rain?{' '}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              Of course! You can leave your vehicle outdoors during heavy rain
              with this cover on. Our unique car covers are built with
              heavy-duty materials designed to protect your car from extreme and
              harsh weather conditions, including rain, snow, hail, and storms.
              The strong construction not only ensures all-weather protection
              but also safeguards against abrasion, thanks to a soft cotton
              inner lining.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger
              className="py-4 text-left text-base font-black text-[#1A1A1A] md:py-6 md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() =>
                track('Opened Q&A:Does this cover protect from the sun?')
              }
            >
              Does this cover protect from the sun?{' '}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              Yes. This car cover guarantees to provide you with 100% protection
              from the sun&apos;s heat and UV rays. We ensure that your
              car&apos;s interior temperature is regulated while protecting the
              exterior from any kind of damage.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger
              className="py-4 text-left text-base font-black text-[#1A1A1A] md:py-6 md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() =>
                track('Opened Q&A:Can I use your car cover on a windy day?')
              }
            >
              Can I use your car cover on a windy day?{' '}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              Yes, this car cover comes with three tie-down straps in the front,
              middle, and back, preventing the car cover from blowing away, even
              in winds of up to 50 mph.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger
              className="py-4 text-left text-base font-black text-[#1A1A1A] md:py-6 md:text-xl lg:py-8 lg:text-[28px]"
              onClick={() => track('Opened Q&A:When will I receive my order?')}
            >
              When will I receive my order?{' '}
            </AccordionTrigger>
            <AccordionContent className="text-sm font-normal text-[#1A1A1A] md:text-lg">
              We offer same-day shipping with a cut-off time at 2 pm PST. Your
              item will typically arrive within 1-5 business days after
              shipment.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* <Button className="flex h-12 w-[216px] mx-auto mt-9 text-lg hover:bg-transparent bg-[#1A1A1A] rounded border border-[#1A1A1A]  font-bold hover:text-[#1A1A1A] text-white uppercase">
          ask a question
        </Button>  */}
      </div>
    </>
  );
}
