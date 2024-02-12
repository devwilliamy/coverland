import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { CheckIcon } from './icons';

export default function ReviewCard({ review }: { review: TReviewData }) {
  return (
    <div
      className={`relative flex h-full w-full min-w-[100%] flex-col rounded border-2 px-6 pb-[24px] pt-[36px] lg:pl-6 lg:pr-[59px] `}
    >
      <div className="text-[18px] font-[900] leading-[21px] lg:text-[28px] lg:leading-[33px] ">
        {review.review_title
          ? review.review_title.charAt(0).toUpperCase() +
            review.review_title.slice(1)
          : ''}
      </div>
      <div className="mb-3 mt-[16px] flex max-h-[24px] gap-1 text-yellow-300 lg:my-0 lg:mb-[34px] lg:mt-2 lg:h-[40px] lg:max-h-[40px]">
        <Rating
          value={5}
          size={'large'}
          readOnly
          className="flex max-h-[24px] lg:max-h-[40px] lg:min-h-[40px]"
        />
      </div>
      <div className="text-[14px] leading-[12px] text-[#707070] lg:hidden">
        Purchased on{' '}
        {new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>

      <div className="mt-[40px] flex justify-between lg:mt-0">
        <div className=" line-clamp-4 overflow-hidden text-[16px] leading-[28px] text-[#1A1A1A] lg:flex lg:max-h-[266px] lg:max-w-[70%] lg:text-[18px] ">
          {review.review_description}
        </div>
        <div className="hidden text-[18px] leading-[12px] text-[#707070] lg:flex lg:leading-[28px]">
          Purchased on{' '}
          {new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>

      <div className="mt-8 text-[16px] leading-[30px] lg:mb-[14px] lg:mt-[46px] lg:text-[18px] ">
        {review.review_author}
      </div>
      <span className="mt-[9px] flex items-center gap-1.5 lg:gap-3 ">
        <CheckIcon />
        <div className="text-[14px] font-[700] leading-[12px] lg:text-[16px] ">
          Yes, I would recommend.
        </div>
      </span>
    </div>
  );
}
