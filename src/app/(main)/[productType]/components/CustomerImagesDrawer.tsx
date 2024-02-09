import { CheckIcon } from '@/components/PDP/components/icons';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from '@/components/ui/carousel';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { SetStateAction, useContext, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import ExampleCustomerImage from '@/images/PDP/product_details_01.webp';
import { CarSelectionContext } from './CarPDP';
import { useStore } from 'zustand';

export default function CustomerImagesDrawer({
  customerImagesDrawerOpen,
  customerImagesIndex,
  setCustomerImagesIndex,
  setCustomerImagesDrawerOpen,
}: {
  customerImagesDrawerOpen: boolean;
  customerImagesIndex: number;
  setCustomerImagesIndex: (value: SetStateAction<number>) => void;
  setCustomerImagesDrawerOpen: (value: SetStateAction<boolean>) => void;
}) {
  const [customerCarouselApi, setCustomerCarouselApi] = useState<CarouselApi>();
  const tabItems = [
    { title: 'Customer Images', value: 'customer-images' },
    { title: 'Customer Reviews', value: 'customer-reviews' },
  ];

  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);

  return (
    <span className="mb-[18px] flex gap-[13px]">
      <FaCamera color={'#3C3C3C'} className="flex min-h-[24px] min-w-[27px]" />
      <Drawer
        open={customerImagesDrawerOpen}
        onOpenChange={(e) => {
          e && setCustomerImagesIndex(0);
          setCustomerImagesDrawerOpen(e);
        }}
      >
        <DrawerTrigger>
          <a className="text-[16px] text-[#0C87B8] underline ">
            Customer Images
          </a>
        </DrawerTrigger>
        <DrawerContent>
          {/* <div className="max-h-[76vh] min-h-[76vh]"></div> */}
          <Tabs defaultValue="customer-images" className="w-full">
            <div className="flex w-full justify-end">
              <button
                id="CloseModalButton"
                className="mr-[16px] mt-[12px] flex items-center justify-center rounded-full bg-[#F0F0F0] p-[6px]"
                onClick={() => {
                  setCustomerImagesDrawerOpen(false);
                }}
              >
                <IoClose className="h-[28px] w-[28px]" />
              </button>
            </div>
            <TabsList className="flex flex-col bg-white pt-[24px]">
              <div className="mb-[-1px] flex w-full items-center ">
                {tabItems.map(({ title, value }, index) => (
                  <TabsTrigger
                    key={`tab-trigger-${index}`}
                    value={value}
                    className={`text-[16px] capitalize ${index === customerImagesIndex ? 'font-black' : 'font-[400]'} ${index === customerImagesIndex && 'border-b-2 border-black font-bold'}`}
                    onClick={() => {
                      setCustomerImagesIndex(index);
                    }}
                    onTouchEnd={() => {
                      setCustomerImagesIndex(index);
                    }}
                  >
                    {title}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
            <TabsContent
              value="customer-images"
              className="border-t-2 border-[#C8C7C7]"
            >
              <div className="mx-auto flex max-h-[76vh] min-h-[76vh] w-full flex-col px-4 pt-[29px]">
                <div className="grid grid-cols-3 gap-2 overflow-y-auto">
                  {[...Array(25)].map((_, index) => (
                    <div
                      key={`scrollable-item-${index}`}
                      className="flex min-h-[109px] max-w-full"
                    >
                      <Image
                        src={ExampleCustomerImage}
                        className="flex  rounded-[4px] object-cover"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="customer-reviews">
              <div className="mx-auto flex max-h-[76vh] w-full flex-col overflow-y-scroll border-t-2 border-[#C8C7C7] px-4 pt-[40px]">
                <Carousel setApi={setCustomerCarouselApi}>
                  <CarouselContent>
                    {reviewData &&
                      reviewData.map((review, index) => (
                        <div
                          key={index}
                          className="flex w-full min-w-full flex-col place-items-center"
                        >
                          <span className="my-5 flex w-full flex-col items-stretch self-stretch rounded border border-solid border-stone-300 py-9 pl-10 pr-16 max-md:max-w-full max-md:px-5">
                            <div className="text-xl font-bold normal-case text-neutral-700 max-md:max-w-full lg:text-3xl">
                              {review.review_title}
                            </div>
                            <div className="my-2 flex gap-1 text-yellow-300 lg:my-0">
                              <Rating
                                name="read-only"
                                value={5}
                                readOnly
                                style={{
                                  height: '25px',
                                }}
                              />
                            </div>
                            <div className="text-sm font-light normal-case text-neutral-500">
                              {review?.reviewed_at &&
                                `Purchased on
                                ${new Date(
                                  review?.reviewed_at ?? ''
                                ).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}`}
                            </div>
                            <div className="mt-5 flex w-[216px] max-w-full items-stretch gap-1 self-start">
                              {/* images go here */}
                            </div>
                            <div className="flex justify-between">
                              <div className="max-w-[75%] overflow-hidden text-base font-normal normal-case text-[#1A1A1A] max-md:max-w-full">
                                {review.review_description}
                              </div>
                              <div className="hidden text-lg font-light normal-case text-neutral-500 lg:block">
                                {review?.reviewed_at &&
                                  `Purchased on
                                ${new Date(
                                  review?.reviewed_at ?? ''
                                ).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}`}
                              </div>
                            </div>
                            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal normal-case leading-8 text-[#1A1A1A] max-md:mt-10 max-md:max-w-full lg:mt-24">
                              {review.review_author}
                            </div>
                            <span className="flex items-center gap-3 self-start lg:mt-7">
                              {/* images go here */}
                              <CheckIcon />
                              <div className="text-md my-2 grow self-center whitespace-nowrap font-bold normal-case leading-3 text-zinc-900">
                                Yes, I would recommend.
                              </div>
                            </span>
                          </span>
                        </div>
                      ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>
    </span>
  );
}
