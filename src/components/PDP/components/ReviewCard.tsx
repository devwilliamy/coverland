import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { CheckIcon, ThumbsUpIcon } from './icons';
import ReviewCardImages from './ReviewCardImages';
import WouldReccomend from './WouldReccomend';
// import HelpfulSection from './HelpfulSection';

export default function ReviewCard({
  review,
  tabsCard,
}: {
  review: TReviewData;
  tabsCard?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full min-w-full flex-col justify-between rounded border-2 p-4`}
    >
      <div className="text-xl font-bold normal-case text-neutral-700 max-md:max-w-full lg:text-3xl">
        {review.review_title
          ? review.review_title.charAt(0).toUpperCase() +
            review.review_title?.slice(1)
          : ''}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-1 text-yellow-300 lg:my-0">
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
            new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
        </div>
      </div>
      <div className="flex gap-4 text-[12px] leading-[24px]">
        <p className="text-[#1D8044]">Verified Purchase</p>
        <WouldReccomend />
      </div>

      <div className="flex justify-between pt-1.5 lg:mt-0 lg:gap-[104px]">
        <div className="line-clamp-3  text-[16px] leading-[28px] text-[#1A1A1A] lg:flex lg:text-[18px] ">
          {review.review_description}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="my-2 leading-6 text-[#767676] ">
          {review.review_author}
        </div>
        <div className="flex items-center gap-1.5">
          <ThumbsUpIcon />
          <p>Helpful</p>
          <p>({review.helpful})</p>
        </div>
      </div>

      <div id="review-card-footer" className="mt-auto flex flex-col gap-2">
        {/* {!tabsCard && (
          <HelpfulSection numberOfHelpful={review?.helpful as string} />
        )} */}
        {/* <ReviewCardImages reviewImages={review?.review_image} /> */}
      </div>
    </div>
  );
}
