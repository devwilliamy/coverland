import { getProductData, getProductMetadata } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import { TPathParams } from '@/utils';
import {
  // filterReviewImages,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { deslugify } from '@/lib/utils';
import { PREMIUM_PLUS_URL_PARAM } from '@/lib/constants';
import { TProductReviewSummary, TReviewData } from '@/lib/types/review';

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
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: TPathParams }) {
  const desluggedProductType = deslugify(params.productType).slice(
    0,
    params.productType.length - 1
  );
  const make = deslugify(params.make || '');
  const model = deslugify(params.model || '');
  const year = deslugify(params.year || '');
  const urlString = `https://coverland.com/${params.productType}/${PREMIUM_PLUS_URL_PARAM}/${params.make}/${params.model}/${params.year}`;
  const productMetadata = await getProductMetadata(urlString);
  const defaultMetadataDescription = `${year} ${make} ${model} ${desluggedProductType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`;

  return {
    title: `${make} ${model} ${year} ${desluggedProductType} │ Lifetime Warranty │ Custom Fit │ 100% Weatherproof`,
    description: productMetadata
      ? productMetadata.description
      : defaultMetadataDescription,
    alternates: {
      canonical: `/${params.productType}/${PREMIUM_PLUS_URL_PARAM}/${params.make}/${params.model}/${params.year}`,
    },
  };
}

export default async function CarPDPDataLayer({
  params,
  searchParams,
}: {
  params: TPathParams;
  searchParams: {
    submodel?: string;
    second_submodel?: string;
    third_submodel?: string;
  };
}) {
  let modelData = [];
  let reviewData: TReviewData[] | null = [];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  let reviewImages: TReviewData[];
  const SuvOrTruckType =
    params?.productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    params?.productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;

  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          type: typeString,
          model: params.model,
          make: params.make,
          year: params.year,
          cover: params.coverType,
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
    // filterReviewImages({ reviewData, reviewImages });

    if (!modelData || modelData.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
  }

  if (modelData?.length === 0) {
    notFound();
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
