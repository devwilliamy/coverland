'use client';
import { TReviewData } from '@/lib/types/review';
// import CarCoverSelector from './CarCoverSelector';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import {
  IProductData,
  TPathParams,
  TQueryParams,
  modelDataShopifyTransformer,
  modelDataTransformer,
} from '@/utils';
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
  thirdSubmodel: string;
  submodel1: string;
  submodel2: string;
  submodel3: string;
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

export interface ICarCoverSelectionState extends ICarCoverProps {
  setQuery: (newQuery: Partial<TQuery>) => void;
  setModelData: () => void;
  hasSubmodels: () => boolean;
  setSelectedProduct: (newProduct: IProductData) => void;
  setFeaturedImage: (newImage: string) => void;
  setSelectedColor: (color: string) => void;
  featuredImage: string;
  selectedColor: string;
  query: TQuery;
  paramsYear: string;
  setReviewData: (newReviewData: TReviewData[]) => void;
  addReviewData: (data: TReviewData[]) => void;
  setReviewDataSummary: (newReviewDataSummary: TProductReviewSummary) => void;
  reviewImageTracker: Record<string, boolean>;
  setReviewImageTracker: (newImageTracker: Record<string, boolean>) => void;
  customerSelectedYear: string;
  setCustomerSelectedYear: (year: string) => void;
  selectedYearGeneration: string;
  setSelectedYearGeneration: (year: string) => void;
  selectedBodyTrim: string;
  setSelectedBodyTrim: (bodyTrim: string) => void;
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
  const hasNoSubmodels = initialModelData.every(
    (model) => !model.submodel1 && !model.submodel2 && !model.submodel3
  );

  // Filter down initial model data based on submodel1-3
  // If there aren't any submodels, just take initial model data
  const initialDataWithSubmodels = queryParams?.submodel
    ? initialModelData.filter((model) =>
        compareRawStrings(model.submodel1, queryParams.submodel as string)
      )
    : initialModelData;

  const initialDataWithSecondSubmodels = queryParams?.submodel2
    ? initialDataWithSubmodels.filter((model) =>
        compareRawStrings(model.submodel2, queryParams.submodel2 as string)
      )
    : initialDataWithSubmodels;

  const initialDataWithThirdSubmodels = queryParams?.submodel3
    ? initialDataWithSubmodels.filter((model) =>
        compareRawStrings(model.submodel3, queryParams.submodel3 as string)
      )
    : initialDataWithSecondSubmodels;

  if (initialDataWithThirdSubmodels.length === 0) {
    notFound();
  }

  const sortedInitialDataByYearGenerationAndSubmodel: IProductData[] =
    initialDataWithThirdSubmodels.sort((a, b) => {
      // Sort by year_generation (latest first)
      const startYearA = parseInt(a.year_generation.split('-')[0], 10);
      const startYearB = parseInt(b.year_generation.split('-')[0], 10);

      if (startYearA !== startYearB) {
        return startYearB - startYearA; // Sort by year generation (latest first)
      }

      // If year_generation is the same, sort by submodel1 alphabetically
      if (a.submodel1 < b.submodel1) return -1;
      if (a.submodel1 > b.submodel1) return 1;
      return 0; // If submodel1 is the same, no sorting required
    });
  // Until we have actual photos, we don't want to have repeat photos in reviews
  const reviewImageTracker: Record<string, boolean> = {};
  initialReviewData.forEach((reviewData) => {
    !!reviewData.review_image &&
      reviewData.review_image.split(',').map((imageUrl) => {
        if (!reviewImageTracker[imageUrl]) {
          reviewImageTracker[imageUrl] = true;
        }
      });
  });

  const customerSelectedYear =
    typeof window !== 'undefined'
      ? localStorage?.getItem('heroDropdownYear')
      : '';

  return createStore<ICarCoverSelectionState>()((set, get) => ({
    modelData: sortedInitialDataByYearGenerationAndSubmodel,
    initialModelData: sortedInitialDataByYearGenerationAndSubmodel,
    query: {
      year: (params?.year && customerSelectedYear) || '',
      type: params?.productType ?? '',
      coverType: params?.coverType ?? 'premium-plus',
      make: params?.make ?? '',
      model: params?.model ?? '',
      submodel: queryParams?.submodel ?? '',
      secondSubmodel: queryParams?.submodel2 ?? '',
      thirdSubmodel: queryParams?.submodel3 ?? '',
      submodel1: queryParams?.submodel ?? '',
      submodel2: queryParams?.submodel2 ?? '',
      submodel3: queryParams?.submodel3 ?? '',
      parent_generation:
        (params?.year && hasNoSubmodels) || queryParams?.submodel
          ? (params?.year as string)
          : '',
    },
    selectedProduct: sortedInitialDataByYearGenerationAndSubmodel[0],
    featuredImage: sortedInitialDataByYearGenerationAndSubmodel[0]?.mainImage,
    selectedColor:
      sortedInitialDataByYearGenerationAndSubmodel[0]?.display_color ?? '',
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
      return modelData.some(
        (model) => !!model.submodel1 || !!model.submodel2 || !!model.submodel3
      );
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
      const newModelData = get().modelData;
      if (newModelData.length > 0 && Object.values(newQuery).some((v) => !!v)) {
        set({
          selectedProduct: newModelData[0],
        });
      }
    },
    setModelData: () => {
      const { initialModelData, query: newQuery } = get();
      let filteredData = initialModelData;
      if (newQuery.type) {
        filteredData = filteredData.filter((sku) => {
          return compareRawStrings(sku.type, newQuery.type);
        });
      }
      if (newQuery.make) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.make, newQuery.make as string)
        );
      }
      if (newQuery.model) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.model, newQuery.model as string)
        );
      }
      if (newQuery.year) {
        filteredData = filteredData.filter((sku) =>
          sku.year_options?.includes(newQuery.year as string)
        );
      }
      if (newQuery.submodel) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel1, newQuery.submodel as string)
        );
      }
      if (newQuery.secondSubmodel) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel2, newQuery.secondSubmodel as string)
        );
      }
      if (newQuery.thirdSubmodel) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel3, newQuery.thirdSubmodel as string)
        );
      }
      set({ modelData: filteredData });
    },
    reviewData: initialReviewData,
    setReviewData: (newReviewData: TReviewData[]) => {
      set(() => ({ reviewData: newReviewData }));
    },
    addReviewData: (data: TReviewData[]) =>
      set((state) => ({ reviewData: [...state.reviewData, ...data] })),
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
    selectedYearGeneration:
      sortedInitialDataByYearGenerationAndSubmodel[0]?.year_generation ?? '',
    setSelectedYearGeneration: (year: string) =>
      set(() => ({ selectedYearGeneration: year })),
    selectedBodyTrim:
      sortedInitialDataByYearGenerationAndSubmodel[0]?.submodel1 ?? '',
    setSelectedBodyTrim: (bodyTrim: string) =>
      set(() => ({ selectedBodyTrim: bodyTrim })),
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
  initialState: any;
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
  const thirdSubmodelParams = searchParams?.submodel3 ?? '';
  if (modelDataProps.length === 0) {
    router.push('/404');
  }

  const queryParams = {
    submodel: submodelParams,
    submodel1: submodelParams,
    secondSubmodel: secondSubmodelParams,
    thirdSubmodel: thirdSubmodelParams,
    submodel2: secondSubmodelParams,
    submodel3: thirdSubmodelParams,
  };

  const modelData = modelDataShopifyTransformer({
    data: modelDataProps,
    params: pathParams ?? ({} as TPathParams),
    queryParams,
  });
  // console.log('ModelData:', modelData);

  const store = useRef(
    createCarSelectionStore({
      params: pathParams ?? ({} as TPathParams),
      queryParams,
      initialModelData: modelData,
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
