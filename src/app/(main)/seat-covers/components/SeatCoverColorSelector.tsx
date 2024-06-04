import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import Image, { StaticImageData } from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { SeatData, SeatImageDataObject, SeatString } from '../util';
import CircleBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/seat-circle-black-red.webp';
import CircleBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/seat-circle-black.webp';
import CircleGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/seat-circle-gray.webp';
import CircleBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/seat-circle-beige.webp';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { isFullSet } from '@/lib/utils';

const iconMap: Record<string, StaticImageData> = {
  'Solid Black with Red Stitching': CircleBlackRed,
  'Black': CircleBlack,
  'Gray': CircleGray,
  'Beige': CircleBeige,
};

export default function SeatCoverColorSelector({isFinalSelection}: {isFinalSelection: unknown}) {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const [colorIndex, setColorIndex] = useState(0);
  const modelData = useStore(store, (s) => s.modelData);
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const setSelectedColor = useStore(store, (s) => s.setSelectedColor)
  const getSelectedColor = useStore(store,(state) => state.selectedColor)
  const availableColors = useStore(store, (s) => s.availableColors);
  const selectedSetDisplay = useStore(store, (s) => s.selectedSetDisplay);
  const setAvailableColors = useStore(store, (s) => s.setAvailableColors);

  const getModelDataBySet = (): SeatData[] => {
    return modelData.filter(
      (seatCover) => isFullSet(seatCover.display_set) === selectedSetDisplay
    );
  };
  const uniqueProductColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));// get the unique index of the color for availableColors[0]

 useEffect(()=>{
  const availableColorIndex = uniqueProductColors.findIndex((product) => availableColors[0].toLowerCase() === product?.display_color?.toLowerCase());
  setColorIndex(availableColorIndex);
  setSelectedProduct(uniqueProductColors[availableColorIndex]);

  setSelectedColor(getModelDataBySet()[0].display_color.toLowerCase());
 },[selectedSetDisplay])


  return (
    <section
      id="select-color"
      className={` ${isFinalSelection ? 'mb-[10px]' : 'mb-[40px]' } ml-[4px] pt-[15px]  lg:pt-[34px] flex  w-full flex-col py-1}`}
    >
      <div className="mb-[6px] flex flex-row content-center justify-start align-middle leading-[14px]">
        <h3 className=" max-h-[13px] text-[16px] font-[400]  text-black ">
          Color
        </h3>{' '}
        {!!getSelectedColor ? (
          <span className="ml-[6px] capitalize text-[#8F8F8F]">
            { !availableColors.includes(getSelectedColor.toLowerCase()) ? `${getSelectedColor} - out of stock` : getSelectedColor}
          </span>
        ) : (
          <></>
        )}
      </div>

      <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
        {uniqueProductColors &&
          uniqueProductColors.map((product, index) => {
            const isAvailableColor = availableColors.includes(product.display_color?.toLowerCase());
            return (
              <div
                key={`seat-color-${index}`}
                className={`flex ${index === colorIndex && 'border-1 border border-[#6F6F6F] '} ${
                  !isAvailableColor && ' cross-img'
                } cursor-pointer flex-col place-content-center rounded-full p-[2px] `}
                onClick={() => {
                    setColorIndex(index);
                    setSelectedProduct(product as TSeatCoverDataDB);
                    setSelectedColor(product?.display_color as string);
                }}
              >
                <Image
                  alt="cover-color"
                  src={
                    iconMap[product?.display_color as string] as StaticImageData
                  }
                  className="rounded-full"
                />
              </div>
            );
          })}
      </div>
    </section>
  );
}
