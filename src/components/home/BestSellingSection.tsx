'use client';
import React from 'react';
import Challenger from '@/images/hero/best-selling-challenger.png';
import ElCamino from '@/images/hero/best-selling-el-camino.png';
import Miata from '@/images/hero/best-selling-miata.png';
import Corvette from '@/images/hero/best-selling-corvette.png';
import Image from 'next/image';

const bestSelling = [
  { title: 'Dodge Challenger', img: Challenger },
  { title: 'Chevy Corvette', img: Corvette },
  { title: 'Mazda Miata', img: Miata },
  { title: 'Chevy El-Camino', img: ElCamino },
];
const BestSellingSection = () => {
  return (
    <span className="flex w-full flex-col px-[16px] pt-[45px] lg:px-[56px] lg:py-[10px]">
      <p className="text-[20px] font-black lg:text-[32px]">
        BEST-SELLING CAR MODELS
      </p>
      <div className="max-w-screen flex gap-[20px] overflow-x-auto pb-3">
        {bestSelling.map(({ title, img }, i) => (
          <a
            key={`${title}-${i}`}
            href="/car-covers"
            className="flex min-h-[209px] min-w-[209px] flex-[25%] flex-col items-center justify-between"
          >
            <Image alt="Best-Selling-Car-Cover" className="" src={img} />
            <p className="mb-[18px] whitespace-nowrap text-[16px] font-[500] leading-[24px] lg:text-[22px]">
              {title}
            </p>
            <button className="mb-[2px] flex h-[44px] max-w-[153px] items-center justify-center whitespace-nowrap rounded-[100px] px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px] outline outline-[1px]">
              <div>Shop Now</div>
            </button>
          </a>
        ))}
      </div>
    </span>
  );
};

export default BestSellingSection;
