'use client';
import { TInitialProductDataDB, TReviewData } from '@/lib/db';
import CarCoverSelector from './CarCoverSelector';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import {
  IProductData,
  TPathParams,
  TQueryParams,
  modelDataTransformer,
} from '../../utils';
import { TProductReviewSummary } from '@/lib/db/review';

export type TQuery = {
  type: string;
  year: string;
  make: string;
  model: string;
  submodel: string;
  secondSubmodel: string;
};

interface ICarCoverProps {
  modelData: IProductData[];
  initialModelData: IProductData[];
  selectedProduct: IProductData;
  reviewData: TReviewData[];
  reviewDataSummary: TProductReviewSummary;
  reviewImages: Record<string, boolean>;
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
  initialReviewImages: Record<string, boolean>;
}) => {
  const hasNoSubmodels = initialModelData.every(
    (model) => !model.submodel1 && !model.submodel2
  );

  const initialDataWithSubmodels = queryParams?.submodel
    ? initialModelData.filter((model) =>
        compareRawStrings(model.submodel1, queryParams.submodel as string)
      )
    : initialModelData;

  const initialDataWithSecondSubmodels = queryParams?.secondSubmodel
    ? initialDataWithSubmodels.filter((model) =>
        compareRawStrings(model.submodel2, queryParams.secondSubmodel as string)
      )
    : initialDataWithSubmodels;

  return createStore<ICarCoverSelectionState>()((set, get) => ({
    modelData: initialDataWithSecondSubmodels,
    initialModelData: initialDataWithSecondSubmodels,
    query: {
      year:
        (params?.year && hasNoSubmodels) || queryParams?.submodel
          ? (params?.year as string)
          : '',
      type: params?.productType ?? '',
      make: params?.make ?? '',
      model: params?.model ?? '',
      submodel: queryParams?.submodel ?? '',
      secondSubmodel: queryParams?.secondSubmodel ?? '',
    },
    selectedProduct: initialDataWithSecondSubmodels[0],
    featuredImage: initialDataWithSecondSubmodels[0]?.mainImage,
    selectedColor: initialDataWithSecondSubmodels[0]?.display_color ?? '',
    reviewImages: initialReviewImages,
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
      set({ modelData: filteredData });
    },
    reviewData: initialReviewData,
    setReviewData: (newReviewData: TReviewData[]) => {
      set(() => ({ reviewData: newReviewData }));
    },
    reviewDataSummary: initialReviewDataSummary,
    setReviewDataSummary: (newReviewDataSummary: TProductReviewSummary) => {
      set(() => ({ reviewDataSummary: newReviewDataSummary }));
    },
    setReviewImages: (newReviewImages: Record<string, boolean>) => {
      set(() => ({ reviewImages: newReviewImages }));
    },
    paramsYear: params.year || '',
  }));
};

type CarSelectionStore = ReturnType<typeof createCarSelectionStore>;

export const CarSelectionContext = createContext<CarSelectionStore | null>(
  null
);

export default function CarPDP({
  modelData: modelDataProps,
  reviewData,
  reviewDataSummary,
  reviewImages,
}: {
  modelData: TInitialProductDataDB[];
  reviewData: TReviewData[] | null;
  params: TPathParams;
  reviewDataSummary: TProductReviewSummary;
  reviewImages: Record<string, boolean>;
}) {
  const router = useRouter();
  const pathParams = useParams<TPathParams>();
  const searchParams = useSearchParams();
  const submodelParams = searchParams?.get('submodel') ?? '';
  const secondSubmodelParams = searchParams?.get('second_submodel') ?? '';
  if (modelDataProps.length === 0) {
    router.push('/404');
  }

  const queryParams = {
    submodel: submodelParams,
    secondSubmodel: secondSubmodelParams,
  };

  const modelData = modelDataTransformer({
    data: modelDataProps,
    params: pathParams ?? ({} as TPathParams),
    queryParams,
  });

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
      <CarCoverSelector />
    </CarSelectionContext.Provider>
  );
}
