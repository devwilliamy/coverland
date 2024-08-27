import React from 'react';
import ReviewMediaRow from './ReviewMediaRow';

interface ReviewMediaSectionProps {
  title: string;
  emptyMessage: string;
  mediaItems: Array<{ review_image: string; review_video_thumbnail?: string }>;
  rowType: 'video' | 'image';
  onMediaClick: (index: number) => void;
}

export const ReviewMediaSection: React.FC<ReviewMediaSectionProps> = ({
  title,
  emptyMessage,
  mediaItems,
  rowType,
  onMediaClick,
}) => (
  <div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    {mediaItems.length > 0 ? (
      <ReviewMediaRow
        mediaItems={mediaItems}
        rowType={rowType}
        onMediaClick={onMediaClick}
      />
    ) : (
      <p className="italic text-gray-500">{emptyMessage}</p>
    )}
  </div>
);

export default ReviewMediaSection;
