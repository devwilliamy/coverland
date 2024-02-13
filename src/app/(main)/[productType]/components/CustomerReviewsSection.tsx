import Image from 'next/image';
import CustomerReviewSheet from '@/components/PDP/components/CustomerReviewSheet';
import { useStore } from 'zustand';
import { CarSelectionContext } from './CarPDP';
import { useContext } from 'react';
import { FaCamera } from 'react-icons/fa';

const CustomerReviewsSection = () => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewImages = useStore(store, (s) => s.reviewImages);
  return (
    <div>
      <CustomerReviewSheet>
        <FaCamera
          color={'#3C3C3C'}
          className="flex min-h-[24px] min-w-[27px]"
        />
        <div className="text-[#0C87B8]">Customer Images</div>
      </CustomerReviewSheet>
      <span className="mb-[32px] flex w-full gap-[7px] overflow-x-auto">
        {reviewImages.map((images, index) => (
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

export default CustomerReviewsSection;
