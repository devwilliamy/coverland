'use client';
import { useState } from 'react';
import SeatCoverCarousel from './components/SeatCoverCarousel';
import ElevateComfortSection from './components/ElevateComfortSection';
import { SeatData, SeatImageDataObject } from './util';
import SeatContent from './components/SeatContent';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import ExtraDetailsTabs from '@/components/PDP/components/ExtraDetailsTabs';
import { Separator } from '@radix-ui/react-separator';

import StayNewSection from './components/StayNewSection';
import SafetyFirstSection from './components/SafetyFirstSection';
import EnhancedPerformanceSection from './components/EnhancedPerformanceSection';

import DesktopImageDisplay from './components/DesktopImageDisplay';


// import { usePathname } from 'next/navigation';

export default function SeatCovers() {
  const [colorIndex, setColorIndex] = useState(0);
  const [seatData, setSeatData] = useState<SeatData>(
    SeatImageDataObject.BlackRedData
  );

  return (
    <section className="flex w-full flex-col items-center pt-[22px]">
      <p className="w-full px-[2dvw] pb-3.5 text-[14px] leading-[15px] lg:pb-[43px]">
        <a href="/">Home</a> / Seat Cover
      </p>
      {/* This is for mobile */}
      <SeatCoverCarousel />
      <section className="flex h-max w-full px-[2dvw] lg:gap-[60px]">
        <DesktopImageDisplay/>
        
        <SeatContent
          seatData={seatData}
          setSeatData={setSeatData}
          colorIndex={colorIndex}
          setColorIndex={setColorIndex}
        />
      </section>
      <ElevateComfortSection />
      <StayNewSection />
      <SafetyFirstSection />
      <EnhancedPerformanceSection />
      <WarrantySection />
      {/* <SuggestedProducts /> */}
      <Separator className="mt-[60px] h-5 w-full border-y-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:mt-[106px] lg:h-10 " />
      <section className="flex w-full flex-col">
        <ExtraDetailsTabs />
      </section>
    </section>
  );
}
