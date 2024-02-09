'use client';

import { Suspense, useRef, useState } from 'react';
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
import { Rating } from '@mui/material';
import ReviewCard from './components/ReviewCard';
import ProductVideo from './ProductVideo';
import ThreeSixtyVideo from '@/videos/360 degree_website.mp4';

export function ExtraProductDetails({
  reviewData,
}: {
  reviewData: TReviewData[] | null;
}) {
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
    'Product Details',
    'Benefits',
    'Shipping & Returns',
    'Q&A',
    'Warranty',
    'Car Cover Reviews',
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
          <MobilePDPDetails reviewData={reviewData} />
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
          {!!reviewData?.length && (
            <div id="car-cover-reviews" ref={reviewsRef}>
              <ReviewSection reviewData={reviewData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ReviewSection = ({
  reviewData,
}: {
  reviewData: TReviewData[] | null;
}) => {
  const [displayedReviews, setDisplayedReviews] = useState<number>(3);
  if (!reviewData) return null;
  return (
    <div className="relative py-2">
      <p
        className="mb-5 hidden text-center text-xl font-black uppercase text-black md:text-3xl lg:mb-20 lg:block lg:text-[42px]"
        id="reviews"
      >
        Car Cover Reviews
      </p>
      <div className="flex flex-col items-center justify-around lg:flex-row">
        <div className="flex flex-col items-center gap-4 lg:gap-0">
          <div className="flex items-center gap-2">
            <p className="text-[40px] font-black lg:text-[80px]">4.9</p>
            <p className="lg:mt-11">{reviewData?.length} reviews</p>
          </div>
          <div className="lg:flex">
            <Rating
              name="read-only"
              value={5}
              readOnly
              size="large"
              style={{
                height: '25px',
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="relative z-10 my-3 h-[75px] w-[75px] lg:h-[135px] lg:w-[135px]">
            <svg
              width="137"
              height="135"
              viewBox="0 0 137 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 h-[75px] w-[75px] lg:h-[135px] lg:w-[135px]"
            >
              <path
                d="M136.039 67.2705C136.039 104.449 105.898 134.617 68.6023 134.926C31.063 135.236 0.128084 104.846 0.000385799 67.5047C-0.0913973 40.1034 16.2021 16.4612 39.6906 5.75157C43.4657 4.02881 47.9112 6.00164 49.2001 9.93143C50.2935 13.2698 48.7173 16.9137 45.5088 18.3745C27.0285 26.8017 14.1549 45.2876 13.9634 66.7863C13.7 96.2239 37.6394 120.616 67.2295 121.037C97.4421 121.47 122.08 97.2321 122.08 67.2705C122.08 39.6549 101.149 16.9058 74.213 13.8493C70.6853 13.4484 68.0236 10.4832 68.0236 6.95432C68.0236 2.84194 71.6032 -0.417001 75.7135 0.0434587C109.657 3.84225 136.043 32.4939 136.043 67.2745L136.039 67.2705Z"
                fill="#1D8044"
              />
            </svg>
            <p className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-black text-green-700 lg:text-4xl">
              95%
            </p>
          </div>
          <p className="text-[18px] lg:text-[28px]">would recommend</p>
        </div>
      </div>
      {/* <div className="flex gap-4 *:rounded-lg my-4">
        <select className="w-full h-12 mx-auto mt-9 text-lg bg-transparent rounded border border-[#1A1A1A] font-normal text-[#1A1A1A] capitalize">
          <option value="volvo">Newest</option>
          <option value="saab">Oldest</option>
          <option value="mercedes">Most Helpful</option>
        </select>

        <select className=" w-full h-12 mx-auto mt-9 text-lg bg-transparent rounded border border-[#1A1A1A] font-normal text-[#1A1A1A] capitalize">
          <option value="volvo">Newest</option>
          <option value="saab">Oldest</option>
          <option value="mercedes">Most Helpful</option>
        </select>
        <select className="w-full h-12 mx-auto mt-9 text-lg bg-transparent rounded border border-[#1A1A1A] font-normal text-[#1A1A1A] capitalize">
          <option value="volvo">Newest</option>
          <option value="saab">Oldest</option>
          <option value="mercedes">Most Helpful</option>
        </select>
      </div> */}
      {!!reviewData?.length && (
        <div className="flex flex-col items-center">
          {reviewData
            ?.slice(0, displayedReviews)
            .map((review) => (
              <ReviewCard key={`review-${review.id}`} review={review} />
            ))}
          <button
            className="my-4 max-w-[160px] items-stretch justify-center whitespace-nowrap rounded-full border border-solid border-black bg-white px-8 py-3.5 font-black leading-4 tracking-wide text-black transition-colors duration-150 hover:bg-black hover:text-white"
            aria-label="View more"
            role="button"
            onClick={() => setDisplayedReviews(displayedReviews + 4)}
          >
            View 4 More
          </button>
        </div>
      )}
    </div>
  );
};

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
