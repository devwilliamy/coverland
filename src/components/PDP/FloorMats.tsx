import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import LinkBreadcrumbs from '@/app/(main)/[productType]/components/LinkBreadcrumbs';
import FloorMatCarousel from './FloorMatCarousel';
import DesktopProductImageGallery from './DesktopProductImageGallery/DesktopProductImageGallery';
import ProductDetailsPanel from './ProductDetailsPanel/ProductDetailsPanel';
import SeatContent from '@/app/(main)/seat-covers/components/SeatContent';
import { TQueryParams } from '@/utils';
import LoadingIndicator from '../loading/LoadingIndicator';

const ExtraDetailsTabs = dynamic(
  () => import('@/components/PDP/components/ExtraDetailsTabs'),
  { loading: () => <LoadingIndicator />, ssr: false }
);

type FloorMatsProps = {
  searchParams: TQueryParams;
};
// Refactor TODO: FloorMats would just be PDP or something
export default function FloorMats({ searchParams }: FloorMatsProps) {
  return (
    <section className="flex w-full flex-col pt-[22px]">
      <div className="pl-2 lg:pl-9">
        <LinkBreadcrumbs />
      </div>

      {/* Refactor TODO: Probably MobileCarousel */}
      <FloorMatCarousel />
      <section
        id="floor-mat-desktop-right-panel"
        className="flex h-max w-full lg:gap-[60px]"
      >
        {/* Refactor TODO: DesktopProductImageGallery */}
        <DesktopProductImageGallery />
        <ProductDetailsPanel searchParams={searchParams} />
      </section>
      <Separator className="mt-[60px] h-5 w-full border-y-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] lg:mt-[106px] lg:h-10 " />
      <section className="flex w-full flex-col">
        <ExtraDetailsTabs />
      </section>
      <Separator className="bg-transparent pt-[60px] lg:pt-[110px]" />
    </section>
  );
}
