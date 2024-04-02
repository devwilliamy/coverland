import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { useMediaQuery } from '@mantine/hooks';
import SeatOption from './AddToCartSeatOption';
import { useContext, useState } from 'react';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';

function detectFOrFB(sku: string) {
  const parts = sku.split('-');
  if (parts[1] === 'SC') {
    if (parts[3] === 'F') {
      return 'Front';
    } else if (parts[3] === 'FB') {
      return 'Full';
    }
  }
  return 'Unknown';
}

type AddToCartSeatSelectProps = {
  handleAddToCart: () => void;
  selectSeatOpen: boolean;
  setSelectSeatOpen: (open: boolean) => void;
};
export default function AddtoCartSeatSelect({
  handleAddToCart,
  selectSeatOpen,
  setSelectSeatOpen,
}: AddToCartSeatSelectProps) {
  const isMobile = useMediaQuery('(max-width:1024px)');
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const selectedColor = useStore(store, (s) => s.selectedColor);

  const availableSeatCovers = modelData.filter(
    (seatCover) => seatCover.display_color === selectedColor
  );
  const [total, setTotal] = useState(0);
  const [selectedSeatCoverType, setSelectedSeatCoverType] =
    useState<string>('');

  return (
    <Sheet open={selectSeatOpen} onOpenChange={setSelectSeatOpen}>
      <SheetTrigger className="pt-10 max-lg:mb-10">
        {/* <AddToCartButton setSelectSeatOpen={setSelectSeatOpen} /> */}
      </SheetTrigger>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={`${isMobile ? 'min-h-[75vh] rounded-t-lg ' : 'w-[30vw]'} flex flex-col justify-between  bg-[#323232]`}
      >
        <SheetHeader className="flex w-full flex-col items-end">
          <SheetClose className="mr-4 mt-[20px] rounded-full bg-[#F0F0F099] p-1.5">
            <X size={28} />
          </SheetClose>
        </SheetHeader>
        <section className={`flex w-full flex-col px-5`}>
          <div className="flex flex-col gap-4 ">
            <p className="w-full pb-2 pt-[30px] text-center text-[24px] font-black uppercase leading-[29px] text-white lg:mt-auto lg:pb-[50px]">
              select your option
            </p>
            {availableSeatCovers.map((seatCover, index) => (
              <SeatOption
                key={index}
                option={detectFOrFB(seatCover.sku)}
                setTotal={setTotal}
                selectedSeatCoverType={selectedSeatCoverType}
                setSelectedSeatCoverType={setSelectedSeatCoverType}
                seatCover={seatCover}
              />
            ))}
          </div>
        </section>
        <span className="flex min-h-[126px] w-full flex-col items-center justify-center self-end bg-white px-4">
          <p className="w-full pb-5 text-end text-[16px] font-black leading-[19px] ">
            Total: ${Number(total).toFixed(2)}
          </p>
          <Button
            disabled={total <= 0}
            className={`max-h-[48px] min-h-[48px] w-full ${total <= 0 ? 'disabled:bg-[#BE1B1B80]' : 'bg-[#BE1B1B]'} uppercase lg:max-h-[62px] lg:min-h-[62px] `}
            onClick={() => {
              if (selectedSeatCoverType) {
                handleAddToCart();
              }
            }}
          >
            Add to Cart
          </Button>
        </span>
      </SheetContent>
    </Sheet>
  );
}
