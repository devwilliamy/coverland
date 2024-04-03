'use client';
import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ProductContent } from './ProductContent';
import { Separator } from '@/components/ui/separator';
import LinkBreadcrumbs from './LinkBreadcrumbs';
import { ExtraProductDetails } from '@/components/PDP/ExtraProductDetails';
import EditVehicle from './EditVehicle';
// import FeaturesAndProductsSection from './FeaturesAndProductsSection';
import dynamic from 'next/dynamic';
import ViewItemGoogleTag from './ViewItemGoogleTag';
import DetailsTabHeader from './DetailsTabHeader';
import useDetermineType from '@/hooks/useDetermineType';
import ReviewSection from '@/components/PDP/components/ReviewSection';
import ExtraDetailsTabs from '@/components/PDP/components/ExtraDetailsTabs';

const FeaturesAndProductsSection = dynamic(
  () => import('./FeaturesAndProductsSection')
);
export function CarCoverSelector({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  const { make, model } = useDetermineType();

  return (
    <>
      <section className="relative mx-auto h-max w-full max-w-[1280px]  lg:my-8">
        <LinkBreadcrumbs />
        <ViewItemGoogleTag />
        <div className="mb-[30px] flex w-full flex-col items-start justify-between px-4 lg:mb-[130px] lg:flex-row lg:gap-14">
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

        {make === 'ford' && model === 'f-150' && (
          <div className="flex w-full items-center lg:hidden">
            <DetailsTabHeader />
          </div>
        )}
        <ExtraDetailsTabs />
        <Separator className="h-5 w-full border-b-[1px] border-t-[1px] border-b-[#DBDBDB] border-t-[#DBDBDB] bg-[#F1F1F1] pt-[10px] lg:h-10 " />
        <p className="flex w-full justify-center pt-[60px] text-[20px] font-[900] uppercase leading-[23px] lg:pt-[110px] lg:text-[45px] lg:leading-[36px]">
          Reviews
        </p>
        <ReviewSection header={false} />
        {/* <FeaturesAndProductsSection /> */}
        {/* <ExtraProductDetails /> */}
      </section>
    </>
  );
}

export default CarCoverSelector;
