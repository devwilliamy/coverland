'use client';

// import { TReviewData } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import React, { RefObject, useContext, useRef } from 'react';
import { useCartContext } from '@/providers/CartProvider';
import { useMediaQuery } from '@mantine/hooks';
import dynamicImport from 'next/dynamic';
import { TCartItem } from '@/lib/cart/useCart';
import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ColorSelector } from './ColorSelector';
import { TypeSelector } from './TypeSelector';
import { ProductContent } from './ProductContent';
import { EditVehicleModal } from './EditVehicleModal';
import { CarSelectionContext } from './CarPDP';
import { useStore } from 'zustand';
import { compareRawStrings } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';
import { TInitialProductDataDB, TReviewData } from '@/lib/db';

const EditVehiclePopover = dynamicImport(
  () => import('@/components/PDP/components/EditVehiclePopover'),
  {
    ssr: false,
  }
);

export function MobileCarCoverSelector({
  reviewData,
}: {
  reviewData: TReviewData[];
}) {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  const modelData = useStore(store, (s) => s.modelData);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  const setFeaturedImage = useStore(store, (s) => s.setFeaturedImage);
  // const featuredImage = useStore(store, (s) => s.getFeaturedImage());

  const params = useParams<{
    productType: string;
    make: string;
    model: string;
    year: string;
  }>();

  const featuredImage = selectedProduct?.product?.split(',')[0];

  console.log(featuredImage);

  console.log(modelData);

  const hasSubmodels = modelData.some(
    (model) => !!model.submodel1 || !!model.submodel2
  );

  const reviewScore =
    reviewData?.reduce(
      (acc, review) => acc + Number(review.rating_stars ?? 0),
      0
    ) ?? 0;
  const reviewCount = reviewData?.length ?? 50;

  const avgReviewScore = (reviewScore / reviewCount).toFixed(1) || '4.9';

  const isCompleteSelection = hasSubmodels
    ? modelData?.every(
        (item) =>
          compareRawStrings(
            String(item.submodel1),
            String(modelData[0]?.submodel1)
          ) &&
          compareRawStrings(
            String(item.submodel2),
            String(modelData[0]?.submodel2)
          )
      )
    : modelData?.every(
        (item) =>
          compareRawStrings(
            String(item.year_generation),
            String(modelData[0]?.year_generation)
          ) &&
          compareRawStrings(String(item.model), String(modelData[0]?.model))
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

  const pathname = usePathname();

  const uniqueColors = isCompleteSelection
    ? Array.from(new Set(modelData.map((model) => model.display_color))).map(
        (color) => modelData.find((model) => model.display_color === color)
      )
    : Array.from(new Set(modelData.map((model) => model.display_color))).map(
        (color) =>
          modelData.find(
            (model) =>
              model.display_color === color &&
              model.year_generation === model.parent_generation
          )
      );

  console.log(uniqueColors);

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

  console.log('selectedProduct', selectedProduct);

  const fullProductName = `${pathname?.includes(selectedProduct?.parent_generation as string) ? selectedProduct?.parent_generation : ''}
  ${selectedProduct?.make} ${params?.model ? selectedProduct?.product_name : ''} 
  `;

  console.log(selectedProduct.product_name);
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
          <EditVehicleModal selectedProduct={selectedProduct} />
          <p className="ml-3 mt-2 text-lg font-black text-[#1A1A1A] ">
            Cover Colors
            <span className="ml-2 text-lg font-normal text-[#767676]">
              {selectedProduct?.display_color}
            </span>
          </p>
          <ColorSelector
            uniqueColors={uniqueColors as TInitialProductDataDB[]}
            productRefs={productRefs}
            setFeaturedImage={setFeaturedImage}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
          <Separator className="my-4" />
          <TypeSelector
            uniqueTypes={uniqueTypes as TInitialProductDataDB[]}
            setFeaturedImage={setFeaturedImage}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            productRefs={productRefs}
          />
          <ProductContent
            modelData={modelData}
            reviewData={reviewData}
            selectedProduct={selectedProduct}
            handleAddToCart={handleAddToCart}
            isReadyForProductSelection={isCompleteSelection}
            reviewCount={reviewCount}
            avgReviewScore={avgReviewScore}
          />
        </div>
      </div>
    </section>
  );
}

export default MobileCarCoverSelector;
