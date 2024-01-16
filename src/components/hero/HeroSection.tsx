'use client';

import { useMediaQuery } from '@mantine/hooks';
import { HeroDropdown } from './dropdown/HeroDropdown';
import bg from '/public/images/hero/home-hero_D.webp';
import hero from '@/images/hero/hero.webp';
import heroMobile from '@/images/hero/hero_mobile.webp';
import Image from 'next/image';

const HeroSection = () => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  console.log('isMobile', isMobile);
  return (
    <section className="h-auto flex flex-col justify-start lg:justify-start items-center px-4 lg:px-0">
      <div className="w-full h-[530px] relative">
        <Image
          className=""
          src={isMobile ? heroMobile.src : hero.src}
          alt="hero"
          layout="fill"
        />
        <div className="pb-2 relative h-full flex flex-col justify-end text-center">
          <p className="text-xs lg:text-2xl lg:my-2 tracking-wider uppercase text-white">
            #1 Rated Car Cover in the USA
          </p>
          <p className="lg:text-6xl lg:my-2 text-xl tracking-wide font-black text-white uppercase">
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
