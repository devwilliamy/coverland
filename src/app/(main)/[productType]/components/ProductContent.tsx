'use client';
import { Separator } from '@/components/ui/separator';
import { Rating } from '@mui/material';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { useMediaQuery } from '@mantine/hooks';
import { Suspense, useContext, useEffect, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import { compareRawStrings, deslugify } from '@/lib/utils';

import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import { IProductData, TQueryParams, getCompleteSelectionData } from '@/utils';
import FreeDetails from './FreeDetails';
import AddToCart from '@/components/cart/AddToCart';
import CircleColorSelector from './CircleColorSelector';
import ReviewsTextTrigger from './ReviewsTextTrigger';
import installments from '@/images/PDP/Product-Details-Redesign-2/paypal-installments.webp';
import KlarnaIcon from '@/components/icons/KlarnaIcon';
import Image from 'next/image';
import useDetermineType from '@/hooks/useDetermineType';
import ReactPlayer from 'react-player';
import { set } from 'zod';
import {
  DISCOUNT_25_LOWER_BOUND,
  DISCOUNT_25_UPPER_BOUND,
  NO_DISCOUNT_LOWER_BOUND,
  NO_DISCOUNT_UPPER_BOUND,
} from '@/lib/constants';
import { TCartItem } from '@/lib/cart/useCart';
import { handleCheckLowQuantity } from '@/lib/utils/calculations';
export function ProductContent({
  searchParams,
}: {
  searchParams: TQueryParams;
}) {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);

  const modelData = useStore(store, (s) => s.modelData);
  const color = useStore(store, (s) => s.selectedColor);
  const { addToCart } = useCartContext();
  const productType = compareRawStrings(selectedProduct?.type, 'car covers')
    ? 'Car Cover'
    : compareRawStrings(selectedProduct?.type, 'SUV Covers')
      ? 'SUV Cover'
      : 'Truck Cover';

  const {
    coverType,
    model,
    make,
    isCarCover,
    isSUVCover,
    isTruckCover,
    isPremiumPlus,
    isPremium,
    isStandardPro,
    isStandard,
    isStandardType,
    isPremiumType,
    isDefaultCoverType,
  } = useDetermineType();

  const cartProduct = modelData.find((p) => p.display_color === color);

  let defaultMSRP: number;

  const { total_reviews, average_score } = useStore(
    store,
    (s) => s.reviewDataSummary
  );

  switch (true) {
    case (isSUVCover && !coverType) || (isSUVCover && isPremiumPlus):
      defaultMSRP = 180;
      break;
    case (isTruckCover && !coverType) || (isTruckCover && isPremiumPlus):
      defaultMSRP = 200;
      break;
    case (isCarCover && isPremium) ||
      (isSUVCover && isStandardPro) ||
      (isTruckCover && isStandard):
      defaultMSRP = 120;
      break;
    case (isSUVCover && isPremium) || (isTruckCover && isStandardPro):
      defaultMSRP = 140;
      break;
    case isTruckCover && isPremium:
      defaultMSRP = 160;
      break;
    case (isCarCover && isStandardPro) || (isSUVCover && isStandard):
      defaultMSRP = 100;
      break;
    case isCarCover && isStandard:
      defaultMSRP = 80;
      break;
    default:
      defaultMSRP = 180;
      break;
  }

  const defaultPrice: number = defaultMSRP * 2;
  const priceMinus5Cents = defaultMSRP - 0.05;
  const [discountPercent, setDiscountPercent] = useState<number | null>(50);
  const [newMSRP, setNewMSRP] = useState<number | null>(0);

  useEffect(() => {
    const checkLowQuantity = async () => {
      const {
        discountPercent: incomingDiscountPercent,
        newMSRP: incomingMSRP,
      } = handleCheckLowQuantity(cartProduct as IProductData);
      setDiscountPercent(incomingDiscountPercent);
      setNewMSRP(incomingMSRP);
    };
    checkLowQuantity();
  }, [cartProduct]);

  const handleAddToCart = () => {
    if (!cartProduct) return;
    setAddToCartOpen(true);

    if (newMSRP !== 0) {
      return addToCart({ ...cartProduct, msrp: newMSRP, quantity: 1 });
    }

    return addToCart({ ...cartProduct, quantity: 1 });
  };

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const ProductTitle = () => (
    <h1 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:mt-0 lg:text-[28px] lg:leading-[30px] ">
      {!make && !model ? (
        <>Waterproof Outdoor Custom-Fit {`${productType} `}</>
      ) : (
        <>
          {make && (selectedProduct.make as string)}{' '}
          {model && (selectedProduct.model as string)} {`${productType} `}
          {' - '}
          <br />
          <>Waterproof, Outdoor, Custom-Fit</>
        </>
      )}
    </h1>
  );
  const installmentPrice = newMSRP && newMSRP !== 0 ? newMSRP : defaultMSRP;
  const getFormattedMSRP = () => {
    const num = Number(
      isComplete
        ? newMSRP
          ? newMSRP
          : `${Number(cartProduct?.msrp)}`
        : priceMinus5Cents
    );

    const formattedMSRP = String(num).includes('.5') ? num.toFixed(2) : num;
    return formattedMSRP;
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:mt-[60px]">
        <div className="flex flex-col gap-0.5">
          <ProductTitle />
          {/* Rating(s) */}
          <div className="-ml-0.5 mt-1 flex items-end gap-1 lg:mt-2">
            <div className="flex gap-1 ">
              <Rating
                name="read-only"
                value={4.5}
                precision={0.1}
                readOnly
                sx={{
                  gap: '2px',
                  '& .MuiRating-iconFilled': {
                    color: '#BE1B1B',
                  },
                  '& .MuiRating-iconEmpty': {
                    color: '#BE1B1B',
                  },
                }}
              />
            </div>
            <ReviewsTextTrigger />
          </div>
        </div>
      </div>
      <section className="flex flex-col pt-[28px] ">
        <p className="mb-3 text-[16px] leading-[14px]">
          {isComplete ? '' : 'From'}
        </p>
        <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
          <div className="leading-[20px]">${getFormattedMSRP()}</div>
          {selectedProduct?.price && discountPercent && (
            <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
              <span className=" text-[#BEBEBE] line-through">
                $
                {isComplete
                  ? `${Number(selectedProduct?.price)}`
                  : defaultPrice}
              </span>
              <p>(-{discountPercent}%)</p>
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center gap-0.5 ">
          <p className=" text-[16px] leading-[16px] text-[#767676] ">
            4 interest-free installments of{' '}
            <b className="font-[500] text-black">
              ${(installmentPrice / 4).toFixed(2)}
            </b>
          </p>
          <KlarnaIcon className="-ml-[5px] -mt-[1px] flex max-h-[35px] w-fit max-w-[65px]" />
          {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
        </div>
      </section>
      <CircleColorSelector />
      <div className="lg:hidden">
        <AddToCart
          selectedProduct={selectedProduct}
          handleAddToCart={handleAddToCart}
          searchParams={searchParams}
          isSticky
        />
      </div>
      <Suspense>
        <FreeDetails />
      </Suspense>
      <div className="lg:py-4"></div>
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
