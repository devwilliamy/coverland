import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { CheckIcon } from './icons';
import ReviewCardImages from './ReviewCardImages';
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
      className={`relative flex h-full w-full min-w-full flex-col justify-between rounded border-2 p-6`}
    >
      <div className="py-2">
        <div className="text-xl font-bold normal-case text-neutral-700 max-md:max-w-full lg:text-3xl">
          {review.review_title
            ? review.review_title.charAt(0).toUpperCase() +
              review.review_title?.slice(1)
            : ''}
        </div>
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
            `Purchased on
        ${new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}`}
        </div>
      </div>

      <div className="flex justify-between  lg:mt-0 lg:gap-[104px]">
        <div className="line-clamp-3  text-[16px] leading-[28px] text-[#1A1A1A] lg:flex lg:text-[18px] ">
          {review.review_description}
        </div>
        {tabsCard ? null : (
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

      <div id="review-card-footer" className="mt-auto flex flex-col gap-2">
        <div className="leading-8 text-[#1A1A1A] ">{review.review_author}</div>
        {review.rating_stars && review.rating_stars >= 3 ? (
          <WouldReccomend />
        ) : null}
        {tabsCard && (
          <div className=" hidden whitespace-nowrap text-[18px] leading-[12px] text-[#707070] lg:flex lg:leading-[28px]">
            Purchased on{' '}
            {new Date(review?.reviewed_at ?? '').toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        )}
        {/* {!tabsCard && (
          <HelpfulSection numberOfHelpful={review?.helpful as string} />
        )} */}
        <ReviewCardImages reviewImages={review?.review_image} />
      </div>
    </div>
  );
}

const WouldReccomend = () => (
  <span className=" flex items-center gap-1.5 lg:gap-3 ">
    <CheckIcon />
    <div className="text-md my-2 grow self-center whitespace-nowrap font-bold normal-case leading-3 text-zinc-900">
      Yes, I would recommend.
    </div>
  </span>
);
