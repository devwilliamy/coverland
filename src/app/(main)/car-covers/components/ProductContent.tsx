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
import { TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { track } from '@vercel/analytics';
import Image from 'next/image';
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
import color1 from '@/images/PDP/black-red-icon.svg';
import color2 from '@/images/PDP/black-gray-icon.svg';
import color3 from '@/images/PDP/gray-black-icon-2.svg';
import color4 from '@/images/PDP/gray-red-black-icon.svg';
import color5 from '@/images/PDP/gray-black-icon.svg';
import color6 from '@/images/PDP/red-black-icon.svg';
import CustomerImagesDrawer from './CustomerImagesDrawer';

const colors = [color1, color2, color3, color4, color5, color6];

export function ProductContent({
  selectedProduct,
  // uniqueColors,
  // uniqueTypes,
  reviewCount,
  avgReviewScore,
  reviewData,
  isReadyForProductSelection,
  handleAddToCart,
  modelData,
}: {
  selectedProduct: TCarCoverData | null | undefined;
  uniqueColors?: [];
  uniqueTypes?: [];
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

  // const [customerReviewsIndex, setCustomerReviewsIndex] = useState<number>(0);
  // const [scrollSnaps, setCustomerImagesSnaps] = useState<number[]>([]);

  // useEffect(() => {
  //   if (!customerCarouselApi) {
  //     return;
  //   }

  //   setCustomerImagesSnaps(customerCarouselApi.scrollSnapList());
  //   setCustomerReviewsIndex(customerCarouselApi.selectedScrollSnap());

  //   customerCarouselApi.on('select', () => {
  //     setCustomerReviewsIndex(customerCarouselApi.selectedScrollSnap());
  //   });
  // }, [customerCarouselApi]);

  // const scrollToReview = useCallback(
  //   (index: number) =>
  //     customerCarouselApi && customerCarouselApi.scrollTo(index),
  //   [customerCarouselApi]
  // );

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[24px] font-[900] leading-[27px] text-[#1A1A1A] md:text-[28px]">
            {`${selectedProduct?.display_id}`}
            &trade; {`${selectedProduct?.display_color} ${productType}`}
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
                  // className=" flex w-full flex-row items-center justify-between border-b-2 border-[#C8C7C7] py-4 text-left text-[22px] font-black uppercase text-[#1A1A1A] !no-underline"
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
        <div className="flex-start flex items-center">
          <GoDotFill size={10} color="#008000 " />
          <p className="pl-1 text-sm font-medium capitalize text-black">
            Lifetime Warranty
          </p>
        </div>
        <div className="flex-start flex items-center leading-4">
          <GoDotFill size={10} color="#008000 " />
          <p className="pl-1 text-sm font-medium capitalize text-black">
            In Stock
          </p>
        </div>
      </div>
      <section className="pt-6 md:pt-11">
        <div className="grid grid-cols-1">
          <p className="mb-[16px] flex max-h-[20px] items-center gap-[15px] text-[28px] font-[900] leading-[32px] ">
            ${selectedProduct?.msrp}
            {selectedProduct?.display_id !== 'Premium' && (
              <span className=" text-lg font-[400] capitalize leading-[14px] text-[#FF0005]">
                only {generateProductsLeft(selectedProduct)} left
              </span>
            )}
          </p>
          {selectedProduct?.price && (
            <p className="text-[20px] font-[400] leading-[14px] text-[#FF0005] lg:text-[22px] ">
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
        <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-scroll py-[1px]">
          {colors &&
            colors.map((color, index) => (
              <div
                key={`car-color-${index}`}
                className={`flex ${index === colorCoverIndex && 'border-1 border border-[#6F6F6F] '} flex-col place-content-center rounded-full p-[2px] `}
                onClick={() => setColorCoverIndex(index)}
              >
                <Image
                  alt="cover-color"
                  className="h-[34px] w-[34px]"
                  src={color}
                />
              </div>
            ))}
        </div>
      </section>
      <Separator className="mt-[36px]" />
      <div className="flex flex-col items-start justify-start pt-8">
        <div className="flex flex-row items-start justify-start">
          <div className="flex flex-col items-start justify-start pr-4 pt-0">
            <BsBoxSeam size={20} color="#000" />
          </div>
          <div className="flex w-full flex-col items-start justify-start md:w-auto">
            <div className="mb-[9px] max-h-[10px] text-[14px] font-[400] leading-[100%]">
              <span className="font-[700] uppercase">Free shipping</span>
              <span className=""> - </span>
              <DeliveryDate />
            </div>
            <div>
              <TimeTo2PMPST />
            </div>
            <p className="mt-[7px] text-[14px] font-[400] leading-[16px] text-[#1B8500]">
              Free Returns for 30 Days
            </p>
          </div>
        </div>
        <div className="mt-[10px] flex items-center gap-[14px]">
          <BsGift size={20} color="#000" />
          <p className="text-[14px] font-[400] capitalize ">
            <span className="font-bold uppercase">$30 free</span> value kit
            included
          </p>
          {/* <BsInfoCircle size={20} color="#767676" /> */}
        </div>

        {/* Select Your Vehicle */}
        {!isReadyForProductSelection && (
          <div className="mt-8 w-full">
            <DropdownPDP modelData={modelData} />
          </div>
        )}
        {/* Add to Cart Button */}
        {!isReadyForProductSelection || !selectedProduct ? (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="mt-4 h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-xl">
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
            className="mt-4 h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-xl"
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
      <section className="mt-[22px]">
        <p className="text-[12px] font-[400] leading-[20px]">
          As low as <b>$32.50</b>/mo with <b>PayPal.</b> Check your purchasing
          power <ins>Learn More</ins>
        </p>
      </section>
      {/* <div className="pt-5 ml-2">
        <p className="text-[#1A1A1A] text-base font-normal">
          As low as <span className="font-black">$32.50/mo</span> with{' '}
          <span className="font-black">PayPal</span>. Check your purchasing
          power.
        </p>
        <Link
          href="#"
          className="font-normal underline text-[#1A1A1A] text-base capitalize cursor-pointer"
        >
          learn more
        </Link>
      </div> */}

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
      <div className="grid grid-cols-2 gap-4 pb-4">
        <div className="flex flex-row">
          <div className="border-dark flex h-10 w-10 flex-col items-center justify-center rounded-full border">
            <ThumbsUpIcon />
          </div>
          <div className="flex flex-col justify-center pl-2">
            <p className="w-20 text-sm font-normal text-black">
              Fit Guaranteed
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="border-dark flex h-10 w-10 flex-col items-center justify-center rounded-full border">
            <SecureIcon />
          </div>
          <div className="flex flex-col justify-center pl-2">
            <p className="w-24 text-sm font-normal text-black">
              Secure Shopping
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-row">
          <div className="border-dark flex h-10 w-10 flex-col items-center justify-center rounded-full border">
            <FolderUpIcon />
          </div>
          <div className="flex flex-col justify-center pl-2">
            <p className="w-24 text-sm font-normal text-black">
              30-Days Free Returns
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="border-dark flex h-10 w-10 flex-col items-center justify-center rounded-full border">
            <MoneyBackIcon />
          </div>
          <div className="flex flex-col justify-center pl-2">
            <p className="w-24 text-sm font-normal text-black">
              60-Days Full Money Back
            </p>
          </div>
        </div>
      </div>
      {/* CSR */}
      <div className="flex flex-row items-center gap-2.5 pt-8">
        <div className="flex h-[58px] w-[58px] flex-col items-center justify-center">
          <Image
            src={AgentProfile}
            alt="agent-profile"
            width={58}
            height={58}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="text-lg font-black text-[#1A1A1A]">Need Help?</p>
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="tel:1-800-799-5165"
              className="hover-underline-animation-dark text-lg font-normal text-[#1A1A1A]"
            >
              1-800-799-5165
            </Link>
            {/* <Link
              href="#"
              className="text-base font-normal capitalize text-[#0C87B8] underline"
            >
              live chat
            </Link> */}
          </div>
        </div>
      </div>
      <Separator className="my-10 hidden lg:block" />
      <div className="pt-3 lg:px-0 lg:pt-0">
        <h3 className="mb-[28px] hidden text-xl font-black uppercase text-[#1A1A1A] lg:flex">
          car cover features
        </h3>
        <div className="flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
          <GoDotFill size={10} color="#000000" />
          <p className="pl-1 text-lg font-medium capitalize text-black">
            Tailored to your car model
          </p>
        </div>
        <div className=" flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
          <GoDotFill size={10} color="#000000" />
          <p className="pl-1 text-lg font-medium capitalize text-black">
            all-season waterproof protection
          </p>
        </div>
        <div className="flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
          <GoDotFill size={10} color="#000000" />
          <p className="pl-1 text-lg font-medium capitalize text-black">
            Scratchproof, durable & lightweight
          </p>
        </div>
        <div className="flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
          <GoDotFill size={10} color="#000000" />
          <p className="pl-1 text-lg font-medium capitalize text-black">
            Soft Inner-lining
          </p>
        </div>
        <div className="flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
          <GoDotFill size={10} color="#000000" />
          <p className="pl-1 text-lg font-medium capitalize text-black">
            100% Waterproof - Zero Leaks Guaranteed
          </p>
        </div>
        <div className="flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
          <GoDotFill size={10} color="#000000" />
          <p className="pl-1 text-lg font-medium capitalize text-black">
            100% UV Protection
          </p>
        </div>
        <div className="flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
          <GoDotFill size={10} color="#000000" />
          <p className="pl-1 text-lg font-medium capitalize text-black">
            Easy On/Off with elastic hems
          </p>
        </div>
        <div className="flex-start ml-2 hidden items-center pb-2 leading-4 lg:flex">
          <GoDotFill size={10} color="#000000" />
          <p className="pl-1 text-lg font-medium capitalize text-black">
            effortless cleaning
          </p>
        </div>
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
