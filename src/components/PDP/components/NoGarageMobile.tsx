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
      <div className="absolute left-[-40px] top-[35px] flex h-full w-full flex-col items-stretch">
        <p className="text-right font-black uppercase tracking-[1.35px] text-[#494949] sm:text-xl md:text-3xl lg:text-5xl">
          No Garage? No problem!
        </p>
      </div>
    </div>
  );
}
