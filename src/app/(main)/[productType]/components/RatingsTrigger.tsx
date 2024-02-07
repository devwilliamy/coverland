import ReviewSheet from '@/components/PDP/ReviewSheet';
import CustomerReviewTabs from '@/components/PDP/components/CustomerReviewTabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React, { useContext } from 'react';
import { useStore } from 'zustand';
import { CarSelectionContext } from './CarPDP';

function RatingsTrigger() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);

  return (
    <>
      <div className="hidden lg:flex">
        <Dialog>
          <DialogTrigger
            className="ml-2 text-blue-400 underline"
            disabled={!total_reviews}
          >
            {total_reviews || '2'} ratings
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center lg:min-w-[77vw] lg:max-w-[1120px]">
            <CustomerReviewTabs  />
          </DialogContent>
        </Dialog>
      </div>
      <div className="lg:hidden">
        <ReviewSheet  />
      </div>{' '}
    </>
  );
}

export default RatingsTrigger;
