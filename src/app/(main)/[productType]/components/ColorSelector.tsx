import Image from 'next/image';
import { CarSelectionContext } from './CarPDP';
import { Ref, RefObject, useContext } from 'react';
import { useStore } from 'zustand';
import { IProductData } from '../../utils';

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
  uniqueColors: IProductData[];
  productRefs: React.MutableRefObject<ProductRefs>;
  setFeaturedImage: (img: string) => void;
  setSelectedProduct: (product: IProductData) => void;
  selectedProduct: IProductData;
}) {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  const setSelectedColor = useStore(store, (s) => s.setSelectedColor);

  return (
    <>
      <p className="ml-3 mt-2 text-lg font-black text-[#1A1A1A] ">
        Cover Colors
        <span className="ml-2 text-lg font-normal text-[#767676]">
          {selectedProduct?.display_color}
        </span>
      </p>
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
                src={sku?.mainImage as string}
                ref={productRefs?.current[sku?.sku] as Ref<HTMLImageElement>}
                width={98}
                height={98}
                onError={() => console.log('Failed image:', `${sku?.feature}`)}
                alt="car cover details"
                className="h-20 w-20 cursor-pointer rounded bg-[#F2F2F2] lg:h-full lg:w-full"
                onClick={() => {
                  setFeaturedImage(sku?.mainImage as string);
                  setSelectedColor(sku?.display_color as string);
                  setSelectedProduct(sku as IProductData);
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
    </>
  );
}
