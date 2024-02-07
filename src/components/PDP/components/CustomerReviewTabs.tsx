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
      <TabsList className="b-[-1px] mt-[65px] flex h-full w-full justify-start bg-white p-0 font-[400] shadow-none lg:mt-0">
        <TabsTrigger
          value="customer-images"
          onClick={() => {
            setSelectedTab('customer-images');
          }}
          className={`pb-[19px] pl-1 text-[16px] leading-[18.75px] lg:text-[18px] lg:leading-[21.09px] ${selectedTab === 'customer-images' ? '  border-b-2 border-b-[#1A1A1A] font-[900]  text-[#1A1A1A]' : ''}`}
        >
          Customer Images
        </TabsTrigger>
        <TabsTrigger
          value="customer-reviews"
          onClick={() => {
            setSelectedTab('customer-reviews');
          }}
          className={` pb-[19px] pl-1 text-[16px] leading-[18.75px] lg:text-[18px] lg:leading-[21.09px] ${selectedTab === 'customer-reviews' ? '  border-b-2 border-b-[#1A1A1A] font-[900] text-[#1A1A1A] ' : ''}`}
        >
          Customer Reviews
        </TabsTrigger>
      </TabsList>
      <Separator className="mt-[-2px] h-0.5 bg-[#DBDBDB] lg:mt-[-2px]" />
      <TabsContent value="customer-images" className="mt-[29px]">
        <span className="grid h-full max-h-[53vh] grid-cols-3 gap-2 overflow-y-scroll">
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
        <Carousel className="">
          <CarouselContent>
            {reviewData?.map((review) => (
              <CarouselItem className="-mt-5 flex w-full flex-col items-start lg:flex-row lg:gap-2">
                <Image
                  alt=""
                  src={ExampleImage}
                  className="hidden aspect-square lg:flex lg:w-1/2 "
                />
                <div className="flex flex-col justify-center">
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
