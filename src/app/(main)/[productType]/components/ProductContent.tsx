'use client';
import { Separator } from '@/components/ui/separator';
import { TInitialProductDataDB } from '@/lib/db';
import { Rating } from '@mui/material';
import { CarSelectionContext } from './CarPDP';
import { useMediaQuery } from '@mantine/hooks';
import { RefObject, useContext, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import { compareRawStrings } from '@/lib/utils';
import ProductVideo from '@/components/PDP/ProductVideo';
// import SquareThumbnail from '@/video/Thumbnail_Square.webp';
import Thumbnail from '@/video/Thumbnail.webp';
import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import { IProductData } from '../../utils';
import FreeDetails from './FreeDetails';
import AddToCart from './AddToCart';
import CircleColorSelector from './CircleColorSelector';
import RatingsTrigger from './RatingsTrigger';
import SixMinVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import ReviewGallerySection from './ReviewGallerySection';
import KeyBenefitsSection from '@/components/PDP/components/KeyBenefitsSection';

interface ProductRefs {
  [key: string]: RefObject<HTMLElement>;
}

export function ProductContent({
  selectedProduct,
  setSelectedProduct,
  setFeaturedImage,
  productRefs,
  uniqueColors,
}: {
  selectedProduct: TInitialProductDataDB | null | undefined;
  setSelectedProduct: (newProduct: IProductData) => void;
  productRefs: React.MutableRefObject<ProductRefs>;
  uniqueColors?: IProductData[];
  modelData: TInitialProductDataDB[];
  setFeaturedImage: (img: string) => void;
}) {
  const productType = compareRawStrings(selectedProduct?.type, 'car covers')
    ? 'Car Cover'
    : compareRawStrings(selectedProduct?.type, 'SUV Covers')
      ? 'SUV Cover'
      : 'Truck Cover';
  const isMobile = useMediaQuery('(max-width: 768px)');
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

  return (
    <>
      <div className="grid grid-cols-1 lg:mt-[60px]">
        <div className="flex flex-col gap-0.5">
          {/* Product Title */}
          <h2 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] md:mt-0 md:text-[28px] md:leading-[30px] ">
            {`${selectedProduct?.display_id}`}
            &trade; {isMobile && <br />}
            {`Custom-Fit ${productType}`}
          </h2>
          {/* Rating(s) */}
          <div className="flex items-center gap-1">
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
        <p className="text-[16px] leading-4"> From</p>
        <div className=" flex place-items-center gap-[15px] py-1  text-center text-[28px] font-[900] leading-[32px] lg:text-[32px] lg:leading-[37.5px] ">
          ${selectedProduct?.msrp}
          {selectedProduct?.price && (
            <div className="flex gap-1.5 text-[20px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
              <span className=" text-[#BEBEBE] line-through">{`$${Number(selectedProduct?.price)}`}</span>
              <p>(-50%)</p>
            </div>
          )}
        </div>
        <p className="text-[14px] leading-[16px] text-[#767676]">
          4 interest-free installments of{' '}
          <b className="font-[400] text-black">$39.99</b>
        </p>
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
      />
      <Separator className="mt-[36px] " />
      <FreeDetails />
      <KeyBenefitsSection />
      <Separator className="h-5 w-full border-b-[1px] border-t-[1px] border-b-[#BEBEBE] border-t-[#BEBEBE] bg-[#F1F1F1] lg:hidden" />

      {isMobile && (
        <div className="bg-black p-4">
          <div className="rounded-[8px] pb-5">
            <ProductVideo
              src={SixMinVideo}
              imgSrc={Thumbnail}
              aspectRatio="16 / 9"
            />
          </div>
          <ReviewGallerySection />
        </div>
      )}
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
