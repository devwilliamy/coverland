// useViewMoreHandler.ts
import { useState } from 'react';
import { getProductReviewsByPage, getProductReviewsByImage } from '@/lib/db/review';
import { TReviewData } from '@/lib/types/review';

type ViewMoreHandlerProps = {
  typeString: string;
  year: number;
  make: string;
  model: string;
  limit: number;
  page: number;
  sort: any; // Adjust the type as needed
  filters: any; // Adjust the type as needed
  reviewImageTracker: Record<string, boolean>;
  setLoading: (loading: boolean) => void;
  setReviewData: (data: TReviewData[]) => void;
  setPage: (page: number) => void;
};

const useViewMoreHandler = ({
  typeString,
  year,
  make,
  model,
  limit,
  page,
  sort,
  filters,
  reviewImageTracker,
  setLoading,
  setReviewData,
  setPage,
}: ViewMoreHandlerProps) => {
  const handleViewMore = async () => {
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
            page,
            limit,
          },
          sort,
          filters,
          // search: searchReview,
        },
        reviewImageTracker
      );

      setReviewData((prevReviewData) => [...prevReviewData, ...newReviewData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { handleViewMore };
};

export default useViewMoreHandler;
