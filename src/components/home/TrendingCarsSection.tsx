import React from 'react';
import Ford from '@/images/hero/trending-ford.png';
import Ram from '@/images/hero/trending-ram.png';
import Dodge from '@/images/hero/trending-dodge.png';
import Chevy from '@/images/hero/trending-chevy.png';
import Image from 'next/image';

const TrendingCars = [
  { title: 'Chevy', img: Chevy },
  { title: 'Dodge', img: Dodge },
  { title: 'Ford', img: Ford },
  { title: 'Ram', img: Ram },
];
const TrendingCarsSection = () => {
  return (
    <div className="mt-[40px] flex w-full flex-col px-[16px] lg:mb-[60px] lg:px-[56px]">
      <p className="mb-[30px] text-[20px] font-black uppercase lg:text-[32px]">
        trending car brands
      </p>
      <div className="max-w-screen flex gap-[20px] overflow-x-scroll">
        {TrendingCars.map(({ title, img }) => (
          <div
            key={``}
            className="relative flex min-h-[229px] min-w-[197px] flex-col items-center"
          >
            <Image
              alt="Best-Selling-Car-Cover"
              className="min-h-[229px] rounded-[6px] "
              src={img}
            />
            <div className="absolute bottom-[10px] left-[20px] lg:hidden">
              <p className=" mb-[15px] text-[24px] font-black leading-[24px] tracking-wide text-white">
                {title}
              </p>
              <p className=" mb-[18px] text-[14px] font-[500] leading-[24px] tracking-wide text-white">
                See All-{title} <br />
                <button
                  className=""
                  //  className="flex h-[44px] items-center rounded-[100px] px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px] outline outline-[1px]"
                >
                  Custom Car Covers
                </button>
              </p>
            </div>

            <div className="absolute bottom-[55px] left-[35px] hidden lg:block">
              <p className=" mb-[20px] text-[38px] font-black leading-[24px] tracking-wide text-white">
                {title}
              </p>
              <p className=" mb-[18px] text-[16px] font-[500] leading-[24px] tracking-wide text-white">
                See All-{title} <br />
                <button
                  className=""
                  //  className="flex h-[44px] items-center rounded-[100px] px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px] outline outline-[1px]"
                >
                  Custom Car Covers
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCarsSection;
