'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

export function PDPAccordion() {
  return (
    <>
      <div className="bg-[#F9F9FB] px-2 py-4 md:p-8 lg:p-14">
        <h2 className="text-[#1A1A1A] font-black text-2xl md:text-3xl lg:text-5xl uppercase text-center">
          q&a
        </h2>
        <Separator className="my-8 opacity-30" />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-black text-[#1A1A1A] text-base md:text-xl lg:text-[28px] capitalize py-4 md:py-6 lg:py-8">
              Is putting this car cover on a hassle ?
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-lg font-normal text-[#1A1A1A]">
              We make buying the right cover simple and easy. Simply use our
              cover finder tool on the homepage to find the exact custom-fit car
              cover for your make and model. Once you insert the information,
              you will be directed to a page where you can choose from 2
              different options: standard versus premium. With over 120,000 car
              covers available, we have the exact custom-fit, tailored car cover
              for your vehicle, no matter the year, make, or model.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-black text-[#1A1A1A] text-base md:text-xl lg:text-[28px] capitalize py-4 md:py-6 lg:py-8">
              Guaranteed Durability & quality
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-lg font-normal text-[#1A1A1A]">
              We make sure to guarantee your satisfaction with our exceptional
              customer service. At the heart of our commitment lies a dedication
              to understanding and fulfilling your needs with utmost precision
              and care. Our team of friendly, knowledgeable professionals is
              always ready to provide personalized assistance, ensuring a
              seamless and enjoyable experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-black text-[#1A1A1A] text-base md:text-xl lg:text-[28px] capitalize py-4 md:py-6 lg:py-8">
              how to order Full custom car cover?
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-lg font-normal text-[#1A1A1A]">
              We make sure to guarantee your satisfaction with our exceptional
              customer service. At the heart of our commitment lies a dedication
              to understanding and fulfilling your needs with utmost precision
              and care. Our team of friendly, knowledgeable professionals is
              always ready to provide personalized assistance, ensuring a
              seamless and enjoyable experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-black text-[#1A1A1A] text-base md:text-xl lg:text-[28px] capitalize py-4 md:py-6 lg:py-8">
              Car cover cleaning guide
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-lg font-normal text-[#1A1A1A]">
              We make sure to guarantee your satisfaction with our exceptional
              customer service. At the heart of our commitment lies a dedication
              to understanding and fulfilling your needs with utmost precision
              and care. Our team of friendly, knowledgeable professionals is
              always ready to provide personalized assistance, ensuring a
              seamless and enjoyable experience.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="font-black text-[#1A1A1A] text-base md:text-xl lg:text-[28px] capitalize py-4 md:py-6 lg:py-8">
              Exceptional Customer Service
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-lg font-normal text-[#1A1A1A]">
              We make sure to guarantee your satisfaction with our exceptional
              customer service. At the heart of our commitment lies a dedication
              to understanding and fulfilling your needs with utmost precision
              and care. Our team of friendly, knowledgeable professionals is
              always ready to provide personalized assistance, ensuring a
              seamless and enjoyable experience.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="flex h-12 w-[216px] mx-auto mt-9 text-lg hover:bg-transparent bg-[#1A1A1A] rounded border border-[#1A1A1A]  font-bold hover:text-[#1A1A1A] text-white uppercase">
          ask a question
        </Button>
      </div>
    </>
  );
}
