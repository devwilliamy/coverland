import { Suspense } from 'react';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import {
  defaultCarModelData,
  defaultSuvModelData,
  defaultTruckModelData,
} from '@/lib/constants';
import { TInitialProductDataDB } from '@/lib/db';
import CarPDP from './components/CarPDP';

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: { productType: string };
}) {
  const reviewData = [{}] as any;
  const productType = params.productType;

  const modelData: TInitialProductDataDB[] =
    productType === 'car-covers'
      ? defaultCarModelData
      : productType === 'suv-covers'
        ? defaultSuvModelData
        : defaultTruckModelData;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CarPDP modelData={modelData} reviewData={reviewData} params={params} />
      </Suspense>

      <div
        id="product-details"
        className="h-auto w-full"
        // flex flex-col justify-center items-center max-w-[1440px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails reviewData={reviewData} />
      </div>
    </>
  );
}
