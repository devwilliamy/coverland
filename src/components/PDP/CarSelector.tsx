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
  console.log('shouldSubmodelDisplay', shouldSubmodelDisplay);
  console.log(modelData.filter((product) => product.sku.includes('100983')));

  const uniqueColors = Array.from(
    new Set(modelData.map((model) => model.display_color))
  ).map((color) => modelData.find((model) => model.display_color === color));

  const uniqueTypes = Array.from(
    new Set(modelData.map((model) => model.display_id))
  ).map((type) => modelData.find((model) => model.display_id === type));
  console.log('uniqueCoverColors', uniqueColors);
  console.log('uniqueCoverTypes', uniqueTypes);

  // const handleAddToCart = () => {
  //   const selectedProduct = displayedProduct;
  //   if (!selectedProduct) return;
  //   console.log('running');
  //   return addToCart({ ...selectedProduct, quantity: 1 });
  // };

  const productImages = selectedProduct?.product?.split(',') ?? [];
  console.log('productImages', productImages);

  return (
    <section className="h-auto w-full max-w-[1440px] mx-auto my-8">
      <div className="flex flex-col lg:flex-row justify-between w-full items-start gap-14">
        {/* Left Panel */}
        <div className=" h-auto w-full lg:w-3/5 flex flex-col justify-center items-stretch pb-8 lg:pb-0 mt-[29px]">
          {/* Featured Image */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-[650px] rounded-xl bg-[#F2F2F2] flex justify-center items-center">
            <Image
              id="featured-image"
              src={featuredImage ?? ''}
              alt="a car with a car cover on it"
              width={500}
              height={500}
              className="w-full h-full md:w-[250px] md:h-[250px] lg:w-[500px] lg:h-[500px]"
              // onClick={console.log(selectedImage)}
            />
          </div>
          {/* Product Video */}
          <ProductVideo />
          {/* Gallery Images */}
          <div className="grid grid-cols-2 w-auto gap-[16px] pt-4">
            {productImages.slice(0, 4).map((img, idx) => (
              <div
                className="w-full h-auto md:h-[350px] bg-[#F2F2F2] rounded-xl p-3.5 border-transparent"
                key={img}
              >
                <Image
                  key={idx}
                  src={img}
                  width={200}
                  height={200}
                  alt="car cover details"
                  className={`w-full h-full cursor-pointer object-cover 
                    // selectedProduct.product?.includes(img)
                    //   ? 'border-4 border-red-600 rounded-lg'
                    //   : ''
                  `}
                  onClick={() => setFeaturedImage(img)}
                />
              </div>
            ))}
          </div>

          <Button className="h-12 w-[216px] mx-auto mt-9 text-lg bg-transparent hover:bg-[#1A1A1A] rounded border border-[#1A1A1A] font-normal text-[#1A1A1A] hover:text-white capitalize">
            show more images
          </Button>
        </div>

        {/* Right Panel */}
        <div className=" h-auto w-full lg:w-2/5 pl-0">
          {/* Color options */}
          <p className="font-black text-lg text-[#1A1A1A] mb-2 ml-2">
            {isReadyForSelection
              ? `Cover Colors`
              : `Please select your car's details below`}{' '}
            <span className="font-normal ml-4 text-lg text-[#767676]">
              {isReadyForSelection && `${selectedProduct?.display_color}`}
            </span>
          </p>
          {isReadyForSelection && (
            <div className="grid grid-cols-5 w-auto gap-[7px] ">
              {uniqueColors?.map((sku) => {
                return (
                  <div
                    className="flex flex-col justify-center items-center"
                    key={sku?.sku}
                  >
                    <Image
                      src={sku?.feature as string}
                      width={98}
                      height={98}
                      alt="car cover details"
                      className={`w-full h-full m-1 border border-gray-300 rounded cursor-pointer`}
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
                <p className="font-black text-lg text-[#1A1A1A] mb-2 ml-2">
                  Cover Types
                  <span className="font-normal ml-4 text-lg text-[#767676]">
                    {isReadyForSelection && ` ${selectedProduct?.display_id}`}
                  </span>
                </p>
              </div>
            </>
          )}
          {isReadyForSelection && (
            <div className="grid grid-cols-5 w-auto gap-[7px]">
              {uniqueTypes.map((type, idx) => {
                return (
                  <button
                    className="flex flex-col justify-center items-center"
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
                      className={`w-full h-full m-1 border border-gray-300 rounded cursor-pointer`}
                    />
                  </button>
                );
              })}
            </div>
          )}
          <Separator className="mt-4 mb-8" />
          {/* Title and Descriptions*/}
          <div className="grid grid-cols-1 gap-4">
            <div className="lg:h-20">
              <h2 className="text-lg md:text-[28px] font-roboto font-extrabold text-[#1A1A1A] pb-4">
                {`${selectedProduct?.year_generation}
                ${selectedProduct?.make} ${selectedProduct?.product_name} ${selectedProduct?.display_id}`}
                &trade; {`${selectedProduct?.display_color}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-start items-center leading-4">
                <GoDotFill size={10} color="#008000 " />
                <p className="text-black font-medium text-sm capitalize pl-1">
                  Full Warranty 7 years
                </p>
              </div>
              <div className="flex flex-start items-center leading-4">
                <GoDotFill size={10} color="#008000 " />
                <p className="text-black font-medium text-sm capitalize pl-1">
                  In Stock
                </p>
              </div>
            </div>
          </div>
          {/* Pricing */}
          <div className="pt-6 md:pt-11">
            <div className="grid grid-cols-1">
              <p className="text-dark text-xl md:text-3xl font-bold capitalize relative mb-2.5">
                ${selectedProduct?.msrp}
                <span className="text-xl capitalize text-[#D13C3F] font-normal absolute top-0 ml-2.5">
                  only 3 left
                </span>
              </p>
              {selectedProduct?.price && (
                <p className="text-[#1A1A1A] text-lg md:text-[22px] font-normal">
                  <span className="text-[#9C9C9C] line-through mr-2">
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
          <div className="flex flex-col justify-start items-start pt-8">
            <div className="flex flex-row justify-start items-start">
              <div className="flex flex-col justify-start items-start pt-0 pr-4">
                <BsBoxSeam size={20} color="#000" />
              </div>
              <div className="flex flex-col justify-start items-start w-full md:w-auto">
                <div className="text-dark text-base md:text-lg capitalize leading-4 xl:flex flex-row justify-start items-center">
                  <span className="text-base md:text-lg uppercase leading-6 font-bold xl:mr-1">
                    Free shipping
                  </span>
                  <br className="xl:hidden" />
                  <span className="hidden xl:block md:mr-1">-</span>
                  <span className="font-normal">
                    Delivery by <span className="uppercase">oct18</span>
                  </span>
                </div>
                <p className="text-dark text-sm">
                  Order within{' '}
                  <span className="text-[#767676]">9 Hours 3 Mins</span>
                </p>
                <p className="text-[#1B8500] font-normal text-sm pt-1.5">
                  Free Returns for 30 Days
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center pt-4">
              <BsGift size={20} color="#000" />
              <p className="text-[#1A1A1A] text-lg font-normal capitalize ml-4 mr-1">
                <span className="uppercase font-bold">$30 free</span> value kit
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
                <Card className="w-full px-4 py-6 flex flex-col justify-center items-center bg-[#393939]">
                  <CardHeader>
                    <CardTitle className="font-black text-white text-base md:text-[22px] uppercase">
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
                    <Button className="h-[35px] md:h-[60px] w-full mt-4 text-lg bg-[#BE1B1B] rounded text-white uppercase font-bold md:text-xl">
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
                className="h-[60px] md:w-[400px] w-full mt-4 text-lg bg-[#BE1B1B] disabled:bg-[#BE1B1B]"
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
          <div className="pt-5 ml-2">
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
          </div>

          <Separator className="my-8" />
          {/* Selling Attributes */}
          <div className="grid grid-cols-2 gap-4 pb-4">
            <div className="flex flex-row">
              <div className="rounded-full border border-dark w-10 h-10 flex flex-col justify-center items-center">
                <ThumbsUpIcon />
              </div>
              <div className="flex flex-col justify-center pl-2">
                <p className="text-sm text-black font-normal w-20">
                  Fit Guaranteed
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="rounded-full border border-dark w-10 h-10 flex flex-col justify-center items-center">
                <SecureIcon />
              </div>
              <div className="flex flex-col justify-center pl-2">
                <p className="text-sm text-black font-normal w-24">
                  Secure Shopping
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row">
              <div className="rounded-full border border-dark w-10 h-10 flex flex-col justify-center items-center">
                <FolderUpIcon />
              </div>
              <div className="flex flex-col justify-center pl-2">
                <p className="text-sm text-black font-normal w-24">
                  30-Days Free Returns
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="rounded-full border border-dark w-10 h-10 flex flex-col justify-center items-center">
                <MoneyBackIcon />
              </div>
              <div className="flex flex-col justify-center pl-2">
                <p className="text-sm text-black font-normal w-24">
                  60-Days Full Money Back
                </p>
              </div>
            </div>
          </div>
          {/* CSR */}
          <div className="flex flex-row items-center gap-2.5 pt-8">
            <div className="h-[58px] w-[58px] flex flex-col justify-center items-center">
              <Image
                src={AgentProfile}
                alt="agent-profile"
                width={58}
                height={58}
                className="rounded-full w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <p className="text-[#1A1A1A] font-black text-lg">Need Help?</p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="tel:1-800-799-5165"
                  className="text-[#1A1A1A] hover-underline-animation-dark text-lg font-normal"
                >
                  1-800-799-5165
                </Link>
                <Link
                  href="#"
                  className="text-[#0C87B8] text-base font-normal underline capitalize"
                >
                  live chat
                </Link>
                {/* PUT LIVE CHAT BTN HERE */}
              </div>
            </div>
          </div>
          <Separator className="my-10" />
          <div className="lg:px-0 pt-4 lg:pt-0">
            <h3 className="font-black text-[#1A1A1A] text-xl uppercase mb-[28px]">
              car cover features
            </h3>
            <div className="flex flex-start items-center leading-4 pb-2 ml-2">
              <GoDotFill size={10} color="#000000 " />
              <p className="text-black font-medium text-lg pl-1 capitalize">
                Tailored to your car model
              </p>
            </div>
            <div className="flex flex-start items-center leading-4 pb-2 ml-2">
              <GoDotFill size={10} color="#000000 " />
              <p className="text-black font-medium text-lg pl-1 capitalize">
                all-season waterproof protection
              </p>
            </div>
            <div className="flex flex-start items-center leading-4 pb-2 ml-2">
              <GoDotFill size={10} color="#000000 " />
              <p className="text-black font-medium text-lg pl-1 capitalize">
                Scratchproof, durable & lightweight
              </p>
            </div>
            <div className="flex flex-start items-center leading-4 pb-2 ml-2">
              <GoDotFill size={10} color="#000000 " />
              <p className="text-black font-medium text-lg pl-1 capitalize">
                Soft Inner-lining
              </p>
            </div>
            <div className="flex flex-start items-center leading-4 pb-2 ml-2">
              <GoDotFill size={10} color="#000000 " />
              <p className="text-black font-medium text-lg pl-1 capitalize">
                100% Waterproof - Zero Leaks Guaranteed
              </p>
            </div>
            <div className="flex flex-start items-center leading-4 pb-2 ml-2">
              <GoDotFill size={10} color="#000000 " />
              <p className="text-black font-medium text-lg pl-1 capitalize">
                100% UV Protection
              </p>
            </div>
            <div className="flex flex-start items-center leading-4 pb-2 ml-2">
              <GoDotFill size={10} color="#000000 " />
              <p className="text-black font-medium text-lg pl-1 capitalize">
                Easy On/Off with elastic hems
              </p>
            </div>
            <div className="flex flex-start items-center leading-4 pb-2 ml-2">
              <GoDotFill size={10} color="#000000 " />
              <p className="text-black font-medium text-lg pl-1 capitalize">
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
