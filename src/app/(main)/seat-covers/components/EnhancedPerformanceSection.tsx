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
    <div className="flex w-full flex-col items-center justify-center">
      <p className="flex w-full items-center justify-center pb-[34px] pt-[43px] text-center text-[26px] font-[600] leading-[26px] lg:pb-[45px] lg:pt-[66px] lg:text-[45px]  lg:leading-[32px]">
        Enhanced Performance
      </p>
      <section className="grid w-full max-w-[840px] grid-cols-2 gap-[7px] max-lg:px-4 lg:grid-cols-4 lg:gap-[14px]">
        {enhancedPerformanceData.map(({ img, title }, index) => (
          <div key={index} className="flex w-full flex-col items-center justify-center">
            <Image
              alt={`enhanced-performance-item-${index}`}
              src={img}
              className="w-full"
            />
            <p className="flex w-full items-center justify-center bg-[#717171] py-[10px] text-white">
              {title}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
