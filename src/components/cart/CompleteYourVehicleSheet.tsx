import { useMediaQuery } from '@mantine/hooks';
import { SetStateAction } from 'react';
import { DrawerTitle } from '@/components/ui/drawer';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { usePathname } from 'next/navigation';

const CompleteYourVehicleSheet = ({
  completeYourVehicleSelectorOpen,
  setCompleteYourVehicleSelectorOpen,
  searchParams,
}: {
  completeYourVehicleSelectorOpen: boolean;
  setCompleteYourVehicleSelectorOpen: (value: SetStateAction<boolean>) => void;
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) => {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  return (
    <Sheet
      open={completeYourVehicleSelectorOpen}
      onOpenChange={(o) => setCompleteYourVehicleSelectorOpen(o)}
    >
      <SheetContent
        className="flex  flex-col justify-center rounded-t-2xl border   border-neutral-800 bg-neutral-800 pt-8 max-lg:max-h-[80vh]"
        side={isMobile ? 'bottom' : 'right'}
        onClick={(e) => e.stopPropagation()}
      >
        <SheetClose className="mb-auto ml-auto mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-400">
          <X className="h-6 w-6 fill-neutral-800" />
        </SheetClose>
        <SheetHeader>
          <DrawerTitle className="my-4 text-center text-[22px] font-bold uppercase text-white">
            Complete Your Vehicle
          </DrawerTitle>
        </SheetHeader>
        <div className="flex w-full flex-col gap-4 px-4 ">
          <EditVehicleDropdown searchParams={searchParams} />
        </div>
        <SheetFooter
          id="Add-To-Cart-Button"
          className="mt-auto flex flex-col gap-3 px-4 py-3 align-bottom"
        ></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default CompleteYourVehicleSheet;
