'use client';

import { useMediaQuery } from '@mantine/hooks';
import { HeroDropdown } from './dropdown/HeroDropdown';
import bg from '/public/images/hero/home-hero_D.webp';
import hero from '@/images/hero/hero.webp';
import heroMobile from '@/images/hero/hero_mobile.webp';
import Image from 'next/image';

const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  // console.log('isMobile', isMobile);
  return (
    <section className="flex h-auto flex-col items-center justify-start px-4 lg:justify-start lg:px-0">
      <div className="relative h-[530px] w-full">
        <Image
          className=""
          src={isMobile ? heroMobile.src : hero.src}
          alt="hero"
          layout="fill"
        />
        <div className="relative flex h-full flex-col justify-end pb-2 text-center">
          <p className="text-xs uppercase tracking-wider text-white lg:my-2 lg:text-2xl">
            #1 Rated Car Cover in the USA
          </p>
          <p className="text-xl font-black uppercase tracking-wide text-white lg:my-2 lg:text-6xl">
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
