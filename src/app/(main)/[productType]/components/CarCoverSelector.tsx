'use client';

import React, { RefObject, useContext, useRef, useState } from 'react';
import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ProductContent } from './ProductContent';
import { EditVehicleModal } from './EditVehicleModal';
import { CarSelectionContext } from './CarPDP';
import { useStore } from 'zustand';
import { IProductData } from '../../utils';
import { Separator } from '@/components/ui/separator';
import LinkBreadcrumbs from './LinkBreadcrumbs';
import { useItemViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';

import EnhancedProtectionSection from '@/components/PDP/components/EnhancedProtectionSection';
import SuggestedProducts from '@/components/PDP/components/SuggestedProducts';
import ProvenSection from '@/components/PDP/components/ProvenSection';
import RealTestSection from '@/components/PDP/components/RealTestSection';
import WarrantySection from '@/components/PDP/components/WarrantySection';
import FeaturesSection from '@/components/PDP/components/FeaturesSection';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import { useParams } from 'next/navigation';
import EditVehiclePopover from '@/components/PDP/components/EditVehiclePopover';
import SeeAllChevronDown from '@/components/PDP/components/icons/SeeAllChevronDown';
import SuvIcon from '@/components/PDP/components/icons/SuvIcon';
import TruckIcon from '@/components/PDP/components/icons/TruckIcon';
import CarIcon from '@/components/PDP/components/icons/CarIcon';

export function CarCoverSelector({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
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

  const uniqueColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));

  const productImages = selectedProduct?.productImages as string[];

  useItemViewedGoogleTag(selectedProduct);

  const params = useParams();
  const productType = params?.productType;
  const coverType = params?.coverType;
  const isPremiumPlus = params?.coverType === 'premium-plus';
  const isDefaultCoverType = isPremiumPlus || coverType === undefined;
  const isTruckCover = productType === 'truck-covers';
  const isSUVCover = productType === 'suv-covers';

  const [seeAllVisible, setSeeAllVisible] = useState(true);

  return (
    <>
      <section className="relative mx-auto h-max w-full max-w-[1280px]  lg:my-8">
        <LinkBreadcrumbs />
        <div className="flex w-full flex-col items-start justify-between px-4 lg:flex-row lg:gap-14">
          {/* Left Panel */}
          <PrimaryImageDisplay
            productImages={productImages}
            selectedProduct={selectedProduct}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
          />
          {/* Right Panel */}
          <section className=" h-full w-full pl-0 lg:sticky lg:top-8 lg:w-2/5">
            <Separator className="w-full bg-[#C8C7C7] lg:block" />
            <div className="grid grid-cols-[1fr_2fr] place-items-center ">
              <div className="flex max-h-[24px] max-w-[64px]  items-center justify-center lg:max-h-[42px] lg:max-w-[116px]">
                <div
                  className={` ${!isTruckCover && !isSUVCover ? 'flex' : 'hidden'}`}
                >
                  <CarIcon />
                </div>
                <div className={` ${isTruckCover ? 'flex' : 'hidden'}`}>
                  <TruckIcon />
                </div>
                <div className={` ${isSUVCover ? 'flex' : 'hidden'}`}>
                  <SuvIcon />
                </div>
              </div>
              <EditVehicleModal
                selectedProduct={selectedProduct}
                searchParams={searchParams}
              />
              <EditVehiclePopover
                selectedProduct={selectedProduct}
                searchParams={searchParams}
              />
            </div>
            <Separator className="w-full bg-[#C8C7C7]" />
            <ProductContent
              modelData={modelData}
              productRefs={productRefs}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              setFeaturedImage={setFeaturedImage}
              uniqueColors={uniqueColors as IProductData[]}
              searchParams={searchParams}
            />
          </section>
          {/* {isMobile && ( */}
        </div>
        <section
          className={`relative ${seeAllVisible ? 'max-h-[2050px] lg:max-h-[2900px]' : ''} w-full overflow-hidden`}
          // className="relative max-h-[550vw] w-full overflow-hidden lg:max-h-[240vh]"
        >
          <FeaturesSection />
          <div
            className={`absolute ${seeAllVisible ? '' : 'hidden'} -bottom-[1px] z-[5] w-full bg-gradient-to-t from-white from-85%`}
          >
            <div className="flex  flex-col items-center justify-center pt-[10vh]">
              <p
                onClick={() => setSeeAllVisible(false)}
                className=" cursor-pointer py-[10px] text-[16px] leading-[19px] lg:text-[20px] lg:leading-[24px]"
              >
                See All
              </p>
              <div className="flex max-h-[15px] max-w-[40px]">
                <SeeAllChevronDown />
              </div>
            </div>
            <SuggestedProducts />
          </div>
        </section>
        <section className={`${seeAllVisible ? 'hidden' : 'block'}`}>
          <span className="max-w-[100vw] bg-white">
            <div className="flex w-full flex-col justify-center px-4">
              <EnhancedProtectionSection />
              {isDefaultCoverType && <RealTestSection />}
              {isDefaultCoverType && <ProvenSection />}
              <WarrantySection />
            </div>
            <SuggestedProducts />
          </span>
        </section>
        <ExtraProductDetails />
      </section>
    </>
  );
}

export default CarCoverSelector;
