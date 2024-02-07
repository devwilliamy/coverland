'use client';

import { Suspense, useRef, useState } from 'react';
import { MoneyBack } from './MoneyBack';
import { PDPAccordion } from './PDPAccordian';
import { OurCarCovers } from './OurCarCovers';
import { ProductChecklist } from './ProductChecklist';
import { NoGarage } from './NoGarage';
import { ClimateCrisis } from './ClimateCrisis';
import { Layers } from './Layers';
import { TReviewData } from '@/lib/db';
import { MobilePDPDetails } from './MobilePDPDetails';
import { WarrantyDesktop } from './components/WarrantyDesktop';
import { Rating } from '@mui/material';
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
            .map((review, index) => <ReviewCard key={index} review={review} />)}
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

function ReviewCard({ review }: { review: TReviewData }) {
  const CheckIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="check_circle">
          <mask
            id="mask0_330_1310"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_330_1310)">
            <path
              id="check_circle_2"
              d="M10.6 16.6L17.65 9.55L16.25 8.15L10.6 13.8L7.75 10.95L6.35 12.35L10.6 16.6ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
              fill="#1D8044"
            />
          </g>
        </g>
      </svg>
    );
  };
  return (
    <span className="my-5 flex w-full flex-col items-stretch self-stretch rounded border border-solid border-stone-300 py-9 pl-10 pr-16 max-md:max-w-full max-md:px-5">
      <div className="text-xl font-bold normal-case text-neutral-700 max-md:max-w-full lg:text-3xl">
        {review.review_title
          ? review.review_title.charAt(0).toUpperCase() +
            review.review_title.slice(1)
          : ''}
      </div>
      <div className="my-2 flex gap-1 text-yellow-300 lg:my-0">
        <Rating
          name="read-only"
          value={5}
          readOnly
          style={{
            height: '25px',
          }}
        />
      </div>
      <div className="text-sm font-light normal-case text-neutral-500">
        Purchased on{' '}
        {new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
      <div className="mt-5 flex w-[216px] max-w-full items-stretch gap-1 self-start">
        {/* images go here */}
      </div>
      <div className="flex justify-between">
        <div className="max-w-[75%] overflow-hidden text-base font-normal normal-case text-zinc-900 max-md:max-w-full">
          {review.review_description}
        </div>
        <div className="hidden text-lg font-light normal-case text-neutral-500 lg:block">
          Purchased on{' '}
          {new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal normal-case leading-8 text-zinc-900 max-md:mt-10 max-md:max-w-full lg:mt-24">
        {review.review_author}
      </div>
      <span className="flex items-center gap-3 self-start lg:mt-7">
        {/* images go here */}
        <CheckIcon />
        <div className="text-md my-2 grow self-center whitespace-nowrap font-bold normal-case leading-3 text-zinc-900">
          Yes, I would recommend.
        </div>
      </span>
      {/* <div className="w-[512px] max-w-full mt-6 self-start">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
            <div className="flex-col overflow-hidden relative flex aspect-square justify-center items-center flex-1 max-md:mt-4">
              images go here
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex-col overflow-hidden relative flex aspect-square justify-center items-center flex-1 max-md:mt-4">
              images go here
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="flex-col overflow-hidden relative flex aspect-square justify-center items-center flex-1 max-md:mt-4">
              images go here
            </div>
          </div>
        </div>
      </div> */}
    </span>
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
