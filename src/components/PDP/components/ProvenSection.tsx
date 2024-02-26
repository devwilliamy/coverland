import React, { Suspense } from 'react';
import Waterproofing from '@/images/PDP/Product-Details-Redesign-2/Proven Waterproofing.png';
import WaterVS from '@/images/PDP/Product-Details-Redesign-2/WaterproofVSMobile.png';
import WaterVSDesktop from '@/images/PDP/Product-Details-Redesign-2/desktop-water-vs.png';
import Ultraviolet from '@/images/PDP/Product-Details-Redesign-2/Proven UV.png';
import UltravioletVS from '@/images/PDP/Product-Details-Redesign-2/UltravioletVSMobile.png';
import UltravioletVSDesktop from '@/images/PDP/Product-Details-Redesign-2/desktop-uv-vs.png';
import Image from 'next/image';

export default function ProvenSection() {
  return (
    <section
      id="proven-section"
      className="mt-9 flex flex-col items-center justify-center lg:mt-[60px] "
    >
      <div
        id="waterproof-section"
        className="w-full max-w-[850px] pb-9 lg:pb-[60px] "
      >
        <p className="w-full pb-3 text-center text-[22px] font-[700] leading-[25px] lg:pb-[38px] lg:text-[38px] lg:leading-[44px]">
          Waterproofing is Proven
        </p>
        {/* <Image
          alt=""
          src={Waterproofing}
          className="mb-[-1px] w-full rounded-ss-sm"
        /> */}
        <div className="mb-[-1px] w-full overflow-hidden rounded-t-xl">
          <video
            // controls
            autoPlay
            loop
            muted
            preload="none"
            className=""
            src={'/images/PDP/Product-Details-Redesign-2/WaterGIF.mp4'}
            playsInline
          >
            {/* <source src={UVGIF.originalFilePath} type="video/mp4" /> */}
          </video>
        </div>

        <Image
          alt=""
          src={WaterVS}
          className="w-full rounded-ss-sm lg:hidden"
        />
        <Image
          alt=""
          src={WaterVSDesktop}
          className="hidden w-full rounded-ss-sm lg:block"
        />
      </div>
      <div id="uv-section" className=" w-full max-w-[850px]">
        <p className="w-full  pb-3 text-center text-[22px] font-[700] leading-[25px] lg:pb-[38px] lg:text-[38px] lg:leading-[44px]">
          UV Resistance Proven
        </p>
        <div className="mb-[-1px] w-full overflow-hidden rounded-t-xl">
          <video
            // controls
            autoPlay
            loop
            muted
            preload="none"
            className=""
            src={'/images/PDP/Product-Details-Redesign-2/UVGIF.mp4'}
            playsInline
          >
            {/* <source src={UVGIF.originalFilePath} type="video/mp4" /> */}
          </video>
        </div>
        <Image
          alt=""
          src={UltravioletVS}
          className=" w-full rounded-ss-sm lg:hidden"
        />
        <Image
          alt=""
          src={UltravioletVSDesktop}
          className="hidden w-full rounded-ss-sm lg:block"
        />
      </div>
    </section>
  );
}
