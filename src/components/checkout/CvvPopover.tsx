import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import AMEX from '@/images/checkout/AMEX-Card.webp';
import DefaultCard from '@/images/checkout/defaultCard.webp';
import Image from 'next/image';

export const CvvPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="block max-w-fit" onClick={() => {}}>
        <p className="pl-[11px] text-left text-[16px] font-[500] leading-[18.75px] underline">
          Where is my CVV
        </p>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-11.5}
        className="flex rounded-[4px] bg-[#1A1A1A]"
      >
        <PopoverPrimitive.PopoverArrow className="h-[22px] w-[22px] -translate-y-1 fill-[#1A1A1A]" />
        <section className="flex w-[292px] flex-col bg-[#1A1A1A] text-[14px] leading-[22px] text-white">
          <p className="mb-[10px] font-[500]">Find Your CVV</p>
          <div>
            <p className="font-[500]">MasterCard/Visa/Discover</p>
            <p className="mb-[7px]">3-Digit Security Code</p>
            <Image
              className="mb-[24px]"
              alt="MasterCard/Visa/Discover"
              src={DefaultCard}
            />
          </div>
          <div>
            <p className="font-[500]">AMEX</p>
            <p className="mb-[7px]">4-Digit Security Code</p>
            <Image
              className="mb-[24px]"
              alt="MasterCard/Visa/Discover"
              src={AMEX}
            />
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
};
