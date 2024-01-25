'use client';

import { TProductData, TReviewData } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { GoDotFill } from 'react-icons/go';
import Link from 'next/link';
import React, {
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BsBoxSeam, BsGift } from 'react-icons/bs';
import { DropdownPDP } from './DropdownPDP';
import { useCartContext } from '@/providers/CartProvider';
import Rating from '@mui/material/Rating';
import {
  TPDPPathParams,
  TPDPQueryParams,
} from '@/app/(main)/[productType]/[...product]/page';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '../ui/button';
import AgentProfile from '@/images/PDP/agent_profile.png';
import { useMediaQuery } from '@mantine/hooks';
import { FolderUpIcon, SecureIcon, ThumbsUpIcon } from './images';
import { MoneyBackIcon } from './images/MoneyBack';
import { EditIcon } from './components/icons';
import { track } from '@vercel/analytics';

import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import dynamicImport from 'next/dynamic';
import { type CarouselApi } from '@/components/ui/carousel';
import skuDisplayData from '@/data/skuDisplayData.json';
import { stringToSlug } from '@/lib/utils';
import BottomUpDrawer from '../ui/bottom-up-drawer';
import AddToCartHeader from '../cart/AddToCartHeader';
import AddToCartBody from '../cart/AddToCartBody';
import AddToCartFooter from '../cart/AddToCartFooter';
import CartSheet from '../cart/CartSheet';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { IoClose } from 'react-icons/io5';
import ReviewSection from './components/ReviewSection';

const ProductVideo = dynamicImport(() => import('./ProductVideo'), {
  ssr: false,
});

const DeliveryDate = dynamicImport(() => import('./components/DeliveryDate'), {
  loading: () => <span className="font-normal">Loading...</span>,
  ssr: false,
});

const EditVehiclePopover = dynamicImport(
  () => import('./components/EditVehiclePopover'),
  {
    ssr: false,
  }
);

const EditVehicleDropdown = dynamicImport(
  () => import('./EditVehicleDropdown'),
  {
    ssr: false,
  }
);

export const dynamic = 'force-dynamic';

interface ProductRefs {
  [key: string]: RefObject<HTMLElement>;
}

function TimeTo2PMPST() {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeTo2PM()); // Set initial value

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeTo2PM());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  function calculateTimeTo2PM() {
    const now = new Date();
    const target = new Date();

    target.setHours(14); // Set to 2 PM local time
    target.setMinutes(0);
    target.setSeconds(0);
    target.setMilliseconds(0);

    if (now.getHours() >= 14) {
      // Adjust for PST timezone offset
      target.setDate(target.getDate() + 1); // Set to next day if past 2 PM
    }

    const diff: number = target.getTime() - now.getTime();

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    if (hours < 0 || minutes < 0) {
      return ''; // In case of negative values
    }

    return `${hours} Hours ${minutes} Mins`;
  }

  return (
    <p className="text-dark text-sm">
      Order within <span className="text-[#767676]">{timeRemaining}</span>
    </p>
  );
}

function CarSelector({
  modelData,
  pathParams,
  searchParams,
  submodels,
  secondSubmodels,
  reviewData,
  parentGeneration,
}: {
  modelData: TProductData[];
  pathParams: TPDPPathParams;
  submodels: string[];
  secondSubmodels: string[];
  searchParams: TPDPQueryParams;
  reviewData: TReviewData[];
  parentGeneration: any;
}) {
  const defaultModel = modelData.find(
    (model) =>
      model.fk ===
      skuDisplayData.find((row) => row.fk === parentGeneration?.fk)?.fk
  );

  const modelsBySubmodel =
    modelData.filter(
      (model) =>
        stringToSlug(model?.submodel1 as string) ===
        stringToSlug(searchParams?.submodel as string)
    ) ?? [];

  const modelsBySecondSubmodel = searchParams?.second_submodel
    ? modelData
        .filter(
          (model) =>
            stringToSlug(model?.submodel1 as string) ===
            stringToSlug(searchParams?.submodel as string)
        )
        .filter(
          (model) =>
            stringToSlug(model?.submodel2 as string) ===
            stringToSlug(searchParams?.second_submodel as string)
        ) ?? modelsBySubmodel
    : modelsBySubmodel;

  const isFullySelected =
    pathParams?.product?.length === 3 &&
    (submodels.length === 0 || !!searchParams?.submodel) &&
    (secondSubmodels.length === 0 || !!searchParams?.second_submodel);

  let displayedModelData = searchParams?.submodel
    ? modelsBySubmodel
    : modelData;

  displayedModelData = searchParams?.second_submodel
    ? modelsBySecondSubmodel
    : displayedModelData;

  const [selectedProduct, setSelectedProduct] = useState<TProductData>(
    isFullySelected || searchParams?.submodel
      ? displayedModelData[0]
      : defaultModel ?? displayedModelData[0]
  );

  // Sometimes when submodel2 is selected, selectedProduct won't update to the right one
  useEffect(() => {
    const updateSelectedProduct = () => {
      setSelectedProduct(displayedModelData[0]);
    };
    if (isFullySelected) {
      updateSelectedProduct();
    }
  }, [searchParams, isFullySelected, displayedModelData]);

  const [featuredImage, setFeaturedImage] = useState<string>(
    selectedProduct?.feature as string
  );

  const { addToCart } = useCartContext();

  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState<boolean>(false);

  const productRefs = useRef<ProductRefs>(
    displayedModelData.reduce((acc: ProductRefs, item: TProductData) => {
      acc[item.sku] = React.createRef();
      return acc;
    }, {})
  );

  const [showMore, setShowMore] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isReadyForSelection = submodels.length
    ? pathParams?.product?.length === 3 && !!searchParams?.submodel
    : pathParams?.product?.length === 3;

  const uniqueColors = Array.from(
    new Set(displayedModelData.map((model) => model.display_color))
  ).map((color) =>
    displayedModelData.find((model) => model.display_color === color)
  );

  const uniqueTypes = Array.from(
    new Set(displayedModelData.map((model) => model.display_id))
  ).map((type) =>
    displayedModelData.find((model) => model.display_id === type)
  );

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    return addToCart({ ...selectedProduct, quantity: 1 });
  };

  const productImages =
    selectedProduct?.product
      ?.split(',')
      .filter((img) => img !== featuredImage) ?? [];
  const reviewScore = reviewData?.reduce(
    (acc, review) => acc + Number(review.rating_stars ?? 0),
    0
  );
  const reviewCount = reviewData?.length ?? 50;

  const avgReviewScore = (reviewScore / reviewCount).toFixed(1);

  const fullProductName = `${selectedProduct?.year_generation}
  ${selectedProduct?.make} ${selectedProduct?.product_name} 
  ${searchParams?.submodel ? selectedProduct?.submodel1 : ''}
  ${searchParams?.second_submodel ? selectedProduct?.submodel2 : ''}
  `;
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto h-auto w-full max-w-[1280px] px-4 lg:my-8">
      <div className="flex w-full flex-col items-start justify-between lg:flex-row lg:gap-14">
        {isMobile && <EditVehiclePopover fullProductName={fullProductName} />}
        {/* Left Panel */}
        <div className=" -ml-4 mt-[29px] flex h-auto w-screen flex-col items-stretch justify-center pb-2 lg:w-3/5 lg:pb-0 ">
          {/* Featured Image */}
          <div
            className={`${
              showMore ? 'overflow-scroll' : 'max-h-[1775px] overflow-hidden'
            }`}
          >
            <div className="flex h-full w-full items-center justify-center bg-[#F2F2F2] md:h-[500px] lg:h-[650px] lg:rounded-xl">
              {isMobile ? (
                <MobileImageCarousel
                  selectedProduct={selectedProduct}
                  productImages={productImages}
                />
              ) : (
                <Image
                  id="featured-image"
                  src={featuredImage ?? ''}
                  alt="a car with a car cover on it"
                  width={400}
                  height={400}
                  className="h-full w-full md:h-[250px] md:w-[250px] lg:h-[500px] lg:w-[500px]"
                  // onClick={console.log(selectedImage)}
                />
              )}
            </div>

            {/* Product Video */}
            {!isMobile && <ProductVideo />}
            {/* Gallery Images */}
            <div className="hidden w-auto grid-cols-2 gap-[16px] pt-4 lg:grid ">
              {productImages.map((img, idx) => (
                <div
                  className="h-auto w-full rounded-xl border-transparent bg-[#F2F2F2] p-3.5 md:h-[350px]"
                  key={img}
                >
                  <Image
                    key={idx}
                    src={img}
                    width={200}
                    height={200}
                    alt="car cover details"
                    className={`// selectedProduct.product?.includes(img) // ? 
                    'border-4 rounded-lg'
                    //   : '' h-full w-full
                    cursor-pointer   border-red-600 object-contain
                  `}
                    onClick={() => setFeaturedImage(img)}
                    onError={() => console.log('Failed image:', `${img}`)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            className="mx-auto mt-9 hidden h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white lg:block"
            onClick={() => setShowMore((p) => !p)}
          >
            {showMore ? 'show less images' : 'show more images'}
          </Button>
        </div>

        {/* Right Panel */}
        <div className=" h-auto w-full pl-0 lg:w-2/5">
          <div className=" mt-[29px] hidden flex-col gap-2 rounded-lg border-2 border-solid px-3 py-7 lg:flex">
            <h2 className="font-roboto text-lg font-extrabold text-[#1A1A1A] md:text-[28px]">
              {fullProductName}
            </h2>
            <div className="flex items-center gap-2">
              <EditIcon />
              <Popover open={open} onOpenChange={(o) => setOpen(o)}>
                <PopoverTrigger asChild>
                  <button className="underline" onClick={() => setOpen(!open)}>
                    Edit Vehicle
                  </button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[100px] rounded-xl border border-gray-300 bg-white p-5 shadow-lg">
                  <EditVehicleDropdown setOpen={setOpen} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <p className="ml-3 mt-2 text-lg font-black text-[#1A1A1A] ">
            Cover Colors
            <span className="ml-2 text-lg font-normal text-[#767676]">
              {selectedProduct?.display_color}
            </span>
          </p>
          <div className="flex flex-row space-x-1 overflow-x-auto whitespace-nowrap p-2 lg:grid lg:w-auto lg:grid-cols-5 lg:gap-[7px] lg:px-3">
            {uniqueColors?.map((sku) => {
              return (
                <div
                  className={`flex-shrink-0 p-1 lg:flex lg:flex-col lg:items-center lg:justify-center ${
                    sku?.display_color === selectedProduct?.display_color
                      ? 'rounded-lg border-4 border-[#6F6F6F]'
                      : ''
                  }`}
                  key={sku?.sku}
                >
                  <Image
                    src={sku?.feature as string}
                    ref={
                      productRefs?.current[
                        sku?.sku as TProductData['sku']
                      ] as Ref<HTMLImageElement>
                    }
                    width={98}
                    height={98}
                    priority
                    onError={() =>
                      console.log('Failed image:', `${sku?.feature}`)
                    }
                    alt="car cover details"
                    className="h-20 w-20 cursor-pointer rounded bg-[#F2F2F2] lg:h-full lg:w-full"
                    onClick={() => {
                      setFeaturedImage(sku?.feature as string);
                      setSelectedProduct(sku as TProductData);
                      const skuRef = sku?.sku
                        ? (productRefs?.current[
                            sku?.sku
                          ] as React.RefObject<HTMLElement>)
                        : null;
                      skuRef?.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center',
                      });
                    }}
                  />
                </div>
              );
            })}
            {/* </div> */}
          </div>

          <>
            <Separator className="my-4" />
            <div>
              <p className="ml-3 text-lg font-black text-[#1A1A1A]">
                Cover Types
                <span className="ml-2 text-lg font-normal text-[#767676]">
                  {selectedProduct?.display_id}
                </span>
              </p>
            </div>
          </>
          {/* Cover Types Section */}
          <div className="flex flex-row space-x-1 overflow-x-auto whitespace-nowrap p-2 lg:grid lg:w-auto lg:grid-cols-5 lg:gap-[7px] lg:px-3">
            {uniqueTypes.map((sku) => {
              return (
                <button
                  className={`flex-shrink-0 p-1 lg:flex lg:flex-col lg:items-center lg:justify-center ${
                    sku?.display_id === selectedProduct?.display_id
                      ? 'rounded-lg border-4 border-[#6F6F6F]'
                      : ''
                  }`}
                  key={sku?.sku}
                  onClick={() => {
                    setFeaturedImage(sku?.feature as string);
                    setSelectedProduct(sku as TProductData);
                    const skuRef = sku?.sku
                      ? (productRefs?.current[
                          sku?.sku
                        ] as React.RefObject<HTMLElement>)
                      : null;
                    skuRef?.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center',
                    });
                  }}
                  // disabled={isOptionDisabled(productOption, 'cover')}
                >
                  <Image
                    src={sku?.feature as string}
                    width={98}
                    height={98}
                    onError={() =>
                      console.log('Failed image:', `${sku?.feature}`)
                    }
                    alt="car cover details"
                    className="h-20 w-20 cursor-pointer rounded bg-[#F2F2F2] lg:h-full lg:w-full"
                  />
                </button>
              );
            })}
          </div>

          <Separator className="mb-8 mt-4" />
          {/* Title and Descriptions*/}
          <div className="grid grid-cols-1">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-roboto text-lg font-bold text-[#1A1A1A] md:text-[28px]">
                {`${selectedProduct?.display_id}`}
                &trade; {`${selectedProduct?.display_color}`}
              </h2>
              {/* Reviews */}
              <div className="flex items-center gap-4">
                <div className=" flex gap-1 text-yellow-300 ">
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
                        {!!reviewData.length && (
                          <Link
                            className="underline"
                            scroll
                            href={'#reviews'}
                            onClick={() =>
                              track('viewing all reviews', {
                                sku: selectedProduct?.sku,
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
                      className="ml-2 text-blue-400 underline"
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
                Full Warranty 10 years
              </p>
            </div>
            <div className="flex-start flex items-center leading-4">
              <GoDotFill size={10} color="#008000 " />
              <p className="pl-1 text-sm font-medium capitalize text-black">
                In Stock
              </p>
            </div>
          </div>
          {/* Pricing */}
          <div className="pt-6 md:pt-11">
            <div className="grid grid-cols-1">
              <p className="text-dark relative mb-2.5 text-xl font-bold capitalize md:text-3xl">
                ${selectedProduct?.msrp}
                <span className="top absolute ml-2.5 text-xl font-normal capitalize text-[#D13C3F]">
                  only{' '}
                  {`${Math.max(
                    2,
                    Math.min(7, Math.floor(reviewCount / 25) + 2)
                  )}`}{' '}
                  left
                </span>
              </p>
              {selectedProduct?.price && (
                <p className="text-lg font-normal text-[#1A1A1A] md:text-[22px]">
                  <span className="mr-2 text-[#9C9C9C] line-through">
                    ${selectedProduct?.price}
                  </span>
                  Save 50% ($
                  {String(
                    Number(selectedProduct?.price) -
                      Number(selectedProduct?.msrp)
                  )}
                  )
                </p>
              )}
            </div>
          </div>
          {/* Product Description */}
          {/* <ProductDropdown dropdownItems={dropdownItems} /> */}
          {/* Shipping info stuff */}
          <div className="flex flex-col items-start justify-start pt-8">
            <div className="flex flex-row items-start justify-start">
              <div className="flex flex-col items-start justify-start pr-4 pt-0">
                <BsBoxSeam size={20} color="#000" />
              </div>
              <div className="flex w-full flex-col items-start justify-start md:w-auto">
                <div className="text-dark flex-row items-center justify-start text-base capitalize leading-4 md:text-lg xl:flex">
                  <span className="text-base font-bold uppercase leading-6 md:text-lg xl:mr-1">
                    Free shipping
                  </span>
                  <br className="xl:hidden" />
                  <span className="hidden md:mr-1 xl:block">-</span>
                  <DeliveryDate />
                </div>
                <p className="text-sm text-[#767676]">
                  <TimeTo2PMPST />
                </p>
                <p className="pt-1.5 text-sm font-normal text-[#1B8500]">
                  Free Returns for 30 Days
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start pt-4">
              <BsGift size={20} color="#000" />
              <p className="ml-4 mr-1 text-lg font-normal capitalize text-[#1A1A1A]">
                <span className="font-bold uppercase">$30 free</span> value kit
                included
              </p>
              {/* <BsInfoCircle size={20} color="#767676" /> */}
            </div>

            {/* Select Your Vehicle */}
            {!isFullySelected && (
              <div className="mt-8 w-full">
                <DropdownPDP
                  modelData={displayedModelData}
                  submodels={submodels}
                  secondSubmodels={secondSubmodels}
                />
              </div>
            )}
            {/* Add to Cart Button */}
            {!isFullySelected && selectedProduct ? (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="mt-4 h-[48px] w-full bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-xl">
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
                className="mt-4 h-[48px] w-full bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-xl"
                onClick={() => {
                  track('PDP_add_to_cart', {
                    sku: selectedProduct?.sku,
                  });
                  handleAddToCart();
                  setAddToCartOpen(true);
                }}
              >
                Add To Cart
              </Button>
            )}
          </div>
          {/* <div className="pt-5 ml-2">
            <p className="text-[#1A1A1A] text-base font-normal">
              As low as <span className="font-black">$32.50/mo</span> with{' '}
              <span className="font-black">PayPal</span>. Check your purchasing
              power.
            </p>
            <Link
              href="#"
              className="cursor-pointer text-base font-normal capitalize text-[#1A1A1A] underline"
            >
              learn more
            </Link>
          </div> */}

          <Separator className="my-8" />
          {/* Selling Attributes */}
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
                Effortless cleaning
              </p>
            </div>
          </div>
        </div>
      </div>
      {isMobile ? (
        <BottomUpDrawer
          title={<AddToCartHeader />}
          open={addToCartOpen}
          setOpen={setAddToCartOpen}
          footer={<AddToCartFooter />}
        >
          <AddToCartBody selectedProduct={selectedProduct} />
        </BottomUpDrawer>
      ) : (
        <CartSheet
          open={addToCartOpen}
          setOpen={setAddToCartOpen}
          selectedProduct={selectedProduct}
        />
      )}
    </section>
  );
}

export default CarSelector;

const MobileImageCarousel = ({
  selectedProduct,
  productImages,
}: {
  selectedProduct: TProductData;
  productImages: string[];
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setScrollSnaps(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  );

  const Dot = ({ index }: { index: number }) => (
    <button className="relative flex h-2 w-2" onClick={() => scrollTo(index)}>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-gray-300"></span>
    </button>
  );

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent className="bg-[#F2F2F2] p-2">
          <CarouselItem>
            <Image
              src={selectedProduct.feature as string}
              alt={`Additional images of the ${selectedProduct.display_id} cover`}
              width={500}
              height={500}
              // placeholder="blur"
            />
          </CarouselItem>
          <CarouselItem>
            <div className="flex h-full flex-col justify-center">
              <ProductVideo />
            </div>
          </CarouselItem>
          {productImages.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={`Additional images of the ${selectedProduct.display_id} cover`}
                width={500}
                height={500}
                // placeholder="blur"
                onError={() => console.log('Failed image:', `${image}`)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex w-full items-center justify-center gap-2 bg-white py-2">
        {scrollSnaps.map((_, index) =>
          index === current ? (
            <ActiveDot key={index} />
          ) : (
            <Dot key={index} index={index} />
          )
        )}
      </div>
    </div>
  );
};

const ActiveDot = () => (
  <div className="relative flex h-2.5 w-2.5">
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gray-600"></span>
  </div>
);
