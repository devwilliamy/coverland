import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { ThumbsUpIcon } from './icons';
import ReviewCardCarousel from './ReviewCardCarousel';
import WouldRecomend from './WouldRecomend';
import ReviewCardGallery from './ReviewCardGallery';
import { useState } from 'react';

export default function ReviewCard({
  review,
  fullGallery,
}: {
  review: TReviewData;
  fullGallery?: boolean;
}) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div
      className={`relative flex h-full w-full min-w-full flex-col justify-between ${moreOpen ? 'overflow-auto overflow-y-auto' : 'overflow-hidden'} rounded ${!fullGallery && 'border-2 '} ${!fullGallery ? 'p-4' : 'px-4 '} `}
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
            value={review.rating_stars}
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
        {review.rating_stars && review.rating_stars >= 3 ? (
          <WouldRecomend />
        ) : null}
      </div>

      <div className="flex justify-between pt-1.5 lg:mt-0 lg:gap-[104px]">
        <div className="line-clamp-3  text-[16px] leading-[28px] text-[#1A1A1A] lg:flex lg:text-[18px] ">
          {review.review_description}
        </div>
      </div>
      {!fullGallery && (
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
      )}

      <div id="review-card-footer" className="mt-auto flex flex-col gap-2">
        {review.review_image && fullGallery ? (
          <ReviewCardGallery
            reviewImages={review?.review_image}
            review={review as TReviewData}
            moreOpen={moreOpen}
            setMoreOpen={setMoreOpen}
          />
        ) : (
          <ReviewCardCarousel reviewImages={review?.review_image} />
        )}
      </div>
    </div>
  );
}
