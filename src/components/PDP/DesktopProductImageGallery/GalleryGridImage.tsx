import useDetermineType from '@/hooks/useDetermineType';
import Image, { StaticImageData } from 'next/image';

type GalleryGridImageProps = { img: string | StaticImageData };

export const GalleryGridImage = ({ img }: GalleryGridImageProps) => {
  const { productType } = useDetermineType();

  return (
    <div className="aspect-square rounded-xl bg-[#F2F2F2] ">
      <Image
        src={img}
        width={250}
        height={250}
        alt={`${productType}-image-grid`}
        className={`flex h-full w-full rounded-lg `}
        onError={() => console.error('Failed gallery grid image:', `${img}`)}
      />
    </div>
  );
};
