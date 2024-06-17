import useDetermineType from '@/hooks/useDetermineType';
import useStoreContext from '@/hooks/useStoreContext';
import { determineShortReviewCount } from '@/lib/utils';
import { useStore } from 'zustand';

export default function ReviewTotalCount() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);
  const { isYearPage, isModelPage } = useDetermineType();
  return (
    <>
      {isYearPage || isModelPage
        ? determineShortReviewCount(total_reviews)
        : total_reviews}{' '}
      reviews
    </>
  );
}
