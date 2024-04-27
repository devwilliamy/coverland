import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { IoClose } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import ReviewSection from './ReviewSection';
import useStoreContext from '@/hooks/useStoreContext';
import useDetermineType from '@/hooks/useDetermineType';
import SeatCoverReviewSection from '@/app/(main)/seat-covers/components/SeatCoverReviewSection';

export default function ReviewSheet({ seeMore }: { seeMore?: boolean }) {
  const [reviewSheetOpen, setReviewSheetOpen] = useState<boolean>(false);

  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);
  const { isSeatCover } = useDetermineType();

  return (
    <Sheet open={reviewSheetOpen} onOpenChange={setReviewSheetOpen}>
      <SheetTrigger
        className={`ml-2 ${seeMore ? '' : 'text-blue-400'} underline`}
        disabled={!total_reviews}
      >
        {seeMore ? (
          <p>
            See more <br /> review images
          </p>
        ) : (
          (total_reviews || '2') + ' Reviews'
        )}
      </SheetTrigger>
      <SheetContent className="rounded-t-[10px] px-[2px]" side="bottom">
        <SheetHeader draggable={false}>
          <SheetTitle className="sticky top-0 z-[100] mx-4 flex justify-between bg-white">
            <SheetClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
              <div
                id="CloseModalButton"
                className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
                onClick={() => {
                  setReviewSheetOpen(false);
                }}
              >
                <IoClose className="h-[24px] w-[24px]" />
              </div>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="mx-auto flex max-h-[76vh] min-h-[76vh] w-full flex-col overflow-y-auto px-4">
          <p
            className="mt-[58px] text-center text-xl font-black uppercase text-black"
            id="reviews"
          >
            Car Cover Reviews
          </p>
          {isSeatCover ? <SeatCoverReviewSection /> : <ReviewSection />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
