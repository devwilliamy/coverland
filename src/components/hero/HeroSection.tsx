'use client';

import { useMediaQuery } from '@mantine/hooks';
import { HeroDropdown } from './dropdown/HeroDropdown';
import hero from '@/images/hero/hero.webp';
import heroMobile from '@/images/hero/hero_mobile.webp';
import Image from 'next/image';

const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  return (
    <section className="flex h-full flex-col items-center justify-end px-4 lg:justify-start lg:px-0">
      <div className="relative flex h-full min-h-[550px] w-full flex-col justify-end ">
        <Image
          className="absolute"
          src={isMobile ? heroMobile.src : hero.src}
          alt="hero"
          fill
        />
        <div className="relative flex h-full flex-col   pb-2 text-center">
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
