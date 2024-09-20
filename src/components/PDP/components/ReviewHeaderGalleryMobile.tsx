import React, { Fragment, useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReviewImageDialog from './ReviewImageDialog';
import ReviewSeeMoreImages from './ReviewSeeMoreImages';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';
import { TReviewData } from '@/lib/types/review';
import ReviewMediaSection from './ReviewMediaSection';

export type ReviewMedia = {
  review_image_url: string;
  review_video_thumbnail_url: string;
  review_video_url: string;
  rating_stars: string;
};

const reviewVideoUrl = [
  {
    review_image_url: '',
    review_video_thumbnail_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Corvette-2003-Carey-Braha-2.webp',
    review_video_url: '',
    rating_stars: '5',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Silverado-2003-Christopher-Narog-5.webp',
    review_video_url: '',
    rating_stars: '5',
  },
];
const reviewImages = [
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/1-review-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/1-review-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/10-review-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/10-review-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/10-review-3.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/11-review-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/11-review-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/12-review-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/12-review-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/12-review-3.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/2-review-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/2-review-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/2-review-3.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/3-review-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/3-review-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/3-review-3.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/4-image-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/4-image-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/4-image-3.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/7-review-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/7-review-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/8-review-1.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/8-review-2.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
  {
    review_image_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/8-review-3.webp',
    review_video_thumbnail_url: '',
    review_video_url: '',
    rating_stars: '',
  },
];

const reviewVideoThumbnails = [
  'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Dodge-Challenger-2021-Caitlyn-2.webp',
  'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Silverado-2003-Christopher-Narog-5.webp',
];

export const ReviewHeaderGalleryMobile: React.FC = () => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // New state
  const [selectedRowType, setSelectedRowType] = useState<'image' | 'video'>(
    'image'
  );
  //   const store = useStoreContext();
  //   if (!store) throw new Error('Missing Provider in the tree');
  //   const reviewImages = useStore(store, (s) => s.reviewImages);
  // console.log('reviewMedia:', reviewMedia);

  const handleDialogClose = () => {
    setReviewDialogOpen(false);
  };

  const handleOnMediaClick = (index: number, rowType: 'video' | 'image') => {
    console.log('Image Index/Type:', { index, rowType });
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
        mediaItems={reviewVideoUrl}
        rowType="video"
        onMediaClick={handleOnMediaClick}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
      <ReviewMediaSection
        title="Reviews with images"
        emptyMessage="No image reviews available"
        mediaItems={reviewImages}
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
              selectedRowType === 'video' ? reviewVideoUrl : reviewImages
            }
            rowType={selectedRowType}
          />
        )}
      </Dialog>
    </section>
  );
};

export default ReviewHeaderGalleryMobile;
