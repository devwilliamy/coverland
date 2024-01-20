import Image from 'next/image';

export function SelectedProductImages({
  productImages,
  setFeaturedImage,
}: {
  productImages: string[];
  setFeaturedImage: (img: string) => void;
}) {
  return (
    <div className="hidden w-auto grid-cols-2 gap-[16px] pt-4 lg:grid ">
      {productImages.map((img, idx) => (
        <div
          className="h-auto w-full rounded-xl border-transparent bg-[#F2F2F2] p-3.5 md:h-[350px]"
          key={img}
        >
          <Image
            key={idx}
            src={img}
            width={200}
            height={200}
            alt="car cover details"
            className={`// selectedProduct.product?.includes(img) // ? 
              'border-4 rounded-lg'
              //   : '' h-full w-full
              cursor-pointer   border-red-600 object-contain
            `}
            onClick={() => setFeaturedImage(img)}
            onError={() => console.log('Failed image:', `${img}`)}
          />
        </div>
      ))}
    </div>
  );
}
