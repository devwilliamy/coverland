import { notFound } from 'next/navigation';
import { TPathParams } from '@/utils';
import {
  TSeatCoverDataDB,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';
import {
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { deslugify } from '@/lib/utils';
import SeatCoverDataWrapper from '@/app/(main)/seat-covers/components/SeatCoverDataWrapper';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';

export const revalidate = 300;

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
  productType: string;
};

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance

// export async function generateStaticParams({
//   params: { productType, coverType, make, model },
// }: {
//   params: {
//     productType: string;
//     coverType: string;
//     make: string;
//     model: string;
//   };
// }) {
//   const yearData = await getAllYears({
//     type: productType,
//     cover: coverType,
//     make: make,
//     model: model,
//   });

//   return yearData.filter(Boolean).map((year) => ({
//     year: year,
//   }));
// }

export async function generateMetadata({ params }: { params: TPathParams }) {
  const make = deslugify(params.make || '');
  const model = deslugify(params.model || '');
  const year = deslugify(params.year || '');
  return {
    title: ` ${make} ${model} ${year} Seat Covers, Custom Fit - Coverland`,
    description: ` ${make} ${model} ${year} Seat Covers ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

export default async function SeatCoverDataLayer({
  params,
  searchParams,
}: {
  params: TPathParams;
  searchParams: { submodel?: string; second_submodel?: string };
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
    // model: params.model,
    // year: params.year,
    // });

    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getSeatCoverProductsByDisplayColor({
          type: typeString,
          cover: 'Leather',
          make: params.make,
          model: params.model,
          year: params.year,
        }),
        getProductReviewsByPage(
          {
            productType: typeString,
          },
          {
            pagination: {
              page: 0,
              limit: 8,
            },
            sort: [
              { field: 'sku', order: 'asc' },
              { field: 'helpful', order: 'desc', nullsFirst: false },
            ],
          }
        ),
        getProductReviewSummary({
          productType: typeString,
        }),
        getAllReviewsWithImages(
          {
            productType: typeString,
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
      searchParams={searchParams}
      reviewData={reviewData}
      reviewDataSummary={reviewDataSummary}
      reviewImages={reviewImages}
    />
  );
}
