import Image from 'next/image';
import React from 'react';
import PlaceholderImage from '@/images/categories/carCoverImage.webp';

function ReviewCardImages() {
  return (
    <span className="flex gap-2 overflow-x-auto">
      {[...Array(10)].map((item) => (
        <Image
          className="flex aspect-square h-[160px] w-[160px] items-center"
          alt="review-ard-image-alt"
          src={PlaceholderImage}
        />
      ))}
    </span>
  );
}

export default ReviewCardImages;
