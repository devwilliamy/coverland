import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const EstimatedTaxPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="max-w-fit">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#767676] bg-white text-xs text-gray-500">
          i
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-11.5}
        className="flex rounded-[4px] bg-[#1A1A1A]"
      >
        <PopoverPrimitive.PopoverArrow className="h-[22px] w-[22px] -translate-y-1 fill-[#1A1A1A]" />
        <section className="flex w-[292px] flex-col bg-[#1A1A1A] text-sm text-white">
          <p className="font-[500]">
            The actual tax will be calculated based on the applicable state and
            local sales taxes where your order is shipped.
          </p>
        </section>
      </PopoverContent>
    </Popover>
  );
};

export default EstimatedTaxPopover;
