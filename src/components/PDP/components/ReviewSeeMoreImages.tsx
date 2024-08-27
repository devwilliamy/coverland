import { useState } from 'react';
import ReviewImageGalleryDesktop from './ReviewImageGalleryDesktop';
import ReviewImagesSheet from './ReviewImagesSheet';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const ReviewSeeMoreImages = () => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <ReviewImagesSheet />
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogTrigger className="underline">
            See more <br /> review images
          </DialogTrigger>
          <DialogContent className="flex max-h-[65vh] flex-col items-center  lg:max-h-[80vh] lg:min-w-[77vw] lg:max-w-[80%]">
            <ReviewImageGalleryDesktop
              setReviewDialogOpen={setReviewDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ReviewSeeMoreImages;
