import ProductVideo from '@/components/PDP/ProductVideo';
import BuiltResilience from '@/public/images/PDP/floor-mats/built-resilience.webp';
import GrippyTexture from '@/public/images/PDP/floor-mats/grippy-texture.webp';
import HighQuality from '@/public/images/PDP/floor-mats/high-quality.webp';
import NoCurl from '@/public/images/PDP/floor-mats/no-curl.webp';
import Image from 'next/image';
// import Image from 'next/image';

const stayNewData = [
  { src: GrippyTexture, title: 'Non-Slip, Grippy Texture' },
  { src: NoCurl, title: 'No Curls, No Deformations' },
  { src: BuiltResilience, title: 'Built for resilience' },
  { src: HighQuality, title: 'Crafted from High-Quality Materials' },
];

export default function StepInWithConfidence() {
  return (
    <section className="flex w-full flex-col items-center bg-white lg:pb-[84px]">
      <div className="pb-[26px] pt-[43px] lg:pb-[20px] lg:pt-[66px]">
        <p className="text-[26px] font-semibold leading-[26px] lg:text-[45px] lg:leading-[32px]">
          Step In With Confidence
        </p>
      </div>
      <div className="lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-[18px] lg:pt-12">
        {stayNewData.map(({ src, title }, index) => (
          <div
            key={title}
            className="flex max-w-[621px] flex-col pb-[22px] text-center text-[#7D7D7D] max-md:px-4 "
          >
            <Image
              alt={`stay-fresh-item-${index}`}
              src={src}
              width={800}
              height={800}
              className="min-w-full rounded-xl lg:max-h-[328px] lg:max-w-[621px]"
            />
            <p className="pt-3 text-lg font-medium capitalize lg:pt-[20px] lg:text-[22px] ">
              {title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
