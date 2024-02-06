import ReviewCard from './ReviewCard';
import { useState } from 'react';
import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { ReviewPercentCircle } from './ReviewPercentCircle';
import ExampleCustomerImage from '@/images/PDP/product_details_01.webp';
import Image from 'next/image';

const ReviewSection = ({
  reviewData,
}: {
  reviewData: TReviewData[] | null | undefined;
}) => {
  const [displayedReviews, setDisplayedReviews] = useState<number>(3);
  if (!reviewData) return null;
  // console.log('reviewData', reviewData);
  // console.log(reviewData);
  return (
    <div className="relative ">
      <div className="flex flex-col gap-[20px] lg:flex-row">
        <div className="flex w-full min-w-[188px] flex-col ">
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

export default ReviewSection;

const exampleReviewArray = [1, 2, 3, 4, 5];

const ReviewImageGallery = ({ reviewData }: any) => {
  return (
    <>
      <div className="flex items-center justify-center">
        {reviewData.length} Review Images
      </div>
      <div className="pt-2">
        <div className="grid grid-cols-2 gap-2">
          {exampleReviewArray.slice(0, 3).map((review, index) => (
            <Image
              key={index}
              src={ExampleCustomerImage}
              alt="Car Cover Review Image"
              className="h-[156px] w-[156px] object-cover"
            />
          ))}
          <div className="flex h-[156px] w-[156px] items-center justify-center border border-black">
            <div className="text-center text-base font-normal normal-case underline ">
              See more review images
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
