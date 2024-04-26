'use client';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { TPathParams, TQueryParams, getCompleteSelectionData } from '@/utils';
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
  modelData: TSeatCoverDataDB[];
}

export interface ISeatCoverCoverSelectionState extends ISeatCoverCoverProps {
  selectedProduct: TSeatCoverDataDB;
  setSelectedProduct: (newProduct: TSeatCoverDataDB) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  query: TQuery;
  setQuery: (newQuery: Partial<TQuery>) => void;
  isComplete: boolean;
}

type SeatCoverSelectionStoreParams = {
  modelData: TSeatCoverDataDB[];
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

  const modelDataWithFilteredSubmodel2Selection = searchParams?.submodel2
    ? modelDataWithFilteredSubmodelSelection.filter((model) =>
        compareRawStrings(model.submodel2, searchParams.submodel2 as string)
      )
    : modelDataWithFilteredSubmodelSelection;

  const initialQueryState = {
    year: (params?.year && customerSelectedYear) || '',
    type: params?.productType ?? '',
    coverType: params?.coverType ?? 'leather',
    make: params?.make ?? '',
    model: params?.model ?? '',
    submodel: searchParams?.submodel ?? '',
    secondSubmodel: searchParams?.submodel2 ?? '',
    submodel1: searchParams?.submodel ?? '',
    submodel2: searchParams?.submodel2 ?? '',
    parent_generation: '',
  };

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelDataWithFilteredSubmodel2Selection,
  });

  return createStore<ISeatCoverCoverSelectionState>()((set, get) => ({
    modelData: modelDataWithFilteredSubmodel2Selection,
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
    selectedProduct: modelDataWithFilteredSubmodel2Selection[0],
    setSelectedProduct: (newProduct: TSeatCoverDataDB) => {
      set(() => ({
        selectedProduct: newProduct,
        featuredImage: newProduct.product?.split(',')[0] ?? '',
      }));
    },
    selectedColor:
      modelDataWithFilteredSubmodel2Selection[0]?.display_color ?? '',
    setSelectedColor: (newColor: string) =>
      set(() => ({ selectedColor: newColor })),
    isComplete,
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
