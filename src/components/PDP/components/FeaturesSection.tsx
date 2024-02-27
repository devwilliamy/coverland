import React from 'react';
import Thumbnail from '@/video/Thumbnail.webp';
import SixMinVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import ProductVideo from '../ProductVideo';
import ProductDetailsHeader from './ProductDetailsHeader';
import FabricMattersSection from './FabricMattersSections';
import DifferenceGrid from '@/app/(main)/[productType]/components/DifferenceGrid';
import CustomFitSection from './CustomFitSection';
import WetFabric from '@/images/PDP/Product-Details-Redesign-2/fabric-with-water.jpg';
import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section
      className={`relative mt-[60px] flex h-full  flex-col items-center justify-center `}
    >
      <Image
        alt=""
        src={WetFabric}
        className="absolute top-0 z-[-1] -mx-4 h-full object-cover"
      />
      <ProductDetailsHeader />
      <div className="lg:hidden">
        <ProductVideo
          src={SixMinVideo}
          imgSrc={Thumbnail}
          aspectRatio="16 / 9"
        />
      </div>
      <div className="flex flex-col   items-center justify-center lg:w-[850px]">
        <FabricMattersSection />
        <DifferenceGrid />
        <CustomFitSection />
      </div>
    </section>
  );
}
