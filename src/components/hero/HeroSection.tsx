'use client';

import { useMediaQuery } from '@mantine/hooks';
import { HeroDropdown } from './dropdown/HeroDropdown';
// import hero from '@/images/hero/hero.webp';
import hero from '@/images/hero/home-hero_D.webp';
import heroMobile from '@/images/hero/hero_mobile.webp';
import Image from 'next/image';

const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  return (
    <section className=" flex h-full flex-col items-center px-4 lg:justify-center lg:px-0">
      <div className="relative flex h-full  w-full flex-col justify-end ">
        <Image
          height={800}
          width={800}
          className="-mt-0.5 w-full"
          src={isMobile ? heroMobile.src : hero.src}
          alt="hero"
        />
        <div className="absolute w-full flex-col justify-center   pb-2 text-center">
          <p className="text-xs uppercase tracking-wider text-white lg:my-2 lg:text-2xl">
            #1 Rated Car Cover in the USA
          </p>
          <p className="text-[22px] font-black uppercase tracking-wide text-white lg:my-2 lg:text-6xl">
            Select your Vehicle
          </p>
          <div id="desktop-filter" className="my-4">
            <HeroDropdown />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
