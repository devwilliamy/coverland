import CustomerReviewTabs from '@/components/PDP/components/CustomerReviewTabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';

export function SelectedProductImages({
  productImages,
  setFeaturedImage,
  showMore,
}: {
  showMore: boolean;
  productImages: string[];
  setFeaturedImage: (img: string) => void;
}) {
  const fourImages = productImages.slice(0, 3);

  return (
    <div
      className={`hidden w-auto ${showMore ? 'grid-rows-2' : ''} grid-cols-2 gap-[16px] pt-4 lg:grid `}
    >
      {showMore === false ? (
        <>
          {fourImages.map((img, idx) => (
            <ProductImage
              key={`product-image-${idx}`}
              img={img}
              idx={idx}
              setFeaturedImage={setFeaturedImage}
            />
          ))}
          <MoreImages key={`show-more`} />
        </>
      ) : (
        <>
          {productImages.map((img, idx) => (
            <ProductImage
              key={`product-image-${idx}`}
              img={img}
              idx={idx}
              setFeaturedImage={setFeaturedImage}
            />
          ))}
          <MoreImages key={`show-more`} />
        </>
      )}
    </div>
  );
}

const ProductImage = ({
  img,
  idx,
  setFeaturedImage,
}: {
  img: string;
  idx: number;
  setFeaturedImage: (img: string) => void;
}) => (
  <div
    className="h-auto w-full rounded-xl border-transparent bg-[#F2F2F2] p-2"
    key={img}
  >
    <Image
      key={idx}
      src={img}
      width={200}
      height={200}
      alt="car cover details"
      className={`rounded-lg' h-full w-full object-contain `}
      onClick={() => setFeaturedImage(img)}
      onError={() => console.log('Failed image:', `${img}`)}
    />
  </div>
);

const MoreImages = () => (
  <div className="flex h-auto w-full items-center justify-center rounded-xl border-transparent bg-[#F2F2F2] p-3.5 md:h-[350px]">
    <Dialog>
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
      <DialogContent className="flex min-h-[65vh] flex-col items-center lg:min-w-[77vw] lg:max-w-[80%]">
        <CustomerReviewTabs />
      </DialogContent>
    </Dialog>
  </div>
);
