// ReviewImageDialog.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { DialogContent } from '@/components/ui/dialog';
import { useStore } from 'zustand';
import useStoreContext from '@/hooks/useStoreContext';
import ReviewImageCarousel from './ReviewImageCarousel';

interface ReviewImageDialogProps {
  onClose: () => void;
  isMobile: boolean;
  initialImageIndex?: number;
}

export default function ReviewImageDialog({
  onClose,
  isMobile,
  initialImageIndex = 0,
}: ReviewImageDialogProps) {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');
  const reviewImages = useStore(store, (s) => s.reviewImages);

  const [imageLoading, setImageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);

  return (
    <DialogContent
      id="review-modal"
      className="flex aspect-square min-w-[100vw] flex-col items-center justify-center rounded-lg md:min-w-[45vw]"
    >
      <div className="absolute right-0 top-0">
        <X className="" onClick={onClose} />
      </div>
      <div className="relative flex min-h-full min-w-full">
        {imageLoading && (
          <div
            className={`flex min-h-full min-w-full animate-pulse items-center justify-center rounded-md ${isMobile ? 'bg-[#F0F0F0]/50' : 'bg-[#999999]/50'}`}
          >
            <AiOutlineLoading3Quarters
              className="animate-spin"
              fill="#BE1B1B"
              opacity={0.5}
            />
          </div>
        )}
        <ReviewImageCarousel
          reviewImages={reviewImages}
          onLoad={() => setImageLoading(false)}
          initialImageIndex={initialImageIndex}
          onImageChange={setCurrentImageIndex}
        />
      </div>
    </DialogContent>
  );
}
