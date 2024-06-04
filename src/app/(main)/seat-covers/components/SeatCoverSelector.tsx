import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import FrontCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/front-covers.webp';
import FullCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/full-covers.webp';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { detectFOrFB, isFullSet } from '@/lib/utils';
import useStoreContext from '@/hooks/useStoreContext';

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
  const setAvailableColors = useStore(store,(state)=> state.setAvailableColors);
  const initalSeatCover = selectedSetDisplay;
  const [selectedSeatCoverType, setSelectedSeatCoverType] = useState(initalSeatCover);
  
  const frontSeatCovers = modelData.filter(
    (seatCover) => isFullSet(seatCover.display_set) === 'front'
  );
  const fullSeatCovers = modelData.filter(
    (seatCover) => isFullSet(seatCover.display_set) === 'full'
  );
  const availableSeatCoversFiltered = selectedSetDisplay === 'full'
    ? fullSeatCovers
    : frontSeatCovers;
  
  const availableColors = (availableSeatCoversFiltered) =>{
    return availableSeatCoversFiltered.map((seatCover) => seatCover.display_color.toLowerCase())
    .filter((color, index, self) => self.indexOf(color) === index)
    .filter((color) => ['gray', 'black', 'beige'].includes(color))
  }
    
  

  
  const allOutOfStock = (availableSeats: []) => {
    return availableSeats.every(
      (seatCover) => seatCover.quantity === '0')
    
  }
  
  const availableSeatCovers = modelData.filter(   
    (seatCover) => seatCover.display_color === selectedColor
  );


function handleSeatSelected(type){
  let seatCover = type === 'full'
  ? fullSeatCovers
  : frontSeatCovers;
  setAvailableColors(availableColors(seatCover));
  setSelectedSeatCoverType(type)
  setSelectedSetDisplay(type);
  // setSelectedProduct(value);
};
  return (
    <div className="mb-[20px] py-1">
      <DisplaySeatSet
        containerClass="py-2"
        selectedCover={selectedSeatCoverType}
        allOutOfStock={allOutOfStock}
        frontSeatCovers={frontSeatCovers}
        fullSeatCovers={fullSeatCovers}
        product={isFullSet(selectedProduct.display_set)}
      />{' '}
      <div className="flex flex-row content-center items-center">
      <SeatCoverList
                isSelected={selectedSeatCoverType}
                handleClick={handleSeatSelected}
                allOutOfStock={allOutOfStock}
                frontSeat={frontSeatCovers}
                fullSeat={fullSeatCovers}
              />
      </div>
      {/* Enable Comment Below to Debug the Data   */}
      {/* {JSON.stringify(availableSeatCoversFiltered, null, 2)} */}
    </div>
  );
}
const DisplaySeatSet = ({ product,containerClass = '' ,selectedCover,allOutOfStock,frontSeatCovers,fullSeatCovers}) => {
  return (
    <div className={containerClass}>
    <h3 className="my-[6px] ml-[4px]  max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
      Seat Set{' '}
      <span className="ml-[2px]  text-[#8F8F8F]">
        {!selectedCover.toLowerCase() ? null : selectedCover.toLowerCase() === 'full' ? (
          <span>Front + Rear Seat Set
            {allOutOfStock(fullSeatCovers) ? <span className=""> - Out of Stock</span> : null}
          </span>
        ) : (
          <span>Driver +  Passenger seats  {allOutOfStock(frontSeatCovers) ? <span className=""> - Out of Stock</span> : null}</span>
        )}
      </span>
    </h3>
    </div>
  );
};

const SeatCoverList = ({ isSelected, handleClick,allOutOfStock,frontSeat,fullSeat }) => {
  const isSelectedNow = isSelected
  const buttonStyle = `px-[18px] py-[14px] m-1 bg-white text-black border 
  font-normal	 rounded-md capitalize text-[16px] hover:bg-black  
  hover:text-white  `;
  return (
    <>
      <div className="relative inline-block">
        <Button
         
          onClick={() => handleClick('front')}
          className={`${buttonStyle} ${isSelectedNow === 'front' ? '!border-2 !border-solid	border-gray-400 font-bold' : ''} ${allOutOfStock(frontSeat) ? 'cross  font-normal	' : ''}`}
        >
          Front Seat
        </Button>
        {allOutOfStock(frontSeat) ? (<div className={`ofs-overlay-seat !h-[2%] !w-[52%]`}></div>) : null}
      </div>

      <div className="relative inline-block">
        <Button
         
          onClick={() => handleClick('full')}
          className={`${buttonStyle} ${isSelectedNow === 'full' ? '!border-2	!border-solid	 border-gray-400 font-bold' : ''} ${allOutOfStock(fullSeat) ? ' cross font-normal :hover:bg-transparent	' : ''}`}
        >
          Full Seat
        </Button>
        {allOutOfStock(fullSeat) ? (<div className={`ofs-overlay-seat !h-[1%] !w-[52%] z-10 `}></div>) : null}
      </div>
    </>
  );
};