import React, { useState } from 'react';
import { Layers } from '../Layers';
import ProductVideo from '../ProductVideo';
import ThreeSixtyVideo from '@/videos/360 degree_website.mp4';

export default function MobileProductDetails() {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className="pt-[100px]">
      {/* <ProductHero /> */}
      <div className="flex w-full flex-col ">
        <ProductVideo
          src={ThreeSixtyVideo}
          autoplay
          loop
          aspectRatio="16 / 9"
        />
        <div className="mt-[-5px] h-full min-h-[174px] w-full bg-[#1A1A1A] pl-[12px] ">
          <h1 className="max-h-[68px] max-w-[178px] pt-[22px] text-[22px] font-[900] uppercase leading-[34px] text-[#F2F2F2] ">
            Tailored for the perfect fit
          </h1>
          <p className="mt-[28px] max-h-[48px] max-w-[298px] text-[16px] font-[400] capitalize leading-[24px] text-[#DBDBDB] ">
            Your car, Your Shield. <br /> Experience The superior fit we offer
          </p>
        </div>
      </div>
      <div className="px-4 pt-[110px]">
        <Layers seeMore={seeMore} setSeeMore={setSeeMore} />
      </div>
    </div>
  );
}
