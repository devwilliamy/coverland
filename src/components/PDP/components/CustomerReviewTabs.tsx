'use client';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import Image from 'next/image';
import { useContext, useState } from 'react';
import ExampleImage from '@/images/solutions/waterproof-cover.webp';
import ReviewCard from './ReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
// import { ArrowRight } from 'lucide-react';

const CustomerReviewTabs = () => {
  const [selectedTab, setSelectedTab] = useState('customer-images');
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);


  return (
    <Tabs value={selectedTab} className="flex h-full w-full flex-col bg-white">
      <TabsList className="b-[-1px] mt-[65px] flex h-full w-full justify-start bg-transparent p-0 font-[400] shadow-none lg:mt-0 lg:gap-[56px]">
        <TabsTrigger
          value="customer-images"
          onClick={() => {
            setSelectedTab('customer-images');
          }}
          className={`z-[1] pb-[19px] pl-1 text-[16px] leading-[18.75px] lg:text-[18px] lg:leading-[21.09px] ${selectedTab === 'customer-images' ? '  border-b-4 border-b-[#1A1A1A] font-[900]  text-[#1A1A1A]' : ''}`}
        >
          Customer Images
        </TabsTrigger>
        <TabsTrigger
          value="customer-reviews"
          onClick={() => {
            setSelectedTab('customer-reviews');
          }}
          className={` lg: z-[1] pb-[19px] pl-1 text-[16px] leading-[18.75px] lg:text-[18px] lg:leading-[21.09px] ${selectedTab === 'customer-reviews' ? '  border-b-4 border-b-[#1A1A1A] font-[900] text-[#1A1A1A] ' : ''}`}
        >
          Customer Reviews
        </TabsTrigger>
      </TabsList>
      <Separator className=" mt-[-2px]  h-0.5 bg-[#DBDBDB] lg:mt-[-2px]" />
      <TabsContent value="customer-images" className="mt-[29px]">
        <span className="grid h-full max-h-[53vh] grid-cols-3 gap-2 overflow-y-scroll lg:grid-cols-6 lg:gap-[15px]">
          {[...Array(20)].map((_, index) => (
            <Image
              key={`placeholder-customer-image-${index}`}
              alt="example-car-image"
              className="h-full w-full rounded-[3px]"
              src={ExampleImage}
            />
          ))}
        </span>
      </TabsContent>
      <TabsContent value="customer-reviews" className="mt-[15px]">
        {/* <span className="grid-col-1 grid grid-flow-col grid-rows-1 overflow-x-auto">
          {reviewData?.map((review) => (
            <div className="flex h-full w-full flex-col">
              <ReviewCard review={review} />
            </div>
          ))}
        </span> */}
        <Carousel className="">
          <CarouselContent>
            {reviewData?.map((review, index) => (
              <CarouselItem
                key={`carousel-item-${index}`}
                className="flex w-full flex-col items-start lg:flex-row lg:gap-2"
              >
                <Image
                  alt=""
                  src={ExampleImage}
                  className="hidden aspect-square lg:flex lg:w-1/2 "
                />
                <div className="flex h-full min-h-[65vh] w-full flex-col justify-center lg:min-h-0 lg:w-1/2">
                  <ReviewCard review={review} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-[16px] top-[40%] z-20 h-[32px] w-[32px] items-center justify-center rounded-full bg-black text-white lg:-left-[96px] lg:h-[48px] lg:w-[48px]" />
          <CarouselNext className="-right-[16px] top-[40%] z-20 h-[32px] w-[32px] items-center justify-center rounded-full bg-black text-white lg:-right-[96px] lg:h-[48px] lg:w-[48px]" />
        </Carousel>
      </TabsContent>
    </Tabs>
  );
};

export default CustomerReviewTabs;
