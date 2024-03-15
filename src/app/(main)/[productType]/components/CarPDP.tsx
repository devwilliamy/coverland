import { TInitialProductDataDB, TReviewData } from '@/lib/db';
import CarCoverSelector from './CarCoverSelector';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import {
  IProductData,
  TPathParams,
  TQueryParams,
  modelDataTransformer,
} from '../../utils';
import { TProductReviewSummary } from '@/lib/db/review';
import CarSelectionProvider from '@/contexts/CarSelectionContext';

export default function CarPDP({
  modelData: modelDataProps,
  reviewData,
  reviewDataSummary,
  reviewImages,
  searchParams,
}: {
  modelData: TInitialProductDataDB[];
  reviewData: TReviewData[] | null;
  params: TPathParams;
  reviewDataSummary: TProductReviewSummary;
  reviewImages: TReviewData[];
  searchParams?:
    | { submodel?: string; second_submodel?: string; submodel2?: string }
    | undefined;
}) {
  const modelDataProps2 = [
    {
      sku: 'CL-CC-CN-15-F-BKRD-STR-PP-101001',
      product_type: 'BKRD-STR-PP',
      product_name: 'Roadster',
      type: 'Car Covers',
      make: 'Ford',
      model: 'Roadster',
      year_generation: '1921-1934',
      parent_generation: '1921-1934',
      submodel1: null,
      submodel2: null,
      submodel3: null,
      sku_suffix: 'STR-PP-101001',
      base_sku: 'CL-CC-CN-15-F-BKRD',
      feature:
        'http://www.coverland.com/category-images-new/01-bkrd-str-nm.webp',
      product:
        'http://www.coverland.com/category-images-new/01-bkrd-str-nm.webp,http://www.coverland.com/pms/02-bkrd-str-nm.webp,http://www.coverland.com/pms/03-bkrd-str-nm.webp,http://www.coverland.com/pms/04-bkrd-str-nm.webp,http://www.coverland.com/pms/05-bkrd-str-nm.webp,http://www.coverland.com/pms/06-bkrd-str-nm.webp,http://www.coverland.com/pms/07-bkrd-str-nm.webp,http://www.coverland.com/pms/08-bkrd-str-nm.webp,http://www.coverland.com/pms/09-bkrd-str-nm.webp,http://www.coverland.com/pms/10-bkrd-str-nm.webp,http://www.coverland.com/pms/11-bkrd-str-nm.webp,http://www.coverland.com/pms/12-bkrd-str-nm.webp,http://www.coverland.com/pms/13-bkrd-str-nm.webp,http://www.coverland.com/pms/14-bkrd-str-nm.webp,http://www.coverland.com/pms/15.webp',
      display_color: 'Black Red Stripe',
      msrp: '159.95',
      price: '320',
      display_id: 'Premium Plus',
      make_slug: 'ford',
      model_slug: 'roadster',
      year_options:
        '1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934',
      fullProductName: 'Car Covers',
      mainImage:
        'https://www.coverland.com/images/default-product-images/01-bkrd-str-m.jpg',
      productImages: [
        'https://www.coverland.com/images/default-product-images/01-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/02-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/03-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/04-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/05-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/06-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/07-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/08-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/09-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/10-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/11-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/12-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/13-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/14-bkrd-str-m.jpg',
        'https://www.coverland.com/images/default-product-images/15.jpg',
      ],
    },
  ];
  const initialState = {
    modelData: modelDataProps2,
    reviewData,
    reviewDataSummary,
    reviewImages,
    searchParams,
  };
  console.log('Am I a server component:', typeof window === 'undefined');
  return (
    <CarSelectionProvider initialState={initialState}>
      <CarCoverSelector searchParams={searchParams} />
    </CarSelectionProvider>
  );
}
