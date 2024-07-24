import { TReviewData, getAllMakes, getProductData } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import {
  TProductReviewSummary,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { TPathParams } from '@/utils';
import { deslugify } from '@/lib/utils';
import { PREMIUM_PLUS_URL_PARAM } from '@/lib/constants';

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
  productType: string;
};

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance
export const revalidate = 300;

export async function generateStaticParams({
  params: { productType, coverType },
}: {
  params: { productType: string; coverType: string };
}) {
  const makeData = await getAllMakes({
    type: productType,
    cover: coverType,
  });

  return makeData.filter(Boolean).map((make) => ({
    make: make,
  }));
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  const productType = deslugify(params.productType).slice(
    0,
    params.productType.length - 1
  );
  const make = deslugify(params.make || '');
  return {
    title: `${make} ${productType} │ Lifetime Warranty │ Custom Fit │ 100% Weatherproof`,
    description: `${make} ${productType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: `/${params.productType}/${PREMIUM_PLUS_URL_PARAM}/${params.make}`,
    },
  };
}

export default async function CarPDPDataLayer({
  params,
}: {
  params: TPathParams;
}) {
  let modelData = [];
  let reviewData: TReviewData[] | null = [];
  let reviewImages: TReviewData[];
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  const typeString =
    params?.productType === 'car-covers'
      ? 'Car Covers'
      : params?.productType === 'suv-covers'
        ? 'SUV Covers'
        : 'Truck Covers';
  try {
    [modelData, reviewData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductData({
          make: params.make,
          year: params.year,
          type: typeString,
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
    // filterDuplicateReviewImages({ reviewData, reviewImages });

    if (!modelData || modelData.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
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
      />
    </>
  );
}
