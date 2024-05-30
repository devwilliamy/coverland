import Image from 'next/image';
import Safety1 from '@/images/PDP/seat-covers-v2/safety-first-1.webp';
import Safety2 from '@/images/PDP/seat-covers-v2/safety-first-2.webp';
import Safety3 from '@/images/PDP/seat-covers-v2/safety-first-3.webp';
import { useContext } from 'react';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useStore } from 'zustand';
import { isFullSet } from '@/lib/utils';

const safteyFirstData = [
  {
    id:1,
    img: Safety1,
    title: 'Airbag Compatible',
    description: 'Safety, seamlessly integrated',
  },
  {
    id:2,
    img: Safety2,
    title: 'Car seat Compatible',
    description: 'Ensures Child Seat Compatibility',
  },
  {
    id:3,
    img: Safety3,
    title: 'Anti-Slip Security',
    description: 'Enhanced Grip for Ultimate Security',
  },
];

export default function SafetyFirstSection() {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const selectedProduct = useStore(store,(state) => state.selectedProduct);
  const fullSeat = isFullSet(selectedProduct.display_set) === 'front' ? false : true;
  console.log('selectedProduct',selectedProduct)
  return (
    <>
      <p className="flex w-full items-center justify-center  pb-[34px] pt-[43px] text-center text-[26px] font-[600] leading-[26px] lg:pb-[98px] lg:pt-[110px] lg:text-[45px]  lg:leading-[32px]">
        Your Safety Comes First
      </p>
      <section className="flex w-full flex-col items-center ">
        {safteyFirstData.map(({ img, title, description, id }, index) =>
          !fullSeat && id === 2 ? null : (
            <div
              key={img.src}
              className="flex w-full max-w-[840px] items-center justify-center pb-5 text-center text-[#7D7D7D] max-lg:flex-col  max-lg:px-4 lg:gap-10 lg:pb-10"
            >
              {img && (
                <Image
                  alt={`stay-fresh-item-${index}`}
                  src={img}
                  width={800}
                  height={800}
                  className={`lg:h-[328px] lg:w-[621px] ${index % 2 === 1 && 'lg:order-last'} `}
                />
              )}
              <div
                className={`flex flex-col  ${index % 2 === 1 ? 'lg:items-end' : 'lg:items-start'}`}
              >
                <p
                  className={`pt-[18px] text-[18px] font-[600] leading-[25px]  text-[#1A1A1A] lg:text-[22px]`}
                >
                  {title}
                </p>
                <p
                  className={`pt-1 text-[14px] font-[500] capitalize leading-[18.75px] text-[#4D4D4D] lg:pt-[18px] lg:text-[16px]`}
                >
                  {description}
                </p>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
}
