'use client';

import { TInitialProductDataDB, TReviewData } from '@/lib/db';
// import CarCoverSelector from './CarCoverSelector';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import {
  IProductData,
  TPathParams,
  TQueryParams,
  modelDataTransformer,
} from '../app/(main)/utils';
import { TProductReviewSummary } from '@/lib/db/review';
type CarSelectionStore = ReturnType<typeof createCarSelectionStore>;

export type TQuery = {
  type: string;
  coverType: string;
  year: string;
  make: string;
  model: string;
  submodel: string;
  secondSubmodel: string;
  submodel1: string;
  submodel2: string;
  parent_generation: string;
};

interface ICarCoverProps {
  modelData: IProductData[];
  initialModelData: IProductData[];
  selectedProduct: IProductData;
  reviewData: TReviewData[];
  reviewDataSummary: TProductReviewSummary;
  reviewImages: TReviewData[];
}

interface ICarCoverSelectionState extends ICarCoverProps {
  setQuery: (newQuery: Partial<TQuery>) => void;
  setModelData: () => void;
  hasSubmodels: () => boolean;
  setSelectedProduct: (newProduct: IProductData) => void;
  setFeaturedImage: (newImage: string) => void;
  setSelectedColor: (color: string) => void;
  featuredImage: string;
  selectedColor: string;
  query: TQuery;
  setReviewData: (newReviewData: TReviewData[]) => void;
  setReviewDataSummary: (newReviewDataSummary: TProductReviewSummary) => void;
  paramsYear: string;
  reviewImageTracker: Record<string, boolean>;
  setReviewImageTracker: (newImageTracker: Record<string, boolean>) => void;
  customerSelectedYear: string;
  setCustomerSelectedYear: (year: string) => void;
}

const createCarSelectionStore = ({
  initialModelData,
  params,
  queryParams,
  initialReviewData,
  initialReviewDataSummary,
  initialReviewImages,
}: {
  initialModelData: IProductData[];
  params: TPathParams;
  queryParams: TQueryParams;
  initialReviewData: TReviewData[];
  initialReviewDataSummary: TProductReviewSummary;
  initialReviewImages: TReviewData[];
}) => {
  // const hasNoSubmodels = initialModelData.every(
  //   (model) => !model.submodel1 && !model.submodel2
  // );

  // const initialDataWithSubmodels = queryParams?.submodel
  //   ? initialModelData.filter((model) =>
  //       compareRawStrings(model.submodel1, queryParams.submodel as string)
  //     )
  //   : initialModelData;

  // const initialDataWithSecondSubmodels = queryParams?.submodel2
  //   ? initialDataWithSubmodels.filter((model) =>
  //       compareRawStrings(model.submodel2, queryParams.submodel2 as string)
  //     )
  //   : initialDataWithSubmodels;

  const reviewImageTracker: Record<string, boolean> = {};

  // initialReviewData.forEach((reviewData) => {
  //   !!reviewData.review_image &&
  //     reviewData.review_image.split(',').map((imageUrl) => {
  //       if (!reviewImageTracker[imageUrl]) {
  //         reviewImageTracker[imageUrl] = true;
  //       }
  //     });
  // });

  const initialDataWithSecondSubmodels = [
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
  const customerSelectedYear =
    typeof window !== 'undefined'
      ? localStorage?.getItem('heroDropdownYear')
      : '';

  return createStore<ICarCoverSelectionState>()((set, get) => ({
    modelData: initialDataWithSecondSubmodels,
    initialModelData: initialDataWithSecondSubmodels,
    query: {
      year: (params?.year && customerSelectedYear) || '',
      type: params?.productType ?? '',
      coverType: params?.coverType ?? 'premium-plus',
      make: params?.make ?? '',
      model: params?.model ?? '',
      submodel: queryParams?.submodel ?? '',
      secondSubmodel: queryParams?.submodel2 ?? '',
      submodel1: queryParams?.submodel ?? '',
      submodel2: queryParams?.submodel2 ?? '',
      parent_generation:
        (params?.year && hasNoSubmodels) || queryParams?.submodel
          ? (params?.year as string)
          : '',
    },
    selectedProduct: initialDataWithSecondSubmodels[0],
    featuredImage: initialDataWithSecondSubmodels[0]?.mainImage,
    selectedColor: initialDataWithSecondSubmodels[0]?.display_color ?? '',
    reviewImages: initialReviewImages,
    reviewImageTracker,
    setReviewImageTracker: (newImageTracker: Record<string, boolean>) => {
      set(() => ({
        reviewImageTracker: newImageTracker,
      }));
    },
    setSelectedProduct: (newProduct: IProductData) => {
      set(() => ({
        selectedProduct: newProduct,
        featuredImage: newProduct.product?.split(',')[0] ?? '',
      }));
    },
    setSelectedColor: (newColor: string) =>
      set(() => ({ selectedColor: newColor })),
    setFeaturedImage: (newImage: string) =>
      set(() => ({ featuredImage: newImage })),
    hasSubmodels: () => {
      const { modelData } = get();
      return modelData.some((model) => !!model.submodel1 || !!model.submodel2);
    },
    setQuery: (newQuery: Partial<TQuery>) => {
      set((state) => ({
        ...state,
        query: {
          ...state.query,
          ...newQuery,
        },
      }));

      const { setModelData } = get();
      setModelData();
      // const newModelData = get().modelData;
      // if (newModelData.length > 0 && Object.values(newQuery).some((v) => !!v)) {
      //   set({
      //     selectedProduct: newModelData[0],
      //   });
      // }
    },
    setModelData: () => {
      // const { initialModelData, query: newQuery } = get();
      // let filteredData = initialModelData;
      // if (newQuery.type) {
      //   filteredData = filteredData.filter((sku) => {
      //     return compareRawStrings(sku.type, newQuery.type);
      //   });
      // }
      // if (newQuery.make) {
      //   filteredData = filteredData.filter((sku) =>
      //     compareRawStrings(sku.make, newQuery.make as string)
      //   );
      // }
      // if (newQuery.model) {
      //   filteredData = filteredData.filter((sku) =>
      //     compareRawStrings(sku.model, newQuery.model as string)
      //   );
      // }
      // if (newQuery.year) {
      //   filteredData = filteredData.filter((sku) =>
      //     sku.year_options?.includes(newQuery.year as string)
      //   );
      // }
      // if (newQuery.submodel) {
      //   filteredData = filteredData.filter((sku) =>
      //     compareRawStrings(sku.submodel1, newQuery.submodel as string)
      //   );
      // }
      // if (newQuery.secondSubmodel) {
      //   filteredData = filteredData.filter((sku) =>
      //     compareRawStrings(sku.submodel2, newQuery.secondSubmodel as string)
      //   );
      // }
      // set({ modelData: filteredData });
    },
    reviewData: initialReviewData,
    setReviewData: (newReviewData: TReviewData[]) => {
      set(() => ({ reviewData: newReviewData }));
    },
    reviewDataSummary: initialReviewDataSummary,
    setReviewDataSummary: (newReviewDataSummary: TProductReviewSummary) => {
      set(() => ({ reviewDataSummary: newReviewDataSummary }));
    },
    setReviewsWithImages: (newReviewImages: TReviewData[]) => {
      set(() => ({ reviewImages: newReviewImages }));
    },
    paramsYear: params.year || '',
    customerSelectedYear: customerSelectedYear || '',
    setCustomerSelectedYear: (year: string) => {
      localStorage.setItem('heroDropdownYear', year);
      set(() => ({ customerSelectedYear: year }));
    },
  }));
};

export const CarSelectionContext = createContext<CarSelectionStore | null>(
  null
);

const CarSelectionProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
}) => {
  const {
    modelData: modelDataProps,
    reviewData,
    reviewDataSummary,
    reviewImages,
    searchParams,
  } = initialState;
  const router = useRouter();
  const pathParams = useParams<TPathParams>();
  const submodelParams = searchParams?.submodel ?? '';
  const secondSubmodelParams = searchParams?.submodel2 ?? '';
  if (modelDataProps.length === 0) {
    router.push('/404');
  }

  const queryParams = {
    submodel: submodelParams,
    secondSubmodel: secondSubmodelParams,
    submodel2: secondSubmodelParams,
  };

  // const modelData = modelDataTransformer({
  //   data: modelDataProps,
  //   params: pathParams ?? ({} as TPathParams),
  //   queryParams,
  // });
  // console.log('ModelData:', modelData);

  const store = useRef(
    createCarSelectionStore({
      params: pathParams ?? ({} as TPathParams),
      queryParams,
      initialModelData: modelDataProps,
      initialReviewData: reviewData as TReviewData[],
      initialReviewDataSummary: reviewDataSummary,
      initialReviewImages: reviewImages,
    })
  ).current;
  return (
    <CarSelectionContext.Provider value={store}>
      {children}
    </CarSelectionContext.Provider>
  );
};

export default CarSelectionProvider;
