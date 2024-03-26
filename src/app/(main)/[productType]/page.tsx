import CarPDP from './components/CarPDP';
import {
  TProductReviewSummary,
  TReviewData,
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { deslugify } from '@/lib/utils';
import { TPathParams } from '../utils';
import { notFound } from 'next/navigation';
import { getProductData } from '@/lib/db';

export function generateStaticParams() {
  return [
    { productType: 'car-covers' },
    { productType: 'suv-covers' },
    { productType: 'truck-covers' },
  ];
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  const productType = deslugify(params.productType);
  return {
    title: `${productType}, Custom Fit - Coverland`,
    description: `${productType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

export default async function CarPDPModelDataLayer({
  params,
}: {
  params: { productType: string };
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  let reviewData: TReviewData[] = [];
  const productTypes = ['car-covers', 'truck-covers', 'suv-covers'];
  if (!productTypes.includes(params.productType)) {
    return notFound();
  }
  let reviewDataSummary: TProductReviewSummary = {
    total_reviews: 0,
    average_score: 0,
  };
  let reviewImages: TReviewData[] = [];
  let modelData: TInitialProductDataDB[] = [];

  const SuvOrTruckType =
    params?.productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    params?.productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;
  try {
    // [reviewData, modelData, reviewDataSummary, reviewImages] =
    //   await Promise.all([
    //     getProductReviewsByPage(
    //       { productType: typeString },
    //       {
    //         pagination: {
    //           page: 0,
    //           limit: 8,
    //         },
    //       }
    //     ),
    //     getProductData({
    //       type: typeString,
    //     }),
    //     getProductReviewSummary({
    //       productType: typeString,
    //     }),
    //     getAllReviewsWithImages(
    //       {
    //         productType: typeString,
    //       },
    //       {}
    //     ),
    //   ]);
    modelData = await getProductData({ type: typeString });
  } catch (error) {
    console.error('CarPDPModelDataLayer Error: ', error);
  }

  return (
    <CarPDP
      modelData={modelData}
      reviewData={reviewData}
      params={params}
      reviewDataSummary={reviewDataSummary}
      reviewImages={reviewImages}
    />
  );
}
