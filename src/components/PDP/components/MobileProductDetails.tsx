'use client';

import React, { useState } from 'react';
import { Layers } from '../Layers';
import ProductVideo from '../ProductVideo';
import ThreeSixtyVideo from '@/videos/https_x2kly621zrgfgwll.public.blob.vercel-storage.com_videos_360_20degree_mobile-4asLajZOfJp9h3V3q1XkSHFETp6T8h.mp4.json';
import { Separator } from '@/components/ui/separator';
import SuggestedProducts from './SuggestedProducts';

export default function MobileProductDetails() {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className="pt-8 lg:pt-[60px]">
      {/* <ProductHero /> */}
      <Separator className="hidden h-5 w-full border-b-[1px] border-t-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:flex lg:h-10" />
      <ThreeSixtySection />
      <div className="px-4 pt-8 lg:pt-[100px]">
        <Layers seeMore={seeMore} setSeeMore={setSeeMore} />
      </div>
      <SuggestedProducts />
    </div>
  );
}

const ThreeSixtySection = () => {
  return (
    <div className="flex w-full flex-col ">
      <ProductVideo src={ThreeSixtyVideo} autoplay loop aspectRatio="16 / 9" />
      <div className="mt-[-5px] h-full min-h-[174px] w-full bg-[#1A1A1A] pl-[12px] ">
        <h3 className="max-h-[68px] max-w-[178px] pt-[22px] text-[22px] font-[900] uppercase leading-[34px] text-[#F2F2F2] ">
          Tailored for the perfect fit
        </h3>
        <p className="mt-[28px] max-h-[48px] max-w-[298px] text-[16px] font-[400] capitalize leading-[24px] text-[#DBDBDB] ">
          Your car, Your Shield. <br /> Experience The superior fit we offer
        </p>
      </div>
    </div>
  );
};
