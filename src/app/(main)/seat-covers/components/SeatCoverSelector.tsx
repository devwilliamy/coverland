import Image, { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useContext, useState } from 'react';
import FrontCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/front-covers.webp';
import FullCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/full-covers.webp';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { detectFOrFB } from '@/lib/utils';

const seatSelectedStyle = 'bg-white text-black hover:bg-black hover:text-white';
const seatDeselectedStyle = 'bg-black text-white hover:bg-white hover:text-black';

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
  const handleSeatSelected = () => {
    // setSelectedSeatCoverType(option);
    // setTotal(seatCover.msrp as number);
    // setSelectedProduct(seatCover);
  };
  const availableSeatCovers = modelData.filter(
    (seatCover) => seatCover.display_color === selectedColor
  );
  const initalSeatCover = detectFOrFB(availableSeatCovers[0].sku).toLowerCase()
  const [selectedSeatCoverType, setSelectedSeatCoverType] = useState(initalSeatCover);

//  const getData = () =>{
//     availableSeatCovers.map((value) =>{
//         console.table({
//             value,
//             sku:value.sku,
//             selectedSeatCoverType,
//             detectF:detectFOrFB(value.sku)
//         });

//     })
//  }
//  getData();
function handleStateData(passData){
    setSelectedSeatCoverType(passData)
}
  return (
    <div>
      <DisplaySeatSet product={selectedSeatCoverType} />{' '}
      <div className="flex flex-row content-center items-center">
        {availableSeatCovers &&
          availableSeatCovers.map((value, key) => {
            return <SeatCoverList key={key} product={value} isSelected={selectedSeatCoverType === detectFOrFB(value.sku).toLowerCase()} handleClick={handleStateData} />;
          })}
      </div>
      {/* {JSON.stringify(availableSeatCovers,null,2)} */}
      <span className="flex min-h-[150px] w-full items-center justify-between gap-3.5 overflow-hidden rounded-md bg-white ">
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
    </div>
  );
}
const DisplaySeatSet = ({product}) => {
    return (
        <h3 className="mb-[6px] max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
        Select Set
        {' '}
        <span className="ml-1  text-[#8F8F8F]">
          {product.toLowerCase() == "front" ? (
            <span>Front Seat Set</span>
          ) : (
            <span>Front + Rear Seat Set</span>
          )

          }
        </span>
      </h3>
    )
  }

const SeatCoverList = ({ product, isSelected, handleClick }) => {
  console.log('isSelected', isSelected);
  const typeOfCover = detectFOrFB(product.sku);
  const enabledButton = Boolean(product.quantity <= 0);
  const buttonStyle = `p-3 m-1 bg-white text-black border rounded-md capitalize text-sm hover:bg-black  hover:text-white ${isSelected ? 'border-slate-700 font-bold	' : ' '} ${enabledButton ? 'line-through' : ' '} `;


  console.log(enabledButton,'enabledButton')
  return (
    <>
      {typeOfCover.toLowerCase() == 'front' ? (
        <Button
          disabled={enabledButton}
          onClick={() => handleClick('front')}
          className={buttonStyle}
        >
          Front Seats
        </Button>
      ) : (
        <Button
          disabled={enabledButton}
          onClick={() => handleClick('full')}
          className={buttonStyle}
        >
          Full Seat Set
        </Button>
      )}
    </>
  );
};