import { Suspense } from 'react';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import PartialCoverSelector from './components/PartialCoverSelector';
import { IProductData } from '../utils';

export default async function CarPDPModelDataLayer() {
  const modelData = [{}];
  const reviewData = [{}] as any;
  const modelParam = '';
  const makeParam = '';

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PartialCoverSelector
          modelData={modelData as IProductData[]}
          reviewData={reviewData}
          modelParam={modelParam}
          makeParam={makeParam}
        />
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
