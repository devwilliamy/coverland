'use client';

import { DropdownPDP } from '@/components/PDP/DropdownPDP';
import DeliveryDate from '@/components/PDP/components/DeliveryDate';
import { TimeTo2PMPST } from '@/components/PDP/components/TimeTo2PM';
import {
  FolderUpIcon,
  SecureIcon,
  ThumbsUpIcon,
} from '@/components/PDP/images';
import { MoneyBackIcon } from '@/components/PDP/images/MoneyBack';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { TProductData, TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { track } from '@vercel/analytics';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { BsBoxSeam, BsGift } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import AgentProfile from '@/images/PDP/agent_profile.png';
import { TCarCoverData } from './CarPDP';
import { useMediaQuery } from '@mantine/hooks';
import { useCallback, useEffect, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { IoClose } from 'react-icons/io5';
import ReviewSection from '@/components/PDP/components/ReviewSection';
import { generateProductsLeft } from '@/lib/utils';
import Dialog from '@/components/ui/dialog-tailwind-ui';
import { useRouter } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import { FaCamera } from 'react-icons/fa';
import ExampleCustomerImage from '@/images/PDP/product_details_01.webp';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselApi,
} from '@/components/ui/carousel';
import ReviewCard from '@/components/PDP/components/ReviewCard';
import { CheckIcon } from '@/components/PDP/components/icons';
import GrayBlackTribe from '@/images/PDP/gray-black-tribe.svg';
import BlackGrayStripe from '@/images/PDP/black-gray-stripe.svg';
import BlackGray2Tone from '@/images/PDP/black-gray-2-tone.svg';
import GrayBlackStripe from '@/images/PDP/gray-black-stripe.svg';
import BlackRedStripe from '@/images/PDP/black-red-stripe.svg';
import BlackRed2Tone from '@/images/PDP/black-red-2-tone.svg';
import CustomerImagesDrawer from './CustomerImagesDrawer';
import FourIconGrid from './FitGuranteedGrid';
import NeedHelp from './NeedHelp';
import FreeDetails from './FreeDetails';
import AddToCart from './AddToCart';

export function ProductContent({
  selectedProduct,
  setSelectedProduct,
  uniqueColors,
  reviewCount,
  avgReviewScore,
  reviewData,
  isReadyForProductSelection,
  handleAddToCart,
  modelData,
}: {
  selectedProduct: TCarCoverData | null | undefined;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<TProductData | TCarCoverData>
  >;
  uniqueColors?: [];
  modelData: TCarCoverData[];
  reviewCount: number;
  avgReviewScore: string;
  reviewData: TReviewData[] | undefined | null;
  isReadyForProductSelection: boolean;
  handleAddToCart: () => void;
}) {
  const productType = compareRawStrings(selectedProduct?.type, 'car covers')
    ? 'Car Cover'
    : compareRawStrings(selectedProduct?.type, 'SUV Covers')
      ? 'SUV Cover'
      : 'Truck Cover';
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState<boolean>(false);
  const [colorCoverIndex, setColorCoverIndex] = useState<number>(0);
  const [customerImagesIndex, setCustomerImagesIndex] = useState<number>(0);
  const [customerImagesDrawerOpen, setCustomerImagesDrawerOpen] =
    useState<boolean>(false);
  const router = useRouter();
  const coverColors = [
    GrayBlackTribe,
    BlackRed2Tone,
    BlackGray2Tone,
    BlackGrayStripe,
    GrayBlackStripe,
    BlackRedStripe,
  ];
  const colorMap = {
    'Gray Black Tribe': GrayBlackTribe,
    'Black Red 2-Tone': BlackRed2Tone,
    'Black Gray 2-Tone': BlackGray2Tone,
    'Black Gray Stripe': BlackGrayStripe,
    'Gray Black Stripe': GrayBlackStripe,
    'Black Red Stripe': BlackRedStripe,
  };

  const colors = [];

  for (const modelData of uniqueColors) {
    if (colorMap[modelData.display_color]) {
      colors.push(colorMap[modelData.display_color]);
    }
  }

  console.log(colors);

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-0.5">
          <h2 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] md:text-[28px]">
            {`${selectedProduct?.display_id}`}
            &trade;
            <br />
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
                  className="ml-2 text-[#0C87B8] underline"
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
              <Drawer
                open={reviewDrawerOpen}
                onOpenChange={setReviewDrawerOpen}
              >
                <DrawerTrigger
                  className="ml-2 text-[#0C87B8] underline"
                  disabled={!reviewCount}
                >
                  {reviewCount || '2'} ratings
                </DrawerTrigger>
                <DrawerContent className="">
                  <DrawerHeader draggable={false}>
                    <DrawerTitle className="flex w-full items-center border-b-2 border-[#C8C7C7] py-[22px] font-black uppercase">
                      <div
                        id="DrawerTitle"
                        className=" flex w-full text-[22px] font-black uppercase"
                      >
                        Car Cover Reviews
                      </div>
                      <button
                        id="CloseModalButton"
                        className="flex items-center justify-center rounded-full bg-gray-200 p-[5px]"
                        onClick={() => {
                          setReviewDrawerOpen(false);
                        }}
                      >
                        <IoClose className="h-[24px] w-[24px]" />
                      </button>
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="mx-auto flex max-h-[76vh] w-full flex-col overflow-y-scroll px-4 pt-[40px]">
                    <ReviewSection reviewData={reviewData} />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <p className="mb-2 text-gray-500">100+ Bought In Past Month</p>
        </div>
        <div className="flex-start flex items-center gap-2">
          <div className="h-[7px] w-[7px] rounded-full bg-[#008000]" />
          <p className="text-[12px] capitalize text-black">Lifetime Warranty</p>
        </div>
        <div className="flex-start flex items-center gap-2 ">
          <div className="h-[7px] w-[7px] rounded-full bg-[#008000]" />
          <p className="text-[12px] capitalize text-black">In Stock</p>
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
      <section
        id="select-color"
        className="mt-[24px] flex h-full w-full flex-col py-1"
      >
        <h3 className="mb-[6px] max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
          Select Color
        </h3>
        <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
          {uniqueColors &&
            uniqueColors.map((modelData, index) => {
              if (modelData.display_color === 'Solid Gray')
                return (
                  <div
                    key={`car-color-${index}`}
                    className={`flex ${index === colorCoverIndex && 'border-1 border border-[#6F6F6F] '} flex-col place-content-center rounded-full p-[2px] `}
                    onClick={() => {
                      setSelectedProduct(modelData);
                      setColorCoverIndex(index);
                    }}
                  >
                    <div className="h-[34px] w-[34px] rounded-full bg-[#D9D9D9]" />
                  </div>
                );

              return (
                <div
                  key={`car-color-${index}`}
                  className={`flex ${index === colorCoverIndex && 'border-1 border border-[#6F6F6F] '} flex-col place-content-center rounded-full p-[2px] `}
                  onClick={() => {
                    setSelectedProduct(modelData);
                    setColorCoverIndex(index);
                  }}
                >
                  <Image
                    alt="cover-color"
                    className="h-[34px] w-[34px]"
                    src={colorMap[modelData.display_color]}
                  />
                </div>
              );
            })}
        </div>
      </section>
      <Separator className="mt-[36px]" />
      <FreeDetails />
      {!isReadyForProductSelection && (
        <div className="mt-[34px] w-full">
          <DropdownPDP modelData={modelData} />
        </div>
      )}
      {/* Add to Cart Button */}
      <AddToCart
        selectedProduct={selectedProduct}
        isReadyForProductSelection={isReadyForProductSelection}
        router={router}
        handleAddToCart={handleAddToCart}
      />
      <section className="mt-[22px]">
        <p className="text-[12px] font-[700] leading-[20px] lg:hidden">
          As low as $32.50/mo with PayPal. Check your purchasing power.
          <ins>Learn More</ins>
        </p>
        <p className="hidden text-[16px] leading-[22px] lg:block">
          As low as <b>$32.50</b>/mo with <b>PayPal</b>. Check your purchasing
          power.
          <br /> <ins>Learn More</ins>
        </p>
      </section>
      <Separator className="my-8" />
      {/* Selling Attributes */}
      <CustomerImagesDrawer
        reviewData={reviewData}
        customerImagesDrawerOpen={customerImagesDrawerOpen}
        setCustomerImagesDrawerOpen={setCustomerImagesDrawerOpen}
        customerImagesIndex={customerImagesIndex}
        setCustomerImagesIndex={setCustomerImagesIndex}
      />
      <span className="mb-[32px] flex w-full gap-[7px] overflow-x-auto">
        {[...Array(12)].map((_, index) => (
          <div key={`scrollable-item-${index}`} className="flex">
            <Image
              src={ExampleCustomerImage}
              className="flex max-h-[128px] min-h-[128px] min-w-[128px] max-w-[128px] rounded-[4px] object-cover"
              alt=""
            />
          </div>
        ))}
      </span>
      <FourIconGrid />
      <NeedHelp />
      <Separator className="my-10 hidden lg:block" />
      <div>
        <h3 className="mb-[28px] hidden text-xl font-black uppercase text-[#1A1A1A] lg:flex">
          car cover features
        </h3>
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
          'Guaranteed to Be the Best Quality Car Cover on the Market.',
        ].map((text) => (
          <CarCoverFeature>{text}</CarCoverFeature>
        ))}
      </div>
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
  <div className="flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
    <GoDotFill size={10} color="#000000" />
    <p className="pl-1 text-lg font-medium capitalize text-black">{children}</p>
  </div>
);
