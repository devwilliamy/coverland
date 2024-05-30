import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import FrontCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/front-covers.webp';
import FullCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/full-covers.webp';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { detectFOrFB, isFullSet } from '@/lib/utils';

type SeatOptionProps = {
  option: 'Full' | 'Front' | 'Unknown';
  setTotal: (total: number) => void;
  selectedSeatCoverType: string;
  setSelectedSeatCoverType: (seatCoverType: string) => void;
  seatCover: TSeatCoverDataDB;
};
export default function SeatCoverSelection({
  option,
  seatCover,
}: SeatOptionProps) {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const modelData = useStore(store,(state) => state.modelData);
  const selectedColor = useStore(store,(state) => state.selectedColor)
  const selectedProduct = useStore(store,(state) => state.selectedProduct);
  const initalSeatCover = ''
  const [selectedSeatCoverType, setSelectedSeatCoverType] = useState(initalSeatCover);
  const availableSeatCovers = modelData.filter(
    (seatCover) => seatCover.display_color === selectedColor
  );


function handleSeatSelected(type,value){
  setSelectedSeatCoverType(type);
  setSelectedProduct(value);
};

console.log('selectedSeatCoverType line 40',selectedSeatCoverType)
  return (
    <div>
      <DisplaySeatSet product={isFullSet(selectedProduct.display_set)} />{' '}
      <div className="flex flex-row content-center items-center">
        {availableSeatCovers &&
          availableSeatCovers.map((value, key) => {
            return <SeatCoverList key={key} 
            product={value} 
            isSelected={isFullSet(selectedProduct.display_set)} 
            handleClick={handleSeatSelected} />;
          })}
      </div>
      {JSON.stringify(availableSeatCovers,null,2)}
      {/* <span className="flex min-h-[150px] w-full items-center justify-between gap-3.5 overflow-hidden rounded-md bg-white ">
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
      </span> */}
    </div>
  );
}
const DisplaySeatSet = ({ product }) => {
  return (
    <h3 className="my-[6px] mx-2 max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
      Select Set{' '}
      <span className="ml-1  text-[#8F8F8F]">
        {!product.toLowerCase() ? null : product.toLowerCase() === 'full' ? (
          <span>Front + Rear Seat Set</span>
        ) : (
          <span>Front Seat Set</span>
        )}
      </span>
    </h3>
  );
};

const SeatCoverList = ({ product, isSelected, handleClick }) => {
  const typeOfCover = isFullSet(product.display_set) === 'front' ? false : true;
  const enabledButton = Boolean(product.quantity <= 0);
  const buttonStyle = `p-3 m-1 bg-white text-black border rounded-md capitalize text-sm hover:bg-black  hover:text-white ${isSelected ? 'border-slate-700 font-bold	' : ' '} ${enabledButton ? 'line-through' : ' '} `;
  return (
    <>
      {!typeOfCover ? (
        <Button
          disabled={enabledButton}
          onClick={() => handleClick('front',product)}
          className={buttonStyle}
        >
          Front Seats
        </Button>
      ) : (
        <Button
          disabled={enabledButton}
          onClick={() => handleClick('full',product)}
          className={buttonStyle}
        >
          Full Seat Set
        </Button>
      )}
    </>
  );
};