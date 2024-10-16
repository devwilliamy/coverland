import { useReviewContext } from '@/contexts/ReviewContext';
import { CAR_COVERS, FLOOR_MATS, SEAT_COVERS } from '@/lib/constants';
import {
  getProductReviewsByPage,
  getProductReviewsByImage,
} from '@/lib/db/review';
import { useStore } from 'zustand';
import useDetermineType from '../useDetermineType';
import useStoreContext from '../useStoreContext';

const useFilterHandler = () => {
  // Define the function that handles the filter selection change
  const {
    limit,
    sort,
    setIsReviewLoading,
    setPage,
    setFilters,
    setFilterImageOn,
  } = useReviewContext();
  const { isSeatCover, isFloorMat } = useDetermineType();
  let typeString = ''; // Declare the typeString variable
  if (isSeatCover) {
    typeString = SEAT_COVERS;
  } else if (isFloorMat) {
    typeString = FLOOR_MATS;
  } else {
    typeString = CAR_COVERS;
  }
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const setReviewData = useStore(store, (s) => s.setReviewData);
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
      setIsReviewLoading(true);
      let newReviewData;

      if (e.target.value === 'none') {
        newReviewData = await getProductReviewsByPage(
          { productType: typeString },
          {
            pagination: { page: 0, limit },
            sort,
          }
        );
        setFilterImageOn(false);
      } else if (e.target.value === 'images') {
        newReviewData = await getProductReviewsByImage(
          { productType: typeString },
          {
            filters: [{ field, operator, value }],
            sort,
          }
        );
        setFilterImageOn(true);
      } else {
        newReviewData = await getProductReviewsByPage(
          { productType: typeString },
          {
            pagination: { page: 0, limit },
            filters: [{ field, operator, value }],
            sort,
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
      setIsReviewLoading(false);
    }
  };

  // Return the function that the component will use
  return { handleFilterSelectionChange };
};

export default useFilterHandler;
