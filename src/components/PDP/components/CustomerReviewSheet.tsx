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
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import CustomerReviewTabs from './CustomerReviewTabs';

export default function CustomerReviewSheet({
  children,
}: {
  children?: JSX.Element[] | JSX.Element;
}) {
  const [reviewSheetOpen, setReviewSheetOpen] = useState<boolean>(false);

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);

  return (
    <Sheet open={reviewSheetOpen} onOpenChange={setReviewSheetOpen}>
      <SheetTrigger
        className={` ml-2 flex gap-3 pb-4 underline`}
        disabled={!total_reviews}
      >
        {children || (
          <>
            See more <br /> review images
          </>
        )}
      </SheetTrigger>
      <SheetContent className="rounded-t-[10px] px-[2px]" side="bottom">
        <SheetHeader draggable={false}>
          <SheetTitle className="sticky top-0 z-[100] mx-4 flex justify-between bg-white">
            <SheetClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
              <button
                id="CloseModalButton"
                className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
                onClick={() => {
                  setReviewSheetOpen(false);
                }}
              >
                <IoClose className="h-[24px] w-[24px]" />
              </button>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="mx-auto flex max-h-[76vh] min-h-[76vh] w-full flex-col overflow-y-auto px-4">
          <CustomerRevlogiewTabs />
        </div>
      </SheetContent>
    </Sheet>
  );
}
