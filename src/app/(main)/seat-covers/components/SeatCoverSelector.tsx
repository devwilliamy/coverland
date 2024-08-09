import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { isFullSet } from '@/lib/utils';


export default function SeatCoverSelection() {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const modelData = useStore(store, (state) => state.modelData);
  const selectedSetDisplay = useStore(
    store,
    (state) => state.selectedSetDisplay
  );
  const setSelectedSetDisplay = useStore(
    store,
    (state) => state.setSelectedSetDisplay
  );
  const setAvailableColors = useStore(
    store,
    (state) => state.setAvailableColors
  );
  const initalSeatCover = selectedSetDisplay;
  const [selectedSeatCoverType, setSelectedSeatCoverType] =
    useState<string>(initalSeatCover);

  const frontSeatCovers = modelData.filter(
    (seatCover) => isFullSet(seatCover.display_set as string) === 'front'
  );
  const fullSeatCovers = modelData.filter(
    (seatCover) => isFullSet(seatCover.display_set as string) === 'full'
  );

  const availableColors = (
    availableSeatCoversFiltered: TSeatCoverDataDB[]
  ): string[] => {
    return availableSeatCoversFiltered
      // .filter((seatCover) => seatCover.quantity !== '0')
      .map((seatCover) => seatCover.display_color?.toLowerCase() as string)
      .filter((color, index, self) => self.indexOf(color) === index)
      .filter((color) => ['gray', 'black', 'beige'].includes(color as string));
  };

  const isAllOutOfStock = (availableSeats: TSeatCoverDataDB[]): boolean => {
    // return availableSeats.every((seatCover) => seatCover.quantity === '0');
    return;
  };

  function handleSeatSelected(type: string) {
    let seatCover = type === 'full' ? fullSeatCovers : frontSeatCovers;
    setAvailableColors(availableColors(seatCover));
    setSelectedSeatCoverType(type);
    setSelectedSetDisplay(type);
  }
  return (
    <div className="mb-[20px] py-1">
      <DisplaySeatSetText
        containerClass="py-2"
        selectedCover={selectedSeatCoverType}
        isAllOutOfStock={isAllOutOfStock}
        frontSeatCovers={frontSeatCovers}
        fullSeatCovers={fullSeatCovers}
      />{' '}
      <div className="flex flex-row content-center items-center">
        <SeatCoverButtonList
          selectedCover={selectedSeatCoverType}
          handleClick={handleSeatSelected}
          isAllOutOfStock={isAllOutOfStock}
          frontSeatCovers={frontSeatCovers}
          fullSeatCovers={fullSeatCovers}
        />
      </div>
    </div>
  );
}

type DisplaySeatSetProps = {
  containerClass: string;
  selectedCover: string;
  isAllOutOfStock: (seatCovers: TSeatCoverDataDB[]) => boolean;
  frontSeatCovers: TSeatCoverDataDB[];
  fullSeatCovers: TSeatCoverDataDB[];
};
const DisplaySeatSetText = ({
  containerClass = '',
  selectedCover,
  isAllOutOfStock,
  frontSeatCovers,
  fullSeatCovers,
}: DisplaySeatSetProps) => {
  return (
    <div className={containerClass}>
      <h3 className="my-[6px] ml-[4px]  max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
        Seat Set{' '}
        <span className="ml-[2px]  text-[#8F8F8F]">
          {!selectedCover.toLowerCase() ? null : selectedCover.toLowerCase() ===
            'full' ? (
            <span>
              Front + Rear Seat Set
              {isAllOutOfStock(fullSeatCovers) ? (
                <span> - Out of Stock</span>
              ) : null}
            </span>
          ) : (
            <span>
              Driver + Passenger seats{' '}
              {isAllOutOfStock(frontSeatCovers) ? (
                <span> - Out of Stock</span>
              ) : null}
            </span>
          )}
        </span>
      </h3>
    </div>
  );
};

type SeatCoverListProps = {
  selectedCover: string;
  handleClick: (displaySet: string) => void;
  isAllOutOfStock: (seatCovers: TSeatCoverDataDB[]) => boolean;
  frontSeatCovers: TSeatCoverDataDB[];
  fullSeatCovers: TSeatCoverDataDB[];
};

const SeatCoverButtonList = ({
  selectedCover,
  handleClick,
  isAllOutOfStock,
  frontSeatCovers,
  fullSeatCovers,
}: SeatCoverListProps) => {
  const buttonStyle = `px-[18px] py-[14px] m-1 bg-white text-black border 
  font-normal	 rounded-md capitalize text-[16px] hover:bg-black  
  hover:text-white  `;
  return (
    <>
      <div className="relative inline-block">
        <Button
          onClick={() => handleClick('front')}
          className={`${buttonStyle} ${selectedCover === 'front' ? '!border-2 !border-solid	border-gray-400 font-bold' : ''} ${isAllOutOfStock(frontSeatCovers) ? 'cross  font-normal	' : ''}`}
        >
          Front Seat
        </Button>
        {isAllOutOfStock(frontSeatCovers) ? (
          <div className={`ofs-overlay-seat !h-[2%] !w-[52%]`}></div>
        ) : null}
      </div>

      <div className="relative inline-block">
        <Button
          onClick={() => handleClick('full')}
          className={`${buttonStyle} ${selectedCover === 'full' ? '!border-2	!border-solid	 border-gray-400 font-bold' : ''} ${isAllOutOfStock(fullSeatCovers) ? ' cross :hover:bg-transparent font-normal	' : ''}`}
        >
          Full Seat
        </Button>
        {isAllOutOfStock(fullSeatCovers) ? (
          <div className={`ofs-overlay-seat z-10 !h-[1%] !w-[52%] `}></div>
        ) : null}
      </div>
    </>
  );
};
