'use client';

import Image from 'next/image';
import Climate from '@/images/PDP/climate_crisis_m.webp';

export function ClimateCrisisMobile() {
  return (
    <div className="relative w-full">
      <div className="-z-0">
        <Image
          alt="product"
          src={Climate}
          placeholder="blur"
          quality={75}
          className="w-full object-cover"
        />
      </div>
      <div className="absolute left-2.5 top-[10%] flex h-full w-full flex-col items-stretch gap-5">
        <p className="text-left text-[18px] font-[400] capitalize text-white md:text-2xl">
          Protect your car with confidence
        </p>
        <p className="max-w-[75%] text-left text-[22px] font-black uppercase leading-tight tracking-[1.35px] text-white sm:text-xl md:max-w-[85%] md:text-3xl lg:text-5xl">
          <p className="mb-[-20px]"> Safeguard Against</p> <br />
          <p> climate crisis</p>
        </p>
      </div>

      <div className="bg-[#1A1A1A] p-5 text-[14px] font-[100] normal-case leading-[200%] text-white md:text-xl">
        <p>
          From snowstorms to downpours,
          <br /> our car covers guarantee year-round protection providing
          top-notch car care in any weather.
        </p>
      </div>
    </div>
  );
}
