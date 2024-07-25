import LoadingButton from '@/components/ui/loading-button';
import { useReviewContext } from '@/contexts/ReviewContext';
import useViewMoreHandler from '@/hooks/review/useViewMoreHandler';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';

export default function ReviewsLoadMoreButton() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const { limit, isReviewLoading, filterImageOn } = useReviewContext();
  const reviewData = useStore(store, (s) => s.reviewData);
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);
  const areThereMoreReviews = reviewData.length < total_reviews;

  const { handleViewMore } = useViewMoreHandler();

  return (
    <>
      {areThereMoreReviews && !filterImageOn ? (
        // Can remove filterImageOn later, just used for filterImageBy quickfix
        <LoadingButton
          className="my-4 max-w-[160px] items-stretch justify-center whitespace-nowrap rounded-full border border-solid border-black bg-white px-8 py-3.5 font-black leading-4 tracking-wide text-black transition-colors duration-150 hover:bg-black hover:text-white"
          onClick={handleViewMore}
          isLoading={isReviewLoading}
          buttonText={`View ${limit} More`}
        />
      ) : (
        <div className="py-3"></div>
      )}
    </>
  );
}
