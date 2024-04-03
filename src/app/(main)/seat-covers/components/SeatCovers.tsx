import SeatCoverCarousel from '../components/SeatCoverCarousel';
import SeatContent from './SeatContent';
import ExtraDetailsTabs from '@/components/PDP/components/ExtraDetailsTabs';
import DesktopImageDisplay from '../components/DesktopImageDisplay';
import { Separator } from '@/components/ui/separator';
import LinkBreadcrumbs from '../../[productType]/components/LinkBreadcrumbs';

export default function SeatCovers({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  return (
    <section className="flex w-full flex-col pt-[22px]">
      <div className="pl-2 lg:pl-9">
        <LinkBreadcrumbs />
      </div>
      {/* This is for mobile */}
      <SeatCoverCarousel />
      <section className="flex h-max w-full px-[2dvw] lg:gap-[60px]">
        <DesktopImageDisplay />

        <SeatContent searchParams={searchParams} />
      </section>
      <Separator className="mt-[60px] h-5 w-full border-y-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:mt-[106px] lg:h-10 " />
      <section className="flex w-full flex-col">
        <ExtraDetailsTabs />
      </section>
    </section>
  );
}
