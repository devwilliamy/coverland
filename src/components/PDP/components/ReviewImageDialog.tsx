import { X } from 'lucide-react';
import { DialogContent } from '@/components/ui/dialog';
import useStoreContext from '@/hooks/useStoreContext';
import ReviewImageCarousel from './ReviewImageCarousel';
import { ReviewMedia } from './ReviewHeaderGalleryMobile';

interface ReviewImageDialogProps {
  onClose: () => void;
  initialImageIndex?: number;
  mediaItems: ReviewMedia[];
  rowType: 'image' | 'video';
}

export default function ReviewImageDialog({
  onClose,
  initialImageIndex = 0,
  mediaItems,
  rowType,
}: ReviewImageDialogProps) {
  const store = useStoreContext();
  if (!store) throw new Error('Missing Provider in the tree');

  return (
    <DialogContent
      id="review-modal"
      className={`flex min-w-[100vw] flex-col items-center justify-center rounded-lg md:min-w-[45vw] ${rowType === 'video' ? 'aspect-[9/16]' : 'aspect-square'}`}
    >
      <div className="absolute right-0 top-0">
        <X className="" onClick={onClose} />
      </div>
      <div className="relative flex">
        <ReviewImageCarousel
          mediaItems={mediaItems}
          rowType={rowType}
          initialImageIndex={initialImageIndex}
        />
      </div>
    </DialogContent>
  );
}
