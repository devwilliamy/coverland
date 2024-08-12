import { getProductReviewsByPage } from '@/lib/db/review';
import { useReviewContext } from '@/contexts/ReviewContext';
import useStoreContext from '../useStoreContext';
import { SEAT_COVERS, CAR_COVERS } from '@/lib/constants';
import { useStore } from 'zustand';
import useDetermineType from '../useDetermineType';

const useViewMoreHandler = () => {
  const { limit, page, sort, filters, setPage, setIsReviewLoading } =
    useReviewContext();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const reviewImageTracker = useStore(store, (s) => s.reviewImageTracker);
  const addReviewData = useStore(store, (s) => s.addReviewData);
  const { isSeatCover } = useDetermineType();
  const typeString = isSeatCover ? SEAT_COVERS : CAR_COVERS;

  const handleViewMore = async () => {
    try {
      setIsReviewLoading(true);
      const newReviewData = await getProductReviewsByPage(
        {
          productType: typeString,
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

      addReviewData(newReviewData);
      setPage((prevPage: number) => prevPage + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsReviewLoading(false);
    }
  };

  return { handleViewMore };
};

export default useViewMoreHandler;
