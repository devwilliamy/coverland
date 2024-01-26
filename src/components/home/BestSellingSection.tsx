import React from 'react';
import Challenger from '@/images/hero/best-selling-challenger.png';
import ElCamino from '@/images/hero/best-selling-el-camino.png';
import Miata from '@/images/hero/best-selling-miata.png';
import Corvette from '@/images/hero/best-selling-corvette.png';
import Image from 'next/image';

const BestSelling = [
  { title: 'Dodge Challenger', img: Challenger },
  { title: 'Chevy Corvette', img: ElCamino },
  { title: 'Mazda Miata', img: Miata },
  { title: 'Chevy El-camino', img: Corvette },
];
const BestSellingSection = () => {
  return (
    <div className="flex w-full flex-col px-[56px]">
      <p className="text-[32px] font-black">BEST-SELLING CAR MODELS</p>
      <div className="flex min-h-[422px] max-w-full gap-[20px]">
        {BestSelling.map(({ title, img }) => (
          <div key={``} className="flex flex-col items-center">
            <Image alt="Best-Selling-Car-Cover" src={img} />
            <p className="mb-[18px] text-[22px] font-[500] leading-[24px]">
              {title}
            </p>
            <button className="flex h-[44px] items-center rounded-[100px] px-[40px] py-[17px] text-[16px] font-[900] leading-[110%] tracking-[0.32px] outline outline-[1px]">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingSection;
