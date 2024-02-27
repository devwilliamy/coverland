import React from 'react';
import ProductVideo from '@/components/PDP/ProductVideo';
import ThreeSixtyVideo from '@/videos/360 degree_website.mp4';
import PremiumImage from '@/images/PDP/Product-Details-Redesign-2/premium/premium-car-cover-desktop.webp';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const CustomFitSection = () => {
  const params = useParams();
  return (
    <div className="mt-[60px] lg:mt-[110px]">
      {params?.coverType === 'premium' ? (
        <Image alt="premium image" src={PremiumImage} />
      ) : (
        <ProductVideo
          src={ThreeSixtyVideo}
          autoplay
          loop
          aspectRatio="16 / 9"
        />
      )}
      <div className="pb-[24px] pt-[34px]">
        <p className="mb-1.5 w-full text-center text-[30px] font-[500] leading-[35px] tracking-[0.027em] text-white">
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
