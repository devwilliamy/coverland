'use client';

import { TReviewData } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import React, { RefObject, useRef, useState } from 'react';
import { useCartContext } from '@/providers/CartProvider';
import { useMediaQuery } from '@mantine/hooks';
import dynamicImport from 'next/dynamic';
import { TCartItem } from '@/lib/cart/useCart';
import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ColorSelector } from './ColorSelector';
import { TypeSelector } from './TypeSelector';
import { ProductContent } from './ProductContent';
import { EditVehicleModal } from './EditVehicleModal';
import { TCarCoverData } from './CarPDP';

const EditVehiclePopover = dynamicImport(
  () => import('@/components/PDP/components/EditVehiclePopover'),
  {
    ssr: false,
  }
);

export function CarCoverSelector({
  modelData,
  submodelParam,
  secondSubmodelParam,
  reviewData,
  isCompleteSelection,
  yearParam,
}: {
  modelData: TCarCoverData[];
  submodelParam?: string | null;
  secondSubmodelParam?: string | null;
  reviewData: TReviewData[] | null | undefined;
  isCompleteSelection: boolean;
  yearParam: string;
}) {
  const [selectedProduct, setSelectedProduct] = useState<TCarCoverData>(() =>
    submodelParam && modelData.some((car) => car.submodel1)
      ? modelData[0]
      : modelData.filter((car) => car.year_generation === yearParam)[0]
  );

  const [featuredImage, setFeaturedImage] = useState<string>(
    selectedProduct?.feature as string
  );

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

  const { addToCart } = useCartContext();

  const uniqueColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));

  const uniqueTypes = Array.from(
    new Set(modelData.map((model) => model.display_id))
  ).map((type) => modelData.find((model) => model.display_id === type));

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    return addToCart({ ...selectedProduct, quantity: 1 } as TCartItem);
  };

  const productImages =
    selectedProduct?.product
      ?.split(',')
      .filter((img) => img !== featuredImage) ?? [];
  const reviewScore =
    reviewData?.reduce(
      (acc, review) => acc + Number(review.rating_stars ?? 0),
      0
    ) ?? 0;
  const reviewCount = reviewData?.length ?? 50;

  const avgReviewScore = (reviewScore / reviewCount).toFixed(1) || '4.9';

  const fullProductName = `${selectedProduct?.parent_generation}
  ${selectedProduct?.make} ${selectedProduct?.product_name} 
  ${submodelParam ? selectedProduct?.submodel1 : ''}
  ${secondSubmodelParam ? selectedProduct?.submodel2 : ''} ${selectedProduct.type} 
  `;
  return (
    <section className="mx-auto h-auto w-full max-w-[1280px] px-4 lg:my-8">
      <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:gap-14">
        {isMobile && <EditVehiclePopover fullProductName={fullProductName} />}
        {/* Left Panel */}
        <PrimaryImageDisplay
          productImages={productImages}
          selectedProduct={selectedProduct}
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
        />
        {/* Right Panel */}

        <div className=" h-auto w-full pl-0 lg:w-2/5">
          {!isMobile && (
            <EditVehicleModal
              selectedProduct={selectedProduct}
              submodelParam={submodelParam}
            />
          )}
          {/* <p className="ml-3 mt-2 text-lg font-black text-[#1A1A1A] ">
            Cover Colors
            <span className="ml-2 text-lg font-normal text-[#767676]">
              {selectedProduct?.display_color}
            </span>
          </p>
          <ColorSelector
            uniqueColors={uniqueColors as TCarCoverData[]}
            productRefs={productRefs}
            setFeaturedImage={setFeaturedImage}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
          <Separator className="my-4" />
          <TypeSelector
            uniqueTypes={uniqueTypes as TCarCoverData[]}
            setFeaturedImage={setFeaturedImage}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            productRefs={productRefs}
          /> */}
          <ProductContent
            modelData={modelData}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            uniqueColors={uniqueColors}
            uniqueTypes={uniqueTypes}
            reviewCount={reviewCount}
            avgReviewScore={avgReviewScore}
            reviewData={reviewData}
            handleAddToCart={handleAddToCart}
            isReadyForProductSelection={isCompleteSelection}
          />
        </div>
      </div>
    </section>
  );
}

export default CarCoverSelector;
