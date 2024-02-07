import ReviewCard from './ReviewCard';
import { useState } from 'react';
import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import ExampleCustomerImage from '@/images/PDP/product_details_01.webp';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import ReviewPercentCircle from './ReviewPercentCircle';

const ReviewSection = ({
  reviewData,
}: {
  reviewData: TReviewData[] | null | undefined;
}) => {
  const [displayedReviews, setDisplayedReviews] = useState<number>(3);
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!reviewData) return null;
  return (
    <div className="relative lg:py-2">
      {isMobile ? null : (
        <p
          className="mb-5 hidden text-center text-xl font-black uppercase text-black md:text-3xl lg:mb-20 lg:block lg:text-[42px]"
          id="reviews"
        >
          Car Cover Reviews
        </p>
      )}
      <div className="flex flex-col gap-[20px] lg:flex-row  lg:gap-0">
        <div className="flex w-full min-w-[188px] flex-col lg:items-center">
          <div className="flex items-center gap-[14px] pt-8 lg:pt-0">
            <p className="pl-4 text-[40px] font-black lg:pl-0 lg:text-[80px]">
              4.9
            </p>
            <p className="text-sm font-normal lg:mt-11 lg:text-lg">
              {reviewData?.length} reviews
            </p>
          </div>
          <div className="flex items-stretch gap-1 pl-4 text-yellow-300">
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
        <div className="flex w-full items-center  gap-2 pl-4">
          <ReviewPercentCircle percent="95" />
          <p className="text-[18px] font-bold lg:text-[28px]">
            95% would recommend
          </p>
        </div>
      </div>
      <div className="pt-6">
        <ReviewImageGallery reviewData={reviewData} />
      </div>
      {/* <div className="flex gap-4 *:rounded-lg my-4">
            <select className="w-full h-12 mx-auto mt-9 text-lg bg-transparent rounded border border-[#1A1A1A] font-normal text-[#767676] text-[#1A1A1A] capitalize">
              <option value="volvo">Newest</option>
              <option value="saab">Oldest</option>
              <option value="mercedes">Most Helpful</option>
            </select>
    
            <select className=" w-full h-12 mx-auto mt-9 text-lg bg-transparent rounded border border-[#1A1A1A] font-normal text-[#767676] text-[#1A1A1A] capitalize">
              <option value="volvo">Newest</option>
              <option value="saab">Oldest</option>
              <option value="mercedes">Most Helpful</option>
            </select>
            <select className="w-full h-12 mx-auto mt-9 text-lg bg-transparent rounded border border-[#1A1A1A] font-normal text-[#767676] text-[#1A1A1A] capitalize">
              <option value="volvo">Newest</option>
              <option value="saab">Oldest</option>
              <option value="mercedes">Most Helpful</option>
            </select>
          </div> */}
      {!!reviewData?.length && (
        <div className="flex flex-col items-center mt-7 gap-6">
          {reviewData
            ?.slice(0, displayedReviews)
            .map((review, index) => (
              <ReviewCard key={review.id || index} review={review} />
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

export default ReviewSection;

const exampleReviewArray = [1, 2, 3, 4, 5];

const ReviewImageGallery = ({ reviewData }: any) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const imagesToShow = isMobile ? 3 : 5;
  return (
    <div className="flex flex-col items-center px-[]">
      <div className="#767676 flex items-center justify-center py-[10px] text-[14px] font-[400] normal-case leading-[24px] text-[#767676]">
        {reviewData.length} Review Images
      </div>
      <div className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px]">
        {exampleReviewArray.slice(0, 3).map((review, index) => (
          <Image
            key={index}
            src={ExampleCustomerImage}
            alt="Car Cover Review Image"
            className="h-full w-full items-center justify-center object-cover"
          />
        ))}
        <div className="flex h-full w-full items-center justify-center border border-black">
          <div className="font-normalc text-center text-base normal-case underline ">
            See more <br /> review images
          </div>
        </div>
      </div>
    </div>
  );
};
