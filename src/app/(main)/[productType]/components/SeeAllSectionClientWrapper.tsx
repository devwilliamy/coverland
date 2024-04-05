'use client';

import ProtectionSection from '@/components/PDP/components/ProtectionSection';
import ProvenSection from '@/components/PDP/components/ProvenSection';
import RealTestSection from '@/components/PDP/components/RealTestSection';
import SuggestedProducts from '@/components/PDP/components/SuggestedProducts';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import SeeAllChevronDown from '@/components/PDP/components/icons/SeeAllChevronDown';
import useDetermineType from '@/hooks/useDetermineType';
import React, { useState } from 'react';

// TODO: - Still need to refactor some other components to be server
export default function SeeAllSectionClientWrapper({ child1, child2 }) {
  const [seeAllVisible, setSeeAllVisible] = useState(true);
  const { isDefaultCoverType } = useDetermineType();

  return (
    <>
      <section
        className={`relative z-[0] ${seeAllVisible ? 'max-h-[2170px] lg:max-h-[3100px]' : ''} w-full overflow-hidden`}
      >
        {child1}
        <div
          className={`absolute ${seeAllVisible ? '' : 'hidden'} -bottom-[4px] z-[5] w-full bg-gradient-to-t from-white from-80%`}
        >
          <div className="flex  flex-col items-center justify-center pb-[2vh] pt-[5vh]">
            <div
              onClick={() => setSeeAllVisible(false)}
              className="flex cursor-pointer flex-col items-center"
            >
              <p className="  py-[10px] text-[16px] leading-[19px] lg:text-[20px] lg:leading-[24px]">
                See All
              </p>
              <div className="flex max-h-[15px] max-w-[40px]">
                <SeeAllChevronDown />
              </div>
            </div>
          </div>
          {/* {child2} */}
        </div>
      </section>
      <section className={`${seeAllVisible ? 'hidden' : 'block'}`}>
        <span className="max-w-[100vw] bg-white">
          <div className="flex w-full flex-col justify-center px-4 pb-3">
            <ProtectionSection />
            {isDefaultCoverType && <RealTestSection />}
            {isDefaultCoverType && <ProvenSection />}
            <WarrantySection />
          </div>
          {/* <SuggestedProducts /> */}
        </span>
      </section>
    </>
  );
}
