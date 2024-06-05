'use client';
import { Separator } from '@/components/ui/separator';
import { Rating } from '@mui/material';
import { useState } from 'react';
import { AccessoryItem, useCartContext } from '@/providers/CartProvider';
import { Button } from '@/components/ui/button';
import CartSheet from '@/components/cart/CartSheet';

export const ProductHero = ({
  isComplete, product,
}: {
  isComplete: boolean;
  product: AccessoryItem;
}) => {
  const { addToCart } = useCartContext();
  const [addToCartOpen, setAddToCartOpen] = useState(false);
  const handleAddToCart = () => {
    addToCart({
      ...product,
      type: 'Accessories',
      feature: product.images.split(',')[0],
      price: product.msrp,
      quantity: 1,
    });
    setAddToCartOpen(true);
  };

  return (
    <div className="relative flex h-full w-full flex-col ">
      <div className="sticky top-[20px] flex w-full flex-col gap-4 ">
        <h1 className="text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:text-[28px] lg:leading-[30px] ">
          {product?.title}
        </h1>
        <p
          className={`${isComplete && 'hidden'} mb-3 text-[16px] leading-[14px]`}
        >
          From
        </p>
        <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
          <div className="leading-[20px]">
            ${isComplete ? product?.msrp : '19.99'}
          </div>
          {/* {selectedProduct?.price && (
              <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
                <span className=" text-[#BEBEBE] line-through">
                  ${isComplete ? `${Number(selectedProduct?.price)}` : defaultPrice}
                </span>
                <p>(-50%)</p>
              </div>
            )} */}
        </div>
        <div className="flex flex-col gap-0.5">
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
            }} />
          {/* <ReviewsTextTrigger /> */}
        </div>
        <section className="flex flex-col">
          <div className="mt-1 flex items-center gap-2 ">
            {product && product?.msrp && (
              <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
                4 interest-free installments of{' '}
                <b className="font-[400] text-black">
                  ${(Number(product?.msrp) / 4 - 0.01).toFixed(2)}
                </b>
              </p>
            )}
            {/* <Image alt="paypal-installents" src={installments} /> */}
            {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
          </div>
        </section>
        <Separator />
        {/* <section className="flex flex-col gap-4 px-2 max-md:px-4 ">
              {product?.description?.map((text) => (
                <ul className="list-inside list-disc">
                  <li className="list-item">{text}</li>
                </ul>
              ))}
            </section> */}
        <Button
          className=" flex h-[48px] w-full cursor-pointer items-center justify-center rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] lg:h-[62px]"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        {/* <AddToCart
            selectedProduct={selectedProduct}
            handleAddToCart={handleAddToCart}
            searchParams={searchParams}
          /> */}
        <CartSheet
          open={addToCartOpen}
          setOpen={setAddToCartOpen}
          selectedProduct={product} />
      </div>
    </div>
  );
};
