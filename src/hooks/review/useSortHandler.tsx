// useSortHandler.ts
import { useState } from 'react';
import {
  getProductReviewsByPage,
  getProductReviewsByImage,
} from '@/lib/db/review';
import { SortParams, TReviewData } from '@/lib/types/review';

type SortHandlerProps = {
  typeString: string;
  year: number;
  make: string;
  model: string;
  limit: number;
  setLoading: (loading: boolean) => void;
  setReviewData: (data: TReviewData[]) => void;
  setPage: (page: number) => void;
  setSort: (sort: SortParams[]) => void;
};

const useSortHandler = ({
  typeString,
  year,
  make,
  model,
  limit,
  setLoading,
  setReviewData,
  setPage,
  setSort,
}: SortHandlerProps) => {
  const handleSortSelectionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let sortArray: SortParams[] = [];
    switch (e.target.value) {
      case 'newest':
        sortArray = [{ field: 'reviewed_at', order: 'desc' }];
        break;
      case 'helpful':
        sortArray = [
          { field: 'sku', order: 'asc' }, // Temporary requirement to make images show first
          { field: 'helpful', order: 'desc', nullsFirst: false },
        ];
        break;
      case 'oldest':
        sortArray = [{ field: 'reviewed_at', order: 'asc' }];
        break;
      // Add more cases as needed
      default:
        sortArray = [
          { field: 'sku', order: 'asc' }, // Temporary requirement to make images show first
          { field: 'helpful', order: 'desc', nullsFirst: false },
        ];
    }

    try {
      setLoading(true);

      const newReviewData = await getProductReviewsByPage(
        {
          productType: typeString,
          year,
          make,
          model,
        },
        {
          pagination: {
            page: 0, // Reset to the beginning
            limit,
          },
          sort: sortArray,
        }
      );

      setSort(sortArray);
      setReviewData(newReviewData); // Only show the first 8 when a sort has been picked
      setPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleSortSelectionChange };
};

export default useSortHandler;
