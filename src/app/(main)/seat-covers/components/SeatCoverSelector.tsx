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
  const selectedSetDisplay = useStore(store,(state)=> state.selectedSetDisplay);
  const setSelectedSetDisplay = useStore(store,(state)=> state.setSelectedSetDisplay);
  const initalSeatCover = ''
  const [selectedSeatCoverType, setSelectedSeatCoverType] = useState(initalSeatCover);
  const availableSeatCovers = modelData.filter(
    (seatCover) => seatCover.display_color === selectedColor
  );


function handleSeatSelected(type,value){
  setSelectedSetDisplay(type);
  setSelectedProduct(value);
};
  return (
    <div className='py-1 mb-[30px]'>
      <DisplaySeatSet containerClass='py-2' product={isFullSet(selectedProduct.display_set)} />{' '}
      <div className="flex flex-row content-center items-center">
        {availableSeatCovers &&
          availableSeatCovers.map((value, key) => {
            return <SeatCoverList key={key} 
            product={value} 
            isSelected={isFullSet(selectedProduct.display_set)} 
            handleClick={handleSeatSelected} />;
          })}
      </div>
      {/* Enable Comment Below to Debug the Data   */}
      {/* {JSON.stringify(availableSeatCovers,null,2)} */}
    
    </div>
  );
}
const DisplaySeatSet = ({ product,containerClass = '' }) => {
  return (
    <div className={containerClass}>
    <h3 className="my-[6px] ml-[4px]  max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
      Select Set{' '}
      <span className="ml-[2px]  text-[#8F8F8F]">
        {!product.toLowerCase() ? null : product.toLowerCase() === 'full' ? (
          <span>Front + Rear Seat Set</span>
        ) : (
          <span>Front Seat Set</span>
        )}
      </span>
    </h3>
    </div>
  );
};

const SeatCoverList = ({ product, isSelected, handleClick }) => {
  const typeOfCover = isFullSet(product.display_set) === 'front' ? false : true;
  const isSelectedNow = isSelected  === isFullSet(product.display_set);
  const enabledButton = Boolean(product.quantity <= 0);
  const buttonStyle = `px-[14px] py-[18px] m-1 bg-white text-black border font-normal	 rounded-md capitalize text-[16px] hover:bg-black  hover:text-white ${isSelectedNow ? 'border-slate-700 font-bold	' : ' '} ${enabledButton ? 'line-through' : ' '} `;
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