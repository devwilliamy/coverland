'use client';

import { useMediaQuery } from '@mantine/hooks';
import { HeroDropdown } from './dropdown/HeroDropdown';
import hero from '@/images/hero/hero.webp';
// import hero from '@/images/hero/home-hero_D.webp';
import heroMobile from '@/images/hero/hero_mobile.webp';
import Image from 'next/image';

const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  return (
    <section className="flex h-full  min-w-[343px] flex-col items-center px-4   lg:justify-center lg:px-0">
      <div className="relative h-full  w-full flex-col max-lg:overflow-hidden ">
        <Image
          height={isMobile ? 800 : 1600}
          width={isMobile ? 800 : 1600}
          className="w-full max-lg:min-h-[515px] max-lg:scale-[1]"
          src={isMobile ? heroMobile.src : hero.src}
          alt="hero"
        />
        <div className="absolute bottom-0 w-full flex-col justify-center pb-2 text-center">
          <p className="mb-1 text-[14px] font-[500] uppercase leading-[16px] tracking-wider text-white lg:my-2 lg:text-[28px] lg:font-[500] lg:leading-[39px]">
            #1 Rated Car Cover in the USA
          </p>
          <p className="text-[22px] font-black uppercase leading-[22px] tracking-wide text-white lg:my-2 lg:text-[55px] lg:leading-[55px]">
            Select your Vehicle
          </p>
          <div id="desktop-filter" className="my-4 px-4">
            <HeroDropdown />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
