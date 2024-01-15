'use client';

import { TProductData, fetchPDPData } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { GoDotFill } from 'react-icons/go';
import { IoRibbonSharp } from 'react-icons/io5';
import { FaShippingFast, FaThumbsUp } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import Link from 'next/link';
import { useState } from 'react';
import { BsBoxSeam, BsGift, BsInfoCircle } from 'react-icons/bs';
import { DropdownPDP } from './DropdownPDP';
import { useToast } from '@/components/ui/use-toast';
import { useCartContext } from '@/providers/CartProvider';
import {
  TPDPPathParams,
  TPDPQueryParams,
} from '@/app/[productType]/[...product]/page';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from '../ui/button';
import { generationDefaultCarCovers } from '@/lib/constants';
import { Card, CardHeader, CardTitle } from '../ui/card';
import AgentProfile from '@/images/PDP/agent_profile.png';
import { ProductVideo } from './ProductVideo';
import { FolderUpIcon, SecureIcon, ThumbsUpIcon } from './images';
import { MoneyBackIcon } from './images/MoneyBack';

function CarSelector({
  modelData,
  pathParams,
  searchParams,
  submodels,
  secondSubmodels,
}: {
  modelData: TProductData[];
  pathParams: TPDPPathParams;
  submodels: string[];
  secondSubmodels: string[];
  searchParams: TPDPQueryParams;
}) {
  const initialProduct = modelData.find(
    (product) =>
      (product.display_color === 'Black Red Stripe' ||
        product.display_color === 'Black Gray Stripe') &&
      generationDefaultCarCovers.includes(product.sku.slice(-6))
  );

  const [selectedProduct, setSelectedProduct] = useState<TProductData>(
    initialProduct ?? modelData[0]
  );
  const [featuredImage, setFeaturedImage] = useState<string>(
    selectedProduct?.feature as string
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const { toast } = useToast();
  const { addToCart } = useCartContext();
  const isReadyForSelection = submodels.length
    ? pathParams?.product?.length === 3 && !!searchParams?.submodel
    : pathParams?.product?.length === 3;

  const shouldSubmodelDisplay = !!submodels.length && !searchParams?.submodel;
  // console.log('shouldSubmodelDisplay', shouldSubmodelDisplay);
  // console.log(modelData.filter((product) => product.sku.includes('100983')));

  const uniqueColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));

  const uniqueTypes = Array.from(
    new Set(modelData.map((model) => model.display_id))
  ).map((type) => modelData.find((model) => model.display_id === type));
  // console.log('uniqueCoverColors', uniqueColors);
  // console.log('uniqueCoverTypes', uniqueTypes);

  // const handleAddToCart = () => {
  //   const selectedProduct = displayedProduct;
  //   if (!selectedProduct) return;
  //   console.log('running');
  //   return addToCart({ ...selectedProduct, quantity: 1 });
  // };

  const productImages = selectedProduct?.product?.split(',') ?? [];
  // console.log('productImages', productImages);

  return (
    <section className="mx-auto my-8 h-auto w-full max-w-[1440px]">
      <div className="flex w-full flex-col items-start justify-between gap-14 lg:flex-row">
        {/* Left Panel */}
        <div className=" mt-[29px] flex h-auto w-full flex-col items-stretch justify-center pb-8 lg:w-3/5 lg:pb-0">
          {/* Featured Image */}
          <div className="flex h-[400px] w-full items-center justify-center rounded-xl bg-[#F2F2F2] md:h-[500px] lg:h-[650px]">
            <Image
              id="featured-image"
              src={featuredImage ?? ''}
              alt="a car with a car cover on it"
              width={500}
              height={500}
              className="h-full w-full md:h-[250px] md:w-[250px] lg:h-[500px] lg:w-[500px]"
              // onClick={console.log(selectedImage)}
            />
          </div>
          {/* Product Video */}
          <ProductVideo />
          {/* Gallery Images */}
          <div className="grid w-auto grid-cols-2 gap-[16px] pt-4">
            {productImages.slice(0, 4).map((img, idx) => (
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
                    cursor-pointer   border-red-600 object-cover
                  `}
                  onClick={() => setFeaturedImage(img)}
                />
              </div>
            ))}
          </div>

          <Button className="mx-auto mt-9 h-12 w-[216px] rounded border border-[#1A1A1A] bg-transparent text-base text-lg font-normal capitalize text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white">
            show more images
          </Button>
        </div>

        {/* Right Panel */}
        <div className=" h-auto w-full pl-0 lg:w-2/5">
          {/* Color options */}
          <p className="mb-2 ml-2 text-lg font-black text-[#1A1A1A]">
            {isReadyForSelection
              ? `Cover Colors`
              : `Please select your car's details below`}{' '}
            <span className="ml-4 text-lg font-normal text-[#767676]">
              {isReadyForSelection && `${selectedProduct?.display_color}`}
            </span>
          </p>
          {isReadyForSelection && (
            <div className="grid w-auto grid-cols-5 gap-[7px] ">
              {uniqueColors?.map((sku) => {
                return (
                  <div
                    className="flex flex-col items-center justify-center"
                    key={sku?.sku}
                  >
                    <Image
                      src={sku?.feature as string}
                      width={98}
                      height={98}
                      alt="car cover details"
                      className={`m-1 h-full w-full cursor-pointer rounded border border-gray-300`}
                      onClick={() => {
                        setFeaturedImage(sku?.feature as string);
                        setSelectedProduct(sku as TProductData);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {isReadyForSelection && (
            <>
              {/* <Separator className="my-4" /> */}
              <div className="mt-10">
                <p className="mb-2 ml-2 text-lg font-black text-[#1A1A1A]">
                  Cover Types
                  <span className="ml-4 text-lg font-normal text-[#767676]">
                    {isReadyForSelection && ` ${selectedProduct?.display_id}`}
                  </span>
                </p>
              </div>
            </>
          )}
          {isReadyForSelection && (
            <div className="grid w-auto grid-cols-5 gap-[7px]">
              {uniqueTypes.map((type, idx) => {
                return (
                  <button
                    className="flex flex-col items-center justify-center"
                    key={type?.sku}
                    onClick={() => {
                      setFeaturedImage(type?.feature as string);
                      setSelectedProduct(type as TProductData);
                    }}
                    // disabled={isOptionDisabled(productOption, 'cover')}
                  >
                    <Image
                      src={type?.feature as string}
                      width={98}
                      height={98}
                      alt="car cover details"
                      className={`m-1 h-full w-full cursor-pointer rounded border border-gray-300`}
                    />
                  </button>
                );
              })}
            </div>
          )}
          <Separator className="mb-8 mt-4" />
          {/* Title and Descriptions*/}
          <div className="grid grid-cols-1 gap-4">
            <div className="lg:h-20">
              <h2 className="pb-4 text-lg font-black text-[#1A1A1A] md:text-[28px]">
                {`${selectedProduct?.year_generation}
                ${selectedProduct?.make} ${selectedProduct?.product_name} ${selectedProduct?.display_id}`}
                &trade; {`${selectedProduct?.display_color}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex-start flex items-center leading-4">
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
          </div>
          {/* Pricing */}
          <div className="pt-6 md:pt-11">
            <div className="grid grid-cols-1">
              <p className="text-dark relative mb-2.5 text-xl font-bold capitalize md:text-3xl">
                ${selectedProduct?.msrp}
                <span className="absolute top-0 ml-2.5 text-xl font-normal capitalize text-[#D13C3F]">
                  only 3 left
                </span>
              </p>
              {selectedProduct?.price && (
                <p className="text-lg font-normal text-[#1A1A1A] md:text-[22px]">
                  <span className="mr-2 text-[#9C9C9C] line-through">
                    ${selectedProduct?.price}
                  </span>
                  Save 50% ( $
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
          {/* info stuff */}
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
                  <span className="font-normal">
                    Delivery by <span className="uppercase">oct18</span>
                  </span>
                </div>
                <p className="text-dark text-sm">
                  Order within{' '}
                  <span className="text-[#767676]">9 Hours 3 Mins</span>
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
              <BsInfoCircle size={20} color="#767676" />
            </div>
            <div className="mt-8 w-full">
              <DropdownPDP
                modelData={modelData}
                submodels={submodels}
                secondSubmodels={secondSubmodels}
              />
            </div>
            {!isReadyForSelection && selectedProduct ? (
              <>
                <Card className="flex w-full flex-col items-center justify-center bg-[#393939] px-4 py-6">
                  <CardHeader>
                    <CardTitle className="text-base font-black uppercase text-white md:text-[22px]">
                      select your vehicle
                    </CardTitle>
                  </CardHeader>
                  {/* <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="1year">Apple</SelectItem>
                        <SelectItem value="2year">Banana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select> */}
                </Card>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="mt-4 h-[35px] w-full rounded bg-[#BE1B1B] text-base text-lg font-bold uppercase text-white md:h-[60px] md:text-xl">
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
                className="mt-4 h-[60px] w-full bg-[#BE1B1B] text-lg disabled:bg-[#BE1B1B] md:w-[400px]"
                // onClick={() => {
                //   handleAddToCart();
                //   toast({
                //     duration: 3000,
                //     action: (
                //       <ToastAction altText="Success" className="w-full">
                //         Added your item to cart!
                //       </ToastAction>
                //     ),
                //   });
                // }}
              >
                Add To Cart
              </Button>
            )}
          </div>
          <div className="ml-2 pt-5">
            <p className="text-base font-normal text-[#1A1A1A]">
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
          </div>

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
                <Link
                  href="#"
                  className="text-base font-normal capitalize text-[#0C87B8] underline"
                >
                  live chat
                </Link>
                {/* PUT LIVE CHAT BTN HERE */}
              </div>
            </div>
          </div>
          <Separator className="my-10" />
          <div className="pt-4 lg:px-0 lg:pt-0">
            <h3 className="mb-[28px] text-xl font-black uppercase text-[#1A1A1A]">
              car cover features
            </h3>
            <div className="flex-start ml-2 flex items-center pb-2 leading-4">
              <GoDotFill size={10} color="#000000 " />
              <p className="pl-1 text-lg font-medium capitalize text-black">
                Tailored to your car model
              </p>
            </div>
            <div className="flex-start ml-2 flex items-center pb-2 leading-4">
              <GoDotFill size={10} color="#000000 " />
              <p className="pl-1 text-lg font-medium capitalize text-black">
                all-season waterproof protection
              </p>
            </div>
            <div className="flex-start ml-2 flex items-center pb-2 leading-4">
              <GoDotFill size={10} color="#000000 " />
              <p className="pl-1 text-lg font-medium capitalize text-black">
                Scratchproof, durable & lightweight
              </p>
            </div>
            <div className="flex-start ml-2 flex items-center pb-2 leading-4">
              <GoDotFill size={10} color="#000000 " />
              <p className="pl-1 text-lg font-medium capitalize text-black">
                Soft Inner-lining
              </p>
            </div>
            <div className="flex-start ml-2 flex items-center pb-2 leading-4">
              <GoDotFill size={10} color="#000000 " />
              <p className="pl-1 text-lg font-medium capitalize text-black">
                100% Waterproof - Zero Leaks Guaranteed
              </p>
            </div>
            <div className="flex-start ml-2 flex items-center pb-2 leading-4">
              <GoDotFill size={10} color="#000000 " />
              <p className="pl-1 text-lg font-medium capitalize text-black">
                100% UV Protection
              </p>
            </div>
            <div className="flex-start ml-2 flex items-center pb-2 leading-4">
              <GoDotFill size={10} color="#000000 " />
              <p className="pl-1 text-lg font-medium capitalize text-black">
                Easy On/Off with elastic hems
              </p>
            </div>
            <div className="flex-start ml-2 flex items-center pb-2 leading-4">
              <GoDotFill size={10} color="#000000 " />
              <p className="pl-1 text-lg font-medium capitalize text-black">
                effortless cleaning
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarSelector;
