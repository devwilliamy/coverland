'use client';
import { Separator } from '@/components/ui/separator';
import { TInitialProductDataDB } from '@/lib/db';
import { Rating } from '@mui/material';
import { CarSelectionContext } from './CarPDP';
import { useMediaQuery } from '@mantine/hooks';
import { RefObject, Suspense, useContext, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import { compareRawStrings } from '@/lib/utils';

import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import {
  IProductData,
  TPathParams,
  getCompleteSelectionData,
} from '../../utils';
import FreeDetails from './FreeDetails';
import AddToCart from './AddToCart';
import CircleColorSelector from './CircleColorSelector';
import RatingsTrigger from './RatingsTrigger';
import installments from '@/images/PDP/Product-Details-Redesign-2/paypal-installments.webp';
import Image from 'next/image';
import { handleViewItemColorChangeGoogleTag } from '@/hooks/useGoogleTagDataLayer';
import { useParams } from 'next/navigation';

interface ProductRefs {
  [key: string]: RefObject<HTMLElement>;
}

export function ProductContent({
  selectedProduct,
  setSelectedProduct,
  setFeaturedImage,
  productRefs,
  uniqueColors,
  searchParams,
}: {
  selectedProduct: IProductData;
  setSelectedProduct: (newProduct: IProductData) => void;
  productRefs: React.MutableRefObject<ProductRefs>;
  uniqueColors?: IProductData[];
  modelData: TInitialProductDataDB[];
  setFeaturedImage: (img: string) => void;
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  const productType = compareRawStrings(selectedProduct?.type, 'car covers')
    ? 'Car Cover'
    : compareRawStrings(selectedProduct?.type, 'SUV Covers')
      ? 'SUV Cover'
      : 'Truck Cover';
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const color = useStore(store, (s) => s.selectedColor);
  const { addToCart } = useCartContext();
  const params = useParams<TPathParams>();
  const paramsProductType = params?.productType;
  const coverType = params?.coverType;
  const isDefaultCoverType =
    params?.coverType === 'premium-plus' || params?.coverType === undefined;
  const isPremiumType = isDefaultCoverType || params?.coverType === 'premium';

  const cartProduct = modelData.find((p) => p.display_color === color);
  console.log('Model Data: ', modelData);
  console.log('Selected Product: ', selectedProduct);

  let installmentPrice: number;
  switch (coverType) {
    case 'premium':
      installmentPrice = 29.99;
      break;
    case 'standard-pro':
      installmentPrice = 25;
      break;
    case 'standard':
      installmentPrice = 20;
      break;
    default:
      installmentPrice = 39.99;
      break;
  }

  let defaultMSRP: number;
  let defaultPrice: number;

  switch (true) {
    case paramsProductType === 'suv-covers' && !coverType:
      defaultMSRP = 179.95;
      defaultPrice = 360;
      break;
    case paramsProductType === 'truck-covers' && !coverType:
      defaultMSRP = 199.95;
      defaultPrice = 400;
      break;
    default:
      defaultMSRP = 159.95;
      defaultPrice = 320;
      break;
  }

  const handleAddToCart = () => {
    if (!cartProduct) return;
    !isMobile && setAddToCartOpen(true);
    return addToCart({ ...cartProduct, quantity: 1 });
  };

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const handleColorChange = (newSelectedProduct: IProductData) => {
    handleViewItemColorChangeGoogleTag(newSelectedProduct, params, isComplete);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:mt-[60px]">
        <div className="flex flex-col gap-0.5">
          {/* Product Title */}
          <h1 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:mt-0 lg:text-[28px] lg:leading-[30px] ">
            {`${selectedProduct?.display_id} `}
            {isDefaultCoverType && (
              <>
                &trade;
                <br />
              </>
            )}
            {isPremiumType
              ? `Custom-Fit ${productType}`
              : `Semi-Custom ${productType}`}
          </h1>
          {/* Rating(s) */}
          <div className="-ml-0.5 mt-1 flex items-end gap-1 lg:mt-2">
            <div className="flex gap-1 ">
              <Rating
                name="read-only"
                value={5}
                readOnly
                style={{
                  height: '25px',
                  color: '#BE1B1B',
                }}
              />
            </div>
            <RatingsTrigger />
          </div>
        </div>
      </div>
      <section className="flex flex-col pt-[28px] ">
        <p className="mb-3 text-[16px] leading-[14px]">
          {isComplete ? '' : 'From'}
        </p>
        <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
          <div className="leading-[20px]">
            ${isComplete ? `${Number(selectedProduct?.msrp)}` : defaultMSRP}
          </div>
          {selectedProduct?.price && (
            <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
              <span className=" text-[#BEBEBE] line-through">
                $
                {isComplete
                  ? `${Number(selectedProduct?.price)}`
                  : defaultPrice}
              </span>
              <p>(-50%)</p>
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 ">
          <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
            4 interest-free installments of{' '}
            <b className="font-[400] text-black">${installmentPrice}</b>
          </p>
          <Image alt="paypal-installents" src={installments} />
          {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
        </div>
      </section>
      <CircleColorSelector
        uniqueColors={uniqueColors as IProductData[]}
        productRefs={productRefs}
        setFeaturedImage={setFeaturedImage}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct as IProductData}
        handleColorChange={handleColorChange}
      />
      <div className="lg:hidden">
        <AddToCart
          selectedProduct={selectedProduct}
          handleAddToCart={handleAddToCart}
          searchParams={searchParams}
          isSticky
        />
      </div>
      <Separator className="mt-[36px] " />
      <Suspense>
        <FreeDetails />
      </Suspense>
      <AddToCart
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
        searchParams={searchParams}
      />
      <CartSheet
        open={addToCartOpen}
        setOpen={setAddToCartOpen}
        selectedProduct={selectedProduct}
      />
    </>
  );
}
