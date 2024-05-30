import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import EP1 from '@/images/PDP/seat-covers-v2/enh-perf-1.webp';
import EP2 from '@/images/PDP/seat-covers-v2/enh-perf-2.webp';
import EP3 from '@/images/PDP/seat-covers-v2/enh-perf-3.webp';
import EP4 from '@/images/PDP/seat-covers-v2/enh-perf-4.webp';
import AltEP3 from '@/images/PDP/seat-covers-v2/car-cover-front-seat-front-pocket.webp';
import AltEP4 from '@/images/PDP/seat-covers-v2/car-cover-front-seat-back-pocket.webp'
import { isFullSet } from '@/lib/utils';
import Image from 'next/image';
import { useContext } from 'react';
import { useStore } from 'zustand';

const enhancedPerformanceData = [
  { id: 1, img: EP1, alternativeImg: '#', title: 'Belt Buckle Access' },
  { id: 2, img: EP2, alternativeImg: '#', title: 'Armrest Compatible' },
  { id: 3, img: EP4, alternativeImg: AltEP3, title: 'Front Storage Pocket' },
  { id: 4, img: EP3, alternativeImg: AltEP4, title: 'Back Storage Pocket' },
];

export default function EnhancedPerformanceSection() {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const selectedProduct = useStore(store, (state) => state.selectedProduct);
  const fullSeat = isFullSet(selectedProduct.display_set) === 'full' ? true : false;
  const excludedIds = [1, 2]; // Add more IDs to this array as needed
  const oldSection = 'grid w-full max-w-[840px] grid-cols-2 gap-[7px] max-lg:px-4 lg:grid-cols-4 lg:gap-[14px]';
  const sectionStyle = `grid w-full ${!fullSeat ? 'max-w-[630px] lg:max-w-[840px] grid-cols-1' : 'max-w-[840px] grid-cols-2'} gap-[7px] max-lg:px-4 lg:${!fullSeat ? 'grid-cols-2' : 'grid-cols-4'} lg:gap-[14px]`;
  const imageStyle = `${!fullSeat ? 'w-full h-[calc(360px-40px)] object-cover' : 'w-full'}`
 
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p className="flex w-full items-center justify-center pb-[34px] pt-[43px] text-center text-[26px] font-[600] leading-[26px] lg:pb-[45px] lg:pt-[66px] lg:text-[45px]  lg:leading-[32px]">
        Enhanced Performance
      </p>
      <section className={sectionStyle}>
        {enhancedPerformanceData.map(({ img,alternativeImg, title, id }, index) =>
          excludedIds.includes(id) && !fullSeat ? null : (
            <div
              key={index}
              className="flex w-full h-[360px] flex-col items-center justify-center "
            >
              
              <Image
                alt={`enhanced-performance-item-${index}`}
                src={fullSeat ? img : alternativeImg }
                className={imageStyle}
              />
              
             
              <p className="w-full bg-[#717171] py-[10px] text-white text-center">
                {title}
              </p>
            </div>
          )
        )}
      </section>
    </div>
  );
}

