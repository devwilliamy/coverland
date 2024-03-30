import EP1 from '@/images/PDP/seat-covers-v2/enh-perf-1.webp';
import EP2 from '@/images/PDP/seat-covers-v2/enh-perf-2.webp';
import EP3 from '@/images/PDP/seat-covers-v2/enh-perf-3.webp';
import EP4 from '@/images/PDP/seat-covers-v2/enh-perf-4.webp';
import Image from 'next/image';

const enhancedPerformanceData = [
  { img: EP1, title: 'Belt Buckle Access' },
  { img: EP2, title: 'Armrest Compatible' },
  { img: EP3, title: 'Back Storage Pocket' },
  { img: EP4, title: 'Front storage Pocket' },
];

export default function EnhancedPerformanceSection() {
  return (
    <>
      <p className="flex w-full items-center justify-center pb-[34px] pt-[43px] text-center text-[26px] font-[500] leading-[26px]  lg:pb-[38px] lg:pt-[66px] lg:text-[45px]  lg:leading-[32px]">
        Enhanced Performance
      </p>
      <section className="mx-auto grid grid-cols-2 gap-[7px] lg:grid-cols-4 lg:gap-[14px] justify-content align-middle">
        {enhancedPerformanceData.map(({ img, title }, index) => (
          <div
            key={index}
            className=""
          >
            <Image alt={`enhanced-performance-item-${index}`} src={img} width={200} height={200} />
            <p className="flex items-center justify-center bg-[#717171] py-[10px] text-white">
              {title}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
