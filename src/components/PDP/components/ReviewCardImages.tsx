import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import React, { useContext } from 'react';
import { useStore } from 'zustand';

function ReviewCardImages({ reviewImages }: { reviewImages: string | null }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
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

export default ReviewCardImages;
