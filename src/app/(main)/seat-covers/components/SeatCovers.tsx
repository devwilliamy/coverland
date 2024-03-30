'use client';
import SeatCoverCarousel from './SeatCoverCarousel';
import ElevateComfortSection from './ElevateComfortSection';
import SeatContent from './SeatContent';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import ExtraDetailsTabs from '@/components/PDP/components/ExtraDetailsTabs';
import { Separator } from '@radix-ui/react-separator';

import StayNewSection from './StayNewSection';
import SafetyFirstSection from './SafetyFirstSection';
import EnhancedPerformanceSection from './EnhancedPerformanceSection';

import DesktopImageDisplay from './DesktopImageDisplay';
import DetailsTabHeader from '../../[productType]/components/DetailsTabHeader';
import SeatCoverDetails from './SeatCoverDetails';

export default function SeatCovers() {
  return (
    <section className="flex w-full flex-col items-center pt-[22px]">
      <p className="w-full px-[2dvw] pb-3.5 text-[14px] leading-[15px] lg:pb-[43px]">
        <a href="/">Home</a> / Seat Cover
      </p>
      {/* This is for mobile */}
      <SeatCoverCarousel />
      <section className="flex h-max w-full px-[2dvw] lg:gap-[60px] lg:pb-[110px]">
        <DesktopImageDisplay />
        <SeatContent />
      </section>
      {/* <SuggestedProducts /> */}
      {/* <Separator className="mt-[60px] h-5 w-full border-y-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:mt-[106px] lg:h-10 " /> */}
      <section className="flex w-full flex-col">
        <ExtraDetailsTabs />
      </section>
    </section>
  );
}
