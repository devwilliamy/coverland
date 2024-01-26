import React from 'react';
import Ford from '@/images/hero/trending-ford.png';
import Ram from '@/images/hero/trending-ram.png';
import Dodge from '@/images/hero/trending-dodge.png';
import Chevy from '@/images/hero/trending-chevy.png';
import Image from 'next/image';

const TrendingCars = [
  { title: 'Chevy', img: Ford },
  { title: 'Dodge', img: Ram },
  { title: 'Ford', img: Dodge },
  { title: 'Ram', img: Chevy },
];
const TrendingCarsSection = () => {
  return (
    <div className="mt-[44px] flex w-full flex-col px-[56px]">
      <p className="text-[32px] font-black uppercase">trending car brands</p>
      <div className="flex min-h-[422px] max-w-full gap-[20px]">
        {TrendingCars.map(({ title, img }) => (
          <div key={``} className="relative flex flex-col items-center">
            <Image
              alt="Best-Selling-Car-Cover"
              className="rounded-[6px]"
              src={img}
            />
            <div className="absolute bottom-[110px] left-[40px]">
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
