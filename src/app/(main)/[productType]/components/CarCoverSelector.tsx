import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ProductContent } from './ProductContent';
import { Separator } from '@/components/ui/separator';
import LinkBreadcrumbs from './LinkBreadcrumbs';
import { ExtraProductDetails } from '@/components/PDP/ExtraProductDetails';
import EditVehicle from './EditVehicle';
// import FeaturesAndProductsSection from './FeaturesAndProductsSection';
import dynamic from 'next/dynamic';
import ViewItemGoogleTag from './ViewItemGoogleTag';
const FeaturesAndProductsSection = dynamic(
  () => import('./FeaturesAndProductsSection')
);
export function CarCoverSelector({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  return (
    <>
      <section className="relative mx-auto h-max w-full max-w-[1280px]  lg:my-8">
        <LinkBreadcrumbs />
        <ViewItemGoogleTag />
        <div className="flex w-full flex-col items-start justify-between px-4 lg:flex-row lg:gap-14">
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
        <FeaturesAndProductsSection />
        <ExtraProductDetails />
      </section>
    </>
  );
}

export default CarCoverSelector;
