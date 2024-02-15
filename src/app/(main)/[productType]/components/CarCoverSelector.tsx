'use client';

import React, { RefObject, useContext, useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import dynamicImport from 'next/dynamic';
import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ProductContent } from './ProductContent';
import { EditVehicleModal } from './EditVehicleModal';
import { CarSelectionContext } from './CarPDP';
import { useStore } from 'zustand';
import { IProductData } from '../../utils';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';

const EditVehiclePopover = dynamicImport(
  () => import('@/components/PDP/components/EditVehiclePopover'),
  {
    ssr: false,
  }
);

export function CarCoverSelector() {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const params = useParams();
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const setFeaturedImage = useStore(store, (s) => s.setFeaturedImage);
  const featuredImage = selectedProduct?.mainImage;

  interface ProductRefs {
    [key: string]: RefObject<HTMLElement>;
  }

  const productRefs = useRef<ProductRefs>(
    modelData.reduce((acc: ProductRefs, item) => {
      if (!item?.sku) return acc;
      acc[item?.sku] = React.createRef();
      return acc;
    }, {})
  );

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const uniqueColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));

  const productImages = selectedProduct?.productImages as string[];

  const productName = modelData[0]?.fullProductName;

  return (
    <>
      <section className="mx-auto h-auto w-full max-w-[1280px] px-4 lg:my-8">
        <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:gap-14">
          {/* Left Panel */}
          <PrimaryImageDisplay
            productImages={productImages}
            selectedProduct={selectedProduct}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
          />
          {/* Right Panel */}
          <div className=" h-full w-full pl-0 lg:sticky lg:top-8 lg:w-2/5">
            <Separator className="mb-4 w-full bg-[#C8C7C7] lg:block" />
            <div className="grid grid-cols-[1fr_2fr]">
              <div className="flex w-full items-center justify-center">
                <CarIcon />
              </div>
              <EditVehicleModal selectedProduct={selectedProduct} />
              {isMobile && <EditVehiclePopover fullProductName={productName} />}
            </div>
            <Separator className="w-full bg-[#C8C7C7]" />
            <ProductContent
              modelData={modelData}
              productRefs={productRefs}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              setFeaturedImage={setFeaturedImage}
              uniqueColors={uniqueColors as IProductData[]}
            />
          </div>
        </div>
      </section>
      <div id="product-details" className="h-auto w-full">
        <ExtraProductDetails />
      </div>
    </>
  );
}

export default CarCoverSelector;

function CarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="22"
      fill="none"
      viewBox="0 0 64 22"
    >
      <g fill="#3A3A3A" clipPath="url(#clip0_1308_44786)">
        <path d="M62.27 9.297c1.449.853 1.979 2.16 1.623 3.674-.286 1.217-.813 2.382-1.267 3.555-.1.255-.2.513-.363.74-.258.355-.74.596-1.194.688l-2.416.491a5.605 5.605 0 00-.408-3.617 6.16 6.16 0 00-1.471-1.962 6.927 6.927 0 00-2.183-1.322 7.492 7.492 0 00-2.674-.486 7.49 7.49 0 00-2.673.486 6.932 6.932 0 00-2.183 1.322 6.164 6.164 0 00-1.47 1.962 5.607 5.607 0 00-.12 4.534H18.635a5.606 5.606 0 00-.12-4.534 6.16 6.16 0 00-1.472-1.962 6.926 6.926 0 00-2.182-1.322 7.491 7.491 0 00-2.674-.486c-.926 0-1.825.163-2.673.486a6.935 6.935 0 00-2.183 1.322 6.162 6.162 0 00-1.471 1.962 5.606 5.606 0 00-.468 3.302l-2.93-.488a2.495 2.495 0 01-1.185-.506C.484 16.503.035 15.785.024 14.832L0 12.694v-.021c0-.405.13-.798.37-1.134.2-.28.305-.606.305-.938V8.16c0-.807.646-1.498 1.53-1.638l3.14-.496a14.497 14.497 0 003.326-.94l6.443-2.696A30.75 30.75 0 0120.98.605 31.61 31.61 0 0127.138 0c4.88 0 9.673 1.154 13.899 3.347l6.438 3.34c.188.097.764.009.99.016.384.011.767.029 1.151.05 3.24.184 6.524.391 9.639 1.28.755.215 1.505.493 2.21.834.275.133.545.277.805.43zM27.838 6.843L27.19 1.4c-13.538.544-13.192 5.443-13.192 5.443h13.841zm16.004 0S36.998 1.33 28.953 1.33l1.23 5.512h13.66z"></path>
        <path d="M12.188 12.46c-2.93 0-5.305 2.136-5.305 4.77 0 .405.056.799.162 1.175.582 2.066 2.664 3.594 5.143 3.594 2.08 0 3.878-1.074 4.749-2.638a4.36 4.36 0 00.557-2.131c0-2.634-2.375-4.77-5.306-4.77zM51.917 12.46c-2.93 0-5.305 2.136-5.305 4.77 0 .766.2 1.49.558 2.13.87 1.565 2.67 2.64 4.748 2.64 2.32 0 4.294-1.34 5.014-3.207a4.33 4.33 0 00.292-1.563c0-2.634-2.377-4.77-5.306-4.77z"></path>
      </g>
      <defs>
        <clipPath id="clip0_1308_44786">
          <path
            fill="#fff"
            d="M0 0H64V22H0z"
            transform="matrix(-1 0 0 1 64 0)"
          ></path>
        </clipPath>
      </defs>
    </svg>
  );
}
