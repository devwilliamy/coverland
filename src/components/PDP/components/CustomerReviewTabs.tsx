'use client';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import Image, { StaticImageData } from 'next/image';
import { useContext, useEffect, useState } from 'react';
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
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { getAllReviewsWithImages } from '@/lib/db/review';
// import { ArrowRight } from 'lucide-react';

const CustomerReviewTabs = () => {
  const [selectedTab, setSelectedTab] = useState('customer-images');
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);
  const [reviewImages, setReviewImages] = useState<
    (string | StaticImageData | null)[]
  >([]);
  const { year, type, make, model, submodel, secondSubmodel } = useStore(
    store,
    (s) => s.query
  );
  const typeString =
    type === 'car-covers'
      ? 'Car Covers'
      : type === 'suv-covers'
        ? 'SUV Covers'
        : 'Truck Covers';

  useEffect(() => {
    const getAllImages = async () => {
      try {
        console.log('Inside getAllImages', { year, type, make, model });

        const newReviewData = await getAllReviewsWithImages({
          productType: typeString,
          year,
          make,
          model,
        });

        setReviewImages(newReviewData);
      } catch (error) {
        console.error(error);
      }
    };
    getAllImages();
  }, []);
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
          {reviewImages?.map((image, index) => (
            <Image
              id={`customer-tabs-image-${index}`}
              key={`placeholder-customer-image-${index}`}
              alt={`customer-tabs-image-${index}`}
              width={109}
              height={109}
              className="aspect-square h-full w-full rounded-[3px]"
              src={image ? image : ExampleImage}
            />
          ))}
        </span>
      </TabsContent>
      <TabsContent value="customer-reviews" className="mt-[15px]">
        <Carousel className="">
          <CarouselContent>
            {reviewData?.map((review, index) => (
              <CarouselItem
                key={`carousel-item-${index}`}
                className="flex w-full flex-col items-start lg:flex-row lg:gap-2"
              >
                <Image
                  id={`customer-review-image-${index}`}
                  alt={`customer-review-image-${index}`}
                  width={109}
                  height={109}
                  src={
                    review.review_image
                      ? review.review_image?.split(',')[0]
                      : ExampleImage
                  }
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
