import React, { LegacyRef } from 'react';
import ProductVideo from '@/components/PDP/ProductVideo';
import ThreeSixtyVideo from '@/videos/https_x2kly621zrgfgwll.public.blob.vercel-storage.com_videos_360_20degree_mobile-4asLajZOfJp9h3V3q1XkSHFETp6T8h.mp4.json';
// import ThreeSixtyVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/360%20degree_mobile-4asLajZOfJp9h3V3q1XkSHFETp6T8h.mp4';

const CustomFitSection = () => {
  return (
    <div className="mt-[60px] lg:my-[90px]">
      <ProductVideo src={ThreeSixtyVideo} autoplay loop aspectRatio="16 / 9" />
      <div className="py-[20px]">
        <p className="w-full pb-2.5 text-center text-[30px] font-[500] leading-[35px] tracking-[0.027em] text-white lg:pb-6 lg:text-[45px] lg:leading-[50px]">
          Custom-Fit
        </p>
        <p className="w-full  text-center text-[22px] leading-[26px] text-[#ABABAB] lg:text-[34px]">
          Experience the perfect fit we offer
        </p>
      </div>
    </div>
  );
};
export default CustomFitSection;
