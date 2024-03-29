// import { Dialog } from '@/components/ui/dialog';
// import { DialogTrigger } from '@radix-ui/react-dialog';
// import { useState } from 'react';
// import { FaCamera } from 'react-icons/fa';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { useContext, useState } from 'react';
import { useStore } from 'zustand';
import Image, { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';

const SeatDesktopGallery = () => {
  const store = useContext(SeatCoverSelectionContext);
  if (!store)
    throw new Error('Missing SeatCoverSelectionContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const [showMore, setShowMore] = useState(false);
  const galleryImages = selectedProduct?.product?.split(',');
  const fourImages = selectedProduct?.product?.split(',')?.slice(0, 4);

  return (
    <>
      <div className={`hidden grid-cols-[1fr_1fr] gap-4 lg:grid`}>
        {showMore === false ? (
          <>
            {fourImages?.map((img, idx) => (
              <ProductImage
                key={`product-image-${idx}`}
                img={img}
                idx={idx}
                //   setFeaturedImage={setFeaturedImage}
              />
            ))}
            {/* <MoreImages key={`show-more`} /> */}
          </>
        ) : (
          <>
            {galleryImages?.map((img, idx) => (
              <ProductImage
                key={`product-image-${idx}`}
                img={img}
                idx={idx}
                //   setFeaturedImage={setFeaturedImage}
              />
            ))}
            {/* <MoreImages key={`show-more`} /> */}
          </>
        )}
      </div>
      <Button
        className="mx-auto mt-9 hidden h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white lg:block"
        onClick={() => setShowMore((p) => !p)}
      >
        {showMore ? 'show less images' : 'show more images'}
      </Button>
    </>
  );
};
export default SeatDesktopGallery;

const ProductImage = ({
  img,
  idx,
}: {
  img: string | StaticImageData;
  idx: number;
}) => (
  <div className=" aspect-square rounded-xl bg-[#F2F2F2] ">
    <Image
      key={idx}
      src={img}
      width={250}
      height={250}
      alt="car cover details"
      className={`flex h-full w-full rounded-lg `}
      onError={() => console.log('Failed image:', `${img}`)}
    />
  </div>
);
