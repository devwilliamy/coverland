import { notFound } from 'next/navigation';
import { TPathParams } from '@/utils';
import {
  TSeatCoverDataDB,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';
import {
  TProductReviewSummary,
  TReviewData,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { deslugify } from '@/lib/utils';
import SeatCoverDataWrapper from '../../components/SeatCoverDataWrapper';

export const revalidate = 0

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
  productType: string;
};

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance

// export async function generateStaticParams({
//     params: { productType, coverType, make },
//   }: {
//     params: { productType: string; coverType: string; make: string };
//   }) {
//     const modelData = await getAllModels({
//       type: productType,
//       cover: coverType,
//       make: make,
//     });

//     return modelData.filter(Boolean).map((model) => ({
//       model: model,
//     }));
//   }

export async function generateMetadata({ params }: { params: TPathParams }) {
  const make = deslugify(params.make || '');
  return {
    title: `${make} Seat Covers, Custom Fit - Coverland`,
    description: `${make} Seat Covers ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

export default async function SeatCoverDataLayer({
  params,
}: {
  params: TPathParams;
}) {
  let modelData: TSeatCoverDataDB[] = [];
  let reviewData: TReviewData[] = [];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  let reviewImages: TReviewData[] = [];
  const typeString = 'Seat Covers';

  try {
    // modelData = await getSeatCoverProductData({
    //   type: 'Seat Covers',
    //   cover: params.seatType,
    //   make: params.make,
    //   model: params.model,
    // });

    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getSeatCoverProductsByDisplayColor({
          type: typeString,
          cover: 'Leather',
          make: params.make,
        }),
        getProductReviewsByPage(
          { productType: typeString, make: params.make },
          {
            pagination: {
              page: 0,
              limit: 8,
            },
          }
        ),
        getProductReviewSummary({
          productType: typeString,
          make: params.make,
        }),
        getAllReviewsWithImages(
          {
            productType: typeString,
            make: params.make,
          },
          {}
        ),
      ]);

    if (!modelData || modelData.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
  }
  return (
    <SeatCoverDataWrapper
      modelData={modelData}
      params={params}
      reviewData={reviewData}
      reviewDataSummary={reviewDataSummary}
      reviewImages={reviewImages}
    />
  );
}
