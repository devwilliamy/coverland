import { X } from 'lucide-react';
import { DialogContent } from '@/components/ui/dialog';
import useStoreContext from '@/hooks/useStoreContext';
import ReviewImageCarousel from './ReviewImageCarousel';
import { ReviewMedia } from '@/lib/types/review';

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
      className={`flex min-w-[100vw] flex-col items-center justify-center rounded-lg md:min-w-[50vw] md:pt-12 ${rowType === 'video' ? 'aspect-[9/16]' : 'aspect-square '}`}
    >
      <div className="absolute right-[1px] top-[0] mr-[5px] mt-[10px] flex rounded-full bg-[#F0F0F099] p-1.5">
        <X className="stroke-[3px]" onClick={onClose} />
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
