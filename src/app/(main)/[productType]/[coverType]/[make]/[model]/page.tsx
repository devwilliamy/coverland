import { TReviewData, getAllModels, getProductData } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import {
  TProductReviewSummary,
  // filterReviewImages,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { TPathParams } from '@/utils';
import { deslugify } from '@/lib/utils';

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance

export async function generateStaticParams({
  params: { productType, coverType, make },
}: {
  params: { productType: string; coverType: string; make: string };
}) {
  const modelData = await getAllModels({
    type: productType,
    cover: coverType,
    make: make,
  });

  return modelData.filter(Boolean).map((model) => ({
    model: model,
  }));
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  const productType = deslugify(params.productType);
  const make = deslugify(params.make || '');
  const model = deslugify(params.model || '');
  return {
    title: `${make} ${model} ${productType}, Custom Fit - Coverland`,
    description: `${make} ${model} ${productType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: `/${productType}/${make}/${model}`,
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

    if (!modelData || modelData.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // redirect('/404');
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
