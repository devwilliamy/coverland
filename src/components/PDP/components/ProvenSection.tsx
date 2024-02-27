import WaterVS from '@/images/PDP/Product-Details-Redesign-2/WaterproofVSMobile.png';
import WaterVSDesktop from '@/images/PDP/Product-Details-Redesign-2/desktop-water-vs.png';
import UltravioletVS from '@/images/PDP/Product-Details-Redesign-2/UltravioletVSMobile.png';
import UltravioletVSDesktop from '@/images/PDP/Product-Details-Redesign-2/desktop-uv-vs.png';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const WaterproofVideo = dynamic(
  () => import('@/components/PDP/components/WaterproofVideo'),
  {
    loading: () => (
      <div className="flex h-full">
        <div className="h-full w-full animate-pulse bg-gray-200" />
      </div>
    ),
  }
);

const UVResistanceVideo = dynamic(
  () => import('@/components/PDP/components/UVResistanceVideo'),
  {
    loading: () => (
      <div className="flex h-full">
        <div className="h-full w-full animate-pulse bg-gray-200" />
      </div>
    ),
  }
);

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
        <WaterproofVideo />
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
        <UVResistanceVideo />
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
