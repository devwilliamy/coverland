'use client';

import { RefObject } from 'react';
import Image from 'next/image';
import { IProductData } from '@/utils';

interface ProductRefs {
  [key: string]: RefObject<HTMLElement>;
}

export function TypeSelector({
  uniqueTypes,
  setFeaturedImage,
  setSelectedProduct,
  selectedProduct,
  productRefs,
}: {
  uniqueTypes: IProductData[];
  setFeaturedImage: (img: string) => void;
  setSelectedProduct: (product: IProductData) => void;
  selectedProduct: IProductData;
  productRefs: React.MutableRefObject<ProductRefs>;
}) {
  return (
    <>
      <div>
        <p className="ml-3 text-lg font-black text-[#1A1A1A]">
          Cover Types
          <span className="ml-2 text-lg font-normal text-[#767676]">
            {selectedProduct?.display_id}
          </span>
        </p>
      </div>
      {/* Cover Types Section */}
      <div className="flex flex-row space-x-1 overflow-x-auto whitespace-nowrap p-2 lg:grid lg:w-auto lg:grid-cols-5 lg:gap-[7px] lg:px-3">
        {uniqueTypes.map((sku) => {
          return (
            <button
              className={`flex-shrink-0 p-1 lg:flex lg:flex-col lg:items-center lg:justify-center ${
                sku?.display_id === selectedProduct?.display_id
                  ? 'rounded-lg border-4 border-[#6F6F6F]'
                  : ''
              }`}
              key={sku?.sku}
              onClick={() => {
                setFeaturedImage(sku?.mainImage as string);
                setSelectedProduct(sku as IProductData);
                const skuRef = sku?.sku
                  ? (productRefs?.current[
                      sku?.sku
                    ] as React.RefObject<HTMLElement>)
                  : null;
                skuRef?.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                });
              }}
              // disabled={isOptionDisabled(productOption, 'cover')}
            >
              <Image
                src={sku?.mainImage as string}
                width={98}
                height={98}
                onError={() => console.log('Failed image:', `${sku?.feature}`)}
                alt="car cover details"
                className="h-20 w-20 cursor-pointer rounded bg-[#F2F2F2] lg:h-full lg:w-full"
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
