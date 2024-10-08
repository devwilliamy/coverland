import { getAllModels, getProductData } from '@/lib/db';
import { notFound } from 'next/navigation';
import CarPDP from '@/app/(main)/[productType]/components/CarPDP';
import {
  getAllReviewsWithImages,
  getProductReviewSummary,
  getProductReviewsByPage,
} from '@/lib/db/review';
import { TPathParams } from '@/utils';
import { deslugify } from '@/lib/utils';
import { PREMIUM_PLUS_URL_PARAM } from '@/lib/constants';
import { TReviewData, TProductReviewSummary } from '@/lib/types/review';
import client from '@/lib/apollo/apollo-client';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/graphql/queries/products';
import { mapShopifyToModelData } from '@/lib/utils/shopify';

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance
export const revalidate = 86400;

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
  const productType = deslugify(params.productType).slice(
    0,
    params.productType.length - 1
  );
  const make = deslugify(params.make || '');
  const model = deslugify(params.model || '');
  return {
    title: `${make} ${model} ${productType} │ Lifetime Warranty │ Custom Fit │ 100% Weatherproof`,
    description: `${make} ${model} ${productType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: `/${params.productType}/${PREMIUM_PLUS_URL_PARAM}/${params.make}/${params.model}`,
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

  const product = await getProductData({
    type: typeString,
    make: params.make,
    model: params.model,
  });

  // console.log('Product:', product);
  const productHandles = [...new Set(product.map((p) => p.shopify_handle))];
  // console.log('Unique Product Handles:', productHandles);
  const productHandle = productHandles[0];
  // console.log('ProductHandle:', productHandle);
  const { data } = await client.query({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle: productHandle },
  });
  const shopifyProduct = data.productByHandle;
  modelData = mapShopifyToModelData(shopifyProduct);
  // console.log('ShopifyProduct:', shopifyProduct);
  // console.log('MOdelData:', modelData);

  try {
    [reviewData, reviewDataSummary, reviewImages] = await Promise.all([
      // getProductData({
      //   type: typeString,
      //   model: params.model,
      //   make: params.make,
      // }),
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
