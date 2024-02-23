import React from 'react';
import Waterproofing from '@/images/PDP/Product-Details-Redesign-2/Proven Waterproofing.png';
import WaterVS from '@/images/PDP/Product-Details-Redesign-2/WaterproofVS.png';
import Ultraviolet from '@/images/PDP/Product-Details-Redesign-2/Proven UV.png';
import UltravioletVS from '@/images/PDP/Product-Details-Redesign-2/UltravioletVS.png';
import Image from 'next/image';

export default function ProvenSection() {
  return (
    <section id="proven-section" className="mt-9 bg-white">
      <div id="waterproof-section" className="pb-9">
        <p className="w-full pb-3 text-center text-[22px] font-[700] leading-[25px]">
          Waterproofing is Proven
        </p>
        <Image alt="" src={Waterproofing} className="w-full rounded-ss-sm" />
        <Image alt="" src={WaterVS} className="w-full rounded-ss-sm" />
      </div>
      <div id="uv-section">
        <p className="w-full pb-3 text-center text-[22px] font-[700] leading-[25px]">
          UV Resistance Proven
        </p>
        <Image alt="" src={Ultraviolet} className="w-full rounded-ss-sm" />
        <Image alt="" src={UltravioletVS} className="w-full rounded-ss-sm" />
      </div>
    </section>
  );
}
