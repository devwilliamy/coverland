'use client';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image, { StaticImageData } from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import Reviews1 from '@/images/reviews/review2_1.jpg';
import Reviews2 from '@/images/reviews/review1_1.jpg';
import Reviews3 from '@/images/reviews/review1_2.jpg';
import Reviews4 from '@/images/reviews/review1_5.jpg';
import ReviewRatingStar from '@/components/icons/ReviewRatingStar';

const HomepageReviews = () => {
  const reviews = [
    {
      rating: 5,
      img: Reviews1,
      title: 'Reliable in all sorts of weather',
      body: 'Fits perfectly, no problems. Perfectly snug fit, no complaints. Stays put even in strong winds!',
      owner: 'Henry Green',
    },
    {
      rating: 5,
      img: Reviews2,
      title: 'Car covers are important for vehicle protection',
      body: "Peace of mind, no worries. It's the perfect accessory for my car that I wouldn't go without this cover surpassed my expectations. Dependable and reliable, year after year.",
      owner: 'Marilyn Adams',
    },
    {
      rating: 5,
      img: Reviews4,
      title: 'Invest in your car with this cover',
      body: "It's like having a shield for my prized possess. Maintaining my car's beauty has never been easier. this cover is a game-changer. extremely satisfied with this purchase. Stylish design, worth the cost.",
      owner: 'Carol Mccoy',
    },
    {
      rating: 5,
      img: Reviews3,
      title: 'Unmatched vehicle comfort',
      body: "Looks like a custom fit My truck remains spotless and well-protected I can't get over how stylish this cover is. It adds a touch of elegance to my truck Practical and stylish choice.",
      owner: 'Stephen Sanchez',
    },
  ];

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
  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  );

  const Dot = ({ index }: { index: number }) => (
    <button className="relative flex h-2 w-2" onClick={() => scrollTo(index)}>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#767676] outline outline-[1px]"></span>
    </button>
  );

  const ActiveDot = () => (
    <div className="relative flex h-2.5 w-2.5">
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1A1A1A] outline outline-[1px]"></span>
    </div>
  );

  return (
    <div>
      <div className="flex w-full flex-col items-center px-[39px]  uppercase">
        <div className="mb-1 text-[14px] capitalize lg:text-[24px] ">
          Thousands of happy customers
        </div>
        <div className="mb-[22px] text-[24px] font-[900] uppercase lg:text-[45px]">
          Car Cover Reviews
        </div>
      </div>
      <div>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {reviews.map((item, index) => (
              <ReviewsItem key={`carousel-item-${index}`} item={item} />
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex w-full items-center justify-center gap-2 bg-[#ECECEC] py-2 pb-[62px]">
          {scrollSnaps.map((_, index) =>
            index === current ? (
              <ActiveDot key={index} />
            ) : (
              <Dot key={index} index={index} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

type ReviewData = {
  rating: number;
  img?: StaticImageData;
  title: string;
  body: string;
  owner: string;
};

const ReviewsItem = ({ item }: { item: ReviewData }) => (
  <CarouselItem className=" flex w-full flex-col bg-[#ECECEC] px-[54px]  pb-[44px] pt-[88px] lg:flex-row  lg:items-start">
    <div
      id="ImageContainer"
      className="mb-[42px] flex flex-col  justify-center lg:mb-0 lg:w-1/2 lg:flex-row lg:items-start"
    >
      {item.img && (
        <Image
          src={item?.img}
          className=" h-[204px] w-[296px] max-w-[617px] rounded-[15px] bg-black object-cover lg:h-[397px] lg:w-[619px] "
          alt="a fully-covered vehicle with a coverland car cover on it"
        />
      )}
    </div>
    <div className="flex min-h-[390px] flex-col items-center gap-[44px] text-center lg:ml-[142.5px] lg:max-w-[524px] lg:items-start lg:text-left">
      <div className="mb-[-26px] flex">
        <ReviewRatingStar rating={item?.rating} />
      </div>
      <div className="mb-[-10px] w-full  text-[18px] font-[700] lg:text-[26px]">
        {item?.title}
      </div>
      <div className="mb-[-22px] line-clamp-3 h-full w-full overflow-hidden text-[16px] font-[400] leading-[30px] lg:text-[22px] lg:leading-[40px]">
        &quot;{item?.body}&quot;
      </div>
      <div className="mb-[-3px] w-full text-[18px] font-[400] italic text-[#626262] lg:text-[28px]">
        {item?.owner}
      </div>
      <button className=" flex max-h-[48px] min-h-[48px] w-full max-w-[214px]  flex-col items-center justify-center rounded-[4px] bg-[#BE1B1B] px-[40px] py-[15px] text-[16px] font-black text-white ">
        <a href="/car-covers">Shop Now</a>
      </button>
    </div>
  </CarouselItem>
);

export default HomepageReviews;
