import { Suspense } from 'react';
import {
  defaultCarModelData,
  defaultSuvModelData,
  defaultTruckModelData,
} from '@/lib/constants';
import { TInitialProductDataDB } from '@/lib/db';
import CarPDP from './components/CarPDP';
import { TReviewData, getProductReviewsByPage } from '@/lib/db/review';

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
    const productReviews: TReviewData[] = await getProductReviewsByPage(
      { productType: typeString },
      {
        pagination: {
          page: 0,
          limit: 4,
        },
      }
    );
    reviewData = productReviews;
  } catch (error) {
    console.error('CarPDPModelDataLayer Error: ', error);
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <CarPDP modelData={modelData} reviewData={reviewData} params={params} />
      </Suspense>
    </>
  );
}
