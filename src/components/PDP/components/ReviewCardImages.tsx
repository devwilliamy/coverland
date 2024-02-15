import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import React from 'react';

function ReviewCardImages({ reviewImages }: { reviewImages?: string | null }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  if (!reviewImages) return;
  const reviewImagesSplit = reviewImages?.split(',');
  return (
    <span className="flex gap-2 overflow-x-auto">
      {reviewImagesSplit.length > 1
        ? reviewImagesSplit
            .slice(isMobile ? 0 : 1)
            .map((image, index) => (
              <Image
                key={`review-card-image-${index}`}
                height={160}
                width={160}
                className="flex aspect-square items-center"
                alt="review-ard-image-alt"
                src={image}
              />
            ))
        : isMobile && (
            <Image
              height={160}
              width={160}
              className="flex aspect-square items-center"
              alt="review-ard-image-alt"
              src={reviewImagesSplit[0]}
            />
          )}
    </span>
  );
}

export default ReviewCardImages;
