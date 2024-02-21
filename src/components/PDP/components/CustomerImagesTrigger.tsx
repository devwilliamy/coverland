import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import React from 'react';
import { FaCamera } from 'react-icons/fa';
import ReviewImageGallery from './ReviewImageGallery';
import ReviewImagesSheet from './ReviewImagesSheet';

const CustomerImagesTrigger = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Dialog>
          <DialogTrigger>
            <div className="whitespace-nowrap pb-[28px] text-[20px] font-black">
              More Customer Images
            </div>
            <div className=" flex w-full items-center justify-center gap-[10px] rounded-[4px] border-2 border-[#C8C7C7] bg-white px-[35px] py-[11px] text-[16px] font-[700] leading-[17px] underline ">
              <FaCamera
                color={'#3C3C3C'}
                className="flex min-h-[24px] min-w-[27px]"
              />
              <p>See all photos</p>
            </div>
          </DialogTrigger>
          <DialogContent className="flex min-h-[65vh] flex-col items-center lg:min-w-[77vw] lg:max-w-[80%]">
            <ReviewImageGallery />
          </DialogContent>
        </Dialog>
      </div>
      <div className="block lg:hidden">
        <ReviewImagesSheet />
      </div>
    </>
  );
};

export default CustomerImagesTrigger;
