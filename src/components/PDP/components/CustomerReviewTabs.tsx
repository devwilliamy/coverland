'use client';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import Image from 'next/image';
import { useState } from 'react';
import ExampleImage from '@/images/solutions/waterproof-cover.webp';
import { TReviewData } from '@/lib/db';
import ReviewCard from './ReviewCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';

const CustomerReviewTabs = ({
  reviewData,
}: {
  reviewData: TReviewData[] | undefined | null;
}) => {
  const [selectedTab, setSelectedTab] = useState('customer-images');
  return (
    <Tabs value={selectedTab} className="flex h-full w-full flex-col">
      <TabsList className="b-[-1px] mt-[65px] flex h-full w-full justify-start bg-white p-0 shadow-none">
        <TabsTrigger
          value="customer-images"
          onClick={() => {
            setSelectedTab('customer-images');
          }}
          className={`border-b-2 pb-[19px] pl-1 text-[16px] font-[900] leading-[18.75px] ${selectedTab === 'customer-images' ? '  border-b-[#1A1A1A]  text-[#1A1A1A]' : 'border-b-[#DBDBDB]'}`}
        >
          Customer Images
        </TabsTrigger>
        <TabsTrigger
          value="customer-reviews"
          onClick={() => {
            setSelectedTab('customer-reviews');
          }}
          className={`border-b-2 pb-[19px] pl-1 text-[16px] font-[900] leading-[18.75px] ${selectedTab === 'customer-reviews' ? '  border-b-[#1A1A1A]  text-[#1A1A1A]' : 'border-b-[#DBDBDB]'}`}
        >
          Customer Reviews
        </TabsTrigger>
      </TabsList>
      <Separator className="mt-[-2px] h-0.5 bg-[#DBDBDB]" />
      <TabsContent value="customer-images" className="mt-[29px]">
        <span className="grid  h-full max-h-[53vh] grid-cols-3 gap-2 overflow-y-scroll">
          {[...Array(20)].map(() => (
            <Image
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
        <Carousel className="flex items-center">
          <CarouselContent>
            {reviewData?.map((review) => (
              <CarouselItem className="-my-5 flex h-full w-full flex-col lg:flex-row lg:gap-2">
                <Image
                  alt=""
                  src={ExampleImage}
                  className=" flex aspect-square h-full w-1/2 "
                />
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-[16px] top-[40%] z-20 h-[32px] w-[32px] items-center rounded-full bg-black text-white lg:-left-[96px]" />
          <CarouselNext className="-right-[16px] top-[40%] z-20 h-[32px] w-[32px] items-center rounded-full bg-black text-white lg:-right-[96px]" />
        </Carousel>
      </TabsContent>
    </Tabs>
  );
};

export default CustomerReviewTabs;
