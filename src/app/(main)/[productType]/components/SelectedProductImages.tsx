'use client';
import ReviewImageGalleryDesktop from '@/components/PDP/components/ReviewImageGalleryDesktop';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { useContext, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useStore } from 'zustand';
import { Button } from '@/components/ui/button';
import CustomerImagesProductImage from './CustomerImagesProductImage';

export default function SelectedProductImages() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const productImages = selectedProduct?.productImages as string[];
  const [showMore, setShowMore] = useState(false);
  const setFeaturedImage = useStore(store, (s) => s.setFeaturedImage);
  const fourImages = productImages?.slice(0, 4);

  return (
    <div
      className={`hidden w-auto ${showMore ? 'grid-rows-2' : ''} grid-cols-2 gap-[16px] pt-4 lg:grid `}
    >
      {showMore === false ? (
        <>
          {fourImages?.map((img, idx) => (
            <CustomerImagesProductImage
              key={`product-image-${idx}`}
              img={img}
              idx={idx}
              setFeaturedImage={setFeaturedImage}
            />
          ))}
        </>
      ) : (
        <>
          {productImages?.map((img, idx) => (
            <CustomerImagesProductImage
              key={`product-image-${idx}`}
              img={img}
              idx={idx}
              setFeaturedImage={setFeaturedImage}
            />
          ))}
          <MoreImages key={`show-more`} />
        </>
      )}
      <Button
        className="mx-auto mt-9 hidden h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white lg:block"
        onClick={() => setShowMore((p) => !p)}
      >
        {showMore ? 'show less images' : 'show more images'}
      </Button>
    </div>
  );
}

const MoreImages = () => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

  return (
    <div className="flex h-auto w-full items-center justify-center rounded-xl border-transparent bg-[#F2F2F2] p-3.5 md:h-[350px]">
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogTrigger>
          <div className="whitespace-nowrap pb-[28px] text-[20px] font-black ">
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
        <DialogContent className="flex min-h-[65vh] flex-col items-center lg:max-h-[80vh] lg:min-w-[77vw] lg:max-w-[80%]">
          <ReviewImageGalleryDesktop
            setReviewDialogOpen={setReviewDialogOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
