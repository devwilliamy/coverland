import React from 'react';
import ProductVideo from '@/components/PDP/ProductVideo';
// import ThreeSixtyVideo from '@/videos/360 degree_website.mp4';
import ThreeSixtyVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/360%20degree_mobile-4asLajZOfJp9h3V3q1XkSHFETp6T8h.mp4';
import CarPremiumImage from '@/images/PDP/Product-Details-Redesign-2/premium/premium-car-cover-desktop.webp';
import CarStandardImage from '@/images/PDP/Product-Details-Redesign-2/standard/standard-pro-car-cover-desktop.webp';
import TruckPremiumImage from '@/images/PDP/Product-Details-Redesign-2/premium/premium-truck-desktop.webp';
import TruckStandardImage from '@/images/PDP/Product-Details-Redesign-2/standard/standard-truck-desktop.webp';
import SUVPremiumImage from '@/images/PDP/Product-Details-Redesign-2/premium/premium-suv-desktop.webp';
import SUVStandardImage from '@/images/PDP/Product-Details-Redesign-2/standard/standard-suv-desktop.webp';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const CustomFitSection = () => {
  const params = useParams();
  const productType = params?.productType;
  const coverType = params?.coverType;
  let PremiumImage = CarPremiumImage;
  let StandardImage = CarStandardImage;

  // const typeChoice = () => {
  switch (productType) {
    case 'truck-covers':
      PremiumImage = TruckPremiumImage;
      StandardImage = TruckStandardImage;
      break;
    case 'suv-covers':
      PremiumImage = SUVPremiumImage;
      StandardImage = SUVStandardImage;
  }
  // };
  // typeChoice();
  const imageChoice = () => {
    switch (coverType) {
      case 'premium':
        return <Image alt="premium image" src={PremiumImage} />;
      case 'standard-pro':
        return <Image alt="stadard pro image" src={StandardImage} />;
      case 'standard':
        return <Image alt="standard image" src={StandardImage} />;
      default:
        return (
          <ProductVideo
            src={ThreeSixtyVideo}
            autoplay
            loop
            aspectRatio="16 / 9"
          />
        );
    }
  };

  return (
    <div className="mt-[60px] lg:mt-[110px]">
      {imageChoice()}
      <div className="pb-[24px] pt-[34px]">
        <p className="mb-1.5 w-full text-center text-[30px] font-[500] leading-[35px] tracking-[0.027em] text-white">
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
