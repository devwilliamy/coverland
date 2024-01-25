'use client';

import { TReviewData } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import React, { RefObject, useRef, useState } from 'react';
import { useCartContext } from '@/providers/CartProvider';
import { useMediaQuery } from '@mantine/hooks';
import dynamicImport from 'next/dynamic';
import { TCartItems } from '@/lib/cart/useCart';
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

type TCarCoverPathParams = {
  make: string;
  model: string;
  year: string;
};

export function CarCoverSelector({
  params,
  modelData,
  generationFk,
  submodelParam,
  secondSubmodelParam,
  reviewData,
}: {
  params: TCarCoverPathParams;
  modelData: TCarCoverData[];
  generationFk: number;
  submodelParam?: string | null | undefined;
  secondSubmodelParam?: string | null | undefined;
  reviewData: TReviewData[] | null | undefined;
}) {
  const submodels = Array.from(
    new Set(modelData.map((model) => model.submodel1))
  ).filter((submodel) => submodel);
  const secondSubmodels = Array.from(
    new Set(modelData.map((model) => model.submodel2))
  ).filter((submodel) => submodel);

  const hasSubmodels = modelData.some((model) => model.submodel1);
  const hasSecondSubModels = modelData.some((model) => model.submodel2);
  const defaultGenerationModel = modelData.find(
    (model) => model.fk === generationFk
  );

  const isDefaultGeneration = hasSubmodels && !submodelParam;
  const defaultModel = isDefaultGeneration
    ? defaultGenerationModel ?? modelData[0]
    : modelData[0];
  const isReadyForProductSelection =
    (params?.year && !hasSubmodels) ||
    (hasSubmodels === !!submodelParam &&
      hasSecondSubModels === !!secondSubmodelParam);

  const [selectedProduct, setSelectedProduct] =
    useState<TCarCoverData>(defaultModel);

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

  const modelsToDisplay = isDefaultGeneration
    ? modelData.filter((model) => model.fk === generationFk)
    : modelData;

  const uniqueColors = Array.from(
    new Set(modelsToDisplay.map((model) => model.display_color))
  ).map((color) =>
    modelsToDisplay.find((model) => model.display_color === color)
  );

  const uniqueTypes = Array.from(
    new Set(modelsToDisplay.map((model) => model.display_id))
  ).map((type) => modelsToDisplay.find((model) => model.display_id === type));

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    return addToCart({ ...selectedProduct, quantity: 1 } as TCartItems);
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

  const fullProductName = `${selectedProduct?.year_generation}
  ${selectedProduct?.make} ${selectedProduct?.product_name} 
  ${submodelParam ? selectedProduct?.submodel1 : ''}
  ${secondSubmodelParam ? selectedProduct?.submodel2 : ''}
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
          <EditVehicleModal
            selectedProduct={selectedProduct}
            submodelParam={submodelParam}
          />
          <p className="ml-3 mt-2 text-lg font-black text-[#1A1A1A] ">
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
          />

          <Separator className="mb-8 mt-4" />
          <ProductContent
            selectedProduct={selectedProduct}
            reviewCount={reviewCount}
            avgReviewScore={avgReviewScore}
            reviewData={reviewData}
            modelData={modelData as TCarCoverData[]}
            submodels={submodels as string[]}
            secondSubmodels={secondSubmodels as string[]}
            handleAddToCart={handleAddToCart}
            isReadyForProductSelection={isReadyForProductSelection}
          />
        </div>
      </div>
    </section>
  );
}

export default CarCoverSelector;
