import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import LinkBreadcrumbs from '@/app/(main)/[productType]/components/LinkBreadcrumbs';
import FloorMatCarousel from './FloorMatCarousel';
import DesktopProductImageGallery from './DesktopProductImageGallery/DesktopProductImageGallery';

const ExtraDetailsTabs = dynamic(
  () => import('@/components/PDP/components/ExtraDetailsTabs'),
  { ssr: false }
);

// Refactor TODO: FloorMats would just be PDP or something
export default function FloorMats({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  return (
    <section className="flex w-full flex-col pt-[22px]">
      <div className="pl-2 lg:pl-9">
        <LinkBreadcrumbs />
      </div>

      {/* Refactor TODO: Probably MobileCarousel */}
      <FloorMatCarousel />
      <section className="flex h-max w-full lg:gap-[60px]">
        {/* Refactor TODO: DesktopProductImageGallery */}
        <DesktopProductImageGallery />
        {/* <Separator className="w-full bg-[#C8C7C7]" /> */}
        {/* <SeatContent searchParams={searchParams} /> */}
      </section>
      <Separator className="mt-[60px] h-5 w-full border-y-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:mt-[106px] lg:h-10 " />
      <section className="flex w-full flex-col">
        {/* <ExtraDetailsTabs /> */}
      </section>
      <Separator className="bg-transparent pt-[60px] lg:pt-[110px]" />
    </section>
  );
}
