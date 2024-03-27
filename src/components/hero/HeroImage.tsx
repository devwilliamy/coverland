'use client';
import heroMobile from '@/images/hero/hero_mobile.webp';
import Image from 'next/image';
import hero from '@/images/hero/hero.webp';

export default function HeroImage() {
  return (
    <div className="max-lg:max-h-[750px] max-lg:overflow-hidden">
      <Image
        height={800}
        width={800}
        className="w-full max-lg:min-h-[515px] max-lg:scale-[1] lg:hidden"
        src={heroMobile.src}
        alt="hero"
        loading="eager"
      />
      <Image
        height={410}
        width={1280}
        className="hidden lg:flex lg:min-h-[410px]"
        src={hero.src}
        alt="hero"
        loading="eager"
      />
    </div>
  );
}
