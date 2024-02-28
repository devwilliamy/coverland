import React from 'react';
import ProductVideo from '@/components/PDP/ProductVideo';
// import ThreeSixtyVideo from '@/videos/360 degree_website.mp4';
import ThreeSixtyVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/360%20degree_mobile-4asLajZOfJp9h3V3q1XkSHFETp6T8h.mp4';

const CustomFitSection = () => {
  return (
    <div className="mt-[60px] lg:mt-[110px]">
      <ProductVideo src={ThreeSixtyVideo} autoplay loop aspectRatio="16 / 9" />
      <div className="py-[20px]">
        <p className="w-full text-center text-[30px] font-[500] leading-[35px] tracking-[0.027em] text-white">
          Custom-Fit
        </p>
        <p className="w-full  text-center text-[22px]  leading-[26px] text-[#ABABAB]">
          Experience the perfect fit we offer
        </p>
      </div>
    </div>
  );
};
export default CustomFitSection;
