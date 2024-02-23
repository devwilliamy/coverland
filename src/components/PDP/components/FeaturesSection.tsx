import React from 'react';
import Thumbnail from '@/video/Thumbnail.webp';
import SixMinVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import ProductVideo from '../ProductVideo';
import ProductDetailsHeader from './ProductDetailsHeader';
import FabricMattersSection from './FabricMattersSections';
import DifferenceGrid from '@/app/(main)/[productType]/components/DifferenceGrid';
import CustomFitSection from './CustomFitSection';
import WaterFab from '@/images/PDP/Product-Details-Redesign-2/fabric-with-water.webp';

export default function FeaturesSection() {
  return (
    <section
      className={`relative -mx-4 mt-[60px]`}
      style={{
        backgroundImage: `url(${WaterFab.src})`,
        backgroundRepeat: 'round',
      }}
    >
      <div className="relative z-[1] h-full w-full">
        <ProductDetailsHeader />
        <ProductVideo
          src={SixMinVideo}
          imgSrc={Thumbnail}
          aspectRatio="16 / 9"
        />
        <FabricMattersSection />
        <DifferenceGrid />
        <CustomFitSection />
      </div>
    </section>
  );
}
