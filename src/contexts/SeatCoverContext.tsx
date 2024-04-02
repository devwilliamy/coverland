'use client';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { TSeatCoverDataNewDB } from '@/lib/db/seat-covers';
import { TPathParams, TQueryParams } from '@/app/(main)/utils';
import { compareRawStrings } from '@/lib/utils';

type SeatCoverSelectionStore = ReturnType<typeof createSeatCoverSelectionStore>;

export type TQuery = {
  type: string;
  coverType: string;
  year: string;
  make: string;
  model: string;
  submodel: string; // Get rid of this in the future
  secondSubmodel: string; // Get rid of this in the future
  submodel1: string;
  submodel2: string;
  parent_generation: string;
};

interface ISeatCoverCoverProps {
  modelData: TSeatCoverDataNewDB[];
}

export interface ISeatCoverCoverSelectionState extends ISeatCoverCoverProps {
  selectedProduct: TSeatCoverDataNewDB;
  setSelectedProduct: (newProduct: TSeatCoverDataNewDB) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  query: TQuery;
  setQuery: (newQuery: Partial<TQuery>) => void;
}

type SeatCoverSelectionStoreParams = {
  modelData: TSeatCoverDataNewDB[];
  params: TPathParams;
  searchParams: TQueryParams | undefined;
};

const createSeatCoverSelectionStore = ({
  modelData,
  params,
  searchParams,
}: SeatCoverSelectionStoreParams) => {
  const customerSelectedYear =
    typeof window !== 'undefined'
      ? localStorage?.getItem('heroDropdownYear')
      : '';
      // TODO: - This should just be a DB call but need to add submodel1_slug column
  const modelDataWithFilteredSubmodelSelection = searchParams?.submodel
  ? modelData.filter((model) =>
      compareRawStrings(model.submodel1, searchParams.submodel as string)
    )
  : modelData;

  const initialQueryState = {
    year: (params?.year && customerSelectedYear) || '',
    type: params?.productType ?? '',
    coverType: params?.coverType ?? '',
    make: params?.make ?? '',
    model: params?.model ?? '',
    submodel: searchParams?.submodel ?? '',
    secondSubmodel: searchParams?.submodel2 ?? '',
    submodel1: searchParams?.submodel ?? '',
    submodel2: searchParams?.submodel2 ?? '',
    parent_generation: '',
  };

  return createStore<ISeatCoverCoverSelectionState>()((set, get) => ({
    modelData: modelDataWithFilteredSubmodelSelection,
    query: initialQueryState,
    setQuery: (newQuery: Partial<TQuery>) => {
      set((state) => ({
        ...state,
        query: {
          ...state.query,
          ...newQuery,
        },
      }));
    },
    selectedProduct: modelDataWithFilteredSubmodelSelection[0],
    setSelectedProduct: (newProduct: TSeatCoverDataNewDB) => {
      set(() => ({
        selectedProduct: newProduct,
        featuredImage: newProduct.product?.split(',')[0] ?? '',
      }));
    },
    selectedColor: modelDataWithFilteredSubmodelSelection[0]?.display_color ?? '',
    setSelectedColor: (newColor: string) =>
      set(() => ({ selectedColor: newColor })),
  }));
};

export const SeatCoverSelectionContext =
  createContext<SeatCoverSelectionStore | null>(null);

const SeatCoverSelectionProvider = ({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: any;
}) => {
  const { modelData, params, searchParams } = initialState;
  const router = useRouter();

  if (modelData.length === 0) {
    router.push('/404');
  }

  const store = useRef(
    createSeatCoverSelectionStore({
      modelData,
      params,
      searchParams,
    })
  ).current;
  return (
    <SeatCoverSelectionContext.Provider value={store}>
      {children}
    </SeatCoverSelectionContext.Provider>
  );
};

export default SeatCoverSelectionProvider;
