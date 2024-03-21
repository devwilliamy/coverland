'use client';
import heroMobile from '@/images/hero/hero_mobile.webp';
import Image from 'next/image';
import hero from '@/images/hero/hero.webp';

export default function HeroImage() {
  return (
    <>
      <Image
        height={800}
        width={800}
        className="w-full max-lg:min-h-[515px] max-lg:scale-[1] lg:hidden"
        src={heroMobile.src}
        alt="hero"
      />
      <Image
        height={1600}
        width={1600}
        className="hidden lg:flex"
        src={hero.src}
        alt="hero"
      />
    </>
  );
}
