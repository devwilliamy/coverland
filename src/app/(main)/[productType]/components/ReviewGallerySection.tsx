import Image from 'next/image';
import CustomerReviewSheet from '@/components/PDP/components/CustomerReviewSheet';
import { useStore } from 'zustand';
import { CarSelectionContext } from './CarPDP';
import { useContext } from 'react';
import { FaCamera } from 'react-icons/fa';

const ReviewGallerySection = () => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewImages = useStore(store, (s) => s.reviewImages);
  const reviewImageKeys = Object.keys(reviewImages);
  return (
    <div>
      <CustomerReviewSheet>
        <FaCamera color={'white'} className="flex min-h-[24px] min-w-[27px]" />
        <div className="text-white underline">Customer Images</div>
      </CustomerReviewSheet>
      <span className="no-scrollbar mb-[32px] flex w-full gap-[7px] overflow-x-auto">
        {reviewImageKeys.map((images, index) => (
          <div key={`scrollable-item-${index}`} className="flex">
            <Image
              src={images}
              width={128}
              height={128}
              className="flex max-h-[128px] min-h-[128px] min-w-[128px] max-w-[128px] rounded-[4px] object-cover"
              alt=""
            />
          </div>
        ))}
      </span>
    </div>
  );
};

export default ReviewGallerySection;
