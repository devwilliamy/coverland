'use client';

import { TProductData, TReviewData, fetchPDPData } from '@/lib/db';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { GoDotFill } from 'react-icons/go';
import { IoRibbonSharp } from 'react-icons/io5';
import { FaShippingFast, FaThumbsUp } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';
import Link from 'next/link';
import { ReactPropTypes, useEffect, useState } from 'react';
import { BsBoxSeam, BsGift, BsInfoCircle } from 'react-icons/bs';
import { DropdownPDP } from './DropdownPDP';
import { useToast } from '@/components/ui/use-toast';
import { useCartContext } from '@/providers/CartProvider';
import Rating from '@mui/material/Rating';
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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import AgentProfile from '@/images/PDP/agent_profile.png';
import { useMediaQuery } from '@mantine/hooks';
// import { ProductVideo } from './ProductVideo';
import { FolderUpIcon, SecureIcon, ThumbsUpIcon } from './images';
import { MoneyBackIcon } from './images/MoneyBack';
import { EditIcon } from './components/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { EditVehicleDropdown } from './EditVehicleDropdown';
import { ToastAction } from '../ui/toast';
import dynamic from 'next/dynamic';
import { type CarouselApi } from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const ProductVideo = dynamic(() => import('./ProductVideo'), { ssr: false });

function CarSelector({
  modelData,
  pathParams,
  searchParams,
  submodels,
  secondSubmodels,
  reviewData,
}: {
  modelData: TProductData[];
  pathParams: TPDPPathParams;
  submodels: string[];
  secondSubmodels: string[];
  searchParams: TPDPQueryParams;
  reviewData: TReviewData[];
}) {
  const initialProduct =
    modelData.find(
      (product) =>
        product.display_color === 'Black Red Stripe' &&
        product.year_generation === pathParams.product[2]
    ) ??
    modelData.find(
      (product) =>
        product.display_color === 'Black Gray Stripe' &&
        product.year_generation === pathParams.product[2]
    );

  console.log(initialProduct);

  const displays = modelData.map((model) => model.display_color);
  console.log('displays', displays);

  const [selectedProduct, setSelectedProduct] = useState<TProductData>(
    initialProduct ?? modelData[0]
  );
  const [featuredImage, setFeaturedImage] = useState<string>(
    selectedProduct?.feature as string
  );
  const [showMore, setShowMore] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

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

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    console.log('running');
    return addToCart({ ...selectedProduct, quantity: 1 });
  };
  console.log(showMore);

  const productImages =
    selectedProduct?.product
      ?.split(',')
      .filter((img) => img !== featuredImage) ?? [];
  console.log('productImages', productImages);
  const modalProductImages = productImages.slice(5);
  const reviewScore = reviewData?.reduce(
    (acc, review) => acc + Number(review.rating_stars ?? 0),
    0
  );
  const reviewCount = reviewData?.length ?? 50;

  const avgReviewScore = (reviewScore / reviewCount).toFixed(1);

  console.log(avgReviewScore);
  console.log(searchParams?.submodel);
  console.log(selectedProduct);

  return (
    <section className="h-auto w-full max-w-[1440px] mx-auto my-8">
      <div className="flex flex-col lg:flex-row justify-between w-full items-start lg:gap-14">
        {isMobile && (
          <div className="flex flex-col gap-2 z-50">
            <h2 className="text-2xl font-roboto font-extrabold text-[#1A1A1A]">
              {`${selectedProduct?.year_generation} ${selectedProduct?.make} ${selectedProduct?.product_name} ${searchParams?.submodel ? selectedProduct?.submodel1 : ''}`}
            </h2>
            <div className="flex gap-2 items-center z-50">
              <EditIcon />
              <Popover>
                <PopoverTrigger asChild>
                  <button className="underline">Edit Vehicle</button>
                </PopoverTrigger>
                <PopoverContent className="p-5 z-50 min-w-[100px] bg-white border border-gray-300 rounded-xl shadow-lg">
                  <EditVehicleDropdown />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        {/* Left Panel */}
        <div className="h-auto w-full lg:w-3/5 flex flex-col justify-center items-stretch pb-8 lg:pb-0 mt-[29px]">
          {/* Featured Image */}
          <div className={`${showMore ? 'overflow-scroll' : 'overflow-hidden max-h-[1775px]'}`}>
            <div className="w-full h-[400px] md:h-[500px] lg:h-[650px] rounded-xl bg-[#F2F2F2] flex justify-center items-center">
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
                  className="w-full h-full md:w-[250px] md:h-[250px] lg:w-[500px] lg:h-[500px]"
                />
              )}
            </div>
  
            {/* Product Video */}
            <ProductVideo />
            {/* Gallery Images */}
            <div className="hidden lg:grid grid-cols-2 w-auto gap-[16px] pt-4">
              {productImages.map((img, idx) => (
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
                    className="w-full h-full cursor-pointer object-contain"
                    onClick={() => setFeaturedImage(img)}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button
            className="h-12 w-[216px] mx-auto mt-9 text-lg hidden lg:block bg-transparent hover:bg-[#1A1A1A] rounded border border-[#1A1A1A] font-normal text-[#1A1A1A] hover:text-white capitalize"
            onClick={() => setShowMore((p) => !p)}
          >
            {showMore ? 'show less images' : 'show more images'}
          </Button>
        </div>
  
        {/* Right Panel */}
        <div className="h-auto w-full lg:w-2/5 pl-0">
          <div className="hidden mt-[29px] border-solid border-2 py-7 px-3 rounded-lg lg:flex flex-col gap-2">
            <h2 className="text-lg md:text-[28px] font-roboto font-extrabold text-[#1A1A1A]">
              {`${selectedProduct?.year_generation} ${selectedProduct?.make} ${selectedProduct?.product_name} ${searchParams?.submodel ? selectedProduct?.submodel1 : ''}`}
            </h2>
            <div className="flex gap-2 items-center">
              <EditIcon />
              <Popover>
                <PopoverTrigger asChild>
                  <button className="underline">Edit Vehicle</button>
                </PopoverTrigger>
                <PopoverContent className="p-5 min-w-[100px] bg-white border border-gray-300 rounded-xl shadow-lg">
                  <EditVehicleDropdown />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <p className="font-black text-lg text-[#1A1A1A] mt-5 ml-3">
            {isReadyForSelection
              ? `Cover Colors`
              : `Please select your car's details below`}{' '}
            <span className="font-normal ml-2 text-lg text-[#767676]">
              {isReadyForSelection && `${selectedProduct?.display_color}`}
            </span>
          </p>
          {isReadyForSelection && (
            <div className="grid grid-cols-5 w-auto gap-[7px] px-3">
              {uniqueColors?.map((sku) => {
                return (
                  <div
                    className={`flex flex-col justify-center items-center p-1 ${
                      sku?.display_color === selectedProduct?.display_color
                        ? 'border-4 border-[#6F6F6F] rounded-lg'
                        : ''
                    }`}
                    key={sku?.sku}
                  >
                    <Image
                      src={sku?.feature as string}
                      width={98}
                      height={98}
                      alt="car cover details"
                      className="w-full h-full rounded cursor-pointer bg-[#F2F2F2]"
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
              <Separator className="my-4" />
              <div>
                <p className="font-black text-lg text-[#1A1A1A] ml-3">
                  Cover Types
                  <span className="font-normal ml-2 text-lg text-[#767676]">
                    {isReadyForSelection && ` ${selectedProduct?.display_id}`}
                  </span>
                </p>
              </div>
            </>
          )}
          {isReadyForSelection && (
            <div className="grid grid-cols-5 w-auto gap-[7px] px-3">
              {uniqueTypes.map((sku, idx) => {
                return (
                  <button
                    className={`flex flex-col justify-center items-center p-1 ${
                      sku?.display_id === selectedProduct?.display_id
                        ? 'border-4 border-[#6F6F6F] rounded-lg'
                        : ''
                    }`}
                    key={sku?.sku}
                    onClick={() => {
                      setFeaturedImage(sku?.feature as string);
                      setSelectedProduct
  
}

export default CarSelector;

const DesktopShowMoreCarousel = ({
  selectedProduct,
  modalProductImages,
}: {
  selectedProduct: TProductData;
  modalProductImages: string[];
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-12 w-[216px] mx-auto mt-9 text-lg bg-transparent hover:bg-[#1A1A1A] rounded border border-[#1A1A1A] font-normal text-[#1A1A1A] hover:text-white capitalize">
          show more images
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <Carousel>
          <CarouselContent>
            {modalProductImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={image}
                        alt={`Additional images of the ${selectedProduct.display_id} cover`}
                        width={500}
                        height={500}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

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

  const Dot = () => (
    <div className="relative flex h-3 w-3">
      <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-300"></span>
    </div>
  );

  const ActiveDot = () => (
    <div className="relative flex h-5 w-5">
      <span className="relative inline-flex rounded-full h-5 w-5 bg-gray-600"></span>
    </div>
  );

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>
          <Image
            src={selectedProduct.feature as string}
            alt={`Additional images of the ${selectedProduct.display_id} cover`}
            width={500}
            height={500}
            // placeholder="blur"
          />
        </CarouselItem>
        {productImages.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={image}
              alt={`Additional images of the ${selectedProduct.display_id} cover`}
              width={500}
              height={500}
              // placeholder="blur"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex w-full items-center gap-2 my-1 justify-center">
        {scrollSnaps.map((_, index) =>
          index === current ? <ActiveDot key={index} /> : <Dot key={index} />
        )}
      </div>
    </Carousel>
  );
};

// const DotButtons = () => {
//   return <button type="button" className="rounded-full" onClick={() => scrollTo(index)} />;
// };
