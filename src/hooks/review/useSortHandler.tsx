import { getProductReviewsByPage } from '@/lib/db/review';
import { SortParams } from '@/lib/types/review';
import { CAR_COVERS, FLOOR_MATS, SEAT_COVERS } from '@/lib/constants';
import { useReviewContext } from '@/contexts/ReviewContext';
import { useStore } from 'zustand';
import useStoreContext from '../useStoreContext';
import useDetermineType from '../useDetermineType';

const useSortHandler = () => {
  const { limit, filters, setPage, setIsReviewLoading, setSort } =
    useReviewContext();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const { isSeatCover, isFloorMat } = useDetermineType();
  let typeString = ''; // Declare the typeString variable
  if (isSeatCover) {
    typeString = SEAT_COVERS;
  } else if (isFloorMat) {
    typeString = FLOOR_MATS;
  } else {
    typeString = CAR_COVERS;
  }
  const setReviewData = useStore(store, (s) => s.setReviewData);

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
      setIsReviewLoading(true);
      const newReviewData = await getProductReviewsByPage(
        {
          productType: typeString,
        },
        {
          pagination: {
            page: 0, // Reset to the beginning
            limit,
          },
          filters,
          sort: sortArray,
        }
      );

      setSort(sortArray);
      setReviewData(newReviewData); // Only show the first 8 when a sort has been picked
      setPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsReviewLoading(false);
    }
  };

  return { handleSortSelectionChange };
};

export default useSortHandler;
