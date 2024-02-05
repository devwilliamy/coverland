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
      <div className="absolute top-[40px] flex w-full flex-col items-stretch text-center">
        <p className="text-[22px] font-black uppercase text-[#494949]">
          No Garage? No problem!
        </p>
      </div>
    </div>
  );
}
