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
  // [
  //   {
  //     sku: 'CL-CC-CN-15-F-BKRD-STR-PP-101001',
  //     product_type: 'BKRD-STR-PP',
  //     product_name: 'Roadster',
  //     type: 'Car Covers',
  //     make: 'Ford',
  //     model: 'Roadster',
  //     year_generation: '1921-1934',
  //     parent_generation: '1921-1934',
  //     submodel1: null,
  //     submodel2: null,
  //     submodel3: null,
  //     sku_suffix: 'STR-PP-101001',
  //     base_sku: 'CL-CC-CN-15-F-BKRD',
  //     feature:
  //       'http://www.coverland.com/category-images-new/01-bkrd-str-nm.webp',
  //     product:
  //       'http://www.coverland.com/category-images-new/01-bkrd-str-nm.webp,http://www.coverland.com/pms/02-bkrd-str-nm.webp,http://www.coverland.com/pms/03-bkrd-str-nm.webp,http://www.coverland.com/pms/04-bkrd-str-nm.webp,http://www.coverland.com/pms/05-bkrd-str-nm.webp,http://www.coverland.com/pms/06-bkrd-str-nm.webp,http://www.coverland.com/pms/07-bkrd-str-nm.webp,http://www.coverland.com/pms/08-bkrd-str-nm.webp,http://www.coverland.com/pms/09-bkrd-str-nm.webp,http://www.coverland.com/pms/10-bkrd-str-nm.webp,http://www.coverland.com/pms/11-bkrd-str-nm.webp,http://www.coverland.com/pms/12-bkrd-str-nm.webp,http://www.coverland.com/pms/13-bkrd-str-nm.webp,http://www.coverland.com/pms/14-bkrd-str-nm.webp,http://www.coverland.com/pms/15.webp',
  //     display_color: 'Black Red Stripe',
  //     msrp: '159.95',
  //     price: '320',
  //     display_id: 'Premium Plus',
  //     make_slug: 'ford',
  //     model_slug: 'roadster',
  //     year_options:
  //       '1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934',
  //     fullProductName: 'Car Covers',
  //     mainImage:
  //       'https://www.coverland.com/images/default-product-images/01-bkrd-str-m.jpg',
  //     productImages: [
  //       'https://www.coverland.com/images/default-product-images/01-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/02-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/03-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/04-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/05-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/06-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/07-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/08-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/09-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/10-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/11-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/12-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/13-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/14-bkrd-str-m.jpg',
  //       'https://www.coverland.com/images/default-product-images/15.jpg',
  //     ],
  //   },
  // ];

  const SuvOrTruckType =
    params?.productType === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString =
    params?.productType === 'car-covers' ? 'Car Covers' : SuvOrTruckType;
  try {
    [reviewData, modelData, reviewDataSummary, reviewImages] =
      await Promise.all([
        getProductReviewsByPage(
          { productType: typeString },
          {
            pagination: {
              page: 0,
              limit: 8,
            },
          }
        ),
        getProductData({
          type: typeString,
        }),
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
