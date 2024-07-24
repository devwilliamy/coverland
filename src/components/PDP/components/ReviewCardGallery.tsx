import useStoreContext from '@/hooks/useStoreContext';
import { ReviewImageIndexContext } from '@/lib/contexts/ReviewImageIndexContext';
import { TReviewData } from '@/lib/types/review';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';

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
  const [isHelpful, setIsHelpful] = useState(false);

  if (!reviewImages) return;

  return (
    <section
      className={`drop-shadow- absolute ${moreOpen ? '-bottom-8' : '-bottom-0'} bg-gradient-to-t from-white from-85% to-white/45 pt-5  `}
    >
      {!moreOpen && (
        <div
          className="flex items-center"
          onClick={() => setMoreOpen((e: boolean) => true)}
        >
          <div>
            <ChevronDown />
          </div>
          <div className="text-base">More</div>
        </div>
      )}
      {moreOpen && (
        <div
          className="flex items-center"
          onClick={() => setMoreOpen((e: boolean) => false)}
        >
          <div>
            <ChevronUp />
          </div>
          <div className="text-base">Hide</div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="my-2 leading-6 text-[#767676] ">
          {review.review_author}
        </div>
        <div
          className={`flex items-center gap-1.5 ${isHelpful ? 'text-[#1D8044]' : ''} cursor-pointer `}
          onClick={() => {
            setIsHelpful((e) => {
              return !e;
            });
          }}
        >
          {isHelpful ? <FaThumbsUp fill="#1D8044" /> : <FaRegThumbsUp />}

          <p>Helpful</p>
          <p>
            ({isHelpful ? Number(review?.helpful) + 1 : review.helpful ?? 0})
          </p>
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
                className={`flex aspect-square items-center object-cover`}
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
