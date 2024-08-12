'use client';
import { Separator } from '@/components/ui/separator';
import { Rating } from '@mui/material';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { Suspense, useContext, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import { TQueryParams, getCompleteSelectionData } from '@/utils';
import FreeDetails from './FreeDetails';
import AddToCart from '@/components/cart/AddToCart';
import CircleColorSelector from './CircleColorSelector';
import ReviewsTextTrigger from './ReviewsTextTrigger';
import KlarnaIcon from '@/components/icons/KlarnaIcon';
import ProductTitle from './ProductTitle';

export function ProductContent({
  searchParams,
}: {
  searchParams: TQueryParams;
}) {
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const modelData = useStore(store, (s) => s.modelData);
  const color = useStore(store, (s) => s.selectedColor);
  const { addToCart } = useCartContext();

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  const cartProduct = modelData.find((p) => p.display_color === color);
  const defaultMSRP = 180; // Cheapest Car Cover Price
  const defaultPrice: number = defaultMSRP * 2;

  const defaultMSRPMinus5Cents = defaultMSRP - 0.05;

  const handleAddToCart = () => {
    if (!cartProduct) return;
    setAddToCartOpen(true);
    return addToCart({ ...cartProduct, quantity: 1 });
  };

  const installmentPrice = isComplete
    ? (selectedProduct?.price ?? 0) / 8 - 0.01
    : defaultPrice / 8 - 0.01;

  const displayMsrp = isComplete
    ? selectedProduct?.msrp
    : defaultMSRPMinus5Cents;
  const displayPrice = isComplete ? selectedProduct?.price : defaultPrice;

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
          <div className="leading-[20px]">${displayMsrp}</div>
          {displayPrice && (
            <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
              <span className=" text-[#BEBEBE] line-through">
                ${displayPrice}
              </span>
              <p>(-50%)</p>
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center gap-0.5 ">
          <p className=" text-[16px] leading-[16px] text-[#767676] ">
            4 interest-free installments of{' '}
            <b className="font-[500] text-black">
              ${installmentPrice.toFixed(2)}
            </b>
          </p>
          <KlarnaIcon className="-ml-[5px] -mt-[1px] flex max-h-[35px] w-fit max-w-[65px]" />
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
      {/* <Separator className="mt-[36px]" /> */}
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
