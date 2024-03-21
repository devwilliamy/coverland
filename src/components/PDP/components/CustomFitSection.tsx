'use client';
import React, { LegacyRef } from 'react';
import ProductVideo from '@/components/PDP/ProductVideo';
import SUV360 from '@/videos/360 degree_website.mp4';
import Car360 from '@/videos/Mustang 360 degree 16;9_Black Background.mp4';
import Truck360 from '@/videos/Truck 360 Degree.mp4';
import CarPremiumImage from '@/images/PDP/Product-Details-Redesign-2/premium/premium-car-cover-desktop.webp';
import CarStandardImage from '@/images/PDP/Product-Details-Redesign-2/standard/standard-pro-car-cover-desktop.webp';
import TruckPremiumImage from '@/images/PDP/Product-Details-Redesign-2/premium/premium-truck-desktop.webp';
import TruckStandardImage from '@/images/PDP/Product-Details-Redesign-2/standard/standard-truck-desktop.webp';
import SUVPremiumImage from '@/images/PDP/Product-Details-Redesign-2/premium/premium-suv-desktop.webp';
import SUVStandardImage from '@/images/PDP/Product-Details-Redesign-2/standard/standard-suv-desktop.webp';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Asset } from 'next-video/dist/assets.js';

const CustomFitSection = () => {
  const params = useParams();
  const productType = params?.productType;
  const coverType = params?.coverType;
  const isPremimPlus = params?.coverType === 'premium-plus';
  let PremiumImage = CarPremiumImage;
  let StandardImage = CarStandardImage;
  let featuredVideo: Asset;
  switch (productType) {
    case 'suv-covers':
      featuredVideo = SUV360;
      break;
    case 'truck-covers':
      featuredVideo = Truck360;
      break;
    default:
      featuredVideo = Car360;
      break;
  }

  switch (productType) {
    case 'truck-covers':
      PremiumImage = TruckPremiumImage;
      StandardImage = TruckStandardImage;
      break;
    case 'suv-covers':
      PremiumImage = SUVPremiumImage;
      StandardImage = SUVStandardImage;
      break;
  }

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
            src={featuredVideo}
            autoplay
            loop
            aspectRatio="16 / 9"
            controls={false}
          />
        );
    }
  };

  return (
    <div className="mt-[60px] lg:mt-[110px] lg:pb-[100px]">
      {imageChoice()}
      <div className="pb-[24px] pt-[34px]">
        <p className="mb-1.5 w-full text-center text-[30px] font-[500] leading-[35px] tracking-[0.027em] text-white lg:mb-6 lg:text-[45px] lg:leading-[52px]">
          Custom-Fit
        </p>
        <p className="w-full  text-center text-[22px] leading-[26px] text-[#ABABAB] lg:text-[34px]">
          {isPremimPlus || coverType === undefined
            ? 'Experience the perfect fit we offer'
            : 'Experience the semi-custom fit'}
        </p>
      </div>
    </div>
  );
};
export default CustomFitSection;
