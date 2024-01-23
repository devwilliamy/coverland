'use client';

import Image from 'next/image';
import Badge from '@/images/PDP/60-day.png';

export function MoneyBack() {
  return (
    <div className="flex w-full flex-col-reverse justify-between bg-[#1F2B47] px-8 py-4 md:flex-row md:px-14 lg:py-0">
      <div className="align-center grid w-4/5 grid-cols-1 content-center items-center gap-4">
        <p className="font-black uppercase text-white sm:text-xl md:text-3xl lg:text-[42px]">
          60-days money back guaranteed
        </p>
        <p className="w-full text-lg font-normal text-[#DBDBDB] lg:w-[840px]">
          {`If you're not satisfied, we've got you covered with an easy return
          process and full refunds. We're here to make your shopping experience
          as smooth as possible.`}
        </p>
      </div>
      <div className="w-1/5">
        <Image
          src={Badge}
          alt="an amazing 60-day money back badge"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
