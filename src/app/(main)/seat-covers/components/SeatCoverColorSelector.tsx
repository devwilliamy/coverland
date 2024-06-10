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
  Black: CircleBlack,
  Gray: CircleGray,
  Beige: CircleBeige,
};

export default function SeatCoverColorSelector({
  isFinalSelection,
}: {
  isFinalSelection: unknown;
}) {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const [colorIndex, setColorIndex] = useState(0);
  const modelData = useStore(store, (s) => s.modelData);
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const setSelectedColor = useStore(store, (s) => s.setSelectedColor);
  const getSelectedColor = useStore(store, (state) => state.selectedColor);
  const availableColors = useStore(store, (s) => s.availableColors);
  const selectedSetDisplay = useStore(store, (s) => s.selectedSetDisplay);
  const setAvailableColors = useStore(store, (s) => s.setAvailableColors);

  const showColors = [
    {
      display_color: 'black',
      product:
        'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-bk-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-bk-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-bk-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-bk-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-bk-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-bk-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-bk-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-bk-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-bk-1to.webp',
    },
    {
      display_color: 'gray',
      product:
        'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-gr-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-gr-1to.webp',
    },
    {
      display_color: 'beige',
      product:
        'http://www.coverland.com/custom-leather-seat-cover/01-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/02-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/03-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/04-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/05-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/06-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/07-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/08-seatcover-pc-be-1to.webp,http://www.coverland.com/custom-leather-seat-cover/09-seatcover-pc-be-1to.webp',
    },
  ];

  const getModelDataBySet = [
    ...new Map(
      modelData
        .filter(
          (seatCover) => isFullSet(seatCover.display_set) === selectedSetDisplay
        )
        .map((x) => [x['display_color'], x])
    ).values(),
  ];

  const uniqueProductColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));

  const allOutOfStock = (availableSeats: []) => {
    return availableSeats.every((seatCover) => seatCover.quantity === '0');
  };

  useEffect(() => {
    const availableColorIndex = uniqueProductColors.findIndex(
      (product) =>
        availableColors[0]?.toLowerCase() ===
        product?.display_color?.toLowerCase()
    );
    setColorIndex(availableColorIndex);
    setSelectedProduct(
      getModelDataBySet[0] ? getModelDataBySet[0] : uniqueProductColors[0]
    );

    setSelectedColor(
      getModelDataBySet[0]?.display_color.toLowerCase()
        ? getModelDataBySet[0]?.display_color.toLowerCase()
        : uniqueProductColors[0]?.display_color.toLowerCase()
    );
  }, [selectedSetDisplay]);

  return (
    <section
      id="select-color"
      className={` ${!isFinalSelection ? 'mb-[30px] mt-[24px]' : 'mb-[40px]'} py-1}  ml-[4px]  flex w-full flex-col`}
    >
      <div className="mb-[6px] flex flex-row content-center justify-start align-middle leading-[14px]">
        <h3 className=" max-h-[13px] pl-[3px] text-[16px] font-[400] text-black ">
          Color
        </h3>{' '}
        {!!getSelectedColor ? (
          <span className="ml-[12px]  text-[#8F8F8F]">
            {allOutOfStock(getModelDataBySet)
              ? 'Out of Stock'
              : !availableColors.includes(getSelectedColor.toLowerCase())
                ? `${getSelectedColor.charAt(0).toUpperCase()}${getSelectedColor.slice(1)} - Out of Stock`
                : getSelectedColor.charAt(0).toUpperCase() +
                  getSelectedColor.slice(1)}
          </span>
        ) : (
          <></>
        )}
      </div>

      {allOutOfStock(getModelDataBySet) ? (
        <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
          {uniqueProductColors.map((product, index) => {
            const isAvailableColor = availableColors.includes(
              product?.display_color?.toLowerCase()
            );
            const isOutOfStock = true;
            const seatCover = getModelDataBySet.find(
              (seatCover) =>
                seatCover?.display_color?.toLowerCase() ===
                product?.display_color?.toLowerCase()
            );
            return (
              <div
                key={`seat-color-${index}`}
                className={`flex ${index === colorIndex ? 'border-1 border border-[#6F6F6F] ' : ''} ${
                  isOutOfStock && 'relative inline-block'
                } cursor-pointer flex-col place-content-center rounded-full p-[2px] `}
                onClick={() => {
                  setColorIndex(index);
                  setSelectedProduct(getModelDataBySet[0]);
                  setSelectedColor(product?.display_color as string);
                }}
              >
                <Image
                  alt="cover-color"
                  src={
                    iconMap[product?.display_color as string] as StaticImageData
                  }
                  className={`rounded-full opacity-20`}
                />
                <div
                  className={`ofs-overlay ${index === colorIndex ? '!w-full' : '!w-[89%]'}`}
                ></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
          {uniqueProductColors.map((product, index) => {
            const isAvailableColor = availableColors.includes(
              product?.display_color?.toLowerCase()
            );
            const isOutOfStock = !isAvailableColor;
            const seatCover = getModelDataBySet.find(
              (seatCover) =>
                seatCover?.display_color?.toLowerCase() ===
                product?.display_color?.toLowerCase()
            );
            return (
              <div
                key={`seat-color-${index}`}
                className={`flex ${index === colorIndex ? 'border-1 border border-[#6F6F6F] ' : ''} ${
                  isOutOfStock && 'relative inline-block'
                } cursor-pointer flex-col place-content-center rounded-full p-[2px] `}
                onClick={() => {
                  setColorIndex(index);
                  if (!seatCover) {
                    const matchingColor = showColors.find(
                      (color) =>
                        color.display_color.toLowerCase() ===
                        product.display_color.toLowerCase()
                    );
                    // TODO: Change msrp/price to be msrp / price from DB
                    // Don't have time to test
                    setSelectedProduct({
                      ...matchingColor,
                      make: getModelDataBySet[0].make,
                      model: getModelDataBySet[0].model,
                      year_generation: getModelDataBySet[0].year_generation,
                      parent_generation: getModelDataBySet[0].parent_generation,
                      ...(selectedSetDisplay === 'full'
                        ? { msrp: 279.95, price: 560 }
                        : { msrp: 199.95, price: 400 }),
                    } as TSeatCoverDataDB);
                    setSelectedColor(matchingColor?.display_color as string);
                    return;
                  }
                  setSelectedProduct(seatCover as TSeatCoverDataDB);
                  setSelectedColor(seatCover?.display_color as string);
                }}
              >
                <Image
                  alt="cover-color"
                  src={
                    iconMap[product?.display_color as string] as StaticImageData
                  }
                  className={`rounded-full ${isOutOfStock ? 'opacity-20' : ''}`}
                />
                {isOutOfStock && (
                  <div
                    className={`ofs-overlay ${index === colorIndex ? '!w-full' : '!w-[89%]'}`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
