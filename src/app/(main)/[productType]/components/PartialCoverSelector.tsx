'use client';

import { TProductData, TReviewData } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import React, {
  Ref,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMediaQuery } from '@mantine/hooks';
import dynamicImport from 'next/dynamic';
import AgentProfile from '@/images/PDP/agent_profile.png';
import { PRODUCT_IMAGES } from '@/lib/constants';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import ProductVideo from '@/components/PDP/ProductVideo';
import { Button } from '@/components/ui/button';
import { EditIcon } from '@/components/PDP/components/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { Rating } from '@mui/material';
import Link from 'next/link';
import { track } from '@vercel/analytics/react';
import { GoDotFill } from 'react-icons/go';
import { BsBoxSeam, BsGift } from 'react-icons/bs';
import DeliveryDate from '@/components/PDP/components/DeliveryDate';
import { TimeTo2PMPST } from '@/components/PDP/components/TimeTo2PM';
import {
  FolderUpIcon,
  SecureIcon,
  ThumbsUpIcon,
} from '@/components/PDP/images';
import { MoneyBackIcon } from '@/components/PDP/images/MoneyBack';
import { DropdownPDP } from '@/components/PDP/DropdownPDP';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useCartContext } from '@/providers/CartProvider';

const EditVehiclePopover = dynamicImport(
  () => import('@/components/PDP/components/EditVehiclePopover'),
  {
    ssr: false,
  }
);

export function PartialCoverSelector({
  modelData,
  reviewData,
  modelParam,
  makeParam,
}: {
  modelData: TProductData[];
  reviewData: TReviewData[] | null | undefined;
  modelParam: string | undefined;
  makeParam: string | undefined;
}) {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);

  const [showMore, setShowMore] = useState(false);

  const [submodelSelectionOpen, setSubmodelSelectionOpen] =
    useState<boolean>(false);

  interface ProductRefs {
    [key: string]: RefObject<HTMLElement>;
  }

  const productRefs = useRef<ProductRefs>(
    PRODUCT_IMAGES.reduce((acc, item) => {
      if (!item?.images?.length) return acc;

      const refKey = `${item.images[0]}`;
      acc[refKey] = React.createRef();

      return acc;
    }, {} as ProductRefs)
  );

  const selectedCover = PRODUCT_IMAGES[selectedProductIndex];

  const coverTypeOptions =
    selectedCover.type === 'Premium Plus'
      ? [
          selectedCover,
          PRODUCT_IMAGES.find((cover) => cover.type === 'Premium') as {
            name: string;
            type: string;
            images: string[];
          },
        ]
      : [selectedCover, PRODUCT_IMAGES[0]];

  const isMobile = useMediaQuery('(max-width: 768px)');

  const reviewScore =
    reviewData?.reduce(
      (acc, review) => acc + Number(review.rating_stars ?? 0),
      0
    ) ?? 0;
  const reviewCount = reviewData?.length ?? 50;

  const avgReviewScore = (reviewScore / reviewCount).toFixed(1) || '4.9';

  const fullProductName = `${makeParam ? modelData[0]?.make : 'Car Covers'} ${modelParam ? modelData[0]?.model : ''}`;

  return (
    <section className="mx-auto h-auto w-full max-w-[1440px] px-4 lg:my-8">
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
            <div className="flex h-[400px] w-full items-center justify-center bg-[#F2F2F2] md:h-[500px] lg:h-[650px] lg:rounded-xl">
              {isMobile ? (
                <MobileImageCarousel selectedCover={selectedCover} />
              ) : (
                <Image
                  id="featured-image"
                  src={PRODUCT_IMAGES[featuredImageIndex].images[0]}
                  alt="a car with a car cover on it"
                  width={400}
                  height={400}
                  className="h-full w-full md:h-[250px] md:w-[250px] lg:h-[500px] lg:w-[500px]"
                  // onClick={console.log(selectedImage)}
                />
              )}
            </div>

            {/* Product Video */}
            {<ProductVideo />}
            {/* Gallery Images */}
            <div className="hidden w-auto grid-cols-2 gap-[16px] pt-4 lg:grid ">
              {selectedCover.images.map((img, idx) => (
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
                    onClick={() => setFeaturedImageIndex(idx)}
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
              <Popover>
                <PopoverTrigger asChild>
                  <button className="underline">Edit Vehicle</button>
                </PopoverTrigger>
                <PopoverContent className="min-w-[100px] rounded-xl border border-gray-300 bg-white p-5 shadow-lg">
                  <EditVehicleDropdown />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <p className="ml-3 mt-2 text-lg font-black text-[#1A1A1A] ">
            Cover Colors:
            <span className="ml-2 text-lg font-normal text-[#767676]">
              {selectedCover.name}
            </span>
          </p>

          <div className="flex flex-row space-x-1 overflow-x-auto whitespace-nowrap p-2 lg:grid lg:w-auto lg:grid-cols-5 lg:gap-[7px] lg:px-3">
            {PRODUCT_IMAGES.map((product, idx) => {
              return (
                <div
                  className={`flex-shrink-0 p-1 lg:flex lg:flex-col lg:items-center lg:justify-center ${
                    product.name === selectedCover.name
                      ? 'rounded-lg border-4 border-[#6F6F6F]'
                      : ''
                  }`}
                  key={product.name}
                >
                  <Image
                    src={product.images[0] as string}
                    ref={
                      productRefs?.current[
                        product.images[0]
                      ] as Ref<HTMLImageElement>
                    }
                    width={98}
                    height={98}
                    alt="car cover details"
                    className="h-20 w-20 cursor-pointer rounded bg-[#F2F2F2] lg:h-full lg:w-full"
                    onClick={() => {
                      setFeaturedImageIndex(idx);
                      setSelectedProductIndex(idx);
                      const ref = productRefs?.current[
                        product.images[0]
                      ] as React.RefObject<HTMLElement>;

                      ref?.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
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
                  {selectedCover.type}
                </span>
              </p>
            </div>
          </>
          {/* Cover Types Section */}
          <div className="flex flex-row space-x-1 overflow-x-auto whitespace-nowrap p-2 lg:grid lg:w-auto lg:grid-cols-5 lg:gap-[7px] lg:px-3">
            {coverTypeOptions &&
              coverTypeOptions.map((type) => (
                <button
                  className={`flex-shrink-0 p-1 lg:flex lg:flex-col lg:items-center lg:justify-center ${
                    type.type === selectedCover.type
                      ? 'rounded-lg border-4 border-[#6F6F6F]'
                      : ''
                  }`}
                  key={type.name}
                  // onClick={() => {
                  //   setFeaturedImageIndex();
                  //   setSelectedProduct(sku as TProductData);
                  //   const skuRef = sku?.sku
                  //     ? (productRefs?.current[
                  //         sku?.sku
                  //       ] as React.RefObject<HTMLElement>)
                  //     : null;
                  //   skuRef?.current?.scrollIntoView({
                  //     behavior: 'smooth',
                  //     block: 'nearest',
                  //     inline: 'center',
                  //   });
                  // }}
                  // disabled={isOptionDisabled(productOption, 'cover')}
                >
                  <Image
                    src={
                      selectedCover.type === type.type
                        ? selectedCover.images[0]
                        : type.images[0]
                    }
                    ref={
                      productRefs?.current[
                        selectedCover.images[0]
                      ] as Ref<HTMLImageElement>
                    }
                    width={98}
                    height={98}
                    alt="car cover details"
                    className="h-20 w-20 cursor-pointer rounded bg-[#F2F2F2] lg:h-full lg:w-full"
                    onClick={() => {
                      setFeaturedImageIndex(0);
                      setSelectedProductIndex(0);
                      const ref = productRefs?.current[
                        selectedCover.images[0]
                      ] as React.RefObject<HTMLElement>;

                      ref?.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end',
                        inline: 'center',
                      });
                    }}
                  />
                </button>
              ))}
          </div>

          <Separator className="mb-8 mt-4" />
          {/* Title and Descriptions*/}
          <div className="grid grid-cols-1">
            <div className="flex flex-col gap-0.5">
              <h2 className="font-roboto text-lg font-bold text-[#1A1A1A] md:text-[28px]">
                {`${selectedCover.type}`}&trade; {`${selectedCover.name}`}
              </h2>
              {/* Reviews */}
              <div className="flex items-center gap-1">
                <Rating
                  name="read-only"
                  value={5}
                  readOnly
                  style={{
                    height: '25px',
                  }}
                />
                <Popover>
                  <PopoverTrigger
                    className="text-blue-400 underline"
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
                              model: modelData[0]?.model as string,
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
              <p className="mb-2 text-gray-500">100+ Bought In Past Month</p>
            </div>
            <div className="flex-start flex items-center">
              <GoDotFill size={10} color="#008000 " />
              <p className="pl-1 text-sm font-medium capitalize text-black">
                Full Warranty 7 years
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
                $159.95
                <span className="top absolute ml-2.5 text-xl font-normal capitalize text-[#D13C3F]">
                  only{' '}
                  {`${Math.max(
                    2,
                    Math.min(7, Math.floor(reviewCount / 25) + 2)
                  )}`}{' '}
                  left
                </span>
              </p>
              <p className="text-lg font-normal text-[#1A1A1A] md:text-[22px]">
                <span className="mr-2 text-[#9C9C9C] line-through">$320</span>
                Save 50% ($160.05)
              </p>
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
                <div className="text-sm text-[#767676]">
                  <TimeTo2PMPST />
                </div>
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
            <div className="mt-8 w-full">
              {/* <DropdownPDP modelData={modelData} /> */}
            </div>
            {/* Add to Cart Button */}
            <>
              <Button
                className="mt-4 h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-xl"
                onClick={() => {
                  // selectedProduct?.sku &&
                  //   track('PDP_add_to_cart', {
                  //     sku: selectedProduct?.sku,
                  //   });
                  // handleAddToCart();
                  // isMobile ? router.push('/checkout') : setAddToCartOpen(true);
                  setSubmodelSelectionOpen((p) => !p);

                  // setAddToCartOpen(true);
                }}
              >
                Add To Cart
              </Button>
            </>
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
          <div className="-mx-4 mt-4 h-10 w-screen border border-gray-300 bg-[#F1F1F1] lg:hidden"></div>
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
    </section>
  );
}

export default PartialCoverSelector;

// const DesktopShowMoreCarousel = ({
//   selectedProduct,
//   modalProductImages,
// }: {
//   selectedProduct: TProductData;
//   modalProductImages: string[];
// }) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="mx-auto mt-9 h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white">
//           show more images
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="">
//         <Carousel>
//           <CarouselContent>
//             {modalProductImages.map((image, index) => (
//               <CarouselItem key={index}>
//                 <div className="p-1">
//                   <Card>
//                     <CardContent className="flex aspect-square items-center justify-center p-6">
//                       <Image
//                         src={image}
//                         alt={`Additional images of the ${selectedProduct.display_id} cover`}
//                         width={500}
//                         height={500}
//                       />
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </DialogContent>
//     </Dialog>
//   );
// };

const MobileImageCarousel = ({
  selectedCover,
}: {
  selectedCover: {
    name: string;
    images: string[];
  };
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

  const ActiveDot = () => (
    <div className="relative flex h-2.5 w-2.5">
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gray-600"></span>
    </div>
  );

  return (
    <div>
      <Carousel setApi={setApi}>
        <CarouselContent className="bg-[#F2F2F2] p-2">
          <CarouselItem>
            <Image
              src={selectedCover.images[0]}
              alt={`Additional images of a car cover cover`}
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
          {selectedCover.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                alt={`Additional images of the car cover`}
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

// const DotButtons = () => {
//   return <button type="button" className="rounded-full" onClick={() => scrollTo(index)} />;
// };

const AddToCartSelector = ({
  submodelSelectionOpen,
  setSubmodelSelectionOpen,
}: {
  submodelSelectionOpen: boolean;
  setSubmodelSelectionOpen: (value: SetStateAction<boolean>) => void;
}) => {
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');

  const modelData = useStore(store, (s) => s.modelData);
  const initModelData = useStore(store, (s) => s.initialModelData);
  const queryState = useStore(store, (s) => s.query);
  const setQuery = useStore(store, (s) => s.setQuery);
  const selectedProduct = useStore(store, (s) => s.selectedProduct);
  const color = useStore(store, (s) => s.selectedColor);

  console.log(modelData.length, modelData);

  const router = useRouter();

  const TypeDropdown = () => {
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">1</div>
        <select
          value={modelData[0]?.type as string}
          className={`bg w-full bg-transparent outline-none `}
          disabled={true}
        >
          <option value="">{modelData[0]?.type as string}</option>
        </select>
      </div>
    );
  };

  const MakeDropdown = () => {
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">2</div>
        <select
          value={modelData[0]?.make as string}
          className={`bg w-full bg-transparent outline-none `}
          disabled={queryState.make ? true : false}
        >
          <option value="">{modelData[0]?.make as string}</option>
        </select>
      </div>
    );
  };

  const ModelDropdown = () => {
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">3</div>
        <select
          value={modelData[0]?.model as string}
          className={`bg w-full bg-transparent outline-none `}
          disabled={queryState.model ? true : false}
        >
          <option value="">{modelData[0]?.model as string}</option>
        </select>
      </div>
    );
  };

  const YearDropdown = () => {
    const yearOptions = Array.from(
      new Set(
        modelData.flatMap((model) =>
          model.year_options
            ?.split(',')

            .filter(Boolean)
        )
      )
    ).sort((a, b) => Number(a) - Number(b));
    console.log(yearOptions);
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">4</div>
        <select
          value={queryState.year}
          className={`bg w-full bg-transparent outline-none `}
          onChange={(e) =>
            setQuery({
              year: e.target.value,
              submodel: '',
            })
          }
        >
          <option value="">Year</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const submodelOptions = queryState.year
    ? Array.from(
        new Set(
          initModelData
            .filter((model) => model.year_options?.includes(queryState.year))
            .map((model) => model.submodel1)
            .filter(Boolean)
        )
      ).sort()
    : [];

  console.log(submodelOptions);

  const SubmodelDropdown = () => {
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">5</div>
        <select
          value={queryState.submodel}
          className={`bg w-full bg-transparent outline-none `}
          onChange={(e) => setQuery({ submodel: e.target.value })}
        >
          <option value="">Submodel</option>
          {submodelOptions.map((submodel) => (
            <option key={submodel} value={submodel as string}>
              {submodel}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const { addToCart } = useCartContext();

  console.log(modelData, selectedProduct);

  const cartProduct = modelData.find((p) => p.display_color === color);

  const handleAddToCart = () => {
    if (!cartProduct) return;
    console.log(cartProduct);
    return addToCart({ ...cartProduct, quantity: 1 });
  };

  return (
    <Drawer
      open={submodelSelectionOpen}
      onOpenChange={(o) => setSubmodelSelectionOpen(o)}
    >
      <DrawerContent className="h-[75vh] bg-neutral-800">
        <DrawerHeader>
          <DrawerTitle className="text-center text-[22px] font-black text-white">
            Complete Your Vehicle
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex w-full flex-col gap-4 px-4">
          <TypeDropdown />
          <MakeDropdown />
          <ModelDropdown />
          <YearDropdown />
          <SubmodelDropdown />
        </div>
        <DrawerFooter>
          <p className="text-white">${selectedProduct.msrp}</p>
          <Button
            onClick={() => {
              handleAddToCart();
              router.push('/checkout');
            }}
          >
            Add To Cart
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
