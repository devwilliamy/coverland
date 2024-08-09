import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useContext, useState } from 'react';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import ReviewImageGallery from './ReviewImageGallery';
import Logo from '@/components/header/Logo';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import Cart from '@/components/header/Cart';
import useStoreContext from '@/hooks/useStoreContext';
import { getCurrentMonth } from '@/lib/utils/date';

export default function ReviewImagesSheet({
  children,
}: {
  children?: JSX.Element[] | JSX.Element;
}) {
  const [reviewOpen, setReviewsOpen] = useState<boolean>(false);

  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const { total_reviews } = useStore(store, (s) => s.reviewDataSummary);
  const month = getCurrentMonth();

  return (
    <Sheet open={reviewOpen} onOpenChange={setReviewsOpen}>
      <SheetTrigger
        className={` ml-2 flex gap-3 ${!children && 'pb-4'} underline`}
        disabled={!total_reviews}
      >
        {children || (
          <>
            See more <br /> review images
          </>
        )}
      </SheetTrigger>
      <SheetContent className="w-full" side="right">
        <div className=" flex max-h-screen min-h-screen w-screen  flex-col overflow-y-auto">
          <header className="flex  flex-col items-stretch ">
            <section className="min-h-[7px] w-full bg-black" />
            <section className="whitespace-nowrap bg-white  px-20 text-center text-[18px] font-[600] uppercase text-black lg:text-4xl">
              <p>{month} Special Sale!</p>
            </section>
            <section className="whitespace-nowrap bg-black  px-20 text-center text-[18px] font-[500] uppercase text-white lg:text-4xl">
              <p>SAVE UP TO 50%</p>
            </section>
            <section className="mb-[17px] flex w-full items-center justify-between px-2">
              <Logo />
              <div className="flex items-center gap-[28px] ">
                <Cart />
                {/* <IoIosMenu className="ml-[14px] min-h-[20px] min-w-[20px]" /> */}
                <Link href="/login">
                  <UserRound className="h-5 w-5" />
                </Link>
              </div>
            </section>
            {/*
             */}
          </header>
          <ReviewImageGallery setReviewsOpen={setReviewsOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
