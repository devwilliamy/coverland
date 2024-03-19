import { Layers } from './Layers';
import { OurCarCovers } from './OurCarCovers';
import { PDPAccordion } from './PDPAccordian';
import { ProductChecklist } from './ProductChecklist';
import { ClimateCrisisMobile } from './components/ClimateCrisisMobile';
import { NoGarageMobile } from './components/NoGarageMobile';
import { MoneyBackMobile } from './MoneyBackMobile';
import ReviewSection from './components/ReviewSection';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { IoClose } from 'react-icons/io5';
import { LegacyRef, useContext, useRef } from 'react';
import WarrantyPolicy from '@/app/(main)/policies/warranty-policy/page';
import { Plus } from 'lucide-react';
import ProductVideo from './ProductVideo';
import ThreeSixtyVideo from '@/videos/https_x2kly621zrgfgwll.public.blob.vercel-storage.com_videos_360_20degree_mobile-4asLajZOfJp9h3V3q1XkSHFETp6T8h.mp4.json';
import { track } from '@vercel/analytics';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';

const CarCoverFeature = ({ children }: { children: string }) => (
  <li className="text-[14px] font-[500] normal-case leading-[26px]">
    {children}
  </li>
);

export const MobilePDPDetails = () => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const pdRef = useRef<HTMLDivElement>(null);
  const benRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const srRef = useRef<HTMLDivElement>(null);
  const warRef = useRef<HTMLDivElement>(null);
  const ccrRef = useRef<HTMLDivElement>(null);

  return (
    <div className=" w-full px-4 lg:hidden">
      <div
        id="CarCoverFeatures"
        className="font-black uppercase text-[#1A1A1A]"
      >
        <div className="-mx-4 h-[41px] w-screen border-b-2 border-t-2 border-[#DBDBDB] bg-[#F1F1F1] lg:hidden"></div>
        <div className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
          Car Cover Features
        </div>
        <ul className="list-disc pl-8 pt-7">
          {[
            '100% Waterproof Protection.',
            '100% UV Protection.',
            '100% Tailored To Your Car Model.',
            'The Best Quality Car Cover On The Market.',
            'Outside Material: High-End Polyester Fabric.',
            'Inside Material: Soft Fleece Fabric.',
            'Heavy-Duty, But Easy On And Off.',
            'Non-Scratch Fabric Protects Your Car Paint.',
            'Backed by a Lifetime Warranty.',
            'Guaranteed to Be the Best Quality Car Cover on the Market.',
          ].map((text, index) => (
            <CarCoverFeature key={`car-cover-feature-${index}`}>
              {text}
            </CarCoverFeature>
          ))}
        </ul>
      </div>

      <Sheet>
        <ScrollSheetTrigger title="Product Details" toRef={pdRef} />
        <ScrollSheetTrigger title="Benefits" toRef={benRef} />
        <ScrollSheetTrigger title="Q&A" toRef={qaRef} />
        <ScrollSheetTrigger title="Shipping & Returns" toRef={srRef} />
        <ScrollSheetTrigger title="Warranty" toRef={warRef} />
        {/* {!!reviewData?.length && (
          <ScrollSheetTrigger title="Car Cover Reviews" toRef={ccrRef} />
        )} */}

        <SheetContent className="rounded-t-[10px] px-[1px]" side="bottom">
          <div
            id="DrawerScrollable"
            className="relative flex max-h-[85vh] flex-col overflow-y-auto overflow-x-hidden px-[15px]  "
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
              <div className="mt-[-10px]" ref={pdRef}>
                {/* <ProductHero /> */}
                <div className="flex w-full flex-col ">
                  <ProductVideo
                    src={ThreeSixtyVideo}
                    autoplay
                    loop
                    aspectRatio="16 / 9"
                  />
                  <div className="mt-[-5px] h-full min-h-[174px] w-full bg-[#1A1A1A] pl-[12px] ">
                    <h3 className="max-h-[68px] max-w-[178px] pt-[22px] text-[22px] font-[900] uppercase leading-[34px] text-[#F2F2F2] ">
                      Tailored for the perfect fit
                    </h3>
                    <p className="mt-[28px] max-h-[48px] max-w-[298px] text-[16px] font-[400] capitalize leading-[24px] text-[#DBDBDB] ">
                      Your car, Your Shield. <br /> Experience The superior fit
                      we offer
                    </p>
                  </div>
                </div>
                <Layers />
              </div>
            </StickySheetItem>

            <StickySheetItem title="Benefits">
              <div className=" md:mt-18 lg:mt-28" ref={benRef}>
                <NoGarageMobile />
                <OurCarCovers />
                <ProductChecklist />
                <ClimateCrisisMobile />
              </div>
            </StickySheetItem>

            <StickySheetItem title="Q&A">
              <div className="lg:mt-28" ref={qaRef}>
                <PDPAccordion />
              </div>
            </StickySheetItem>

            <StickySheetItem title="Shipping & Returns">
              <div className=" md:mt-18 lg:mt-28" ref={srRef}>
                <div className="flex flex-col gap-5 px-2 pt-10 text-[14px] font-[400] normal-case leading-[24px]">
                  <div className="mb-[-15px] text-lg font-black">
                    Shipping Details
                  </div>
                  <div className=" text-[#767676]">
                    Enjoy free ground shipping! Please note that these shipping
                    times are estimates, and actual delivery times may vary.
                  </div>
                  <ul className="flex flex-col leading-[24px]">
                    <li className=" text-[#767676]">
                      - Free Ground Shipping: Delivered within 1-5 business
                      days.
                    </li>
                    <li className=" text-[#767676]">
                      - Express Shipping: Delivered within 2 days with a flat
                      rate of $19.99.
                    </li>
                  </ul>
                  <div className="mb-[-15px] text-lg font-black">
                    Return Details
                  </div>
                  <div className="mb-10 text-[#767676]">
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
                <div className="-mx-5 mt-[20px]">
                  <WarrantyPolicy showHeader />
                </div>
              </div>
            </StickySheetItem>
            <StickySheetItem title="Car Cover Reviews">
              <div className="md:mt-18 lg:mt-28" ref={ccrRef}>
                <ReviewSection />
              </div>
            </StickySheetItem>
          </div>
        </SheetContent>
      </Sheet>
      <div id="CarCoverReviews">
        <div className="-mx-4 h-[41px] w-screen border-b-2 border-t-2 border-[#DBDBDB] bg-[#F1F1F1] lg:hidden"></div>
        <div className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
          Car Cover Reviews
        </div>
        <div className="md:mt-18 normal-case lg:mt-28 " ref={ccrRef}>
          <ReviewSection />
        </div>
      </div>
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
  <span
    id={`drawer-section-${title.toLowerCase().replace(' ', '-')}`}
    className=" flex h-full flex-col"
  >
    <SheetTitle
      className={`sticky top-0 z-[100] flex justify-between border-b-[1px] ${title !== 'Product Details' && 'border-t-[1px]'} border-[#BEBEBE] bg-white`}
    >
      <div className=" flex w-full flex-row items-center justify-between py-[28px] text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
        {title}
      </div>
    </SheetTitle>
    <div className="pb-[60px]">{children}</div>
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
    className={`flex w-full flex-row items-center justify-between
     ${title !== 'Warranty' && 'border-b-2 border-[#C8C7C7]'}
    py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline`}
    onClick={() => {
      setTimeout(() => {
        const DrawerScrollable = document.getElementById('DrawerScrollable');
        DrawerScrollable?.scrollTo({
          top: toRef.current?.offsetTop
            ? toRef.current?.offsetTop - 85
            : toRef.current?.offsetTop,
          behavior: 'instant',
        });
      }, 200);
      track('drawer_section_clicked', {
        section: title,
      });
    }}
  >
    {title}
    <Plus />
  </SheetTrigger>
);
