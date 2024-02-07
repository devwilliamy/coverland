import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { IoClose } from 'react-icons/io5';
import ReviewSection from './components/ReviewSection';
import { useContext, useState } from 'react';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';

export default function ReviewSheet() {
  const [reviewSheetOpen, setReviewSheetOpen] = useState<boolean>(false);

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);

  return (
    <Sheet open={reviewSheetOpen} onOpenChange={setReviewSheetOpen}>
      <SheetTrigger
        className="ml-2 text-blue-400 underline"
        disabled={!total_reviews}
        // className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline"
      >
        {total_reviews || '2'} ratings
      </SheetTrigger>
      <SheetContent className="rounded-t-[10px] px-[2px]" side="bottom">
        <SheetHeader draggable={false}>
          <SheetTitle className="sticky top-0 z-[100]  mx-4 flex justify-between border-b-2 border-[#C8C7C7] bg-white">
            <div
              id="SheetTitle"
              className=" flex w-full flex-row items-center justify-between py-[28px] text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline "
            >
              Car Cover Reviews
            </div>
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
        <div className="mx-auto flex max-h-[76vh] w-full flex-col overflow-y-scroll px-4">
          <ReviewSection />
        </div>
      </SheetContent>
    </Sheet>
  );
}
