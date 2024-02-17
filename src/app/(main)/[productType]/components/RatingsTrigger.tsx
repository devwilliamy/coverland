import ReviewSheet from '@/components/PDP/components/ReviewSheet';
import ReviewImagesSheet from '@/components/PDP/components/ReviewImagesSheet';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import React, { useContext } from 'react';
import { useStore } from 'zustand';
import { CarSelectionContext } from './CarPDP';
import ReviewSection from '@/components/PDP/components/ReviewSection';
import { XIcon } from 'lucide-react';
import { DialogOverlay } from '@radix-ui/react-dialog';

function RatingsTrigger() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);
  const reviewData = useStore(store, (s) => s.reviewData);

  return (
    <>
      {reviewData.length > 0 ? (
        <>
          <div className="relative hidden lg:flex">
            <Dialog>
              <DialogTrigger
                className="ml-2 text-blue-400 underline"
                disabled={!total_reviews}
              >
                {total_reviews || '2'} ratings
              </DialogTrigger>

              <DialogContent className="flex max-h-[65vh] min-h-[65vh] flex-col items-center overflow-y-auto lg:min-w-[77vw] lg:max-w-[80%] xl:max-w-[1024px]">
                <div className={''}>
                  <ReviewSection />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="lg:hidden">
            <ReviewSheet />
          </div>
        </>
      ) : (
        <div className="ml-2 text-blue-400 underline">
          {total_reviews || '2'} ratings
        </div>
      )}
    </>
  );
}

export default RatingsTrigger;
