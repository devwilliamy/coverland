import { useState } from 'react';
import ReviewImageGalleryDesktop from './ReviewImageGalleryDesktop';
import ReviewImagesSheet from './ReviewImagesSheet';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

interface ReviewSeeMoreImagesProps {
  lastImage: string;
  remainingCount: number;
}

const ReviewSeeMoreImages: React.FC<ReviewSeeMoreImagesProps> = ({
  lastImage,
  remainingCount,
}) => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

  const seeMoreContent = (
    <div className="relative aspect-square w-full overflow-hidden rounded-md">
      <Image
        width={190}
        height={190}
        className="h-full w-full object-cover opacity-50"
        alt="See more images"
        src={lastImage}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <span className="text-lg font-bold text-white">
          +{remainingCount} more
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <ReviewImagesSheet>{seeMoreContent}</ReviewImagesSheet>
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogTrigger className="underline">{seeMoreContent}</DialogTrigger>
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
