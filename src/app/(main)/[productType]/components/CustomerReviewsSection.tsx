import Image from 'next/image';
import CustomerImagesDrawer from './CustomerImagesDrawer';
import ExampleCustomerImage from '@/images/PDP/product_details_01.webp';
import { SetStateAction } from 'react';

const CustomerReviewsSection = ({
  customerImagesDrawerOpen,
  setCustomerImagesDrawerOpen,
  customerImagesIndex,
  setCustomerImagesIndex,
}: {
  customerImagesDrawerOpen: boolean;
  customerImagesIndex: number;
  setCustomerImagesIndex: (value: SetStateAction<number>) => void;
  setCustomerImagesDrawerOpen: (value: SetStateAction<boolean>) => void;
}) => {
  return (
    <>
      <CustomerImagesDrawer
        customerImagesDrawerOpen={customerImagesDrawerOpen}
        setCustomerImagesDrawerOpen={setCustomerImagesDrawerOpen}
        customerImagesIndex={customerImagesIndex}
        setCustomerImagesIndex={setCustomerImagesIndex}
      />
      <span className="mb-[32px] flex w-full gap-[7px] overflow-x-auto">
        {[...Array(12)].map((_, index) => (
          <div key={`scrollable-item-${index}`} className="flex">
            <Image
              src={ExampleCustomerImage}
              className="flex max-h-[128px] min-h-[128px] min-w-[128px] max-w-[128px] rounded-[4px] object-cover"
              alt=""
            />
          </div>
        ))}
      </span>
    </>
  );
};

export default CustomerReviewsSection;
