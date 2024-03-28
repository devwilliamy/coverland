'use client';
import WaterVS from '@/images/PDP/Product-Details-Redesign-2/WaterproofVSMobile.webp';
import WaterVSDesktop from '@/images/PDP/Product-Details-Redesign-2/desktop-water-vs.webp';
import UltravioletVS from '@/images/PDP/Product-Details-Redesign-2/UltravioletVSMobile.webp';
import UltravioletVSDesktop from '@/images/PDP/Product-Details-Redesign-2/desktop-uv-vs.webp';
import WaterproofThumbnail from '@/images/PDP/Product-Details-Redesign-2/WaterproofingThumbnail.webp';
import UVThumbnail from '@/images/PDP/Product-Details-Redesign-2/UVProtectionThumbnail.webp';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import useIsVisible from '@/lib/hooks/useIsVisible';
import { LegacyRef } from 'react';

const WaterproofVideo = dynamic(
  () => import('@/components/PDP/components/WaterproofVideo'),
  {
    loading: () => <Image alt="" src={WaterproofThumbnail} loading='lazy' />,
    ssr: false,
  }
);

const UVResistanceVideo = dynamic(
  () => import('@/components/PDP/components/UVResistanceVideo'),
  {
    loading: () => <Image alt="" src={UVThumbnail} loading='lazy' />,
    ssr: false,
  }
);

export default function ProvenSection() {
  const [isVisible, ref] = useIsVisible();

  return (
    <section
      id="proven-section"
      className="mt-9 flex flex-col items-center justify-center lg:mt-[60px] "
      ref={ref as LegacyRef<HTMLElement> | undefined}
    >
      <div
        id="waterproof-section"
        className="w-full max-w-[850px] pb-9 lg:pb-[60px] "
      >
        <p className="w-full pb-3 text-center text-[22px] font-[700] leading-[25px] lg:pb-[38px] lg:text-[38px] lg:leading-[44px]">
          Waterproofing is Proven
        </p>
        <WaterproofVideo />

        <Image
          alt="Water Vs"
          src={WaterVS}
          className="w-full rounded-ss-sm lg:hidden"
          loading='lazy'
          width={358}
          height={127}
        />
        <Image
          alt="Water Vs Desktop"
          src={WaterVSDesktop}
          className="hidden w-full rounded-ss-sm lg:block"
          loading='lazy'
          width={850}
          height={142}
        />
      </div>
      <div id="uv-section" className=" w-full max-w-[850px]">
        <p className="w-full  pb-3 text-center text-[22px] font-[700] leading-[25px] lg:pb-[38px] lg:text-[38px] lg:leading-[44px]">
          UV Resistance Proven
        </p>
        <UVResistanceVideo />
        <Image
          alt="UV Vs"
          src={UltravioletVS}
          className=" w-full rounded-ss-sm lg:hidden"
          loading='lazy'
          width={358}
          height={127}
        />
        <Image
          alt="UV Vs Desktop"
          src={UltravioletVSDesktop}
          className="hidden w-full rounded-ss-sm lg:block"
          loading='lazy'
          width={850}
          height={142}
        />
      </div>
    </section>
  );
}
