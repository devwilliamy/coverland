import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { CheckIcon } from './icons';
// import HelpfulSection from './HelpfulSection';
import ReviewCardImages from './ReviewCardImages';
import HelpfulSection from './HelpfulSection';

export default function ReviewCard({
  review,
  tabsCard,
}: {
  review: TReviewData;
  tabsCard?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full min-w-[100%] flex-col rounded border-2 px-6 pb-[24px] pt-[36px] lg:pl-6 lg:pr-[59px]`}
    >
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
      <div className="text-sm font-light normal-case text-neutral-500 lg:hidden">
        {review?.reviewed_at &&
          `Purchased on
        ${new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}`}
      </div>
      <div className="mt-5 flex w-[216px] max-w-full items-stretch gap-1 self-start">
        {/* images go here */}
      </div>

      <div className="mt-[40px] flex justify-between lg:mt-0 lg:gap-[104px]">
        <div className="  text-[16px] leading-[28px] text-[#1A1A1A] lg:flex lg:max-h-[266px] lg:text-[18px] ">
          {review.review_description}
        </div>
        {tabsCard ? (
         <></>
        ) : (
          <div className="hidden whitespace-nowrap text-[18px] leading-[12px] text-[#707070]	lg:flex lg:leading-[28px]">
          {review?.reviewed_at &&
            `Purchased on
        ${new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}`}
        </div>
        )}
      </div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal normal-case leading-8 text-[#1A1A1A] max-md:mt-10 max-md:max-w-full lg:mt-24">
        {review.review_author}
      </div>
     
      <span className="mt-[9px] flex items-center gap-1.5 lg:gap-3 ">
        <CheckIcon />
        <div className="text-md my-2 grow self-center whitespace-nowrap font-bold normal-case leading-3 text-zinc-900">
          Yes, I would recommend.
        </div>
      </span>
      {tabsCard && <div className="hidden mt-[16px] whitespace-nowrap text-[18px] leading-[12px] text-[#707070]	lg:flex lg:leading-[28px]">
            Purchased on{' '}
            {new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>}
      <ReviewCardImages />
      <HelpfulSection numberOfHelpful={review?.helpful as string} />
   
    </div>
  );
}
