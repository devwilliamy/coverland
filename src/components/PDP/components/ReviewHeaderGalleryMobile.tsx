import { Fragment, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReviewSeeMoreImages from './ReviewSeeMoreImages';
import ReviewImageDialog from './ReviewImageDialog';
import { useStore } from 'zustand';
import useStoreContext from '@/hooks/useStoreContext';

export default function ReviewHeaderGalleryMobile() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const reviewImages = useStore(store, (s) => s.reviewImages);

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <section className="grid aspect-square h-full w-full grid-cols-2 items-center gap-[7px] lg:hidden">
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        {reviewImages?.slice(0, 3).map((image, index) => (
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
                  className="aspect-square h-full w-full items-center justify-center object-cover"
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
            isMobile={true}
            initialImageIndex={selectedImageIndex}
          />
        )}
      </Dialog>
      {reviewImages?.length > 0 && (
        <div className="flex h-full w-full items-center justify-center border border-black">
          <div className="text-center text-base font-normal normal-case underline">
            <ReviewSeeMoreImages />
          </div>
        </div>
      )}
    </section>
  );
}
