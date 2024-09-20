import React, { Fragment, useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReviewImageDialog from './ReviewImageDialog';
import ReviewSeeMoreImages from './ReviewSeeMoreImages';
import useStoreContext from '@/hooks/useStoreContext';
import { useStore } from 'zustand';
import { TReviewData } from '@/lib/types/review';
import ReviewMediaSection from './ReviewMediaSection';
// Car Covers
import Review01BFloridaBkRdCarCoverVideo from '@/videos/01-B.mp4'; // 1:38
import Review01BFloridaBkRdCarCoverThumbnail from '@/public/review/thumbnails/01-B.webp';
import Review07CBkGrStrTruckCoverVideo from '@/videos/07-C.mp4'; // 0:32
import Review07CBkGrStrTruckCoverThumbnail from '@/public/review/thumbnails/07-C.webp';
import ReviewCorvetteC8CarCoverVideo from '@/videos/video-output-5A9C531F-428B-49F1-9F71-E0C42504042D.mov'; // 1:15
import ReviewCorvetteC8CarCoverThumbnail from '@/public/review/thumbnails/video-output-5A9C531F-428B-49F1-9F71-E0C42504042D.webp';
import ReviewCaliSpecialMustangGTCarCoverVideo from '@/videos/video-output-9FF6F9F1-7480-433A-A0CD-3F4F01EA4C0B.mov'; // 1:40
import ReviewCaliSpecialMustangGTCarCoverThumbnail from '@/public/review/thumbnails/video-output-9FF6F9F1-7480-433A-A0CD-3F4F01EA4C0B.webp';
import ReviewYellowMustangFastbackCarCoverVideo from '@/videos/video-output-58A1332F-8B43-43FA-BC5F-18E3EC710248.mov'; // 0:30
import ReviewYellowMustangFastbackCarCoverThumbnail from '@/public/review/thumbnails/video-output-58A1332F-8B43-43FA-BC5F-18E3EC710248.webp';
import ReviewDadRecBkRdCarCoverVideo from '@/videos/video-output-A2824621-3A62-48E1-AA36-13D578896BF4.mov'; // 1:14
import ReviewDadRecBkRdCarCoverThumbnail from '@/public/review/thumbnails/video-output-A2824621-3A62-48E1-AA36-13D578896BF4.webp';
import ReviewPurpleCarBkRdCarCoverVideo from '@/videos/video-output-C649EF00-7B86-4423-B3F8-7054872D77FC.mov'; // 0:58
import ReviewPurpleCarBkRdCarCoverThumbnail from '@/public/review/thumbnails/video-output-C649EF00-7B86-4423-B3F8-7054872D77FC.webp';
// Seat Covers
import ReviewGirlGlassesSeatCoverVideo from '@/videos/video-output-4D0FAFC7-6552-4DDB-97E4-D09458515C9F.mov'; // 0:46
import ReviewGirlGlassesSeatCoverThumbnail from '@/public/review/thumbnails/video-output-4D0FAFC7-6552-4DDB-97E4-D09458515C9F.webp';
import ReviewHyundaiTusconSeatCoverVideo from '@/videos/video-output-9A8C21D5-9907-4C74-A428-DA683331946F.mov'; //1:14
import ReviewHyundaiTusconSeatCoverThumbnail from '@/public/review/thumbnails/video-output-9A8C21D5-9907-4C74-A428-DA683331946F.webp';
import ReviewBaldGuySeatCoverVideo from '@/videos/video-output-30CCCFA6-70E1-4E52-966F-2EA4DCDA1A71.mov'; //1:01
import ReviewBaldGuySeatCoverThumbnail from '@/videos/video-output-30CCCFA6-70E1-4E52-966F-2EA4DCDA1A71.webp';
import ReviewDodgeRamSeatCoverVideo from '@/videos/video-output-759A5252-5A4F-46A3-928D-54E571645DFF.mov'; // 0:56
import ReviewDodgeRamSeatCoverThumbnail from '@/videos/video-output-759A5252-5A4F-46A3-928D-54E571645DFF.webp';

const reviewVideoUrl = [
  {
    review_image_url: '',
    review_video_thumbnail_url: Review01BFloridaBkRdCarCoverThumbnail,
    review_video_url: Review01BFloridaBkRdCarCoverVideo,
    rating_stars: '5',
    duration: '1:38',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: Review07CBkGrStrTruckCoverThumbnail,
    review_video_url: Review07CBkGrStrTruckCoverVideo,
    rating_stars: '5',
    duration: '0:32',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: ReviewCorvetteC8CarCoverThumbnail,
    review_video_url: ReviewCorvetteC8CarCoverVideo,
    rating_stars: '5',
    duration: '1:15',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: ReviewCaliSpecialMustangGTCarCoverThumbnail,
    review_video_url: ReviewCaliSpecialMustangGTCarCoverVideo,
    rating_stars: '5',
    duration: '1:40',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: ReviewYellowMustangFastbackCarCoverThumbnail,
    review_video_url: ReviewYellowMustangFastbackCarCoverVideo,
    rating_stars: '5',
    duration: '0:30',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: ReviewDadRecBkRdCarCoverThumbnail,
    review_video_url: ReviewDadRecBkRdCarCoverVideo,
    rating_stars: '5',
    duration: '1:14',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: ReviewPurpleCarBkRdCarCoverThumbnail,
    review_video_url: ReviewPurpleCarBkRdCarCoverVideo,
    rating_stars: '5',
    duration: '0:58',
  },
];

const seatCoverVideoUrl = [
  {
    review_image_url: '',
    review_video_thumbnail_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Corvette-2003-Carey-Braha-2.webp',
    review_video_url: '',
    rating_stars: '5',
    duration: '',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url:
      'https://coverland.sfo3.cdn.digitaloceanspaces.com/review/Chevrolet-Silverado-2003-Christopher-Narog-5.webp',
    review_video_url: '',
    rating_stars: '5',
    duration: '',
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
