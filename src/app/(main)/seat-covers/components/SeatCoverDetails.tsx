import React from 'react';
import DetailsTabHeader from '../../[productType]/components/DetailsTabHeader';
import ElevateComfortSection from './ElevateComfortSection';
import StayNewSection from './StayNewSection';
import SafetyFirstSection from './SafetyFirstSection';
import EnhancedPerformanceSection from './EnhancedPerformanceSection';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import { useParams } from 'next/navigation';
import ProductVideo from '@/components/PDP/ProductVideo';
import TruckInstall from '@/videos/Truck Installation Video.mp4';
import F150Install from '@/videos/F-150 Installation Video.mp4';
import TruckThumbnail from '@/images/PDP/seat-covers-v2/Truck Installation Thumbnail.webp';
import F150Thumbnail from '@/images/PDP/seat-covers-v2/F-150 Installation Thumbnail.webp';

export default function SeatCoverDetails() {
  const params = useParams();
  const isFordF1502015 =
    params?.make === 'ford' &&
    params?.model === 'f-150' &&
    params?.year === '2015-2024';

  const installVideo = isFordF1502015 ? F150Install : TruckInstall;
  const installThumbnail = isFordF1502015 ? F150Thumbnail : TruckThumbnail;

  return (
    <div className="flex w-full flex-col">
      {isFordF1502015 && (
        <div className="flex w-full lg:hidden">
          <DetailsTabHeader />
        </div>
      )}

      <ElevateComfortSection showBanner={isFordF1502015} />
      <div className="flex w-full flex-col items-center py-[60px] lg:py-[110px]">
        <p className="text-[26px] font-[600] leading-[30px] lg:text-[45px] lg:font-[600] lg:leading-[52.73px] ">
          Simple For All!
        </p>
        <p className="pt-1.5 text-[14px] font-[500] leading-[16.41px] lg:pt-[20px] lg:text-[26px] lg:font-[500] lg:leading-[26px] ">
          No tool needed! Follow Our Step by Step Guide
        </p>
        <div className="flex w-full max-w-[840px] items-center pt-[18px] lg:pt-[40px] ">
          <ProductVideo
            src={installVideo}
            imgSrc={installThumbnail}
            autoplay
            loop
            aspectRatio="16/9"
          />
        </div>
      </div>
      <StayNewSection />
      <SafetyFirstSection />
      <EnhancedPerformanceSection />
      <WarrantySection />
    </div>
  );
}
