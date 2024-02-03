import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMediaQuery } from '@mantine/hooks';
import { track } from '@vercel/analytics/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function AddToCart({
  isReadyForProductSelection,
  selectedProduct,
  router,
  handleAddToCart,
}: {
  selectedProduct: any;
  isReadyForProductSelection: any;
  router: AppRouterInstance;
  handleAddToCart: () => void;
}) {
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="mt-[34px]">
      {!isReadyForProductSelection || !selectedProduct ? (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-xl">
                Add To Cart
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="">
                <p>Please finish your selection</p>
              </div>
            </PopoverContent>
          </Popover>
        </>
      ) : (
        <Button
          className="h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-xl"
          onClick={() => {
            selectedProduct?.sku &&
              track('PDP_add_to_cart', {
                sku: selectedProduct?.sku,
              });
            handleAddToCart();
            isMobile ? router.push('/checkout') : setAddToCartOpen(true);

            // setAddToCartOpen(true);
          }}
        >
          Add To Cart
        </Button>
      )}
    </div>
  );
}
