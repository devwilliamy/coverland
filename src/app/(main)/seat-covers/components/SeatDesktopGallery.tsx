// import { Dialog } from '@/components/ui/dialog';
// import { DialogTrigger } from '@radix-ui/react-dialog';
// import { useState } from 'react';
// import { FaCamera } from 'react-icons/fa';
import Image, { StaticImageData } from 'next/image';

const SeatDesktopGallery = ({
  galleryImages,
  showMore,
}: {
  galleryImages: StaticImageData[];
  showMore: boolean;
}) => {
  const fourImages = galleryImages?.slice(0, 4);

  return (
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
  );
};
export default SeatDesktopGallery;

const ProductImage = ({
  img,
  idx,
  //   setFeaturedImage,
}: {
  img: string | StaticImageData;
  idx: number;
  //   setFeaturedImage: (img: string) => void;
}) => (
  <div className=" aspect-square rounded-xl bg-[#F2F2F2] ">
    <Image
      key={idx}
      src={img}
      // width={400}
      // height={400}
      alt="car cover details"
      className={`flex h-full w-full rounded-lg `}
      //   onClick={() => setFeaturedImage(img)}
      onError={() => console.log('Failed image:', `${img}`)}
    />
  </div>
);

// const MoreImages = () => {
//   const [reviewDialogOpen, setReviewDialogOpen] = useState<boolean>(false);

//   return (
//     <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
//       <DialogTrigger>
//         <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-[#F2F2F2] px-4 ">
//           <div className="whitespace-nowrap pb-[28px] text-[20px] font-black ">
//             More Customer Images
//           </div>
//           <div className=" flex w-full items-center justify-center gap-[10px] rounded-[4px] border-2 border-[#C8C7C7] bg-white px-[35px] py-[11px] text-[16px] font-[700] leading-[17px] underline ">
//             <FaCamera
//               color={'#3C3C3C'}
//               className="flex min-h-[24px] min-w-[27px]"
//             />
//             <p className="whitespace-nowrap">See all photos</p>
//           </div>
//         </div>
//       </DialogTrigger>
//       <DialogContent className="flex min-h-[65vh] flex-col items-center lg:max-h-[80vh] lg:min-w-[77vw] lg:max-w-[80%]">
//         <ReviewImageGalleryDesktop
//               setReviewDialogOpen={setReviewDialogOpen}
//             />
//       </DialogContent>
//     </Dialog>
//   );
// };
