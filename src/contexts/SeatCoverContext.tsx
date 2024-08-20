'use client';
import { createStore } from 'zustand';
import { createContext, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import { TPathParams, TQueryParams, getCompleteSelectionData } from '@/utils';
import { compareRawStrings, isFullSet } from '@/lib/utils';
import { TProductReviewSummary, TReviewData } from '@/lib/types/review';

type SeatCoverSelectionStore = ReturnType<typeof createSeatCoverSelectionStore>;

export type TQuery = {
  type: string;
  coverType: string;
  year: string;
  make: string;
  model: string;
  submodel: string; // Get rid of this in the future
  secondSubmodel: string; // Get rid of this in the future
  thirdSubmodel: string; // Get rid of this in the future
  submodel1: string;
  submodel2: string;
  submodel3: string;
  parent_generation: string;
};

interface ISeatCoverCoverProps {
  modelData: TSeatCoverDataDB[];
  reviewData: TReviewData[];
  reviewDataSummary: TProductReviewSummary;
  reviewImages: TReviewData[];
}

export interface ISeatCoverCoverSelectionState extends ISeatCoverCoverProps {
  selectedProduct: TSeatCoverDataDB;
  setSelectedProduct: (newProduct: TSeatCoverDataDB) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  query: TQuery;
  setQuery: (newQuery: Partial<TQuery>) => void;
  isComplete: boolean;
  setReviewData: (newReviewData: TReviewData[]) => void;
  addReviewData: (data: TReviewData[]) => void;
  setReviewDataSummary: (newReviewDataSummary: TProductReviewSummary) => void;
  reviewImageTracker: Record<string, boolean>;
  setReviewImageTracker: (newImageTracker: Record<string, boolean>) => void;
  availableColors: string[];
  selectedSetDisplay: string;
  setAvailableColors: (availableColors: string[]) => void
  setSelectedSetDisplay: (selectedSet: string) => void;
}

type SeatCoverSelectionStoreParams = {
  modelData: TSeatCoverDataDB[];
  params: TPathParams;
  searchParams: TQueryParams | undefined;
  initialReviewData: TReviewData[];
  initialReviewDataSummary: TProductReviewSummary;
  initialReviewImages: TReviewData[];
};

const createSeatCoverSelectionStore = ({
  modelData,
  params,
  searchParams,
  initialReviewData,
  initialReviewDataSummary,
  initialReviewImages,
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

  const modelDataWithFilteredSubmodel3Selection = searchParams?.submodel3
    ? modelDataWithFilteredSubmodelSelection.filter((model) =>
        compareRawStrings(model.submodel3, searchParams.submodel3 as string)
      )
    : modelDataWithFilteredSubmodel2Selection;

  const reviewImageTracker: Record<string, boolean> = {};

  initialReviewData.forEach((reviewData) => {
    !!reviewData.review_image &&
      reviewData.review_image.split(',').map((imageUrl) => {
        if (!reviewImageTracker[imageUrl]) {
          reviewImageTracker[imageUrl] = true;
        }
      });
  });

  const initialQueryState = {
    year: (params?.year && customerSelectedYear) || '',
    type: params?.productType ?? '',
    coverType: params?.coverType ?? 'leather',
    make: params?.make ?? '',
    model: params?.model ?? '',
    submodel: searchParams?.submodel ?? '',
    secondSubmodel: searchParams?.submodel2 ?? '',
    thirdSubmodel: searchParams?.submodel3 ?? '',
    submodel1: searchParams?.submodel ?? '',
    submodel2: searchParams?.submodel2 ?? '',
    submodel3: searchParams?.submodel3 ?? '',
    parent_generation: '',
  };

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelDataWithFilteredSubmodel3Selection,
  });

  const firstAvailableSet = modelDataWithFilteredSubmodel3Selection.filter(
    (seatCover) =>
      isFullSet(seatCover?.display_set ?? '') ===
      isFullSet(modelDataWithFilteredSubmodel3Selection[0]?.display_set ?? '')
  );

  const availableColors = new Set(['gray', 'black', 'beige']);
  const firstAvaiableColor = firstAvailableSet
    .map((seatCover) => seatCover?.display_color?.toLowerCase() ?? '')
    .filter((color) => availableColors.has(color));

  return createStore<ISeatCoverCoverSelectionState>()((set, get) => ({
    modelData: modelDataWithFilteredSubmodel3Selection,
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
    selectedProduct: modelDataWithFilteredSubmodel3Selection[0],
    setSelectedProduct: (newProduct: TSeatCoverDataDB) => {
      set(() => ({
        selectedProduct: newProduct,
        featuredImage: newProduct?.product?.split(',')[0] ?? '',
      }));
    },
    selectedColor:
      modelDataWithFilteredSubmodel3Selection[0]?.display_color ?? '',
    setSelectedColor: (newColor: string) =>
      set(() => ({ selectedColor: newColor })),
    isComplete,
    reviewImages: initialReviewImages,
    reviewImageTracker,
    setReviewImageTracker: (newImageTracker: Record<string, boolean>) => {
      set(() => ({
        reviewImageTracker: newImageTracker,
      }));
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
    selectedSetDisplay: isFullSet(
      modelDataWithFilteredSubmodel3Selection[0]?.display_set ?? ''
    ),
    setSelectedSetDisplay: (selectedSet: string) => {
      set(() => ({ selectedSetDisplay: selectedSet }));
    },
    availableColors: firstAvaiableColor,
    setAvailableColors: (newAvailableColors: string[]) =>
      set(() => ({ availableColors: newAvailableColors })),
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
  const {
    modelData,
    params,
    searchParams,
    reviewData,
    reviewDataSummary,
    reviewImages,
  } = initialState;
  const router = useRouter();

  if (modelData.length === 0) {
    router.push('/404');
  }

  const store = useRef(
    createSeatCoverSelectionStore({
      modelData,
      params,
      searchParams,
      initialReviewData: reviewData as TReviewData[],
      initialReviewDataSummary: reviewDataSummary,
      initialReviewImages: reviewImages,
    })
  ).current;
  return (
    <SeatCoverSelectionContext.Provider value={store}>
      {children}
    </SeatCoverSelectionContext.Provider>
  );
};

export default SeatCoverSelectionProvider;
