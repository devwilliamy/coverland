'use client';
import { TInitialProductDataDB, TReviewData } from '@/lib/db';
import CarCoverSelector from './CarCoverSelector';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import {
  IProductData,
  TPathParams,
  TQueryParams,
  modelDataTransformer,
} from '../../utils';

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
}

const createCarSelectionStore = ({
  initialModelData,
  params,
  queryParams,
}: {
  initialModelData: IProductData[];
  params: TPathParams;
  queryParams: TQueryParams;
}) => {
  return createStore<ICarCoverSelectionState>()((set, get) => ({
    modelData: initialModelData,
    initialModelData,
    query: {
      year: '',
      type: params?.productType ?? '',
      make: params?.make ?? '',
      model: params?.model ?? '',
      submodel: queryParams?.submodel ?? '',
      secondSubmodel: queryParams?.secondSubmodel ?? '',
    },
    selectedProduct: initialModelData[0],
    featuredImage: initialModelData[0].mainImage,
    selectedColor: initialModelData[0]?.display_color ?? '',
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
      const newModelData = get().modelData;
      if (newModelData.length > 0 && Object.values(newQuery).some((v) => !!v)) {
        set({
          selectedProduct: newModelData[0],
        });
      }
    },
    setModelData: () => {
      const { initialModelData, query: newQuery } = get();
      console.log(newQuery);
      let filteredData = initialModelData;
      if (newQuery.type) {
        filteredData = filteredData.filter((sku) => {
          console.log(filteredData.length, sku.type, newQuery.type);
          return compareRawStrings(sku.type, newQuery.type);
        });
      }
      if (newQuery.make) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.make, newQuery.make as string)
        );
        console.log(filteredData);
      }
      if (newQuery.model) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.model, newQuery.model as string)
        );
        console.log(filteredData);
      }
      if (newQuery.year) {
        filteredData = filteredData.filter((sku) =>
          sku.year_options?.includes(newQuery.year as string)
        );
        console.log(filteredData);
      }
      if (newQuery.submodel) {
        console.log('check');

        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel1, newQuery.submodel as string)
        );
        console.log(filteredData);
      }
      if (newQuery.secondSubmodel) {
        console.log('check');

        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel2, newQuery.secondSubmodel as string)
        );
        console.log(filteredData);
      }
      console.log('check');
      console.log(filteredData.length);
      set({ modelData: filteredData });
    },
  }));
};

type CarSelectionStore = ReturnType<typeof createCarSelectionStore>;

export const CarSelectionContext = createContext<CarSelectionStore | null>(
  null
);

export default function CarPDP({
  modelData: modelDataProps,
  reviewData,
}: {
  modelData: TInitialProductDataDB[];
  reviewData: TReviewData[] | null;
  params: TPathParams;
}) {
  const pathParams = useParams<{
    year?: string;
    model?: string;
    make?: string;
    productType: string;
  }>();
  const searchParams = useSearchParams();
  const submodelParams = searchParams?.get('submodel') ?? '';
  const secondSubmodelParams = searchParams?.get('second_submodel') ?? '';

  const queryParams = {
    submodel: submodelParams,
    secondSubmodel: secondSubmodelParams,
  };

  const modelData = modelDataTransformer({
    data: modelDataProps,
    params: pathParams ?? ({} as TPathParams),
    queryParams,
  });

  console.log(modelDataProps);

  const store = useRef(
    createCarSelectionStore({
      params: pathParams ?? ({} as TPathParams),
      queryParams,
      initialModelData: modelData,
    })
  ).current;

  return (
    <>
      <CarSelectionContext.Provider value={store}>
        <CarCoverSelector reviewData={reviewData as TReviewData[]} />
      </CarSelectionContext.Provider>
    </>
  );
}
