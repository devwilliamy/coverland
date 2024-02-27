'use client';

import React, { RefObject, useContext, useRef } from 'react';
import dynamicImport from 'next/dynamic';
import { PrimaryImageDisplay } from './PrimaryImageDisplay';
import { ProductContent } from './ProductContent';
import { EditVehicleModal } from './EditVehicleModal';
import { CarSelectionContext } from './CarPDP';
import { useStore } from 'zustand';
import { IProductData } from '../../utils';
import { Separator } from '@/components/ui/separator';
import LinkBreadcrumbs from './LinkBreadcrumbs';
import { useItemViewedGoogleTag } from '@/hooks/useGoogleTagDataLayer';

import EnhanceProtectionSection from '@/components/PDP/components/EnhanceProtectionSection';
import SuggestedProducts from '@/components/PDP/components/SuggestedProducts';
import ProvenSection from '@/components/PDP/components/ProvenSection';
import RealTestSection from '@/components/PDP/components/RealTestSection';
import LifetimeSection from '@/components/PDP/components/LifetimeSection';
import FeaturesSection from '@/components/PDP/components/FeaturesSection';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import ProductVideo from '@/components/PDP/ProductVideo';
import Thumbnail from '@/video/Thumbnail.webp';
import SixMinVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';

const EditVehiclePopover = dynamicImport(
  () => import('@/components/PDP/components/EditVehiclePopover')
);

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

  const productName = modelData[0]?.fullProductName;

  useItemViewedGoogleTag(selectedProduct, productName);

  return (
    <>
      <section className="mx-auto h-max  w-full max-w-[1280px] px-4 lg:my-8">
        <LinkBreadcrumbs />
        <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:gap-14">
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
              <CarIconMobile />
              <CarIcon />
              <EditVehicleModal
                selectedProduct={selectedProduct}
                searchParams={searchParams}
              />
              <EditVehiclePopover
                fullProductName={productName}
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
      </section>
      <div className="lg:hidden">
        <ProductVideo
          src={SixMinVideo}
          imgSrc={Thumbnail}
          aspectRatio="16 / 9"
        />
      </div>
      <section className="relative">
        <FeaturesSection />
        <div className="flex w-full flex-col justify-center px-4">
          <EnhanceProtectionSection />
          <RealTestSection />
          <ProvenSection />
          <LifetimeSection />
        </div>
      </section>
      <SuggestedProducts />
      <ExtraProductDetails />
    </>
  );
}

export default CarCoverSelector;

function CarIconMobile() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="22"
      fill="none"
      viewBox="0 0 64 22"
      className="lg:hidden"
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
function CarIcon() {
  return (
    <svg
      width="88"
      height="30"
      viewBox="0 0 88 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden lg:block"
    >
      <g clipPath="url(#clip0_1317_45872)">
        <path
          d="M85.6215 12.678C87.6131 13.8414 88.3421 15.6231 87.8531 17.6876C87.4602 19.3475 86.7352 20.9356 86.1102 22.5358C85.9744 22.8837 85.8364 23.2352 85.611 23.5438C85.257 24.0283 84.5953 24.3577 83.9706 24.4833L80.6472 25.1524C80.769 24.6109 80.8296 24.0582 80.8296 23.4967C80.8296 22.3611 80.5795 21.2588 80.0867 20.22C79.6109 19.2172 78.9303 18.3173 78.0635 17.5446C77.1975 16.772 76.1873 16.1656 75.063 15.7417C73.8971 15.3018 72.6604 15.0789 71.3866 15.0789C70.1127 15.0789 68.8754 15.3018 67.7102 15.7417C66.5852 16.1659 65.5757 16.772 64.7089 17.5446C63.8429 18.3173 63.162 19.2172 62.6865 20.22C62.1937 21.2588 61.9436 22.3614 61.9436 23.4967C61.9436 24.498 62.1379 25.4734 62.5216 26.4023H25.6238C26.0076 25.4734 26.2019 24.498 26.2019 23.4967C26.2019 22.3611 25.9518 21.2588 25.459 20.22C24.9832 19.2172 24.3026 18.3173 23.4359 17.5446C22.5698 16.772 21.5596 16.1656 20.4353 15.7417C19.2694 15.3018 18.0328 15.0789 16.7589 15.0789C15.485 15.0789 14.2484 15.3018 13.0825 15.7417C11.9579 16.1659 10.948 16.772 10.0813 17.5446C9.21519 18.3173 8.53426 19.2172 8.05877 20.22C7.56601 21.2588 7.3159 22.3614 7.3159 23.4967C7.3159 23.9106 7.34907 24.3194 7.41506 24.7231L3.38669 24.0579C2.78157 23.9686 2.21638 23.729 1.75713 23.3667C0.664993 22.5048 0.0476913 21.5249 0.0328064 20.2249L-0.000366211 17.3105V17.2809C-0.000366211 16.7292 0.178673 16.1933 0.508644 15.7354C0.783791 15.3537 0.928299 14.909 0.928299 14.4553V11.1297C0.928299 10.0283 1.81601 9.08577 3.03302 8.8951L7.34908 8.21901C8.92956 7.97102 10.4671 7.5402 11.922 6.93682L20.7812 3.26099C23.3706 2.18697 26.0753 1.37149 28.8474 0.824827C31.6199 0.278462 34.4583 0 37.3147 0C44.0235 0 50.6148 1.57393 56.4254 4.5637C56.4254 4.5637 65.2782 9.11835 65.2785 9.11866C65.5367 9.2514 66.3294 9.13072 66.6387 9.14008C67.167 9.15576 67.6946 9.1796 68.2222 9.20916C72.6767 9.45897 77.1928 9.74225 81.4756 10.9536C82.514 11.2471 83.5445 11.626 84.5134 12.0909C84.8932 12.2732 85.2637 12.469 85.6215 12.6777V12.678ZM38.2776 9.33105L37.3854 1.90881C18.7702 2.65097 19.2461 9.33105 19.2461 9.33105H38.2776ZM60.2829 9.33105C60.2829 9.33105 50.8727 1.81438 39.8107 1.81438L41.5025 9.33105H60.2829Z"
          fill="#3A3A3A"
        />
        <path
          d="M16.7594 16.9941C12.73 16.9941 9.46411 19.9061 9.46411 23.4974C9.46411 24.0501 9.54127 24.5868 9.68714 25.0991C10.4872 27.9163 13.3504 30.0007 16.7594 30.0007C19.6175 30.0007 22.0911 28.536 23.2881 26.403C23.7789 25.5287 24.0547 24.5422 24.0547 23.4974C24.0547 19.9061 20.7885 16.9941 16.7594 16.9941Z"
          fill="#3A3A3A"
        />
        <path
          d="M71.3867 16.9941C67.3573 16.9941 64.0914 19.9061 64.0914 23.4974C64.0914 24.5422 64.3672 25.5287 64.8586 26.403C66.0553 28.536 68.5289 30.0007 71.387 30.0007C74.5781 30.0007 77.2913 28.174 78.2816 25.6292C78.5415 24.9609 78.6826 24.2438 78.6826 23.4971C78.6826 19.9058 75.4154 16.9941 71.3867 16.9941Z"
          fill="#3A3A3A"
        />
      </g>
      <defs>
        <clipPath id="clip0_1317_45872">
          <rect
            width="88"
            height="30"
            fill="white"
            transform="matrix(-1 0 0 1 88 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
