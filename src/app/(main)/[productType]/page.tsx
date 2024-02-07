import { Suspense } from 'react';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import {
  defaultCarModelData,
  defaultSuvModelData,
  defaultTruckModelData,
} from '@/lib/constants';
import { TInitialProductDataDB } from '@/lib/db';
import CarPDP from './components/CarPDP';
import {
  TReviewData,
  TProductReviewsQueryFilters,
  TProductReviewsQueryOptions,
  getProductReviewsByPage,
} from '@/lib/db/review';

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: { productType: string };
}) {
  let reviewData: TReviewData[] = [];
  const productType = params.productType;

  const modelData: TInitialProductDataDB[] =
    productType === 'car-covers'
      ? defaultCarModelData
      : productType === 'suv-covers'
        ? defaultSuvModelData
        : defaultTruckModelData;

  const typeString =
    params?.productType === 'car-covers'
      ? 'Car Covers'
      : params?.productType === 'suv-covers'
        ? 'SUV Covers'
        : 'Truck Covers';

  try {
    const filters: TProductReviewsQueryFilters = {
      productType: typeString,
    };
    const options: TProductReviewsQueryOptions = {
      pagination: {
        page: 1,
        limit: 4,
      },
    };
    const productReviews: TReviewData[] = await getProductReviewsByPage(
      filters,
      options
    );
    reviewData = productReviews;
    console.log('ProductReviews:', productReviews);
  } catch (error) {
    console.error('CarPDPModelDataLayer Error: ', error);
  }

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
