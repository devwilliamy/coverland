import React from 'react';
import ProductVideo from '@/components/PDP/ProductVideo';
import ThreeSixtyVideo from '@/videos/360 degree_website.mp4';

const CustomFitSection = () => {
  return (
    <div className="mt-[60px] lg:my-[90px]">
      <ProductVideo src={ThreeSixtyVideo} autoplay loop aspectRatio="16 / 9" />
      <div className="py-[20px]">
        <p className="w-full pb-2.5 text-center text-[30px] font-[500] leading-[35px] tracking-[0.027em] text-white lg:pb-6 lg:text-[45px] lg:leading-[50px]">
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
