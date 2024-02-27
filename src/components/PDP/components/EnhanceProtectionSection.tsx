import Image, { StaticImageData } from 'next/image';
import React from 'react';
import AirVents from '@/images/PDP/Product-Details-Redesign-2/keep_dry.webp';
import TapeSeams from '@/images/PDP/Product-Details-Redesign-2/zero_leaks.webp';
import WindStraps from '@/images/PDP/Product-Details-Redesign-2/wind-straps.webp';
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
  let protectionData: {
    image: StaticImageData;
    title: string;
    description: string;
  }[] = [];

  // : {
  //   image: StaticImageData;
  //   title: string;
  //   desription: string;
  // };
  const params = useParams();
  const isPremium = params?.coverType === 'premium';
  if (isPremium) {
    protectionData = premiumData;
  } else {
    protectionData = premiumPlusData;
  }

  return (
    <section className=" pt-[60px] ">
      <p className="w-full pb-[35px] text-center text-[30px] font-[600] leading-[35px]  ">
        Enhanced Protection
      </p>
      <div
        className={`flex flex-col ${isPremium ? 'lg:grid lg:grid-cols-2 lg:gap-0' : ' lg:flex-row'} lg:justify-center lg:gap-[21px] lg:px-[60px]`}
      >
        {protectionData.map(({ image, title, description }) => (
          <div key={title} className="flex flex-col items-center ">
            <Image
              alt="enhanced-item"
              src={image}
              className="h-full max-h-[180px] min-h-[180px] w-full rounded-lg lg:max-h-[216px] lg:max-w-[410px]"
            />
            <div className="flex  flex-col items-center py-4 ">
              <p className="pb-1 text-[18px] font-[600] leading-[21px]">
                {title}
              </p>
              <p className="text-[#7D7D7D] lg:text-center">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
