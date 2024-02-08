'use client';

import { useContext, useEffect, useState } from 'react';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ExampleCustomerImage from '@/images/PDP/product_details_01.webp';
import Image, { StaticImageData } from 'next/image';
import { getAllReviewsWithImages } from '@/lib/db/review';
import { useStore } from 'zustand';
import CustomerReviewTabs from './CustomerReviewTabs';

const exampleReviewArray = [1, 2, 3, 4, 5];

export default function ReviewHeaderGallery() {
  // useEffect(() => {

  // }, []);

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);
  //   const setReviewData = useStore(store, (s) => s.setReviewData);
  const [reviewImages, setReviewImages] = useState<
    (string | StaticImageData | null)[]
  >([]);
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
    const getAllImages = async () => {
      try {
        console.log('Inside getAllImages', { year, type, make, model });

        const newReviewData = await getAllReviewsWithImages({
          productType: typeString,
          year,
          make,
          model,
        });

        setReviewImages(newReviewData);
      } catch (error) {
        console.error(error);
      }
    };
    getAllImages();
  }, []);


  return (
    <div className="flex flex-col items-center px-[]">
      <div className=" flex items-center justify-center py-[10px] text-[14px] font-[400] normal-case leading-[24px] text-[#767676]">
        {reviewImages && reviewImages.length} Review Images
      </div>
      {/* Desktop Header Images */}
      <section className="hidden max-h-fit w-full items-center gap-[7px] lg:grid lg:max-h-[207px] lg:grid-cols-6">
        {reviewImages.map((image, index) => {
          if (index <= 4) {
            return (
              <Image
                key={`review-header-image-${index}`}
                src={image ? image : ExampleCustomerImage}
                alt="Car Cover Review Image"
                width={207}
                height={207}
                className=" aspect-square  h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
              />
            );
          }
        })}
        <div className="flex h-full w-full items-center justify-center border border-black">
          <div className="font-normalc text-center text-base normal-case underline ">
            <SeeMoreImages />
          </div>
        </div>
      </section>
      {/* Mobile Header Images */}
      <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:hidden">
        {reviewImages.map((image, index) => {
          if (index <= 2) {
            return (
              <Image
                key={`review-header-image-${index}`}
                src={image ? image : ExampleCustomerImage}
                alt="Car Cover Review Image"
                width={500}
                height={500}
                className="h-full w-full items-center justify-center object-cover"
              />
            );
          }
        })}
        <div className="flex h-full w-full items-center justify-center border border-black">
          <div className="font-normalc text-center text-base normal-case underline ">
            <SeeMoreImages />
          </div>
        </div>
      </section>
    </div>
  );
}

const SeeMoreImages = () => {
  return (
    <Dialog>
      <DialogTrigger className="underline">
        See more <br /> review images
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center lg:min-w-[77vw] lg:max-w-[1120px]">
        <CustomerReviewTabs />
      </DialogContent>
    </Dialog>
  );
};
