// 'use client';

import React, { RefObject, useContext, useRef, useState } from 'react';
import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ProductContent } from './ProductContent';
import EditVehiclePopover from './EditVehiclePopover';
// import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
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
import { ExtraProductDetails } from '@/components/PDP/ExtraProductDetails';
// import { useParams } from 'next/navigation';
import EditVehicleModal from '@/components/PDP/components/EditVehicleModal';
import SeeAllChevronDown from '@/components/PDP/components/icons/SeeAllChevronDown';
import SuvIcon from '@/components/PDP/components/icons/SuvIcon';
import TruckIcon from '@/components/PDP/components/icons/TruckIcon';
import CarIcon from '@/components/PDP/components/icons/CarIcon';
import EditVehicle from './EditVehicle';
import FeaturesAndProductsSection from './FeaturesAndProductsSection';

export function CarCoverSelector({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  console.log('SearchParams:', searchParams);
  // const store = useContext(CarSelectionContext);
  // if (!store) throw new Error('Missing CarContext.Provider in the tree');

  // const modelData = useStore(store, (s) => s.modelData);
  // const selectedProduct = useStore(store, (s) => s.selectedProduct);
  // const setSelectedProduct = useStore(store, (s) => s.setSelectedProduct);
  // const setFeaturedImage = useStore(store, (s) => s.setFeaturedImage);
  // const featuredImage = selectedProduct?.mainImage;
  // interface ProductRefs {
  //   [key: string]: RefObject<HTMLElement>;
  // }

  // const productRefs = useRef<ProductRefs>(
  //   modelData.reduce((acc: ProductRefs, item) => {
  //     if (!item?.sku) return acc;
  //     acc[item?.sku] = React.createRef();
  //     return acc;
  //   }, {})
  // );

  // const uniqueColors = Array.from(
  //   new Set(modelData.map((model) => model.display_color))
  // ).map((color) => modelData.find((model) => model.display_color === color));

  // const productImages = selectedProduct?.productImages as string[];

  // useItemViewedGoogleTag(selectedProduct);

  // const params = useParams();
  // const productType = params?.productType;
  // const coverType = params?.coverType;
  // const isPremiumPlus = params?.coverType === 'premium-plus';
  // const isDefaultCoverType = isPremiumPlus || coverType === undefined;
  // const isTruckCover = productType === 'truck-covers';
  // const isSUVCover = productType === 'suv-covers';

  // const [seeAllVisible, setSeeAllVisible] = useState(true);
  console.log(
    'CarCoverSelector Am I a server component:',
    typeof window === 'undefined'
  );

  return (
    <>
      <section className="relative mx-auto h-max w-full max-w-[1280px]  lg:my-8">
        <LinkBreadcrumbs />
        <div className="flex w-full flex-col items-start justify-between px-4 lg:flex-row lg:gap-14">
          {/* Left Panel */}
          <PrimaryImageDisplay />
          {/* Right Panel */}
          <section className=" h-full w-full pl-0 lg:sticky lg:top-8 lg:w-2/5">
            <Separator className="w-full bg-[#C8C7C7] lg:block" />
            <EditVehicle searchParams={searchParams} />
            <Separator className="w-full bg-[#C8C7C7]" />
            <ProductContent searchParams={searchParams} />
          </section>
        </div>
        <FeaturesAndProductsSection />
        <ExtraProductDetails />
      </section>
    </>
  );
}

export default CarCoverSelector;
