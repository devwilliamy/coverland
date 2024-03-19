'use client';

import useDetermineType from '@/hooks/useDetermineType';
import React, { useState } from 'react';

export default function SeeAllSectionClientWrapper({ children }) {
  const [seeAllVisible, setSeeAllVisible] = useState(true);
  const { isDefaultCoverType } = useDetermineType();
  console.log('children:', children);

  //   const childArray = React.Children.toArray(children);
  //   console.log('ChildArray:', childArray);
  //   const child1 = childArray[0];
  //   const child2 = childArray[1];
  //   const child3 = childArray[2];
  return (
    <>
      <section
        className={`relative ${seeAllVisible ? 'max-h-[2170px] lg:max-h-[3100px]' : ''} w-full overflow-hidden`}
      >
        {children}
        <div
          className={`absolute ${seeAllVisible ? '' : 'hidden'} -bottom-[1px] z-[5] w-full bg-gradient-to-t from-white from-85%`}
        >
          <div className="flex  flex-col items-center justify-center pt-[10vh]">
            <div
              onClick={() => setSeeAllVisible(false)}
              className="flex cursor-pointer flex-col items-center"
            >
              <p className="  py-[10px] text-[16px] leading-[19px] lg:text-[20px] lg:leading-[24px]">
                See All
              </p>
              {/* <div className="flex max-h-[15px] max-w-[40px]">{child2}</div> */}
            </div>
          </div>
          {/* {child3} */}
        </div>
      </section>
      {/* <section className={`${seeAllVisible ? 'hidden' : 'block'}`}>
        <span className="max-w-[100vw] bg-white">
          <div className="flex w-full flex-col justify-center px-4">
            <EnhancedProtectionSection />
            {isDefaultCoverType && <RealTestSection />}
            {isDefaultCoverType && <ProvenSection />}
            <WarrantySection />
          </div>
          <SuggestedProducts />
        </span>
      </section> */}
    </>
  );
}
