import Image from 'next/image';
import { TCarCoverData } from './CarPDP';
import { Ref, RefObject } from 'react';

interface ProductRefs {
  [key: string]: RefObject<HTMLElement>;
}

export function ColorSelector({
  uniqueColors,
  productRefs,
  setFeaturedImage,
  selectedProduct,
  setSelectedProduct,
}: {
  uniqueColors: TCarCoverData[];
  productRefs: React.MutableRefObject<ProductRefs>;
  setFeaturedImage: (img: string) => void;
  setSelectedProduct: (product: TCarCoverData) => void;
  selectedProduct: TCarCoverData;
}) {
  return (
    <div className="flex flex-row space-x-1 overflow-x-auto whitespace-nowrap p-2 lg:grid lg:w-auto lg:grid-cols-5 lg:gap-[7px] lg:px-3">
      {uniqueColors?.map((sku) => {
        return (
          <div
            className={`flex-shrink-0 p-1 lg:flex lg:flex-col lg:items-center lg:justify-center ${
              sku?.display_color === selectedProduct?.display_color
                ? 'rounded-lg border-4 border-[#6F6F6F]'
                : ''
            }`}
            key={sku?.sku}
          >
            <Image
              src={sku?.feature as string}
              ref={productRefs?.current[sku?.sku] as Ref<HTMLImageElement>}
              width={98}
              height={98}
              priority
              onError={() => console.log('Failed image:', `${sku?.feature}`)}
              alt="car cover details"
              className="h-20 w-20 cursor-pointer rounded bg-[#F2F2F2] lg:h-full lg:w-full"
              onClick={() => {
                setFeaturedImage(sku?.feature as string);
                setSelectedProduct(sku as TCarCoverData);
                const skuRef = sku?.sku
                  ? (productRefs?.current[
                      sku?.sku
                    ] as React.RefObject<HTMLElement>)
                  : null;
                skuRef?.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
                  inline: 'center',
                });
              }}
            />
          </div>
        );
      })}
      {/* </div> */}
    </div>
  );
}
