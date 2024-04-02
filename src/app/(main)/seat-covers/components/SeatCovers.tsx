import SeatCoverCarousel from '../components/SeatCoverCarousel';
import ElevateComfortSection from '../components/ElevateComfortSection';
import SeatContent from './SeatContent';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import ExtraDetailsTabs from '@/components/PDP/components/ExtraDetailsTabs';
// import { Separator } from '@radix-ui/react-separator';
import StayNewSection from '../components/StayNewSection';
import SafetyFirstSection from '../components/SafetyFirstSection';
import EnhancedPerformanceSection from '../components/EnhancedPerformanceSection';
import DesktopImageDisplay from '../components/DesktopImageDisplay';
import { Separator } from '@/components/ui/separator';
import LinkBreadcrumbs from '../../[productType]/components/LinkBreadcrumbs';
import EditVehicle from './EditVehicleSeatCover';

export default function SeatCovers({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  return (
    <section className="flex w-full flex-col pt-[22px]">
      {/* <p className="w-full px-[2dvw] pb-3.5 text-[14px] leading-[15px] lg:pb-[43px]">
        <a href="/">Home</a> / Seat Cover
      </p> */}
      <div className="pl-2 lg:pl-9">
        <LinkBreadcrumbs />
      </div>

      {/* This is for mobile */}
      <SeatCoverCarousel />
      <section className="flex h-max w-full px-[2dvw] lg:gap-[60px]">
        <DesktopImageDisplay />
        {/* <Separator className="w-full bg-[#C8C7C7]" /> */}
        <SeatContent searchParams={searchParams} />
      </section>
      {/* <ElevateComfortSection />
      <StayNewSection />
      <SafetyFirstSection />
      <EnhancedPerformanceSection />
      <WarrantySection /> */}
      {/* <SuggestedProducts /> */}
      <Separator className="mt-[60px] h-5 w-full border-y-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:mt-[106px] lg:h-10 " />
      <section className="flex w-full flex-col">
        <ExtraDetailsTabs />
      </section>
    </section>
  );
}
