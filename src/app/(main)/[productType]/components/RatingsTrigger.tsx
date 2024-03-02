import ReviewSheet from '@/components/PDP/components/ReviewSheet';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { CarSelectionContext } from './CarPDP';
import ReviewSection from '@/components/PDP/components/ReviewSection';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function RatingsTrigger() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);
  const { reviewDataSummaryIsLoading } = useStore(
    store,
    (s) => s.reviewIsLoading
  );
  const reviewData = useStore(store, (s) => s.reviewData);

  if (reviewDataSummaryIsLoading) {
    return (
      <div className="flex items-center justify-center lg:pl-2">
        <AiOutlineLoading3Quarters className="animate-spin" />
        <div className="pl-2">Loading...</div>
      </div>
    );
  }

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
                {total_reviews} ratings
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
        <div className=" text-[#4C8EA8] underline">0 ratings</div>
      )}
    </>
  );
}

export default RatingsTrigger;
