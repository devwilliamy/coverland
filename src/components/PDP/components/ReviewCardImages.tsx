import Image from 'next/image';
import React from 'react';
import PlaceholderImage from '@/images/categories/carCoverImage.webp';

function ReviewCardImages({ reviewImages }: { reviewImages?: string }) {
  // const images = [];

  //   for (const image of reviewImages) {
  //     const split = image?.split(',');
  //     if (split) {
  //       for (const i in split) {
  //         images.push(split[i]);
  //       }
  //     }
  //   }

  //   return images;

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
            className="flex aspect-square h-[160px] w-[160px] items-center"
            alt="review-ard-image-alt"
            src={image}
          />
        ))}
    </span>
  );
}

export default ReviewCardImages;
