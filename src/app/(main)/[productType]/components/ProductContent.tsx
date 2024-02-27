'use client';
import { Separator } from '@/components/ui/separator';
import { TInitialProductDataDB } from '@/lib/db';
import { Rating } from '@mui/material';
import { CarSelectionContext } from './CarPDP';
import { useMediaQuery } from '@mantine/hooks';
import { RefObject, useContext, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import { compareRawStrings } from '@/lib/utils';

import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import { IProductData, getCompleteSelectionData } from '../../utils';
import FreeDetails from './FreeDetails';
import AddToCart from './AddToCart';
import CircleColorSelector from './CircleColorSelector';
import RatingsTrigger from './RatingsTrigger';
import installments from '@/images/PDP/Product-Details-Redesign-2/paypal-installments.png';
import Image from 'next/image';
import { Info } from 'lucide-react';

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

  const cartProduct = modelData.find((p) => p.display_color === color);

  const handleAddToCart = () => {
    if (!cartProduct) return;
    setAddToCartOpen(true);
    return addToCart({ ...cartProduct, quantity: 1 });
  };

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  return (
    <>
      <div className="grid grid-cols-1 lg:mt-[60px]">
        <div className="flex flex-col gap-0.5">
          {/* Product Title */}
          <h2 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:mt-0 lg:text-[28px] lg:leading-[30px] ">
            {`${selectedProduct?.display_id}`}
            &trade; {isMobile && <br />}
            {`Custom-Fit ${productType}`}
          </h2>
          {/* Rating(s) */}
          <div className="mt-1 flex items-end gap-1 lg:mt-2">
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
      <section className="flex flex-col pt-[18px] ">
        <p className="text-[16px] leading-4"> {isComplete ? '' : 'From'}</p>
        <div className=" flex place-items-end gap-[9px]   text-center text-[28px] font-[900] leading-[32px] lg:text-[32px] lg:leading-[37.5px] ">
          <div className="flex flex-col items-end  leading-[22px]">
            {' '}
            ${selectedProduct?.msrp}
          </div>
          {selectedProduct?.price && (
            <div className="flex gap-1.5 text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
              <span className=" text-[#BEBEBE] line-through">{`$${Number(selectedProduct?.price)}`}</span>
              <p>(-50%)</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 ">
          <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
            4 interest-free installments of{' '}
            <b className="font-[400] text-black">$39.99</b>
          </p>
          <Image alt="paypal-installents" src={installments} />
          <Info className="h-[17px] w-[17px] text-[#767676]" />
        </div>
      </section>
      <CircleColorSelector
        uniqueColors={uniqueColors as IProductData[]}
        productRefs={productRefs}
        setFeaturedImage={setFeaturedImage}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct as IProductData}
      />
      <AddToCart
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
        searchParams={searchParams}
      />
      <Separator className="mt-[36px] " />
      <FreeDetails />

      {isMobile ? (
        <></>
      ) : (
        // <BottomUpDrawer
        //   title={<AddToCartHeader />}
        //   open={addToCartOpen}
        //   setOpen={setAddToCartOpen}
        //   footer={<AddToCartFooter />}
        // >
        //   <AddToCartBody selectedProduct={selectedProduct} />
        // </BottomUpDrawer>
        <CartSheet
          open={addToCartOpen}
          setOpen={setAddToCartOpen}
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
}
