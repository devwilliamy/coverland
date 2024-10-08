import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ProductContent } from './ProductContent';
import { Separator } from '@/components/ui/separator';
import LinkBreadcrumbs from './LinkBreadcrumbs';
import EditVehicle from '@/components/edit-vehicle/EditVehicle';
import dynamic from 'next/dynamic';
import ViewItemGoogleTag from './ViewItemGoogleTag';
import DetailsTabHeader from './DetailsTabHeader';
import { TQueryParams } from '@/utils';

// const ExtraDetailsTabs = dynamic(
//   () => import('@/components/PDP/components/ExtraDetailsTabs'),
//   { ssr: false }
// );
export function CarCoverSelector({
  searchParams,
}: {
  searchParams: TQueryParams;
}) {
  return (
    <>
      <section className="relative mx-auto h-max w-full max-w-[1280px]  lg:my-8">
        <LinkBreadcrumbs />
        <ViewItemGoogleTag />
        <div className="mb-[40px] flex  w-full flex-col items-start justify-between px-4 lg:mb-[45px]  lg:flex-row lg:gap-14">
          {/* Left Panel */}
          <PrimaryImageDisplay />
          {/* Right Panel */}
          <section className=" h-full w-full pl-0 lg:sticky lg:top-8 lg:w-2/5">
            <Separator className="w-full bg-[#C8C7C7] lg:block" />
            <EditVehicle searchParams={searchParams} />
            <Separator className="w-full bg-[#C8C7C7]" />
            <ProductContent searchParams={searchParams} />
          </section>
        </div>
        {/* <ExtraDetailsTabs /> */}
        {/* <Separator className="h-5 w-full border-b-[1px] border-t-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] pt-[10px] lg:h-10 " />
        <p className="flex w-full justify-center pt-[60px] text-[20px] font-[900] uppercase leading-[23px] lg:pt-[110px] lg:text-[45px] lg:leading-[36px]">
          Reviews
        </p>
        <ReviewSection header={false} /> */}
        {/* <FeaturesAndProductsSection /> */}
        {/* <ExtraProductDetails /> */}
      </section>
    </>
  );
}

export default CarCoverSelector;
