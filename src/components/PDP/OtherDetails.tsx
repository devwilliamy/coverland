'use client';
import { Suspense, useContext, useRef } from 'react';
import { MoneyBack } from './MoneyBack';
import { PDPAccordion } from './PDPAccordian';
import { OurCarCovers } from './OurCarCovers';
import { ProductChecklist } from './ProductChecklist';
import { NoGarage } from './NoGarage';
import { ClimateCrisis } from './ClimateCrisis';
import { Layers } from './Layers';
import { MobilePDPDetails } from './MobilePDPDetails';
import { WarrantyDesktop } from './components/WarrantyDesktop';
import ProductVideo from './ProductVideo';
import ThreeSixtyVideo from '@/videos/360 degree_website.mp4';
import ReviewSection from './components/ReviewSection';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import MobileProductDetails from './components/MobileProductDetails';
import { Tabs, TabsList } from '../ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { Separator } from '../ui/separator';
import ExtraDetailsTabs from './components/ExtraDetailsTabs';

export function ExtraProductDetails() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  // const [selectedSection, setSelectedSection] = useState<string>('');

  const benefitsRef = useRef<HTMLDivElement>(null);
  // const layersRef = useRef<HTMLDivElement>(null);
  // const carCoverRef = useRef<HTMLDivElement>(null);
  // const specsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const shippingRef = useRef<HTMLDivElement>(null);
  const warrantyRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // Add refs for other sections similarly...

  // const scrollToSection = (
  //   ref: React.RefObject<HTMLDivElement>,
  //   sectionName: string
  // ) => {
  //   if (ref && ref.current) {
  //     window.scrollTo({
  //       top: ref.current.offsetTop,
  //       behavior: 'smooth',
  //     });
  //     setSelectedSection(sectionName);
  //   }
  // };

  // const PD_ID = 'product-details';
  // const LAYERS_ID = 'layers-sec';
  // const CAR_COVER_INS_ID = 'car-cover-inst-sec';
  // const SPECS_ID = 'specs-sec';
  // const BENEFITS_ID = 'benefits-sec';
  // const FAQ_ID = 'faq-sec';
  // const WARRANTY_ID = 'warranty-sec';
  // const SHIPPING_ID = 'shipping-sec';
  // const REVIEWS_ID = 'reviews-sec';

  // <AccordionItem value="item-1">
  //   <AccordionTrigger>Is it accessible?</AccordionTrigger>
  //   <AccordionContent>
  //     Yes. It adheres to the WAI-ARIA design pattern.
  //   </AccordionContent>
  // </AccordionItem>

  // !reviewData &&  return

  const otherDetailsBar = [
    'Reviews',
    'Why Us?',
    'Warranty',
    'Q&A',
    'Shipping & Returns',
    'Warranty',
    'Specifications',
  ];

  const DetailBarItem = ({ name }: { name: string }) => {
    return (
      <div
        className="flex h-max w-full px-[10px] py-[22px] hover:cursor-pointer hover:bg-[#F9F9FB] hover:underline"
        onClick={() => {
          const pdVideo = document.getElementById(
            String(name).toLowerCase().replaceAll(' ', '-')
          );
          pdVideo?.scrollIntoView({ behavior: 'instant' });
        }}
      >
        <h1 className="h-max w-full text-center ">{name}</h1>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col">
      <div className="lg:grid-row-1 hidden w-full max-w-full  border-b border-t border-[#DADADA] text-[18px] capitalize lg:grid lg:grid-flow-col lg:px-[30px]">
        {otherDetailsBar.map((name, index) => {
          return <DetailBarItem name={name} key={`detail-bar-item-${index}`} />;
        })}
      </div>
      <div className="flex w-full max-w-full flex-col lg:px-[30px]">
        <Suspense fallback={<div>Loading...</div>}>
          <MobileProductDetails />
          <ExtraDetailsTabs />
          {/* <MobilePDPDetails /> */}
        </Suspense>

        <div className="hidden gap-[110px] lg:flex lg:flex-col">
          <div id="product-details">
            <Video />
          </div>
          <div id="benefits" ref={benefitsRef}>
            <Layers />
          </div>
          <div>
            <NoGarage />
          </div>
          <div>
            <OurCarCovers />
          </div>
          <div>
            <ProductChecklist />
          </div>
          <div>
            <ClimateCrisis />
          </div>
          <div id="q-&-a" ref={faqRef}>
            <PDPAccordion />
          </div>
          <div id="shipping-&-returns" ref={shippingRef}>
            <div>
              <div className=" mb-[50px] flex gap-[144px] px-[59px] normal-case">
                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col text-[28px] font-black">
                    Shipping Details
                  </div>
                  <div className="font-normal text-[#767676]">
                    Enjoy free ground shipping! Please note that these shipping
                    times are estimates, and actual delivery times may vary.
                  </div>
                  <ul className="flex flex-col gap-4 font-normal text-[#767676] lg:gap-0">
                    <li>
                      - Ground Shipping: Delivered within 1-5 business days.
                    </li>
                    <li>
                      - Express Shipping: Delivered within 2 days with a flat
                      rate of $19.99.
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <div className="text-[28px] font-black">Return Details</div>
                  <div className="font-normal text-[#767676]">
                    This item must be returned within 30 days of the date it was
                    purchased. See the{' '}
                    <a className="underline " href="/policies/return-policy">
                      return policy
                    </a>{' '}
                    for the complete information.
                  </div>
                </div>
              </div>
              <MoneyBack />
            </div>
          </div>
          <div id="warranty" ref={warrantyRef}>
            <WarrantyDesktop />
          </div>
          <div id="car-cover-reviews" ref={reviewsRef}>
            <ReviewSection />
          </div>
        </div>
      </div>
    </div>
  );
}

function Video() {
  return (
    <div
      id="productvideo"
      className="flex h-auto w-full max-w-full flex-col items-center justify-center "
    >
      {/* <div className="h-[550px] w-full"> */}
      <ProductVideo src={ThreeSixtyVideo} loop autoplay aspectRatio="16 / 9" />
      {/* </div> */}
      <div className="flex h-auto w-full flex-col items-start justify-center bg-[#1A1A1A] p-4 md:p-8 lg:p-14">
        <div>
          <p className="text-left font-black uppercase tracking-[1.35px] text-white sm:text-xl md:text-3xl lg:text-5xl">
            Tailored for the perfect fit
          </p>
        </div>
        <div className="pb-3 pt-4">
          <p className="text-lg font-normal capitalize tracking-[0.48px] text-white opacity-80 md:text-2xl">
            Your Car, Your Shield. Experience the superior custom fit we offer.{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
