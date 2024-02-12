'use client';

import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import ExampleImage from '@/images/solutions/waterproof-cover.webp';
import ReviewCard from './ReviewCard';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useStore } from 'zustand';
import { CarSelectionContext } from '@/app/(main)/[productType]/components/CarPDP';
import { getProductReviewsByPage } from '@/lib/db/review';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ChevronRight } from 'lucide-react';

const CustomerReviewTabs = () => {
  const [selectedTab, setSelectedTab] = useState('customer-images');
  const store = useContext(CarSelectionContext);
  if (!store) throw new Error('Missing CarContext.Provider in the tree');
  const reviewData = useStore(store, (s) => s.reviewData);
  const setReviewData = useStore(store, (s) => s.setReviewData);
  const reviewImages = useStore(store, (s) => s.reviewImages);
  const { year, type, make, model, submodel, secondSubmodel } = useStore(
    store,
    (s) => s.query
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Starting at 1 because we're already starting at 0
  const limit = 4;
  const isSuvTypeString = type === 'suv-covers' ? 'SUV Covers' : 'Truck Covers';
  const typeString = type === 'car-covers' ? 'Car Covers' : isSuvTypeString;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
      !api.canScrollNext() && handleViewMore();
    });

  }, [api, reviewData]);

  const handleViewMore = async () => {
    try {
      setLoading(true);
      const newReviewData = await getProductReviewsByPage(
        {
          productType: typeString,
          year,
          make,
          model,
        },
        {
          pagination: {
            page,
            limit,
          },
        }
      );
      setReviewData([...reviewData, ...newReviewData]);

      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (!reviewData) return null;

  return (
    <Tabs value={selectedTab} className="flex h-full w-full flex-col bg-white ">
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
        <Carousel setApi={setApi}>
          <CarouselContent>
            {reviewData?.map((review, index) => (
              <CarouselItem
                key={`carousel-item-${index}`}
                className="flex w-full flex-col items-start  lg:flex-row lg:gap-2"
              >
                {review?.review_image && (
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
                )}
                <div className="flex h-full min-h-[60vh] w-full flex-col justify-center  lg:min-h-[100%] lg:w-1/2">
                  <ReviewCard review={review} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            disabled={false}
            className="-left-[16px] top-[40%] z-20 h-[32px] w-[32px] items-center justify-center rounded-full bg-black text-white lg:-left-[96px] lg:h-[48px] lg:w-[48px]"
          />
          <CarouselNext
            disabled={false}
            className="-right-[16px] top-[40%] z-20 h-[32px] w-[32px]  items-center justify-center rounded-full bg-black text-white lg:-right-[96px] lg:h-[48px] lg:w-[48px]"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <ChevronRight className="h-3/4 w-3/4" />
            )}
          </CarouselNext>
        </Carousel>
      </TabsContent>
    </Tabs>
  );
};

export default CustomerReviewTabs;
