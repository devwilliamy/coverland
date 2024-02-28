'use client';

import React from 'react';
import Thumbnail from '@/video/Thumbnail.webp';
// import SixMinVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import SixMinVideo from '@/videos/7sec Listing Video_Compressed.mp4';

import ProductVideo from '../ProductVideo';
import ProductDetailsHeader from './ProductDetailsHeader';
import FabricMattersSection from './FabricMattersSections';
import DifferenceGrid from '@/app/(main)/[productType]/components/DifferenceGrid';
import CustomFitSection from './CustomFitSection';
import WetFabric from '@/images/PDP/Product-Details-Redesign-2/fabric-with-water.webp';
import Image from 'next/image';
import useIsVisible from '@/lib/hooks/useIsVisible';

export default function FeaturesSection() {
  const [isVisible, ref] = useIsVisible();

  return (
    <section
      className={`relative mt-[60px] flex h-full  flex-col items-center justify-center `}
    >
      <Image
        alt="Wet Fabric"
        src={WetFabric}
        className="absolute top-0 -mx-4 h-full object-cover"
      />
      <ProductDetailsHeader />
      <div
        className="w-full lg:hidden"
        ref={ref as React.LegacyRef<HTMLDivElement> | undefined}
      >
        {isVisible && (
          <ProductVideo
            src={SixMinVideo}
            imgSrc={Thumbnail}
            aspectRatio="16 / 9"
          />
        )}
      </div>
      <div className="z-[2] flex flex-col items-center justify-center lg:w-[850px]">
        <FabricMattersSection />
        <DifferenceGrid />
        <CustomFitSection />
      </div>
    </section>
  );
}
