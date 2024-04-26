import ReviewSheet from '@/components/PDP/components/ReviewSheet';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useStore } from 'zustand';
import ReviewSection from '@/components/PDP/components/ReviewSection';
import useStoreContext from '@/hooks/useStoreContext';

function ReviewsTextTrigger() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
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
                {total_reviews || '2'} Reviews
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
        <div className=" text-[#4C8EA8] underline">
          {total_reviews || '2'} Reviews
        </div>
      )}
    </>
  );
}

export default ReviewsTextTrigger;
