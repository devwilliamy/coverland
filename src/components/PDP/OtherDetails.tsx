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

export function ExtraProductDetails({
  reviewData,
}: {
  reviewData: TReviewData[];
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

  return (
    <>
      <div className="mt-8 md:mt-18 lg:mt-28 py-6 flex flex-col md:flex-row items-stretch gap-4 md:gap-0 md:items-center justify-between flex-wrap border-t border-b border-[#DADADA]">
        <h1
          onClick={() => scrollToSection(pdRef, PD_ID)}
          className={`text-lg text-black font-normal capitalize cursor-pointer ${
            selectedSection === PD_ID ? 'underline' : ''
          }`}
        >
          product details
        </h1>
        <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`text-lg text-black font-normal capitalize cursor-pointer ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          benefits
        </h1>
        <h1
          onClick={() => scrollToSection(specsRef, SPECS_ID)}
          className={`text-lg text-black font-normal capitalize cursor-pointer ${
            selectedSection === SPECS_ID ? 'underline' : ''
          }`}
        >
          specification
        </h1>
        <h1
          onClick={() => scrollToSection(faqRef, FAQ_ID)}
          className={`text-lg text-black font-normal capitalize cursor-pointer ${
            selectedSection === FAQ_ID ? 'underline' : ''
          }`}
        >
          Q&A
        </h1>
        <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`text-lg text-black font-normal capitalize cursor-pointer ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          Shipping & Returns
        </h1>
        <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`text-lg text-black font-normal capitalize cursor-pointer ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          warranty
        </h1>
        <h1
          onClick={() => scrollToSection(carCoverRef, CAR_COVER_INS_ID)}
          className={`text-lg text-black font-normal capitalize cursor-pointer ${
            selectedSection === CAR_COVER_INS_ID ? 'underline' : ''
          }`}
        >
          car cover instruction
        </h1>
        <h1
          onClick={() => scrollToSection(layersRef, LAYERS_ID)}
          className={`text-lg text-black font-normal capitalize cursor-pointer ${
            selectedSection === LAYERS_ID ? 'underline' : ''
          }`}
        >
          car cover reviews
        </h1>
      </div>

      <div ref={pdRef}>
        <ProductHero />
      </div>
      <div className="mt-8 md:mt-18 lg:mt-28">
        <Video />
      </div>
      <div ref={carCoverRef} className="mt-8 md:mt-18 lg:mt-28">
        <Layers />
      </div>
      <div className="mt-8 md:mt-18 lg:mt-28">
        <ClimateCrisis />
      </div>

      <div className="mt-8 md:mt-18 lg:mt-28">
        <NoGarage />
      </div>
      <div className="mt-8 md:mt-18 lg:mt-28">
        <OurCarCovers />
      </div>
      <div className="mt-8 md:mt-18 lg:mt-28">
        <ProductChecklist />
      </div>
      <div ref={specsRef} className="mt-8 md:mt-18 lg:mt-28">
        <ProductSpecGrid />
        <ProductPackage />
      </div>
      <div ref={faqRef} className="mt-8 md:mt-18 lg:mt-28">
        <PDPAccordion />
      </div>
      <div className="my-8 md:my-18 lg:my-28">
        <MoneyBack />
      </div>
      <div className="my-8 md:my-18 lg:my-28">
        <ReviewSection reviewData={reviewData} />
      </div>
    </>
  );
}

const StarIcon = () => {
  return (
    <svg
      viewBox="0 0 59 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="lg:w-[55px] lg:h-[55px] w-[40px] h-[40px]"
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
  const starHeightAndWidthSm = '40';
  console.log('reviewData', reviewData);
  console.log(reviewData);
  return (
    <>
      <p
        className="text-black text-center font-black text-xl md:text-3xl lg:text-[42px] mb-5 lg:mb-20 uppercase"
        id="reviews"
      >
        Car Cover Reviews
      </p>
      <div className="flex flex-col lg:flex-row justify-around items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <p className="lg:text-[80px] text-[40px] font-black">4.9</p>
            <p className="lg:mt-11">{reviewData?.length} reviews</p>
          </div>
          <div className="flex text-yellow-300 h-[60px] items-stretch">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="relative w-[75px] h-[75px] lg:w-[135px] lg:h-[135px] z-10">
            <svg
              width="137"
              height="135"
              viewBox="0 0 137 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-[75px] h-[75px] lg:w-[135px] lg:h-[135px] z-10"
            >
              <path
                d="M136.039 67.2705C136.039 104.449 105.898 134.617 68.6023 134.926C31.063 135.236 0.128084 104.846 0.000385799 67.5047C-0.0913973 40.1034 16.2021 16.4612 39.6906 5.75157C43.4657 4.02881 47.9112 6.00164 49.2001 9.93143C50.2935 13.2698 48.7173 16.9137 45.5088 18.3745C27.0285 26.8017 14.1549 45.2876 13.9634 66.7863C13.7 96.2239 37.6394 120.616 67.2295 121.037C97.4421 121.47 122.08 97.2321 122.08 67.2705C122.08 39.6549 101.149 16.9058 74.213 13.8493C70.6853 13.4484 68.0236 10.4832 68.0236 6.95432C68.0236 2.84194 71.6032 -0.417001 75.7135 0.0434587C109.657 3.84225 136.043 32.4939 136.043 67.2745L136.039 67.2705Z"
                fill="#1D8044"
              />
            </svg>
            <p className="absolute z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl lg:text-4xl font-black text-green-700">
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
          {reviewData?.slice(0, displayedReviews).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          <button
            className="text-black max-w-[160px] font-black leading-4 tracking-wide whitespace-nowrap justify-center items-stretch border bg-white hover:bg-black hover:text-white transition-colors duration-150 px-8 py-3.5 rounded-full border-solid border-black"
            aria-label="View more"
            role="button"
            onClick={() => setDisplayedReviews(displayedReviews + 4)}
          >
            View 4 More
          </button>
        </div>
      )}
    </>
  );
};

function ReviewCard({ review }: { review: TReviewData }) {
  return (
    <span className="rounded border self-stretch flex w-full flex-col items-stretch my-5 pl-10 pr-16 py-9 border-solid border-stone-300 max-md:max-w-full max-md:px-5">
      <div className="text-neutral-700 text-3xl font-bold max-md:max-w-full">
        {review.review_title}
      </div>
      <div className="flex gap-1 text-yellow-300">
        <StarIcon height="40" width="40" />
        <StarIcon height="40" width="40" />
        <StarIcon height="40" width="40" />
        <StarIcon height="40" width="40" />
        <StarIcon height="40" width="40" />
      </div>
      <div className="items-stretch flex w-[216px] max-w-full gap-1 mt-5 self-start">
        {/* images go here */}
      </div>
      <div className="flex justify-between">
        <div className="overflow-hidden text-zinc-900 max-w-[75%] text-lg max-md:max-w-full">
          Great products with customer service second to none. Attention to
          detail is extremely impressive.
        </div>
        {/* <div className="text-neutral-500 text-lg">
          Purchased on date
        </div> */}
      </div>
      <div className="overflow-hidden text-zinc-900 text-ellipsis whitespace-nowrap text-lg leading-8 mt-24 max-md:max-w-full max-md:mt-10">
        {review.review_author}
      </div>
      <span className="flex items-stretch gap-3 mt-7 self-start">
        {/* images go here */}

        <div className="text-zinc-900 text-base font-bold leading-3 self-center grow whitespace-nowrap my-auto">
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
      className="py-8 md:py-8 w-full h-auto flex flex-col justify-center items-center max-w-full "
    >
      <div className="w-full h-[550px]">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/MzF7jIIkDAo?si=t-6lccUtdSOH0NZM"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full h-auto bg-[#1A1A1A] flex flex-col justify-center items-start p-4 md:p-8 lg:p-14">
        <div>
          <p className="text-white font-black sm:text-xl md:text-3xl lg:text-5xl uppercase text-left tracking-[1.35px]">
            Tailored for the perfect fit
          </p>
        </div>
        <div className="pt-4 pb-3">
          <p className="capitalize text-white opacity-80 text-lg md:text-2xl font-normal tracking-[0.48px]">
            Your Car, Your Shield. Experience the superior custom fit we offer.{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
