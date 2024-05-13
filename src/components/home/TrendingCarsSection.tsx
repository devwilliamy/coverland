import React from 'react';
import Ford from '@/images/hero/trending-ford.webp';
import Ram from '@/images/hero/trending-ram.webp';
import Dodge from '@/images/hero/trending-dodge.webp';
import Chevy from '@/images/hero/trending-chevy.webp';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const trendingCars = [
  { title: 'Chevy', img: Chevy, link: '/car-covers/premium-plus/chevrolet' },
  { title: 'Dodge', img: Dodge, link: '/car-covers/premium-plus/dodge' },
  { title: 'Ford', img: Ford, link: '/car-covers/premium-plus/ford' },
  { title: 'Ram', img: Ram, link: '/truck-covers/premium-plus/ram' },
];
const TrendingCarsSection = () => {
  return (
    <div className="mb-[20px] mt-[13px] flex w-full flex-col px-[16px] lg:mb-[60px] lg:mt-[-50px] lg:px-[56px]">
      <p className="mb-[30px] text-[20px] font-black uppercase lg:text-[32px]">
        trending car brands
      </p>
      <div className="max-w-screen flex gap-[20px] overflow-x-auto">
        {trendingCars.map(({ title, img, link }, i) => (
          <div
            key={`${title}-${i}`}
            className="relative flex min-h-[229px] min-w-[197px] flex-col items-center"
          >
            <a href={link}>
              <Image
                alt="Best-Selling-Car-Cover"
                className="min-h-[229px] rounded-[6px] "
                src={img}
                width={246}
                height={285}
              />
              <div className="absolute bottom-[10px] left-[20px] lg:hidden">
                <p className=" mb-[15px] text-[24px] font-black leading-[24px] tracking-wide text-white">
                  {title}
                </p>
                <div className="mb-[18px] text-[14px] font-[500] leading-[24px] tracking-wide text-white">
                  See All-{title}
                  <div className="flex items-end gap-2">
                    <div>Custom Car Covers</div>
                    <ArrowRight className="max-h-[24px] max-w-[16px]" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[35px] left-[25px] hidden lg:block">
                <p className="mb-[20px] text-[38px] font-black leading-[24px] tracking-wide text-white">
                  {title}
                </p>
                <div className="mb-[18px] text-[16px] font-[500] leading-[24px] tracking-wide text-white">
                  See All-{title} <br />
                  <div className="flex items-end gap-2">
                    <div>Custom Car Covers</div>
                    <ArrowRight className="max-h-[24px] max-w-[16px]" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCarsSection;
