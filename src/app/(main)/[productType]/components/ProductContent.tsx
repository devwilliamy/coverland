'use client';
import { Separator } from '@/components/ui/separator';
import { Rating } from '@mui/material';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { Suspense, useContext, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import { TQueryParams } from '@/utils';
import FreeDetails from './FreeDetails';
import AddToCart from '@/components/cart/AddToCart';
import CircleColorSelector from './CircleColorSelector';
import ReviewsTextTrigger from './ReviewsTextTrigger';
import ProductTitle from './ProductTitle';
import PreorderSheet from '@/components/cart/PreorderSheet';
import ProductPricing from '@/components/PDP/ProductPricing';
import YearGenerationSelector from '@/components/PDP/YearGenerationSelector';
import BodyTrimSelector from '@/components/PDP/BodyTrimSelector';

export function ProductContent({
  searchParams,
}: {
  searchParams: TQueryParams;
}) {
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
      <ProductPricing />
      <Separator className="my-[24px]" />
      <YearGenerationSelector />
      <BodyTrimSelector />
      <CircleColorSelector />
      <div className="lg:hidden">
        <AddToCart searchParams={searchParams} isSticky />
      </div>
      {/* <Separator className="mt-[36px]" /> */}
      <Suspense>
        <FreeDetails />
      </Suspense>
      <div className="lg:py-4"></div>
      <AddToCart searchParams={searchParams} />
    </>
  );
}
