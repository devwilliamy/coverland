'use client';
import { TProductData, TReviewData } from '@/lib/db';
import CarCoverSelector from './CarCoverSelector';
import { TCarCoverSlugParams } from '../[make]/[model]/[year]/page';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';

export type TQuery = {
  year: string;
  type: string;
  make: string;
  model: string;
  submodel: string;
  secondSubmodel: string;
};

interface ICarCoverProps {
  modelData: TProductData[];
  initialModelData: TProductData[];
  selectedProduct: TProductData;
}

interface ICarCoverSelectionState extends ICarCoverProps {
  setQuery: (newQuery: Partial<TQuery>) => void;
  setModelData: () => void;
  hasSubmodels: () => boolean;
  setSelectedProduct: (newProduct: TProductData) => void;
  setFeaturedImage: (newImage: string) => void;
  setSelectedColor: (color: string) => void;
  featuredImage: string;
  selectedColor: string;
  query: TQuery;
}

const createCarSelectionStore = (
  initialModelData: TProductData[],
  initialSelectedProduct: TProductData,
  params: {
    make: string;
    model: string;
    type: string;
    submodel: string;
    secondSubmodel: string;
  } | null
) => {
  return createStore<ICarCoverSelectionState>()((set, get) => ({
    modelData: initialModelData,
    initialModelData,
    query: {
      year: '',
      type: params?.type ?? '',
      make: params?.make ?? '',
      model: params?.model ?? '',
      submodel: params?.submodel ?? '',
      secondSubmodel: params?.secondSubmodel ?? '',
    },
    selectedProduct: initialSelectedProduct,
    featuredImage: initialSelectedProduct.product?.split(',')[0] ?? '',
    selectedColor: initialModelData[0]?.display_color ?? '',
    setSelectedProduct: (newProduct: TProductData) => {
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
          compareRawStrings(sku.make, newQuery.make)
        );
        console.log(filteredData);
      }
      if (newQuery.model) {
        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.model, newQuery.model)
        );
        console.log(filteredData);
      }
      if (newQuery.year) {
        filteredData = filteredData.filter((sku) =>
          sku.year_options?.includes(newQuery.year)
        );
        console.log(filteredData);
      }
      if (newQuery.submodel) {
        console.log('check');

        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel1, newQuery.submodel)
        );
        console.log(filteredData);
      }
      if (newQuery.secondSubmodel) {
        console.log('check');

        filteredData = filteredData.filter((sku) =>
          compareRawStrings(sku.submodel2, newQuery.secondSubmodel)
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
  modelData: TProductData[];
  reviewData: TReviewData[] | null;
  params: TCarCoverSlugParams;
}) {
  const pathParams = useParams<{ year: string; model: string; make: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const submodelParams = searchParams?.get('submodel') ?? '';
  const secondSubmodelParams = searchParams?.get('second_submodel') ?? '';

  let modelData = submodelParams
    ? modelDataProps.filter((model) =>
        compareRawStrings(submodelParams, model.submodel1)
      )
    : modelDataProps;
  modelData = secondSubmodelParams
    ? modelData.filter((model) =>
        compareRawStrings(secondSubmodelParams, model.submodel2)
      )
    : modelData;

  const initialSelectedProduct =
    modelData.find(
      (model) => model.year_generation == model?.parent_generation
    ) ?? modelData[0];

  const productType = pathname?.includes('car-covers')
    ? 'Car Covers'
    : pathname?.includes('suv-covers')
      ? 'SUV Covers'
      : 'Truck Covers';
  const params = {
    model: pathParams?.model ?? '',
    make: pathParams?.make ?? '',
    type: productType,
    submodel: submodelParams,
    secondSubmodel: secondSubmodelParams,
  };

  console.log(params);

  const store = useRef(
    createCarSelectionStore(modelData, initialSelectedProduct, params)
  ).current;

  return (
    <>
      <CarSelectionContext.Provider value={store}>
        <CarCoverSelector reviewData={reviewData as TReviewData[]} />
      </CarSelectionContext.Provider>
    </>
  );
}
