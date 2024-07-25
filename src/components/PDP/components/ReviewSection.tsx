'use client';
import { useStore } from 'zustand';
import useStoreContext from '@/hooks/useStoreContext';
import ReviewCard from './ReviewCard';
import ReviewHeaderGallery from './ReviewHeaderGallery';
import ReviewSummaryHeader from './ReviewSummaryHeader';
import ReviewsLoadMoreButton from './ReviewsLoadMoreButton';
import ReviewFilters from './ReviewFilters';
import { ReviewProvider } from '@/contexts/ReviewContext';

const ReviewSection = ({ showHeader }: { showHeader?: boolean }) => {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);

  return (
    <ReviewProvider>
      <div className="relative mb-[56px] flex w-full flex-col items-center px-[22px] lg:mb-0 lg:px-[59px] lg:py-2">
        {showHeader && (
          <p
            className="flex items-center justify-center pt-[30px] text-center text-[30px]  font-black uppercase text-black md:text-3xl lg:block lg:pt-[80px] lg:text-[42px]"
            id="reviews"
          >
            Reviews
          </p>
        )}
        {reviewData?.length === 0 ? (
          <div className="flex items-center justify-center py-4">
            No Reviews Found
          </div>
        ) : (
          <>
            <ReviewSummaryHeader />
            <ReviewHeaderGallery />
            <ReviewFilters />
          </>
        )}
        {!!reviewData?.length && (
          <div className="mt-4 flex flex-col items-center gap-6 lg:mt-[10px]">
            {reviewData?.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
            <ReviewsLoadMoreButton />
          </div>
        )}
      </div>
    </ReviewProvider>
  );
};

export default ReviewSection;
