import ReviewSheet from '@/components/PDP/ReviewSheet';
import CustomerReviewTabs from '@/components/PDP/components/CustomerReviewTabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TReviewData } from '@/lib/db';
import React from 'react';

function RatingsTrigger({
  reviewData,
  reviewCount,
}: {
  reviewData: TReviewData[] | undefined | null;
  reviewCount: number;
}) {
  return (
    <>
      <div className="hidden lg:flex">
        <Dialog>
          <DialogTrigger
            className="ml-2 text-blue-400 underline"
            disabled={!reviewCount}
          >
            {reviewCount || '2'} ratings
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center lg:min-w-[77vw] lg:max-w-[1120px]">
            <CustomerReviewTabs reviewData={reviewData} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="lg:hidden">
        <ReviewSheet reviewData={reviewData} />
      </div>{' '}
    </>
  );
}

export default RatingsTrigger;
