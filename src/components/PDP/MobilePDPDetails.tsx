import { GoDotFill } from 'react-icons/go';
import { Layers } from './Layers';
import { OurCarCovers } from './OurCarCovers';
import { PDPAccordion } from './PDPAccordian';
import { ProductChecklist } from './ProductChecklist';
import ProductHero from './ProductHero';
import { ClimateCrisisMobile } from './components/ClimateCrisisMobile';
import { NoGarageMobile } from './components/NoGarageMobile';
import { MoneyBackMobile } from './MoneyBackMobile';
import { TReviewData } from '@/lib/db';
import ReviewSection from './components/ReviewSection';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { IoClose } from 'react-icons/io5';
import { useRef } from 'react';
import WarrantyPolicy from '@/app/(main)/policies/warranty-policy/page';
import { Plus } from 'lucide-react';

export const MobilePDPDetails = ({
  reviewData,
}: {
  reviewData: TReviewData[] | null;
}) => {
  const pdRef = useRef<HTMLDivElement>(null);
  const benRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const srRef = useRef<HTMLDivElement>(null);
  const warRef = useRef<HTMLDivElement>(null);
  const ccrRef = useRef<HTMLDivElement>(null);

  return (
    <div className=" w-full px-4 font-black uppercase text-[#1A1A1A] lg:hidden">
      <div id="CarCoverFeatures">
        <div className="-mx-4 h-[41px] w-screen border-b-2 border-t-2 border-[#DBDBDB] bg-[#F1F1F1] lg:hidden"></div>
        <div className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
          Car Cover Features
        </div>
        <div className="pl-4 pt-4">
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              Tailored to your car model
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              all-season waterproof protection
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              Scratchproof, durable & lightweight
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              Soft Inner-lining
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              100% Waterproof - Zero Leaks Guaranteed
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              100% UV Protection
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              Easy On/Off with elastic hems
            </p>
          </div>
          <div className="flex-start ml-2 flex items-center pb-2 leading-4">
            <GoDotFill size={10} color="#000000" />
            <p className="pl-1 text-sm font-medium capitalize text-black">
              effortless cleaning
            </p>
          </div>
        </div>
      </div>

      <Sheet>
        <ScrollSheetTrigger title="Product Details" toRef={pdRef} />
        <ScrollSheetTrigger title="Benefits" toRef={benRef} />
        <ScrollSheetTrigger title="Q&A" toRef={qaRef} />
        <ScrollSheetTrigger title="Shipping & Returns" toRef={srRef} />
        <ScrollSheetTrigger title="Warranty" toRef={warRef} />
        {!!reviewData?.length && (
          <ScrollSheetTrigger title="Car Cover Reviews" toRef={ccrRef} />
        )}

        <SheetContent className="rounded-t-[10px] px-[1px]" side="bottom">
          <div
            id="DrawerScrollable"
            className="relative flex max-h-[85vh] flex-col gap-[60px] overflow-y-scroll px-[15px]  "
          >
            <SheetClose className="fixed right-0 z-[400] mr-[16px] flex items-center py-[4px]">
              <div
                id="CloseModalButton"
                className=" mt-[17px] justify-center rounded-full bg-gray-200 p-[5px] "
              >
                <IoClose className="h-[24px] w-[24px]" />
              </div>
            </SheetClose>
            <StickySheetItem title="Product Details">
              <div ref={pdRef}>
                <ProductHero />
                <Layers />
              </div>
            </StickySheetItem>

            <StickySheetItem title="Benefits">
              <div className=" md:mt-18 lg:mt-28" ref={benRef}>
                <ClimateCrisisMobile />
                <NoGarageMobile />
                <OurCarCovers />
                <ProductChecklist />
              </div>
            </StickySheetItem>

            <StickySheetItem title="Q&A">
              <div className="lg:mt-28" ref={qaRef}>
                <PDPAccordion />
              </div>
            </StickySheetItem>

            <StickySheetItem title="Shipping & Returns">
              <div className=" md:mt-18 lg:mt-28" ref={srRef}>
                <div className="flex flex-col gap-5 px-2  normal-case">
                  <div className="mb-[-15px] text-lg font-black">
                    Shipping Details
                  </div>
                  <div className="font-normal text-[#767676]">
                    Enjoy free ground shipping! Please note that these shipping
                    times are estimates, and actual delivery times may vary.
                  </div>
                  <ul className="flex flex-col gap-4">
                    <li className="font-normal text-[#767676]">
                      - Free Ground Shipping: Delivered within 1-5 business
                      days.
                    </li>
                    <li className="font-normal text-[#767676] ">
                      - Express Shipping: Delivered within 2 days with a flat
                      rate of $19.99.
                    </li>
                  </ul>
                  <div className="mb-[-15px] text-lg font-black">
                    Return Details
                  </div>
                  <div className="mb-4 font-normal text-[#767676]">
                    This item must be returned within 30 days of the date it was
                    purchased. See the{' '}
                    <a className="underline " href="/policies/return-policy">
                      return policy
                    </a>{' '}
                    for the complete information.
                  </div>
                </div>
                <MoneyBackMobile />
              </div>
            </StickySheetItem>

            <StickySheetItem title="Warranty">
              <div
                className="md:mt-18 mb-[-10px] min-h-[40vh] lg:mt-28"
                ref={warRef}
              >
                <div className="-mx-5 mt-[-20px]">
                  <WarrantyPolicy hideHeader />
                </div>
              </div>
            </StickySheetItem>
            {!!reviewData?.length && (
              <StickySheetItem title="Car Cover Reviews">
                <div className="md:mt-18 lg:mt-28" ref={ccrRef}>
                  <ReviewSection reviewData={reviewData} />
                </div>
              </StickySheetItem>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const StickySheetItem = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) => (
  <span id="DrawerSection" className=" flex h-full flex-col">
    <SheetTitle className="sticky top-0 z-[100]  flex justify-between border-b-2 border-[#C8C7C7] bg-white">
      <div className=" flex w-full flex-row items-center justify-between py-[28px] text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
        {title}
      </div>
    </SheetTitle>
    <div className="pt-[40px]">{children}</div>
  </span>
);

const ScrollSheetTrigger = ({
  title,
  toRef,
}: {
  title: string;
  toRef: React.RefObject<HTMLDivElement>;
}) => (
  <SheetTrigger
    className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline"
    onClick={() => {
      setTimeout(() => {
        const DrawerScrollable = document.getElementById('DrawerScrollable');
        DrawerScrollable?.scrollTo({
          top: toRef.current?.offsetTop
            ? toRef.current?.offsetTop - 100
            : toRef.current?.offsetTop,
          behavior: 'instant',
        });
      }, 200);
    }}
  >
    {title}
    <Plus />
  </SheetTrigger>
);
