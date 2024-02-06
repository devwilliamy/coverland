'use client';

import { Suspense, useRef } from 'react';
import { MoneyBack } from './MoneyBack';
import { PDPAccordion } from './PDPAccordian';
import ProductHero from './ProductHero';
import { OurCarCovers } from './OurCarCovers';
import { ProductChecklist } from './ProductChecklist';
import { NoGarage } from './NoGarage';
import { ClimateCrisis } from './ClimateCrisis';
import { Layers } from './Layers';
import { TReviewData } from '@/lib/db';
import { MobilePDPDetails } from './MobilePDPDetails';
import { WarrantyDesktop } from './components/WarrantyDesktop';
import ProductVideo from './ProductVideo';
import ThreeSixtyVideo from '@/videos/360 degree_website.mp4';
import ReviewSection from './components/ReviewSection';

export function ExtraProductDetails({
  reviewData,
}: {
  reviewData: TReviewData[] | null;
}) {
  // const [selectedSection, setSelectedSection] = useState<string>('');

  const pdRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="flex w-full flex-col">
      <div className="hidden w-full max-w-full items-center justify-between border-b border-t border-[#DADADA] py-[22px] text-[18px] capitalize lg:flex lg:px-[30px]">
        <h1
        // onClick={() => scrollToSection(pdRef, PD_ID)}
        // className={`cursor-pointer  font-normal capitalize text-black ${
        //   selectedSection === PD_ID ? 'underline' : ''
        // }`}
        >
          product details
        </h1>
        {/* <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`cursor-pointer  font-normal capitalize text-black ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          <Link href="#benefits" >
            benefits
          </Link>
        </h1> */}
        <h1
        // onClick={() => scrollToSection(benefitsRef, BENEFITS_ID)}
        // className={`cursor-pointer  font-normal capitalize text-black ${
        //   selectedSection === PD_ID ? 'underline' : ''
        // }`}
        >
          benefits
        </h1>
        {/* <h1
          onClick={() => scrollToSection(shippingRef, SHIPPING_ID)}
          className={`cursor-pointer  font-normal capitalize text-black ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          <Link href="#shipping" >
            Shipping & Returns
          </Link>
        </h1> */}
        <h1
        // onClick={() => scrollToSection(shippingRef, SHIPPING_ID)}
        // className={`cursor-pointer  font-normal capitalize text-black ${
        //   selectedSection === FAQ_ID ? 'underline' : ''
        // }`}
        >
          Shipping & Returns
        </h1>
        {/* <h1
          onClick={() => scrollToSection(specsRef, SPECS_ID)}
          className={`cursor-pointer  font-normal capitalize text-black ${
            selectedSection === SPECS_ID ? 'underline' : ''
          }`}
          >
          specification
          </h1> */}
        <h1
        // onClick={() => scrollToSection(faqRef, FAQ_ID)}
        // className={`cursor-pointer  font-normal capitalize text-black ${
        //   selectedSection === FAQ_ID ? 'underline' : ''
        // }`}
        >
          Q&A
        </h1>
        {/* <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`cursor-pointer  font-normal capitalize text-black ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
          >
          Shipping & Returns
          </h1> */}
        <h1
        // onClick={() => scrollToSection(warrantyRef, WARRANTY_ID)}
        // className={`cursor-pointer  font-normal capitalize text-black ${
        //   selectedSection === FAQ_ID ? 'underline' : ''
        // }`}
        >
          Warranty
        </h1>
        {/* <h1
          onClick={() => scrollToSection(carCoverRef, CAR_COVER_INS_ID)}
          className={`cursor-pointer  font-normal capitalize text-black ${
            selectedSection === CAR_COVER_INS_ID ? 'underline' : ''
          }`}
          >
          car cover instruction
          </h1> */}
        <h1
        // onClick={() => scrollToSection(reviewsRef, REVIEWS_ID)}
        // className={`cursor-pointer  font-normal capitalize text-black ${
        //   selectedSection === FAQ_ID ? 'underline' : ''
        // }`}
        >
          car cover reviews
        </h1>
      </div>
      <div className="flex w-full max-w-full flex-col lg:px-[30px]">
        <Suspense fallback={<div>Loading...</div>}>
          <MobilePDPDetails reviewData={reviewData} />
        </Suspense>

        <div className="hidden gap-[110px] lg:flex lg:flex-col">
          <div ref={pdRef}>
            <ProductHero />
          </div>
          <div>
            <Video />
          </div>
          <div ref={benefitsRef}>
            <Layers />
          </div>
          <div>
            <ClimateCrisis />
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
          {/* <div ref={specsRef}>
            <ProductSpecGrid />
            <ProductPackage />
          </div> */}
          <div ref={faqRef}>
            <PDPAccordion />
          </div>
          <div ref={shippingRef}>
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
                  <ul className="flex flex-col gap-4 font-normal text-[#767676]">
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
          <div ref={warrantyRef}>
            <WarrantyDesktop />
          </div>
          {!!reviewData?.length && (
            <div id="#reviews" ref={reviewsRef}>
              <ReviewSection reviewData={reviewData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Video() {
  return (
    <div
      id="productvideo"
      className="flex h-auto w-full max-w-full flex-col items-center justify-center py-8 md:py-8 "
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
