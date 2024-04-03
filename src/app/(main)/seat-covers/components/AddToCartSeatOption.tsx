import Image, { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useContext, useState } from 'react';
import FrontCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/front-covers.webp';
import FullCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/full-covers.webp';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';

const seatSelectedStyle = 'bg-white text-black hover:bg-black hover:text-white';
const seatDeselectedStyle = 'bg-black text-white hover:bg-white hover:text-black';

type SeatOptionProps = {
  option: 'Full' | 'Front' | 'Unknown';
  setTotal: (total: number) => void;
  selectedSeatCoverType: string;
  setSelectedSeatCoverType: (seatCoverType: string) => void;
  seatCover: TSeatCoverDataDB;
};
export default function SeatOption({
  option,
  setTotal,
  selectedSeatCoverType,
  setSelectedSeatCoverType,
  seatCover,
}: SeatOptionProps) {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);

  const handleSeatSelected = () => {
    setSelectedSeatCoverType(option);
    setTotal(seatCover.msrp as number);
    setSelectedProduct(seatCover);
  };
  return (
    <span className="flex min-h-[150px] w-full items-center justify-between gap-3.5 overflow-hidden rounded-md bg-white ">
      <Image
        alt={option + '-covers'}
        src={option === 'Full' ? FullCovers : FrontCovers}
        className="max-h-[88px] w-1/2 max-w-[139px] pl-4"
      />
      <div className="flex w-1/2 flex-col pr-4">
        <p className="whitespace-nowrap text-[16px] font-[700] capitalize leading-[29px]">
          {option} seat covers
        </p>
        <div className="flex items-center gap-1 text-[14px] leading-[26px]">
          <p className="font-[700]">${seatCover.msrp}</p>
          <p className="text-[#9C9C9C] line-through">${seatCover.price}</p>
          <p className="text-[#BE1B1B]">(-50%)</p>
        </div>
        <Button
          onClick={handleSeatSelected}
          className={`mt-4 flex gap-1 ${selectedSeatCoverType === option ? seatSelectedStyle : seatDeselectedStyle} uppercase outline outline-[1px] `}
        >
          {selectedSeatCoverType === option ? (
            <>
              <Check className="text-[#43A047]" />
              <p>Selected</p>
            </>
          ) : (
            <p>Select</p>
          )}
        </Button>
      </div>
    </span>
  );
}
