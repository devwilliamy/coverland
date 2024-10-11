import ProductVideo from '@/components/PDP/ProductVideo';
import FamilyCar from '@/public/images/PDP/floor-mats/family-car.webp';

import NoChemical from '@/public/images/PDP/floor-mats/no-chemical.webp';
import EcoFriendly from '@/public/images/PDP/floor-mats/eco-friendly.webp';
import Image from 'next/image';
// import Image from 'next/image';

const stayNewData = [
  {
    src: NoChemical,
    title: 'No Chemical, No Odor',
    subtitle: 'Latex, PVCs, Cadmium And Lead-Free',
  },
  {
    src: EcoFriendly,
    title: '100% Eco-Friendly',
    subtitle: 'Crafted With Recyclable Material',
  },
];

export default function SafeForFamily() {
  return (
    <section className="flex w-full flex-col items-center bg-[#E7E7E7]">
      <div className="pb-[34px] pt-[52px] lg:pb-12 lg:pt-[87px]">
        <p className="text-center text-[26px] font-semibold leading-[30px] lg:text-[45px] lg:leading-[56px]">
          Safe For Your Family,
          <br />
          Kind To The Earth
        </p>
      </div>

      <div className="flex w-full flex-col items-center px-4">
        <Image
          alt={`stay-fresh-item`}
          src={FamilyCar}
          width={874}
          height={656}
          className="w-full rounded-xl border-4 border-white lg:max-h-[656px] lg:max-w-[874px]"
        />
        <div className="grid w-full grid-cols-2 gap-2 pt-3">
          {stayNewData.map(({ src, title, subtitle }, index) => (
            <div
              key={title}
              className={`flex max-w-[428px] flex-col pb-[22px] text-[#7D7D7D] ${
                index === 0 ? 'items-end text-right' : 'text-left'
              }`}
            >
              <Image
                alt={`stay-fresh-item-${index}`}
                src={src}
                width={428}
                height={241}
                className="min-w-full rounded-xl border-4 border-white lg:max-h-[241px] lg:max-w-[428px]"
              />
              <div className={index === 0 ? 'mr-2' : 'ml-2'}>
                <p className="pt-[14px] text-base font-semibold capitalize text-black lg:pt-[20px] lg:text-[22px]">
                  {title}
                </p>
                <p className="pt-[6px] text-sm font-medium capitalize text-[#7D7D7D] lg:pt-[12px] lg:text-[16px]">
                  {subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
