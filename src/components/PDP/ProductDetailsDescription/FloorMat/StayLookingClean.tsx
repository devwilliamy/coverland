import ProductVideo from '@/components/PDP/ProductVideo';
import VacuumReady from '@/public/images/PDP/floor-mats/vacuum-ready.webp';
import SimplyRinse from '@/public/images/PDP/floor-mats/simply-rinse.webp';
import ConcealFootprint from '@/public/images/PDP/floor-mats/conceal-footprint.webp';
import Image from 'next/image';

const photosAndCaptions = [
  { src: SimplyRinse, title: 'Simply Rinse, Instantly Clean' },
  { src: VacuumReady, title: 'Vacuum Ready, Clean in a Flash' },
  { src: ConcealFootprint, title: 'Conceals Footprints, Enjoy Easy Care' },
];

export default function StayLookingClean() {
  return (
    <section className="flex w-full flex-col items-center bg-[#1A1A1A] pb-12">
      <div className="pb-8 pt-[43px] lg:pb-[20px] lg:pt-[66px]">
        <p className="text-center text-[26px] font-medium leading-[32px] text-white lg:text-[45px] lg:font-semibold lg:leading-[52px]">
          Clean Up In a Minute <br />
          Stay Looking Clean
        </p>
      </div>

      {photosAndCaptions.map(({ src, title }, index) => (
        <div
          key={title}
          className="flex max-w-[621px] flex-col pb-[22px] text-center text-[#B5B5B5] max-md:px-4"
        >
          <Image
            alt={`stay-looking-clean-${index}`}
            src={src}
            width={800}
            height={800}
            className="min-w-full lg:max-h-[328px] lg:max-w-[621px]"
          />
          <p className="pt-3 text-lg font-medium capitalize lg:pt-[20px] lg:text-[22px]">
            {title}
          </p>
        </div>
      ))}
    </section>
  );
}
