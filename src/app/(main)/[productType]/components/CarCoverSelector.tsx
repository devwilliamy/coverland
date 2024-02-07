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

  const isMobile = useMediaQuery('(max-width: 768px)');

  const uniqueColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));

  const productImages =
    selectedProduct?.product
      ?.split(',')
      .filter((img) => img !== featuredImage) ?? [];

  const productName = modelData[0].fullProductName;

  return (
    <>
      <section className="mx-auto h-auto w-full max-w-[1280px] px-4 lg:my-8">
        <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:gap-14">
          {isMobile && <EditVehiclePopover fullProductName={productName} />}
          {/* Left Panel */}
          <PrimaryImageDisplay
            productImages={productImages}
            selectedProduct={selectedProduct}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
          />
          {/* Right Panel */}

          <div className=" h-auto w-full pl-0 lg:w-2/5">
            <EditVehicleModal selectedProduct={selectedProduct} />
            {/* <ColorSelector
            uniqueColors={uniqueColors as IProductData[]}
            productRefs={productRefs}
            setFeaturedImage={setFeaturedImage}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
          <Separator className="my-4" />
          <TypeSelector
            uniqueTypes={uniqueTypes as IProductData[]}
            setFeaturedImage={setFeaturedImage}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            productRefs={productRefs}
          />
          <Separator className="mb-8 mt-4 lg:mb-10" /> */}
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
      <div
        id="product-details"
        className="h-auto w-full"
        // flex flex-col justify-center items-center max-w-[1280px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails />
      </div>
    </>
  );
}

export default CarCoverSelector;
