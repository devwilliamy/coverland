import {
  getProductReviewsByPage,
  getProductReviewsByImage,
} from '@/lib/db/review';
import { TReviewData } from '@/lib/types/review';

type FilterHandlerProps = {
  typeString: string;
  year: number;
  make: string;
  model: string;
  limit: number;
  setLoading: (loading: boolean) => void;
  setReviewData: (data: TReviewData[]) => void;
  setPage: (page: number) => void;
  setFilters: (
    filters: Array<{ field: string; operator: string; value: any }>
  ) => void;
  setFilterImageOn: (on: boolean) => void;
};

const useFilterHandler = ({
  typeString,
  year,
  make,
  model,
  limit,
  setLoading,
  setReviewData,
  setPage,
  setFilters,
  setFilterImageOn,
}: FilterHandlerProps) => {
  // Define the function that handles the filter selection change
  const handleFilterSelectionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Logic to determine filter parameters based on the selected value
    let field: string;
    let operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte';
    let value: any;

    switch (e.target.value) {
      case 'images':
        field = 'review_image';
        operator = 'neq';
        value = '';
        break;
      case 'positive':
        field = 'rating_stars';
        operator = 'gt';
        value = '3';
        break;
      case 'critical':
        field = 'rating_stars';
        operator = 'lt';
        value = '3';
        break;
      default:
        field = 'review_image';
        operator = 'neq';
        value = '';
        break;
    }

    // Try to fetch and update the review data based on the selected filter
    try {
      setLoading(true);
      let newReviewData;

      if (e.target.value === 'none') {
        newReviewData = await getProductReviewsByPage(
          { productType: typeString, year, make, model },
          {
            pagination: { page: 0, limit },
            sort: [
              { field: 'sku', order: 'asc' },
              { field: 'helpful', order: 'desc', nullsFirst: false },
            ],
          }
        );
        setFilterImageOn(false);
      } else if (e.target.value === 'images') {
        newReviewData = await getProductReviewsByImage(
          { productType: typeString, year, make, model },
          {
            filters: [{ field, operator, value }],
            sort: [
              { field: 'sku', order: 'asc' },
              { field: 'helpful', order: 'desc', nullsFirst: false },
            ],
          }
        );
        setFilterImageOn(true);
      } else {
        newReviewData = await getProductReviewsByPage(
          { productType: typeString, year, make, model },
          {
            pagination: { page: 0, limit },
            filters: [{ field, operator, value }],
            sort: [
              { field: 'sku', order: 'asc' },
              { field: 'helpful', order: 'desc', nullsFirst: false },
            ],
          }
        );
        setFilterImageOn(false);
      }

      setFilters([{ field, operator, value }]);
      setReviewData(newReviewData);
      setPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Return the function that the component will use
  return { handleFilterSelectionChange };
};

export default useFilterHandler;
