// useSortHandler.ts
import { useState } from 'react';
import {
  getProductReviewsByPage,
  getProductReviewsByImage,
} from '@/lib/db/review';
import { TReviewData } from '@/lib/types/review';

type SortHandlerProps = {
  typeString: string;
  year: number;
  make: string;
  model: string;
  limit: number;
  setLoading: (loading: boolean) => void;
  setReviewData: (data: TReviewData[]) => void;
  setPage: (page: number) => void;
  setSort: (sort: { field: string; order: 'asc' | 'desc' }) => void;
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
    let field: string;
    let order: 'asc' | 'desc' = 'asc';

    switch (e.target.value) {
      case 'newest':
        field = 'reviewed_at';
        order = 'desc';
        break;
      case 'helpful':
        field = 'helpful';
        order = 'desc';
        break;
      case 'oldest':
        field = 'reviewed_at';
        break;
      // Add more cases as needed
      default:
        field = 'helpful';
        order = 'desc';
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
          sort: {
            field,
            order,
          },
        }
      );

      setSort({ field, order });
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
