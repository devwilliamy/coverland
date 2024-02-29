import Image, { StaticImageData } from 'next/image';
import React from 'react';
import AirVents from '@/images/PDP/Product-Details-Redesign-2/premium-plus/keep_dry.webp';
import TapeSeams from '@/images/PDP/Product-Details-Redesign-2/premium-plus/zero_leaks.webp';
import WindStraps from '@/images/PDP/Product-Details-Redesign-2/premium-plus/wind-straps.webp';
import PremiumZippers from '@/images/PDP/Product-Details-Redesign-2/premium/premium-side-zipper.webp';
import PremiumAirVents from '@/images/PDP/Product-Details-Redesign-2/premium/premium-air-vents.webp';
import PremiumTapeSeams from '@/images/PDP/Product-Details-Redesign-2/premium/premium-tape-seams.webp';
import PremiumWindStraps from '@/images/PDP/Product-Details-Redesign-2/premium/premium-wind-straps.webp';
import { useParams } from 'next/navigation';

const premiumPlusData = [
  {
    image: AirVents,
    title: 'Air Vents',
    description: 'Circulate hot air and moisture',
  },
  {
    image: TapeSeams,
    title: 'Tape Seams',
    description: 'Prevents any leakage through the seams',
  },
  {
    image: WindStraps,
    title: 'Wind Straps',
    description: 'Keep your cover in place',
  },
];

const premiumData = [
  {
    image: PremiumZippers,
    title: 'Side Zipper',
    description: 'Easy access under the cover.',
  },
  {
    image: PremiumAirVents,
    title: 'Air Vents',
    description: 'Circulate hot air and moisture',
  },
  {
    image: PremiumTapeSeams,
    title: 'Tape Seams',
    description: 'Prevents any leakage through the seams',
  },
  {
    image: PremiumWindStraps,
    title: 'Wind Straps',
    description: 'Keep your cover in place',
  },
];

export default function EnhanceProtectionSection() {
  const params = useParams();
  const coverType = params?.coverType;
  const isPremiumPlus = params?.coverType === 'premium-plus';

  const protectionData: {
    image: StaticImageData;
    title: string;
    description: string;
  }[] =
    coverType === undefined || isPremiumPlus ? premiumPlusData : premiumData;

  return (
    <section className=" pt-[60px] ">
      <p className="w-full pb-[18px] text-center text-[30px] font-[600] leading-[35px] lg:text-[45px] lg:leading-[52px]  ">
        Enhanced Protection
      </p>
      <div
        className={`flex flex-col ${!isPremiumPlus && coverType ? 'lg:grid lg:grid-cols-[max(420px)_max(420px)] lg:gap-0' : ' lg:flex-row'} lg:justify-center lg:gap-[21px] lg:px-[39px]`}
      >
        {protectionData.map(({ image, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center max-lg:pt-4 lg:flex-[420px] "
          >
            <Image
              alt="enhanced-item"
              src={image}
              height={221}
              width={420}
              className="aspect-video w-full min-w-full rounded-[12px] "
            />
            <p className="space-x-2 pt-[22px] text-[18px] font-[600] leading-[21px]">
              {title}
            </p>
            <p className="mx-auto text-[#7D7D7D] lg:max-w-[208px] lg:text-center">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
