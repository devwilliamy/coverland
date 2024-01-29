import { GoDotFill } from 'react-icons/go';
import { TReviewData } from '@/lib/db';
import { MobilePDPAccordions } from './MobilePDPAccordions';

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

      <MobilePDPAccordions reviewData={reviewData} />
    </div>
  );
};

const StickyDrawerItem = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element | JSX.Element[];
}) => (
  <span id="DrawerSection" className=" flex h-full flex-col">
    <DrawerTitle className="sticky top-0 z-[100]  flex justify-between border-b-2 border-[#C8C7C7] bg-white">
      <div className=" flex w-full flex-row items-center justify-between py-[28px] text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
        {title}
      </div>
    </DrawerTitle>
    <div className="pt-[40px]">{children}</div>
  </span>
);

const ScrollDrawerTrigger = ({
  title,
  toRef,
}: {
  title: string;
  toRef: React.RefObject<HTMLDivElement>;
}) => (
  <DrawerTrigger className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline">
    <button
      className="uppercase"
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
    </button>
  </DrawerTrigger>
);
