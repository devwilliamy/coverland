import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { CheckIcon } from './icons';

export default function ReviewCard({
  review,
  
}: {
  review: TReviewData;

}) {
  return (
    <div
      className={`relative flex h-full w-full min-w-[100%] flex-col rounded border border-solid border-stone-300 py-9 pl-10 pr-16 max-md:max-w-full max-md:px-5 `}
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
        <div className="max-w-[75%] overflow-hidden text-base font-normal normal-case text-[#1A1A1A] max-md:max-w-full">
          {review.review}
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
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal normal-case leading-8 text-[#1A1A1A] max-md:mt-10 max-md:max-w-full lg:mt-24">
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
    </div>
  );
}
