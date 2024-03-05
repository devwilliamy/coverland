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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CompatibleVehiclesTrigger() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="w-full items-center pb-12  ">
      <Separator className="mt-[30px] " />
      {/* <span className="lg:hidden"> */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex w-full items-center md:hidden">
          <OpenTrigger />
        </SheetTrigger>
        <SheetContent
          side={'bottom'}
          className="max-h-[85vh] min-h-[80vh] rounded-t-2xl px-4 "
        >
          <SheetHeader>
            <SheetClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
              <div
                id="CloseModalButton"
                className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
                onClick={() => {
                  setOpen(false);
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
      {/* </span> */}

      {/* <span className="hidden lg:block"> */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className="hidden w-full items-center md:flex">
          <OpenTrigger />
        </DialogTrigger>
        <DialogContent className="flex max-h-[86vh] min-h-[83vh] min-w-[75vw] flex-col items-center gap-0 rounded-t-2xl py-0 ">
          <DialogHeader>
            <DialogClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
              <div
                id="CloseModalButton"
                className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
                onClick={() => {
                  setOpen(false);
                }}
              >
                <X className="h-[24px] w-[24px]" />
              </div>
            </DialogClose>
          </DialogHeader>
          <div className="flex h-full min-w-[520px] max-w-[60%] flex-col items-center justify-center">
            <div className="pb-9 pt-[69px] text-[38px] font-[700] leading-[26px]">
              Compatible Vehicles
            </div>
            <CompatibleVehiclesCarousel />
          </div>
        </DialogContent>
      </Dialog>
      {/* </span> */}

      <Separator />
    </section>
  );
}

const OpenTrigger = () => (
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
);
