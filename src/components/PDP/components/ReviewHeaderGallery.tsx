import { TReviewData } from '@/lib/db';
import Image from 'next/image';
import React from 'react';
import ExampleCustomerImage from '@/images/PDP/product_details_01.webp';

const exampleReviewArray = [1, 2, 3, 4, 5];

export default function ReviewHeaderGallery({
  reviewData,
}: {
  reviewData: TReviewData[] | null | undefined;
}) {
  return (
    <div className="flex flex-col items-center px-[]">
      <div className="#767676 flex items-center justify-center py-[10px] text-[14px] font-[400] normal-case leading-[24px] text-[#767676]">
        {reviewData && reviewData.length} Review Images
      </div>
      <div className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px]">
        {exampleReviewArray.slice(0, 3).map((review, index) => (
          <Image
            key={index}
            src={ExampleCustomerImage}
            alt="Car Cover Review Image"
            className="h-full w-full items-center justify-center object-cover"
          />
        ))}
        <div className="flex h-full w-full items-center justify-center border border-black">
          <div className="font-normalc text-center text-base normal-case underline ">
            See more <br /> review images
          </div>
        </div>
      </div>
    </div>
  );
}
