// ReviewHeaderGallery.tsx
'use client';
import { useMemo } from 'react';
import { useStore } from 'zustand';
import useStoreContext from '@/hooks/useStoreContext';
import ReviewCardCarousel from './ReviewCardCarousel';
import ReviewHeaderGalleryMobile from './ReviewHeaderGalleryMobile';
import ReviewHeaderGalleryDesktop from './ReviewHeaderGalleryDesktop';
import { useMediaQuery } from '@mantine/hooks';

export default function ReviewHeaderGallery() {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');

  const reviewImages = useStore(store, (s) => s.reviewImages);
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
        <ReviewHeaderGalleryDesktop reviewImages={reviewImages} />
      ) : (
        <ReviewHeaderGalleryMobile reviewImages={reviewImages} />
      )}
      {reviewImages && (
        <div className="flex items-center justify-center py-[10px] text-[14px] font-[400] normal-case leading-[24px] text-[#767676] lg:pb-[14px]">
          {imageCount} Review Images
        </div>
      )}
    </div>
  );
}
