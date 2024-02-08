'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import ExampleCustomerImage from '@/images/PDP/product_details_01.webp';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { useStore } from 'zustand';
import {
  getAllReviewsWithImages,
  getProductReviewSummary,
} from '@/lib/db/review';
import { TReviewData } from '@/lib/db';

const exampleReviewArray = [1, 2, 3, 4, 5];

export default function ReviewHeaderGallery() {
  // useEffect(() => {

  // }, []);

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);
  //   const setReviewData = useStore(store, (s) => s.setReviewData);
  const [reviewImages, setReviewImages] = useState<TReviewData[]>([]);
  const { year, type, make, model, submodel, secondSubmodel } = useStore(
    store,
    (s) => s.query
  );

  const typeString =
    type === 'car-covers'
      ? 'Car Covers'
      : type === 'suv-covers'
        ? 'SUV Covers'
        : 'Truck Covers';

  useEffect(() => {
    console.log('Inside useEffect');
    const getAllImages = async () => {
      try {
        console.log('Inside getAllImages', { year, type, make, model });

        const newReviewData = await getProductReviewSummary({
          productType: typeString,
          year,
          make,
          model,
        });
        console.log('New Review Data:', newReviewData);

        setReviewImages(newReviewData);
      } catch (error) {
        console.error(error);
      }
    };
    getAllImages();
  }, []);

  //   console.log('Review Images', reviewImages);

  return (
    <div className="flex flex-col items-center px-[]">
      <div className="#767676 flex items-center justify-center py-[10px] text-[14px] font-[400] normal-case leading-[24px] text-[#767676]">
        {reviewImages && reviewImages.length} Review Images
      </div>
      <div className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px]">
        {reviewImages.map((review, index) => {
          if (index <= 2) {
            return (
              <Image
                key={index}
                src={
                  review.review_image
                    ? review.review_image
                    : ExampleCustomerImage
                }
                alt="Car Cover Review Image"
                className="h-full w-full items-center justify-center object-cover"
              />
            );
          }
        })}
        <div className="flex h-full w-full items-center justify-center border border-black">
          <div className="font-normalc text-center text-base normal-case underline ">
            See more <br /> review images
          </div>
        </div>
      </div>
    </div>
  );
}
