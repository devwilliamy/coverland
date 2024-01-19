'use client';

import { useRef, useState } from 'react';
import { MoneyBack } from './MoneyBack';
import { PDPAccordion } from './PDPAccordian';
import { ProductHero } from './ProductHero';
import { ProductPackage } from './ProductPackage';
import { OurCarCovers } from './OurCarCovers';
import { ProductSpecGrid } from './ProductSpecification';
import { ProductChecklist } from './ProductChecklist';
import { NoGarage } from './NoGarage';
import { ClimateCrisis } from './ClimateCrisis';
import { Layers } from './Layers';
import { Separator } from '../ui/separator';
import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import CircularProgress from '@mui/joy/CircularProgress';
import { Button } from '../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { useMediaQuery } from '@mantine/hooks';
import { NoGarageMobile } from './components/NoGarageMobile';
import { ClimateCrisisMobile } from './components/ClimateCrisisMobile';
import Link from 'next/link';

export function ExtraProductDetails({
  reviewData,
}: {
  reviewData: TReviewData[] | null;
}) {
  const [selectedSection, setSelectedSection] = useState<string>('');

  const pdRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const carCoverRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  // Add refs for other sections similarly...

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement>,
    sectionName: string
  ) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
      setSelectedSection(sectionName);
    }
  };

  const PD_ID = 'product-details';
  const LAYERS_ID = 'layers-sec';
  const SPECS_ID = 'specs-sec';
  const FAQ_ID = 'faq-sec';
  const CAR_COVER_INS_ID = 'car-cover-inst-sec';

  // <AccordionItem value="item-1">
  //   <AccordionTrigger>Is it accessible?</AccordionTrigger>
  //   <AccordionContent>
  //     Yes. It adheres to the WAI-ARIA design pattern.
  //   </AccordionContent>
  // </AccordionItem>

  return (
    <>
      <div className="md:mt-18  mt-8 hidden flex-col flex-wrap items-stretch justify-between gap-4 border-b border-t border-[#DADADA] py-6 md:flex-row md:items-center md:gap-0 lg:mt-28 lg:flex">
        <h1
          onClick={() => scrollToSection(pdRef, PD_ID)}
          className={`cursor-pointer text-lg font-normal capitalize text-black ${
            selectedSection === PD_ID ? 'underline' : ''
          }`}
        >
          product details
        </h1>
        <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`cursor-pointer text-lg font-normal capitalize text-black ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          <Link href="#benefits" className="">
            benefits
          </Link>
        </h1>
        {/* <h1
          onClick={() => scrollToSection(specsRef, SPECS_ID)}
          className={`cursor-pointer text-lg font-normal capitalize text-black ${
            selectedSection === SPECS_ID ? 'underline' : ''
          }`}
        >
          specification
        </h1> */}
        <h1
          onClick={() => scrollToSection(faqRef, FAQ_ID)}
          className={`cursor-pointer text-lg font-normal capitalize text-black ${
            selectedSection === FAQ_ID ? 'underline' : ''
          }`}
        >
          Q&A
        </h1>
        {/* <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`cursor-pointer text-lg font-normal capitalize text-black ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          Shipping & Returns
        </h1> */}
        <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`cursor-pointer text-lg font-normal capitalize text-black ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          warranty
        </h1>
        {/* <h1
          onClick={() => scrollToSection(carCoverRef, CAR_COVER_INS_ID)}
          className={`cursor-pointer text-lg font-normal capitalize text-black ${
            selectedSection === CAR_COVER_INS_ID ? 'underline' : ''
          }`}
        >
          car cover instruction
        </h1> */}
        <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`cursor-pointer text-lg font-normal capitalize text-black ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          car cover reviews
        </h1>
      </div>

      <MobilePDPDetails reviewData={reviewData} />

      <div className="hidden lg:flex lg:flex-col">
        <div ref={pdRef}>
          <ProductHero />
        </div>
        <div className="md:mt-18 mt-8 lg:mt-28">
          <Video />
        </div>
        <div ref={carCoverRef} className="md:mt-18 mt-8 lg:mt-28">
          <Layers />
        </div>
        <div className="md:mt-18 mt-8 lg:mt-28">
          <ClimateCrisis />
        </div>

        <div className="md:mt-18 mt-8 lg:mt-28">
          <NoGarage />
        </div>
        <div className="md:mt-18 mt-8 lg:mt-28">
          <OurCarCovers />
        </div>
        <div className="md:mt-18 mt-8 lg:mt-28">
          <ProductChecklist />
        </div>
        <div ref={specsRef} className="md:mt-18 mt-8 lg:mt-28">
          {/* <ProductSpecGrid /> */}
          <ProductPackage />
        </div>
        <div ref={faqRef} className="md:mt-18 mt-8 lg:mt-28">
          <PDPAccordion />
        </div>
        <div className="md:my-18 my-8 lg:my-28">
          <MoneyBack />
        </div>
        {!!reviewData?.length && (
          <div id="#reviews" className="md:mt-18 mt-8 lg:mt-28">
            <ReviewSection reviewData={reviewData} />
          </div>
        )}
      </div>
    </>
  );
}

const MobilePDPDetails = ({
  reviewData,
}: {
  reviewData: TReviewData[] | null | undefined;
}) => {
  return (
    <div className="px-4">
      <Accordion
        type="single"
        collapsible
        className="w-full font-black uppercase text-[#1A1A1A] lg:hidden"
        defaultValue="item-6"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-black uppercase">
            Product Details
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <ProductHero />
              {/* <div className=" md:mt-18 lg:mt-28">
              <Video />
            </div> */}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="font-black uppercase">
            Benefits
          </AccordionTrigger>
          <AccordionContent>
            <div className=" md:mt-18 lg:mt-28">
              <ClimateCrisisMobile />
              <NoGarageMobile />
              <OurCarCovers />
              <ProductChecklist />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="item-3">
          <AccordionTrigger className="font-black uppercase">
            Specification
          </AccordionTrigger>
          <AccordionContent>
            <div className=" md:mt-18 lg:mt-28">
              <ProductSpecGrid />
              <ProductPackage />
            </div>
          </AccordionContent>
        </AccordionItem> */}

        <AccordionItem value="item-4">
          <AccordionTrigger className="font-black uppercase">
            Q&A
          </AccordionTrigger>
          <AccordionContent>
            <div className=" md:mt-18 lg:mt-28">
              <PDPAccordion />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="item-5">
          <AccordionTrigger className="font-black uppercase">
            Car Cover Instruction
          </AccordionTrigger>
          <AccordionContent>
            <div className=" md:mt-18 lg:mt-28">
              Content for Car Cover Instruction Section
            </div>
          </AccordionContent>
        </AccordionItem> */}

        {!!reviewData?.length && (
          <AccordionItem value="item-6">
            <AccordionTrigger className="font-black uppercase !no-underline">
              Car Cover Reviews
            </AccordionTrigger>
            <AccordionContent>
              <div className="lg:mt-28">
                <ReviewSection reviewData={reviewData} />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

const StarIcon = () => {
  return (
    <svg
      viewBox="0 0 59 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[32px] w-[32px] lg:h-[55px] lg:w-[55px]"
    >
      <path
        id="Star 19"
        d="M29.5 1.61804L35.7599 20.884L35.8722 21.2295H36.2354H56.4929L40.1042 33.1365L39.8104 33.35L39.9226 33.6955L46.1825 52.9615L29.7939 41.0545L29.5 40.8409L29.2061 41.0545L12.8175 52.9615L19.0774 33.6955L19.1896 33.35L18.8958 33.1365L2.50715 21.2295H22.7646H23.1279L23.2401 20.884L29.5 1.61804Z"
        fill="#FFD80E"
        stroke="#FF9F47"
      />
    </svg>
  );
};

const ReviewSection = ({
  reviewData,
}: {
  reviewData: TReviewData[] | null;
}) => {
  const [displayedReviews, setDisplayedReviews] = useState<number>(3);
  if (!reviewData) return null;
  // console.log('reviewData', reviewData);
  // console.log(reviewData);
  return (
    <div className="relative py-2">
      <p
        className="mb-5 hidden text-center text-xl font-black uppercase text-black md:text-3xl lg:mb-20 lg:block lg:text-[42px]"
        id="reviews"
      >
        Car Cover Reviews
      </p>
      <div className="flex flex-col items-center justify-around lg:flex-row">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[40px] font-black lg:text-[80px]">4.9</p>
            <p className="lg:mt-11">{reviewData?.length} reviews</p>
          </div>
          <div className="flex items-stretch text-yellow-300">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
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
            .map((review) => <ReviewCard key={review.id} review={review} />)}
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
  const StarIcon = () => {
    return (
      <svg
        viewBox="0 0 59 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[25px] w-[25px] lg:h-[55px] lg:w-[55px]"
      >
        <path
          id="Star 19"
          d="M29.5 1.61804L35.7599 20.884L35.8722 21.2295H36.2354H56.4929L40.1042 33.1365L39.8104 33.35L39.9226 33.6955L46.1825 52.9615L29.7939 41.0545L29.5 40.8409L29.2061 41.0545L12.8175 52.9615L19.0774 33.6955L19.1896 33.35L18.8958 33.1365L2.50715 21.2295H22.7646H23.1279L23.2401 20.884L29.5 1.61804Z"
          fill="#FFD80E"
          stroke="#FF9F47"
        />
      </svg>
    );
  };

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
        {review.review_title}
      </div>
      <div className="my-2 flex gap-1 text-yellow-300 lg:my-0">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
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
      className="flex h-auto w-full max-w-full flex-col items-center justify-center py-8 md:py-8 "
    >
      <div className="h-[550px] w-full">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/MzF7jIIkDAo?si=t-6lccUtdSOH0NZM"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
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
