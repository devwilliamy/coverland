'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { TInitialProductDataDB, TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { track } from '@vercel/analytics';
import Image from 'next/image';
import Link from 'next/link';
import { GoDotFill } from 'react-icons/go';
import { CarSelectionContext } from './CarPDP';
import { useMediaQuery } from '@mantine/hooks';
import {
  RefObject,
  useContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import CartSheet from '@/components/cart/CartSheet';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { generateProductsLeft } from '@/lib/utils';
import Dialog from '@/components/ui/dialog-tailwind-ui';
import { useRouter } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import ReviewSheet from '@/components/PDP/ReviewSheet';
import ProductVideo from '@/components/PDP/ProductVideo';
import SquareVideo from '@/videos/Coverland_Square.mp4';
import SquareThumbnail from '@/video/Thumbnail_Square.webp';
import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import { IProductData, getCompleteSelectionData } from '../../utils';
import FourIconGrid from './FitGuranteedGrid';
import NeedHelp from './NeedHelp';
import FreeDetails from './FreeDetails';
import AddToCart from './AddToCart';
import CircleColorSelector from './CircleColorSelector';

interface ProductRefs {
  [key: string]: RefObject<HTMLElement>;
}

export function ProductContent({
  selectedProduct,
  setSelectedProduct,
  setFeaturedImage,
  productRefs,
  uniqueColors,
  reviewCount,
  avgReviewScore,
  reviewData,
}: {
  selectedProduct: TInitialProductDataDB | null | undefined;
  setSelectedProduct: (newProduct: IProductData) => void;
  productRefs: React.MutableRefObject<ProductRefs>;
  uniqueColors?: IProductData[];
  modelData: TInitialProductDataDB[];
  setFeaturedImage: (img: string) => void;
  reviewCount: number;
  avgReviewScore: string;
  reviewData: TReviewData[] | undefined | null;
}) {
  const productType = compareRawStrings(selectedProduct?.type, 'car covers')
    ? 'Car Cover'
    : compareRawStrings(selectedProduct?.type, 'SUV Covers')
      ? 'SUV Cover'
      : 'Truck Cover';
  const isMobile = useMediaQuery('(max-width: 768px)');
  const router = useRouter();

  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState<boolean>(false);

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const modelData = useStore(store, (s) => s.modelData);
  const color = useStore(store, (s) => s.selectedColor);

  const { addToCart } = useCartContext();

  const cartProduct = modelData.find((p) => p.display_color === color);

  const handleAddToCart = () => {
    if (!cartProduct) return;
    console.log(cartProduct);
    return addToCart({ ...cartProduct, quantity: 1 });
  };

  const {
    completeSelectionState: { isComplete },
  } = getCompleteSelectionData({
    data: modelData,
  });

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-0.5">
          <h2 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] md:mt-0 md:text-[28px] md:leading-[30px] ">
            {`${selectedProduct?.display_id}`}
            &trade; {/* <br /> */}
            {`Custom-Fit ${productType}`}
          </h2>
          {/* Reviews */}
          <div className="flex items-center gap-1">
            <div className="flex gap-1 text-yellow-300 ">
              <Rating
                name="read-only"
                value={5}
                readOnly
                style={{
                  height: '25px',
                }}
              />
            </div>
            <div className="hidden lg:flex">
              <Popover>
                <PopoverTrigger
                  className="ml-2 text-blue-400 underline"
                  disabled={!reviewCount}
                >
                  {reviewCount || '2'} ratings
                </PopoverTrigger>
                <PopoverContent>
                  <div className=" flex flex-col items-center border border-gray-300 bg-white p-4 shadow-lg">
                    <div className="flex items-center gap-4">
                      <p className="text-2xl font-bold">
                        {avgReviewScore ?? '4.9'} out of 5
                      </p>
                      <Rating
                        name="read-only"
                        value={5}
                        readOnly
                        style={{
                          height: '25px',
                        }}
                      />
                    </div>
                    {!!reviewData?.length && (
                      <Link
                        className="underline"
                        scroll
                        href={'#reviews'}
                        onClick={() =>
                          track('viewing all reviews', {
                            sku: selectedProduct?.sku || '',
                          })
                        }
                      >
                        Show all reviews ({reviewData?.length})
                      </Link>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="lg:hidden">
              <ReviewSheet reviewData={reviewData} />
            </div>
          </div>
          <p className="mb-2 text-gray-500">100+ Bought In Past Month</p>
        </div>
        <div className="flex-start flex items-center gap-2">
          <div className="max-h-[7px] min-h-[7px] min-w-[7px] max-w-[7px] rounded-full bg-[#008000]" />
          <p className="text-[12px] capitalize text-black lg:text-[14px]">
            Lifetime Warranty
          </p>
        </div>
        <div className="flex-start flex items-center gap-2 ">
          <div className="max-h-[7px] min-h-[7px] min-w-[7px] max-w-[7px] rounded-full bg-[#008000]" />
          <p className="text-[12px] capitalize  text-black lg:text-[14px]">
            In Stock
          </p>
        </div>
      </div>
      <section className="pt-6 md:pt-11">
        <div className="grid grid-cols-1">
          <p className="mb-[16px] flex max-h-[20px] items-center gap-[15px] text-[28px] font-[900] leading-[32px] lg:text-[32px] lg:leading-[37.5px] ">
            ${selectedProduct?.msrp}
            {selectedProduct?.display_id !== 'Premium' && (
              <span className=" text-[18px] text-lg font-[400] capitalize leading-[14px] text-[#FF0005] lg:text-[20px]">
                only {generateProductsLeft(selectedProduct)} left
              </span>
            )}
          </p>
          {selectedProduct?.price && (
            <p className="text-[20px]  font-[400] leading-[14px] text-[#FF0005] lg:text-[22px] ">
              Save 50%!{' '}
              <span className=" text-[#BEBEBE] line-through">{`$${Number(selectedProduct?.price) - Number(selectedProduct?.msrp)}`}</span>
            </p>
          )}
        </div>
      </section>
      <CircleColorSelector
        uniqueColors={uniqueColors as IProductData[]}
        productRefs={productRefs}
        setFeaturedImage={setFeaturedImage}
        setSelectedProduct={setSelectedProduct}
        selectedProduct={selectedProduct as IProductData}
      />
      <Separator className="mt-[36px] " />
      <FreeDetails />
      {/* Add to Cart Button */}
      <AddToCart
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
      />
      {/* <LearnMore /> */}
      <Separator className="my-8 " />

      {isMobile && (
        <div className="pb-5">
          <ProductVideo src={SquareVideo} imgSrc={SquareThumbnail} />
        </div>
      )}
      {/* <CustomerReviewsSection
        reviewData={reviewData}
        customerImagesDrawerOpen={customerImagesDrawerOpen}
        setCustomerImagesDrawerOpen={setCustomerImagesDrawerOpen}
        customerImagesIndex={customerImagesIndex}
        setCustomerImagesIndex={setCustomerImagesIndex}
      /> */}
      <FourIconGrid />
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
      </section>
      {isMobile ? (
        <Dialog open={addToCartOpen} setOpen={setAddToCartOpen} />
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
