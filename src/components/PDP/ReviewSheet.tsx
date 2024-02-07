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
import { TReviewData } from '@/lib/db';
import { useState } from 'react';
import { Tabs } from '../ui/tabs';
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import CustomerReviewTabs from './components/CustomerReviewTabs';

type ReviewSheetProps = {
  reviewData: TReviewData[] | undefined | null;
};

export default function ReviewSheet({ reviewData }: ReviewSheetProps) {
  const reviewCount = reviewData?.length ?? 50;
  const [reviewSheetOpen, setReviewSheetOpen] = useState<boolean>(false);

  return (
    <Sheet open={reviewSheetOpen} onOpenChange={setReviewSheetOpen}>
      <SheetTrigger
        className="ml-2 text-blue-400 underline"
        disabled={!reviewCount}
        // className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline"
      >
        {reviewCount || '2'} ratings
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
        <div className="mx-auto flex max-h-[76vh] min-h-[76vh] w-full flex-col px-4 ">
          <CustomerReviewTabs reviewData={reviewData} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
