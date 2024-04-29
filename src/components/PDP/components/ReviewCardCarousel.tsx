import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import useStoreContext from '@/hooks/useStoreContext';
import Image from 'next/image';
import { useContext } from 'react';

function ReviewCardCarousel({ reviewImages }: { reviewImages: string | null }) {
  const reviewImagesSplit = reviewImages?.split(',');
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  if (!reviewImages) return;

  return (
    <span className="flex gap-2 overflow-x-auto">
      {reviewImagesSplit?.map((image, index) => {
        return (
          <Image
            key={`review-card-image-${index}`}
            height={160}
            width={160}
            className="flex aspect-square items-center"
            alt="review-ard-image-alt"
            src={image}
          />
        );
      })}
    </span>
  );
}

export default ReviewCardCarousel;
