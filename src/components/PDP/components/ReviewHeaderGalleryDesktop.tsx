// ReviewHeaderGalleryDesktop.tsx
'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReviewSeeMoreImages from './ReviewSeeMoreImages';
import ReviewImageDialog from './ReviewImageDialog';

export default function ReviewHeaderGalleryDesktop({ reviewImages }) {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <section className="hidden max-h-fit w-full items-center gap-[7px] lg:grid lg:max-h-[207px] lg:grid-cols-6">
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        {reviewImages?.slice(0, 5).map((image, index) => (
          <Fragment key={`review-card-image-${index}`}>
            <span className="flex gap-2 overflow-x-auto">
              <DialogTrigger
                onClick={() => {
                  setSelectedImageIndex(index);
                }}
              >
                <Image
                  height={270}
                  width={160}
                  className="aspect-square h-full w-full items-center justify-center object-cover lg:max-w-[207px]"
                  alt="review-card-image-trigger"
                  src={String(image.review_image?.split(',')[0])}
                  onError={() => {
                    console.error(
                      `Image: review-card-image-${index} | ERROR | `,
                      image
                    );
                  }}
                />
              </DialogTrigger>
            </span>
          </Fragment>
        ))}
        {reviewDialogOpen && (
          <ReviewImageDialog
            onClose={() => setReviewDialogOpen(false)}
            isMobile={false}
            initialImageIndex={selectedImageIndex}
          />
        )}
      </Dialog>
      <div className="flex h-full w-full items-center justify-center border border-black">
        <div className="text-center text-base font-normal normal-case underline">
          <ReviewSeeMoreImages />
        </div>
      </div>
    </section>
  );
}
