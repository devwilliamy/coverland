// ReviewHeaderGalleryDesktop.tsx
'use client';
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import ReviewImageDialog from './ReviewImageDialog';
import { ReviewMedia } from '@/lib/types/review';
import ReviewMediaSection from './ReviewMediaSection';
type ReviewHeaderGalleryDesktopProps = {
  videoReviews: ReviewMedia[];
  photoReviews: ReviewMedia[];
};
const ReviewHeaderGalleryDesktop: React.FC<ReviewHeaderGalleryDesktopProps> = ({
  videoReviews,
  photoReviews,
}) => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // New state
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
    <section className="flex max-h-fit w-full flex-col items-start">
      <div className="w-full">
        {' '}
        {/* Added w-full */}
        <ReviewMediaSection
          title="Reviews with videos"
          emptyMessage="No video reviews available"
          mediaItems={videoReviews}
          rowType="video"
          onMediaClick={handleOnMediaClick}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
        />
      </div>
      <div className="w-full pt-4">
        <ReviewMediaSection
          title="Reviews with images"
          emptyMessage="No image reviews available"
          mediaItems={photoReviews}
          rowType="image"
          onMediaClick={handleOnMediaClick}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
        />
      </div>
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

export default ReviewHeaderGalleryDesktop;
