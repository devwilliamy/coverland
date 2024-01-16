'use client';

import Image from 'next/image';
import Climate from '@/images/PDP/climate_crisis.webp';

export function ClimateCrisis() {
  return (
    <div className="relative w-full">
      <div className="-z-0">
        <Image
          alt="product"
          src={Climate}
          placeholder="blur"
          quality={75}
          className="object-cover w-full"
        />
      </div>
      <div className="absolute top-2.5 md:top-[84px] left-2.5 md:left-[57px] w-auto h-full flex flex-col items-stretch gap-5">
        <p className="text-white font-black text-lg md:text-2xl capitalize text-left tracking-[0.48px]">
          Protect your car with confidence
        </p>
        <p className="text-white font-black sm:text-xl md:text-3xl lg:text-5xl uppercase text-left tracking-[1.35px] leading-tight">
          safeguard Against <br className="hidden md:block" /> climate crisis
        </p>
      </div>

      <div className="absolute bottom-2.5 md:bottom-[57px] left-2.5 md:left-[57px] leading-normal bg-[#1A1A1A] p-2 md:p-5 w-3/4 md:w-[515px]">
        <p className="text-white text-sm md:text-xl font-normal">
          From snowstorms to downpours,
          <br /> our car covers guarantee year-round protection providing
          top-notch car care in any weather.
        </p>
      </div>
    </div>
  );
}
