'use client';

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
import { TInitialProductDataDB, TReviewData } from '@/lib/db';
import { Rating } from '@mui/material';
import { track } from '@vercel/analytics';
import Image from 'next/image';
import Link from 'next/link';
import { BsBoxSeam, BsGift } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import AgentProfile from '@/images/PDP/agent_profile.png';
import { CarSelectionContext } from './CarPDP';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, SetStateAction, useContext, useState } from 'react';
import CartSheet from '@/components/cart/CartSheet';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { IoClose } from 'react-icons/io5';
import ReviewSection from '@/components/PDP/components/ReviewSection';
import { generateProductsLeft } from '@/lib/utils';
import Dialog from '@/components/ui/dialog-tailwind-ui';
import { useParams, useRouter } from 'next/navigation';
import { compareRawStrings } from '@/lib/utils';
import ProductVideo from '@/components/PDP/ProductVideo';
import SquareVideo from '@/videos/Coverland_Square.mp4';
import SquareThumbnail from '@/video/Thumbnail_Square.webp';
import { useStore } from 'zustand';
import { useCartContext } from '@/providers/CartProvider';
import {
  TPathParams,
  getCompleteSelectionData,
  getUniqueValues,
} from '../../utils';
import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';

const getOffset = (
  element: HTMLElement | null | undefined
): number | undefined => {
  const elementRect = element?.getBoundingClientRect();
  return elementRect?.top;
};

export function ProductContent({
  selectedProduct,
  reviewCount,
  avgReviewScore,
  reviewData,
}: {
  selectedProduct: TInitialProductDataDB | null | undefined;
  modelData: TInitialProductDataDB[];
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
  const params = useParams<TPathParams>();

  const [addToCartOpen, setAddToCartOpen] = useState<boolean>(false);
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState<boolean>(false);
  const [showStickyAddToCartButton, setShowStickyAddToCartButton] =
    useState<boolean>(false);

  // For sticky Add To Cart on mobile only (can maybe extract this out)
  // Will check if Add To Cart has been scroll past, if so, will show sticky button
  useEffect(() => {
    const listenToScroll = () => {
      if (!isMobile) return;
      const heightToHide = getOffset(
        document.getElementById('addToCartButton')
      );
      const windowScrollHeight =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (
        heightToHide !== undefined &&
        heightToHide < -100 &&
        windowScrollHeight > heightToHide
      ) {
        setShowStickyAddToCartButton(true);
      } else {
        setShowStickyAddToCartButton(false);
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', listenToScroll);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', listenToScroll);
      }
    };
  }, [isMobile]);
  const [submodelSelectionOpen, setSubmodelSelectionOpen] =
    useState<boolean>(false);

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

  const isTypePage = params?.productType && !params?.make;

  return (
    <>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-roboto text-lg font-bold text-[#1A1A1A] md:text-[28px]">
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
      <div className="pt-6 md:pt-11">
        <div className="grid grid-cols-1">
          <p className="text-dark relative mb-2.5 text-xl font-bold capitalize md:text-3xl">
            ${selectedProduct?.msrp}
            {selectedProduct?.display_id !== 'Premium' && (
              <span className="top absolute ml-2.5 text-xl font-normal capitalize text-[#D13C3F]">
                only {generateProductsLeft(selectedProduct)} left
              </span>
            )}
          </p>
          {selectedProduct?.price && (
            <p className="text-lg font-normal text-[#1A1A1A] md:text-[22px]">
              <span className="mr-2 text-[#9C9C9C] line-through">
                ${selectedProduct?.price}
              </span>
              Save 50% ($
              {String(
                Number(selectedProduct?.price) - Number(selectedProduct?.msrp)
              )}
              )
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start pt-8">
        <div className="flex flex-row items-start justify-start">
          <div className="flex flex-col items-start justify-start pr-4 pt-0">
            <BsBoxSeam size={20} color="#000" />
          </div>
          <div className="flex w-full flex-col items-start justify-start md:w-auto">
            <div className=" text-dark flex flex-row items-center justify-start gap-[5px] text-base capitalize leading-4 md:text-lg xl:flex">
              <span className="text-base font-bold uppercase leading-6 md:text-lg xl:mr-1">
                Free shipping
              </span>
              <span className=" md:mr-1 xl:block"> - </span>
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
          <AddToCartSelector
            submodelSelectionOpen={submodelSelectionOpen}
            setSubmodelSelectionOpen={setSubmodelSelectionOpen}
          />
        </div>

        {/* Add to Cart Button */}
        {isTypePage ? (
          <VehicleSelector />
        ) : (
          <Button
            className="mt-4 h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:h-[62px] md:text-xl"
            id="addToCartButton"
            onClick={() => {
              selectedProduct?.sku &&
                track('PDP_add_to_cart', {
                  sku: selectedProduct?.sku,
                });
              if (isComplete) {
                handleAddToCart();
                isMobile ? router.push('/checkout') : setAddToCartOpen(true);
                return;
              }
              setSubmodelSelectionOpen((p) => !p);
            }}
          >
            Add To Cart
          </Button>
        )}
        {showStickyAddToCartButton && (
          <div className="fixed inset-x-0 bottom-0 z-50 bg-white p-4 shadow-[0_-4px_4px_-0px_rgba(0,0,0,0.1)] md:hidden">
            <Button
              className="mt-4 h-[48px] w-full rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] md:hidden"
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
          </div>
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
          className="font-normal underline text-[#1A1A1A] text-base capitalize cursor-pointer"
        >
          learn more
        </Link>
      </div> */}

      <Separator className="my-8" />
      {isMobile && (
        <div className="pb-5">
          <ProductVideo src={SquareVideo} imgSrc={SquareThumbnail} />
        </div>
      )}
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

  const router = useRouter();

  const { addToCart } = useCartContext();

  const params = useParams<TPathParams>();

  const { completeSelectionState } = getCompleteSelectionData({
    data: modelData,
  });

  const {
    shouldDisplayMake,
    shouldDisplayModel,
    shouldDisplaySecondSubmodel,
    isComplete,
  } = completeSelectionState;

  const {
    uniqueMakes,
    uniqueModels,
    uniqueSecondSubmodels,
    uniqueSubmodels,
    uniqueYears,
  } = getUniqueValues({ data: initModelData, queryState: queryState });

  const cartProduct = modelData.find((p) => p.display_color === color);

  const handleAddToCart = () => {
    if (!cartProduct) return;
    console.log(cartProduct);
    return addToCart({ ...cartProduct, quantity: 1 });
  };

  console.log(isComplete);

  console.log(queryState);

  const TypeDropdown = () => {
    const typeOptions = ['Car Covers', 'SUV Covers', 'Truck Covers'];

    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">1</div>
        <select
          value={queryState.type}
          className={`bg w-full bg-transparent outline-none `}
          disabled={!!queryState.type && !!params?.productType}
        >
          <option value="">Product Type</option>

          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
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
          value={queryState.make}
          className={`bg w-full bg-transparent capitalize outline-none`}
          disabled={!shouldDisplayMake && !!params?.make}
          onChange={(e) =>
            setQuery({
              ...queryState,
              make: e.target.value,
            })
          }
        >
          <option value="">{queryState.make || 'Make'}</option>
          {uniqueMakes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
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
          value={queryState.model}
          className={`bg w-full bg-transparent outline-none `}
          disabled={!shouldDisplayModel && !!params?.model}
          onChange={(e) =>
            setQuery({
              ...queryState,
              model: e.target.value,
            })
          }
        >
          <option value="">{queryState.model || 'Model'}</option>
          {uniqueModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const YearDropdown = () => {
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
              ...queryState,
              year: e.target.value,
            })
          }
        >
          <option value="">Year</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const SubmodelDropdown = () => {
    if (uniqueSubmodels.length === 0 && !queryState.submodel) return null;
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
          {uniqueSubmodels.map((submodel) => (
            <option key={submodel} value={submodel as string}>
              {submodel}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const SecondSubmodelDropdown = () => {
    if (uniqueSecondSubmodels.length === 0 && !queryState.secondSubmodel)
      return null;
    return (
      <div
        className={`flex max-h-[44px] min-h-[44px] w-full items-center rounded-[4px] bg-white px-2 text-lg outline outline-1 outline-offset-1 outline-[#767676] md:max-h-[58px] lg:w-auto`}
      >
        <div className=" ml-[10px] pr-[15px]">5</div>
        <select
          value={queryState.secondSubmodel}
          className={`bg w-full bg-transparent outline-none `}
          onChange={(e) => setQuery({ secondSubmodel: e.target.value })}
        >
          <option value="">Submodel</option>
          {uniqueSecondSubmodels.map((submodel) => (
            <option key={submodel} value={submodel as string}>
              {submodel}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <Drawer
      open={submodelSelectionOpen}
      onOpenChange={(o) => setSubmodelSelectionOpen(o)}
    >
      <DrawerContent className="h-[75vh] bg-neutral-800 pt-8">
        <DrawerHeader>
          <DrawerTitle className="my-4 text-center text-[22px] font-bold uppercase text-white">
            Complete Your Vehicle
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex w-full flex-col gap-4 px-4">
          <TypeDropdown />
          <MakeDropdown />
          <ModelDropdown />
          <YearDropdown />
          {queryState.year && <SubmodelDropdown />}
          {shouldDisplaySecondSubmodel && queryState.submodel && (
            <SecondSubmodelDropdown />
          )}
        </div>
        <DrawerFooter className="bg-white">
          <p className="text-right text-black">
            Total: ${selectedProduct.msrp}
          </p>
          <Button
            onClick={() => {
              if (!isComplete) return;
              handleAddToCart();
              router.push('/checkout');
            }}
            disabled={!isComplete}
          >
            Add To Cart
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function VehicleSelector() {
  return <EditVehicleDropdown />;
}
