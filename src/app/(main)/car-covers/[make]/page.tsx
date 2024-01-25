import {
  TProductData,
  TReviewData,
  getProductData,
  getReviewData,
} from '@/lib/db';
import { Suspense } from 'react';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import { PartialCoverSelector } from '../components/PartialCoverSelector';

export type TCarCoverSlugParams = {
  params: {
    make: string;
    model: string;
  };
};

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: TCarCoverSlugParams['params'];
}) {
  const modelParam = params.model;
  const makeParam = params.make;

  const initData = await getProductData({ model: modelParam, make: makeParam });
  console.log('initData', initData);

  const modelData = initData
    ?.map((data) => {
      return {
        ...data,
        year_range: data.year_options,
      };
    })
    .filter(Boolean) as Partial<TProductData>[];

  // if (!modelData) {
  //   redirect('/404');
  // }
  const reviewData: TReviewData[] | null = await getReviewData({
    model: modelParam,
    make: makeParam,
  });

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PartialCoverSelector
          modelData={modelData}
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
