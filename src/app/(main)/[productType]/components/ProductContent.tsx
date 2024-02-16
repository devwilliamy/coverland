'use client';
import { Separator } from '@/components/ui/separator';
import { TInitialProductDataDB } from '@/lib/db';
import { Rating } from '@mui/material';
import { GoDotFill } from 'react-icons/go';
import { CarSelectionContext } from './CarPDP';
import { useMediaQuery } from '@mantine/hooks';
import { RefObject, useContext, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import { generateProductsLeft } from '@/lib/utils';
import { compareRawStrings } from '@/lib/utils';
import ProductVideo from '@/components/PDP/ProductVideo';
// import SquareThumbnail from '@/video/Thumbnail_Square.webp';
import Thumbnail from '@/video/Thumbnail.webp';
import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import { IProductData } from '../../utils';
import FourIconGrid from './FitGuranteedGrid';
import NeedHelp from './NeedHelp';
import FreeDetails from './FreeDetails';
import AddToCart from './AddToCart';
import CircleColorSelector from './CircleColorSelector';
import RatingsTrigger from './RatingsTrigger';
import SixMinVideo from 'https://x2kly621zrgfgwll.public.blob.vercel-storage.com/videos/FINALIZE_WEBSTIE_16_9_OPTIMIZED.mp4';
import CustomerReviewsSection from './CustomerReviewsSection';
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
        <p className=" flex place-items-center gap-[15px] py-1  text-center text-[28px] font-[900] leading-[32px] lg:text-[32px] lg:leading-[37.5px] ">
          ${selectedProduct?.msrp}
          {selectedProduct?.price && (
            <p className="flex gap-1.5 text-[20px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
              <span className=" text-[#BEBEBE] line-through">{`$${Number(selectedProduct?.price)}`}</span>
              <p>(-50%)</p>
            </p>
          )}
        </p>
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

      {isMobile && (
        <>
          <div className="pb-5">
            <ProductVideo
              src={SixMinVideo}
              imgSrc={Thumbnail}
              aspectRatio="16 / 9"
            />
          </div>
          <CustomerReviewsSection />
        </>
      )}
      {/* <FourIconGrid />
      <NeedHelp />
      <Separator className="my-10 hidden lg:mt-0 lg:block" />
      <section>
        <h3 className="mb-[28px] hidden text-xl font-black uppercase text-[#1A1A1A] lg:flex">
          car cover features
        </h3>
        <div className="flex flex-col gap-2 lg:gap-0 ">
          {[
            '100% waterproof protection.',
            '100% UV protection.',
            '100% Tailored to your car model.',
            'The Best Quality Car Cover on the Market.',
            'Outside Material: High-End Polyester Fabric.',
            'Inside Material: Soft Fleece Fabric.',
            'Heavy-Duty, but Easy On and Off.',
            'Non-Scratch Fabric Protects Your Car Paint.',
            'Backed by a Lifetime Warranty.',
            'Guaranteed to Be the Best Quality Car Cover On the Market.',
          ].map((text, index) => (
            <CarCoverFeature key={`car-cover-feature-${index}`}>
              {text}
            </CarCoverFeature>
          ))}
        </div>
      </section> */}
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

const CarCoverFeature = ({ children }: { children: string }) => (
  <div className="flex-start ml-2 hidden items-center  leading-4 lg:flex">
    <GoDotFill size={10} color="#000000" />
    <p className="pl-1 text-lg font-medium capitalize leading-[24px] text-black lg:leading-[32px]">
      {children}
    </p>
  </div>
);
