import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import ReviewImageDialog from './ReviewImageDialog';
import { ReviewMedia } from '@/lib/types/review';
import ReviewMediaSection from './ReviewMediaSection';

type ReviewHeadergalleryMobileProps = {
  videoReviews: ReviewMedia[];
  photoReviews: ReviewMedia[];
};
export const ReviewHeaderGalleryMobile: React.FC<
  ReviewHeadergalleryMobileProps
> = ({ videoReviews, photoReviews }) => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedRowType, setSelectedRowType] = useState<'image' | 'video'>(
    'image'
  );

  const handleDialogClose = () => {
    setReviewDialogOpen(false);
  };

  const handleOnMediaClick = (index: number, rowType: 'video' | 'image') => {
    setSelectedMediaIndex(index);
    setCurrentSlideIndex(index);
    setReviewDialogOpen(true);
    setSelectedRowType(rowType);
  };

  return (
    <section className="flex flex-col gap-4 lg:hidden">
      <ReviewMediaSection
        title="Reviews with videos"
        emptyMessage="No video reviews available"
        mediaItems={videoReviews}
        rowType="video"
        onMediaClick={handleOnMediaClick}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
      <ReviewMediaSection
        title="Reviews with images"
        emptyMessage="No image reviews available"
        mediaItems={photoReviews}
        rowType="image"
        onMediaClick={handleOnMediaClick}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        {reviewDialogOpen && (
          <ReviewImageDialog
            onClose={handleDialogClose}
            initialImageIndex={selectedMediaIndex}
            mediaItems={
              selectedRowType === 'video' ? videoReviews : photoReviews
            }
            rowType={selectedRowType}
          />
        )}
      </Dialog>
    </section>
  );
};

export default ReviewHeaderGalleryMobile;
