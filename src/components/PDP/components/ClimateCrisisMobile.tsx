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
      <div className="max-w-[50%]] absolute left-2.5 top-[10%] flex h-full w-auto flex-col items-stretch gap-5 md:left-[57px] md:top-[84px]">
        <p className="text-left text-[4.2vw] font-thin capitalize text-white md:text-2xl">
          Protect your car with confidence
        </p>
        <p className="text-left text-[5vw] font-black uppercase leading-tight tracking-[1.35px] text-white sm:text-xl md:text-3xl lg:text-5xl">
          Safeguard Against <br className="hidden md:block" /> climate crisis
        </p>
      </div>

      <div className="bottom-[40px] bg-[#1A1A1A] p-5  md:bottom-[57px] md:left-[57px] md:w-[515px] md:p-5">
        <p className="o text-sm normal-case text-white md:text-xl">
          From snowstorms to downpours,
          <br /> our car covers guarantee year-round protection providing
          top-notch car care in any weather.
        </p>
      </div>
    </div>
  );
}
