import React from 'react';
import ReviewMediaRow from './ReviewMediaRow';
import { ReviewMedia } from './ReviewHeaderGalleryMobile';

interface ReviewMediaSectionProps {
  title: string;
  emptyMessage: string;
  mediaItems: ReviewMedia[];
  rowType: 'video' | 'image';
  onMediaClick: (index: number, rowType: 'video' | 'image') => void;
  currentSlideIndex: number;
  setCurrentSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ReviewMediaSection: React.FC<ReviewMediaSectionProps> = ({
  title,
  emptyMessage,
  mediaItems,
  rowType,
  onMediaClick,
  currentSlideIndex,
  setCurrentSlideIndex,
}) => (
  <div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    {mediaItems.length > 0 ? (
      <ReviewMediaRow
        mediaItems={mediaItems}
        rowType={rowType}
        onMediaClick={onMediaClick}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    ) : (
      <p className="italic text-gray-500">{emptyMessage}</p>
    )}
  </div>
);

export default ReviewMediaSection;
