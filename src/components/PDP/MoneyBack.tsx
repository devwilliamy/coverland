'use client';

import Image from 'next/image';
import Badge from '@/images/PDP/60-day.png';

export function MoneyBack() {
  return (
    <div className="bg-[#1F2B47] w-full flex flex-col-reverse md:flex-row justify-between py-4 lg:py-0 px-8 md:px-14">
      <div className="grid grid-cols-1 gap-4 w-4/5 items-center align-center content-center">
        <p className="text-white font-black sm:text-xl md:text-3xl lg:text-[42px] uppercase">
          60-days money back guaranteed
        </p>
        <p className="text-[#DBDBDB] font-normal text-lg w-full lg:w-[840px]">
          {`If you're not satisfied, we've got you covered with an easy return
          process and full refunds. We're here to make your shopping experience
          as smooth as possible.`}
        </p>
      </div>
      <div className="w-1/5">
        <Image
          src={Badge}
          alt="an amazing 60-day money back badge"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
