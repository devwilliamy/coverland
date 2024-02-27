import { TReviewData, getProductData } from '@/lib/db';
import { redirect } from 'next/navigation';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import {
  TProductReviewSummary,
  // filterReviewImages,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { TPathParams } from '@/app/(main)/utils';

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance

// export async function generateStaticParams({
//   params: { productType, coverType, make },
// }: {
//   params: { productType: string; coverType: string; make: string };
// }) {
//   const modelData = await getAllModels({
//     type: productType,
//     cover: coverType,
//     make: make,
//   });

//   return modelData.filter(Boolean).map((model) => ({
//     model: model,
//   }));
// }

export default async function CarPDPDataLayer({
  params,
  searchParams,
}: {
  params: TPathParams;
  searchParams: { submodel?: string; second_submodel?: string };
}) {
  let modelData = [];
  let reviewData: TReviewData[] | null = [];
  let reviewImages: TReviewData[];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  const SuvOrTruckType =
    params?.productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    params?.productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;

  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          model: params.model,
          make: params.make,
          year: params.year,
        }),
        getProductReviewsByPage(
          { make: params?.make, model: params.model },
          {
            pagination: {
              page: 0,
              limit: 8,
            },
          }
        ),
        getProductReviewSummary({
          make: params?.make,
          model: params.model,
        }),
        getAllReviewsWithImages(
          {
            productType: typeString,
            make: params?.make,
            model: params.model,
          },
          {}
        ),
      ]);
    // filterReviewImages({ reviewData, reviewImages });

    if (!modelData) {
      redirect('/404');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    redirect('/404');
  }

  return (
    <>
      <CarPDP
        modelData={modelData}
        reviewData={reviewData}
        params={params}
        reviewDataSummary={reviewDataSummary}
        reviewImages={reviewImages}
        searchParams={searchParams}
      />
    </>
  );
}
