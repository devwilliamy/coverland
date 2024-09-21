// ReviewHeaderGallery.tsx
'use client';
import { useMemo } from 'react';
import { useStore } from 'zustand';
import useStoreContext from '@/hooks/useStoreContext';
import ReviewHeaderGalleryMobile from './ReviewHeaderGalleryMobile';
import ReviewHeaderGalleryDesktop from './ReviewHeaderGalleryDesktop';
import { useMediaQuery } from '@mantine/hooks';
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
import ReviewBaldGuySeatCoverThumbnail from '@/public/review/thumbnails/video-output-30CCCFA6-70E1-4E52-966F-2EA4DCDA1A71.webp';
import ReviewDodgeRamSeatCoverVideo from '@/videos/video-output-759A5252-5A4F-46A3-928D-54E571645DFF.mov'; // 0:56
import ReviewDodgeRamSeatCoverThumbnail from '@/public/review/thumbnails/video-output-759A5252-5A4F-46A3-928D-54E571645DFF.webp';
import useDetermineType from '@/hooks/useDetermineType';

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
    review_video_thumbnail_url: ReviewGirlGlassesSeatCoverThumbnail,
    review_video_url: ReviewGirlGlassesSeatCoverVideo,
    rating_stars: '5',
    duration: '0:46',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: ReviewHyundaiTusconSeatCoverThumbnail,
    review_video_url: ReviewHyundaiTusconSeatCoverVideo,
    rating_stars: '5',
    duration: '1:14',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: ReviewBaldGuySeatCoverThumbnail,
    review_video_url: ReviewBaldGuySeatCoverVideo,
    rating_stars: '5',
    duration: '1:01',
  },
  {
    review_image_url: '',
    review_video_thumbnail_url: ReviewDodgeRamSeatCoverThumbnail,
    review_video_url: ReviewDodgeRamSeatCoverVideo,
    rating_stars: '5',
    duration: '0:56',
  },
];

const buildReviewVideoUrlArray = (review) => {
  // Split the review_image string by commas to get an array of URLs
  const reviewImages = review.review_image
    ? review.review_image.split(',')
    : [];

  // Map over each URL and create an object in the desired structure
  return reviewImages.map((imageUrl) => ({
    review_image_url: imageUrl,
    review_video_thumbnail_url: '', // Placeholder for video thumbnail URL
    review_video_url: '', // Placeholder for video URL
    rating_stars: review.rating_stars.toString(), // Convert rating to string as in your original object
    duration: '', // Placeholder for video duration
  }));
};

const processReviewData = (reviewDataArray) => {
  // Reduce the reviewDataArray to a single array of objects
  return reviewDataArray.reduce((acc, review) => {
    const reviewVideoUrls = buildReviewVideoUrlArray(review);
    return acc.concat(reviewVideoUrls);
  }, []);
};

export default function ReviewHeaderGallery() {
  const { isSeatCover } = useDetermineType();
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const reviewImages = useStore(store, (s) => s.reviewImages);
  const videoReviews = isSeatCover ? seatCoverVideoUrl : reviewVideoUrl;
  const photoReviews = processReviewData(reviewImages);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const imageCount = useMemo(() => {
    return reviewImages.reduce((count, obj) => {
      if (obj?.review_image) {
        return count + obj.review_image.split(',').length;
      }
      return count;
    }, 0);
  }, [reviewImages]);

  if (reviewImages.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      {isDesktop ? (
        <ReviewHeaderGalleryDesktop
          videoReviews={videoReviews}
          photoReviews={photoReviews}
        />
      ) : (
        <ReviewHeaderGalleryMobile
          videoReviews={videoReviews}
          photoReviews={photoReviews}
        />
      )}
    </div>
  );
}
