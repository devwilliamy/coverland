import { CarCoverSelector } from '@/app/car-covers/components/CarCoverSelector';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';

export default function CarPDP({ params, searchParams, modelData }) {
  return (
    <>
      <CarCoverSelector
        params={params}
        searchParams={searchParams}
        modelData={modelData}
      />
      <div
        id="product-details"
        className="h-auto w-full"
        // flex flex-col justify-center items-center max-w-[1440px] py-4 lg:py-20 px-4 md:px-20"
      >
        {/* <ExtraProductDetails reviewData={reviewData} /> */}
      </div>
    </>
  );
}
