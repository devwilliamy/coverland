'use client';

import { useContext } from 'react';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { useStore } from 'zustand';
import ReviewImagesSheet from './ReviewImagesSheet';
import Image from 'next/image';

export default function ReviewHeaderGallery() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewImages = useStore(store, (s) => s.reviewImages);
  let imageCount = 0;

  for (const obj of reviewImages) {
    if (obj && obj.review_image) {
      obj.review_image.split(',').map(() => {
        imageCount++;
      });
    }
  }

  // const reviewImageKeys = Object.keys(reviewImages);

  return (
    <div className="flex flex-col items-center">
      {reviewImages && (
        <div className=" flex items-center justify-center py-[10px] text-[14px] font-[400] normal-case leading-[24px] text-[#767676] lg:pb-[14px]  lg:pt-[70px]">
          {imageCount} Review Images
        </div>
      )}
      {/* {reviewImages.length > 0 && (
        <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:hidden">
          {reviewImages?.slice(0, 3).map((image, index) => {
            return (
              <div key={`review-header-image-${index}`}>
                <Image
                  src={String(image.review_image?.split(',')[0])}
                  alt="Car Cover Review Image"
                  width={207}
                  height={207}
                  className=" aspect-square  h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
                />
              </div>
            );
          })}
          {reviewImages.length > 0 ? (
            <div className="flex h-full w-full items-center justify-center border border-black">
              <div className="font-normalc text-center text-base normal-case underline ">
                <SeeMoreImages />
              </div>
            </div>
          ) : (
            <></>
          )}
        </section>
      )} */}
      {reviewImages?.length > 0 && (
        <>
          <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:hidden">
            {reviewImages?.slice(0, 3).map((image, index) => {
              return (
                <div key={`review-header-image-${index}`}>
                  <Image
                    src={String(image.review_image?.split(',')[0])}
                    alt="Car Cover Review Image"
                    width={207}
                    height={207}
                    className=" aspect-square  h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
                  />
                </div>
              );
            })}
            {reviewImages?.length > 0 ? (
              <div className="flex h-full w-full items-center justify-center border border-black">
                <div className="font-normalc text-center text-base normal-case underline ">
                  <SeeMoreImages />
                </div>
              </div>
            ) : (
              <></>
            )}
          </section>
          <section className="hidden max-h-fit w-full items-center gap-[7px] lg:grid lg:max-h-[207px] lg:grid-cols-6">
            {reviewImages?.slice(0, 6).map((image, index) => {
              return (
                <div key={`review-header-image-${index}`}>
                  <Image
                    src={String(image.review_image?.split(',')[0])}
                    alt="Car Cover Review Image"
                    width={207}
                    height={207}
                    className=" aspect-square  h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
                  />
                </div>
              );
            })}
            {/* {reviewImages.length > 0 ? (
              <div className="flex h-full w-full items-center justify-center border border-black">
                <div className="font-normalc text-center text-base normal-case underline ">
                  <SeeMoreImages />
                </div>
              </div>
            ) : (
              <></>
            )} */}
          </section>
        </>
      )}
    </div>
  );
}

const SeeMoreImages = () => {
  return (
    <>
      {/* <div className="hidden lg:block">
        <Dialog>
          <DialogTrigger className="underline">
            See more <br /> review images
          </DialogTrigger>
          <DialogContent className="flex min-h-[65vh] flex-col items-center lg:min-w-[77vw] lg:max-w-[80%]">
            <CustomerReviewTabs />
          </DialogContent>
        </Dialog>
      </div> */}
      <div className="lg:hidden">
        <ReviewImagesSheet />
      </div>
    </>
  );
};
