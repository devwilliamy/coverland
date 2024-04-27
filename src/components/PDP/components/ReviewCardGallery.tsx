import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import useStoreContext from '@/hooks/useStoreContext';
import { ReviewImageIndexContext } from '@/lib/contexts/ReviewImageIndexContext';
import { TReviewData } from '@/lib/db/review';
import { ChevronDown, ThumbsUpIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react';

function ReviewCardGallery({
  reviewImages,
  review,
  moreOpen,
  setMoreOpen,
}: {
  reviewImages: string | null;
  review: TReviewData;
  moreOpen: boolean;
  setMoreOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const reviewImagesSplit = reviewImages?.split(',');
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const { currentReviewImage, setCurrentReviewImage, scrollTo } = useContext(
    ReviewImageIndexContext
  );

  if (!reviewImages) return;

  return (
    <section
      className={`drop-shadow- absolute ${moreOpen ? '-bottom-8' : '-bottom-0'} bg-gradient-to-t from-white from-85% to-white/45 pt-5  `}
      onClick={() => setMoreOpen((e: boolean) => !e)}
    >
      {!moreOpen && (
        <div className="flex items-center">
          <div>
            <ChevronDown />
          </div>
          <div className="text-base">More</div>
        </div>
      )}
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

      <span className="grid grid-cols-4 gap-2 ">
        {reviewImagesSplit?.map((image, index) => {
          return (
            <div
              key={`review-card-image-${index}`}
              className={`rounded-lg ${currentReviewImage === index && 'border-2 border-black'}`}
              onClick={() => {
                setCurrentReviewImage(index);
                scrollTo(index);
              }}
            >
              <Image
                height={160}
                width={160}
                className={`flex aspect-square items-center`}
                alt="review-card-gallery-image"
                src={image}
              />
            </div>
          );
        })}
      </span>
    </section>
  );
}

export default ReviewCardGallery;
