import Image from 'next/image';
import React from 'react';

function ReviewCardImages({ reviewImages }: { reviewImages?: string | null }) {
  if (!reviewImages) return;

  return (
    <span className="flex gap-2 overflow-x-auto">
      {reviewImages
        ?.split(',')
        .map((image, index) => (
          <Image
            key={`review-card-image-${index}`}
            height={160}
            width={160}
            className="flex aspect-square items-center"
            alt="review-ard-image-alt"
            src={image}
          />
        ))}
    </span>
  );
}

export default ReviewCardImages;
