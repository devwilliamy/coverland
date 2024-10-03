import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import Image, { StaticImageData } from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useStore } from 'zustand';
import CircleBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/seat-circle-black-red.webp';
import CircleBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/seat-circle-black.webp';
import CircleGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/seat-circle-gray.webp';
import CircleBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/seat-circle-beige.webp';
import CircleDarkGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/dark-gray/seat-circle-dg.webp';
import CircleRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/red/seat-circle-rd.webp';
import CirclePink from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/pink/seat-circle-pk.webp';
import CircleWhite from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/white/seat-circle-wh.webp';
import CircleBrown from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/brown/seat-circle-br.webp';
import CircleDarkBrown from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/dark-brown/seat-circle-db.webp';

import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { isFullSet } from '@/lib/utils';
import { getCompleteSelectionData } from '@/utils';

const iconMap: Record<string, StaticImageData> = {
  'Solid Black with Red Stitching': CircleBlackRed,
  Black: CircleBlack,
  Gray: CircleGray,
  Beige: CircleBeige,
  'Dark Gray': CircleDarkGray,
  Red: CircleRed,
  Pink: CirclePink,
  White: CircleWhite,
  'Dark Brown': CircleDarkBrown,
  Brown: CircleBrown,
};

const ALL_SEAT_COLORS = [
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
  {
    display_color: 'dark gray',
    product:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/01-seatcover-pc-dg-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/02-seatcover-pc-dg-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/03-seatcover-pc-dg-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/04-seatcover-pc-dg-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/05-seatcover-pc-dg-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/06-seatcover-pc-dg-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/07-seatcover-pc-dg-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/08-seatcover-pc-dg-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/09-seatcover-pc-dg-1to.webp',
  },
  {
    display_color: 'red',
    product:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/01-seatcover-pc-rd-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/02-seatcover-pc-rd-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/03-seatcover-pc-rd-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/04-seatcover-pc-rd-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/05-seatcover-pc-rd-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/06-seatcover-pc-rd-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/07-seatcover-pc-rd-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/08-seatcover-pc-rd-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/09-seatcover-pc-rd-1to.webp',
  },
  {
    display_color: 'pink',
    product:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/01-seatcover-pc-pk-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/02-seatcover-pc-pk-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/03-seatcover-pc-pk-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/04-seatcover-pc-pk-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/05-seatcover-pc-pk-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/06-seatcover-pc-pk-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/07-seatcover-pc-pk-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/08-seatcover-pc-pk-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/09-seatcover-pc-pk-1to.webp',
  },
  {
    display_color: 'white',
    product:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/01-seatcover-pc-wh-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/02-seatcover-pc-wh-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/03-seatcover-pc-wh-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/04-seatcover-pc-wh-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/05-seatcover-pc-wh-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/06-seatcover-pc-wh-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/07-seatcover-pc-wh-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/08-seatcover-pc-wh-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/09-seatcover-pc-wh-1to.webp',
  },
  {
    display_color: 'dark brown',
    product:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/01-seatcover-pc-db-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/02-seatcover-pc-db-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/03-seatcover-pc-db-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/04-seatcover-pc-db-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/05-seatcover-pc-db-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/06-seatcover-pc-db-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/07-seatcover-pc-db-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/08-seatcover-pc-db-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/09-seatcover-pc-db-1to.webp',
  },
  {
    display_color: 'brown',
    product:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/01-seatcover-pc-br-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/02-seatcover-pc-br-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/03-seatcover-pc-br-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/04-seatcover-pc-br-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/05-seatcover-pc-br-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/06-seatcover-pc-br-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/07-seatcover-pc-br-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/08-seatcover-pc-br-1to.webp,https://coverland.sfo3.cdn.digitaloceanspaces.com/custom-leather-seat-cover/09-seatcover-pc-br-1to.webp',
  },
];

export default function SeatCoverColorSelector() {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const [colorIndex, setColorIndex] = useState(0);
  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const setSelectedColor = useStore(store, (s) => s.setSelectedColor);
  const selectedColor = useStore(store, (state) => state.selectedColor);
  const availableColors = useStore(store, (s) => s.availableColors);
  const selectedSetDisplay = useStore(store, (s) => s.selectedSetDisplay);

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const filteredModelsByDisplaySet: TSeatCoverDataDB[] = [
    ...new Map(
      modelData
        .filter(
          (seatCover: TSeatCoverDataDB) =>
            isFullSet(seatCover.display_set as string) === selectedSetDisplay
        )
        .map((x: TSeatCoverDataDB) => [x['display_color'], x])
    ).values(),
  ];

  const uniqueProductColors = Array.from(
    new Set(filteredModelsByDisplaySet.map((model) => model.display_color))
  ).map((color) =>
    filteredModelsByDisplaySet.find(
      (model) =>
        model.display_color === color &&
        isFullSet(model.display_set as string) === selectedSetDisplay
    )
  );

  const allOutOfStock = (availableSeats: TSeatCoverDataDB[]) => {
    return;
    // return availableSeats.every((seatCover) => seatCover.quantity === '0');
  };

  useEffect(() => {
    const availableColorIndex = uniqueProductColors.findIndex(
      (product) =>
        availableColors[0]?.toLowerCase() ===
        product?.display_color?.toLowerCase()
    );
    setColorIndex(availableColorIndex);
    // If color is available, use the product at that index
    // If there are no colors available, index will be -1
    // If that's the case, then the selected product will be 'black'
    // TODO: - Ideally we'd still change the colors but no time at the moment.
    setSelectedProduct(
      filteredModelsByDisplaySet[availableColorIndex]
        ? filteredModelsByDisplaySet[availableColorIndex]
        : availableColorIndex === -1
          ? filteredModelsByDisplaySet[0]
          : (uniqueProductColors[0] as TSeatCoverDataDB)
    );

    setSelectedColor(
      filteredModelsByDisplaySet[
        availableColorIndex
      ]?.display_color?.toLowerCase()
        ? (filteredModelsByDisplaySet[
            availableColorIndex
          ]?.display_color?.toLowerCase() as string)
        : (uniqueProductColors[0]?.display_color?.toLowerCase() as string)
    );
  }, [selectedSetDisplay]);

  return (
    <section
      id="select-color"
      className={`ml-[4px] mt-[24px] flex w-full flex-col py-1`}
    >
      <div className="mb-[6px] flex flex-row content-center justify-start align-middle leading-[14px]">
        <h3 className=" max-h-[13px] pl-[3px] text-[16px] font-[400] text-black ">
          Color
        </h3>{' '}
        {!!selectedColor ? (
          <span className="ml-[12px]  text-[#8F8F8F]">
            {allOutOfStock(filteredModelsByDisplaySet)
              ? 'Out of Stock'
              : !availableColors.includes(selectedColor.toLowerCase()) ||
                  (selectedProduct.preorder && isComplete) // only displays Pre-Order if we are in a final selection product page such as seat-covers/leather/make/model/year and the selected product has preorder set to true
                ? `${selectedColor.charAt(0).toUpperCase()}${selectedColor.slice(1)} (Pre-Order)`
                : selectedColor.charAt(0).toUpperCase() +
                  selectedColor.slice(1)}
          </span>
        ) : (
          <></>
        )}
      </div>

      {allOutOfStock(filteredModelsByDisplaySet) ? (
        <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
          {uniqueProductColors.map((product, index) => (
            <div
              key={`seat-color-${index}`}
              className={`flex ${index === colorIndex ? 'border-1 border border-[#6F6F6F] ' : ''} 
                relative inline-block cursor-pointer flex-col place-content-center rounded-full p-[2px] `}
              onClick={() => {
                setColorIndex(index);
                setSelectedProduct(filteredModelsByDisplaySet[0]);
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
          ))}
        </div>
      ) : (
        <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
          {uniqueProductColors.map((product, index) => {
            const isAvailableColor = availableColors.includes(
              product?.display_color?.toLowerCase() as string
            );
            // const isOutOfStock = !isAvailableColor || product?.quantity === '0'; // leaving this here if we need to go back to showing out of stock
            const isOutOfStock = false;
            const seatCover = filteredModelsByDisplaySet.find(
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
                    const matchingColor = ALL_SEAT_COLORS.find(
                      (color) =>
                        color.display_color.toLowerCase() ===
                        product?.display_color?.toLowerCase()
                    );
                    // TODO: Change msrp/price to be msrp / price from DB
                    // Don't have time to test
                    setSelectedProduct({
                      ...matchingColor,
                      make: filteredModelsByDisplaySet[0].make,
                      model: filteredModelsByDisplaySet[0].model,
                      year_generation:
                        filteredModelsByDisplaySet[0].year_generation,
                      parent_generation:
                        filteredModelsByDisplaySet[0].parent_generation,
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
                  width={40}
                  height={40}
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
