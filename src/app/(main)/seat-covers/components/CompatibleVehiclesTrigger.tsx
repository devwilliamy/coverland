import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { FaArrowsAltH } from 'react-icons/fa';
import { ChevronRight, X } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CompatibleVehiclesCarousel from './CompatibleVehiclesCarousel';

export default function CompatibleVehiclesTrigger() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <section className="w-full items-center px-4 pb-12 ">
      <Separator className="mt-[30px] " />
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger className="flex w-full items-center">
          <span className="my-6 flex w-full  items-center gap-[18px] lg:grid lg:grid-cols-[0.2fr_1fr_0.1fr] lg:items-center lg:justify-evenly  lg:justify-items-center ">
            <FaArrowsAltH className="h-4.5 w-4.5" />
            <div
              className={`flex w-full items-center justify-between justify-self-start pt-1`}
            >
              <p className={` text-[16px] font-[500] leading-[16px]`}>
                Compatible Vehicles
              </p>
              <ChevronRight />
            </div>
          </span>
        </SheetTrigger>

        <SheetContent
          side={'bottom'}
          className="max-h-[75vh] min-h-[75vh] rounded-t-2xl"
        >
          <SheetHeader>
            <SheetClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
              <div
                id="CloseModalButton"
                className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
                onClick={() => {
                  setSheetOpen(false);
                }}
              >
                <X className="h-[24px] w-[24px]" />
              </div>
            </SheetClose>
            <SheetTitle className="pb-9 pt-[92px] text-[26px] font-[700] leading-[26px]">
              Compatible Vehicles
            </SheetTitle>
          </SheetHeader>
          <CompatibleVehiclesCarousel />
        </SheetContent>
      </Sheet>
      <Separator />
    </section>
  );
}
