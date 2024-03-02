import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { TPathParams } from '@/app/(main)/utils';
import { getProductReviewSummary } from '@/lib/db/review';
import { useContext, useEffect } from 'react';
import { useStore } from 'zustand';

export const useFetchReviewSummary = (params: TPathParams | null) => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const setReviewDataSummary = useStore(store, (s) => s.setReviewDataSummary);
  const setReviewIsLoading = useStore(store, (s) => s.setReviewIsLoading);
  const typeMapping: Record<
    string,
    'Car Covers' | 'SUV Covers' | 'Truck Covers'
  > = {
    'car-covers': 'Car Covers',
    'suv-covers': 'SUV Covers',
    'truck-covers': 'Truck Covers',
  };

  const typeString =
    typeMapping[params?.productType as string] || 'Truck Covers';

  useEffect(() => {
    const fetchData = async () => {
      setReviewIsLoading('reviewDataSummaryIsLoading', true);
      try {
        const response = await getProductReviewSummary({
          productType: typeString,
        });
        setReviewDataSummary(response);
      } catch (error) {
        console.error('Error fetching review summary data:', error);
      } finally {
        setReviewIsLoading('reviewDataSummaryIsLoading', false);
      }
    };
    fetchData();
  }, [typeString, setReviewDataSummary, setReviewIsLoading]);
};
