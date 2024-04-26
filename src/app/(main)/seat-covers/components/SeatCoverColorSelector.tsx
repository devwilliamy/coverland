import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import Image, { StaticImageData } from 'next/image';
import { useContext, useState } from 'react';
import { useStore } from 'zustand';
import { SeatData, SeatImageDataObject, SeatString } from '../util';
import CircleBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/seat-circle-black-red.webp';
import CircleBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/seat-circle-black.webp';
import CircleGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/seat-circle-gray.webp';
import CircleBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/seat-circle-beige.webp';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';

const iconMap: Record<string, StaticImageData> = {
  'Solid Black with Red Stitching': CircleBlackRed,
  'Solid Black': CircleBlack,
  'Solid Gray': CircleGray,
  'Solid Beige': CircleBeige,
};

export default function SeatCoverColorSelector() {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const [colorIndex, setColorIndex] = useState(0);
  const modelData = useStore(store, (s) => s.modelData);
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const setSelectedColor = useStore(store, (s) => s.setSelectedColor)
  //   const params = useParams<TPathParams>();

  //   const handleColorChange = (newSelectedProduct: IProductData) => {
  //     handleViewItemColorChangeGoogleTag(newSelectedProduct, params, isComplete);
  //   };

  const uniqueProductColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));

  return (
    <section
      id="select-color"
      className="mb-[30px] mt-[24px] flex  w-full flex-col py-1"
    >
      <h3 className="mb-[6px] max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
        Select Color
      </h3>
      <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
        {uniqueProductColors &&
          uniqueProductColors.map((product, index) => {
            return (
              <div
                key={`seat-color-${index}`}
                className={`flex ${index === colorIndex && 'border-1 border border-[#6F6F6F] '} cursor-pointer flex-col place-content-center rounded-full p-[2px] `}
                onClick={() => {
                  setColorIndex(index);
                  setSelectedProduct(product as TSeatCoverDataDB);
                  //   setSeatData(i.data);
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
