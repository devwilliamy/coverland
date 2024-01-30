'use client';
import Garage from '@/images/PDP/no_garage_m.webp';
import Image from 'next/image';

export function NoGarageMobile() {
  return (
    <div className="relative w-full">
      <div className="-z-0">
        <Image
          alt="product"
          src={Garage}
          placeholder="blur"
          quality={75}
          className="w-full object-cover"
        />
      </div>
      <div className="absolute top-[10%] flex h-full w-full flex-col items-stretch text-center">
        <p className="text-[5.2vw] font-black uppercase tracking-[1.35px] text-[#494949] sm:text-3xl md:text-5xl">
          No Garage? No problem!
        </p>
      </div>
    </div>
  );
}
