import { GrayDualArrow } from '@/components/PDP/components/icons/GrayDualArrow';
import { GrayShieldCheck } from '@/components/PDP/components/icons/GrayShieldCheck';
import { GrayWrench } from '@/components/PDP/components/icons/GrayWrench';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import { SeatData } from '../util';

export default function ElevateComfortSection({
  selectedColor,
}: {
  selectedColor: SeatData;
}) {
  const [protectionData, setProtectionData] = useState<
    {
      image: StaticImageData;
      title: string;
      description: string;
    }[]
  >([]);
  useEffect(() => {
    setProtectionData([
      {
        image: selectedColor?.[2],
        title: 'Drive in Comfort',
        description: 'High-quality, Durable, and Easy-to-Clean Material.',
      },
      {
        image: selectedColor?.[3],
        title: 'Breathable Design',
        description: `Perforated Leather to stay cool in any ride.`,
      },
      {
        image: selectedColor?.[4],
        title: 'Perfect Fit in Minutes',
        description: 'Semi-Custom Look, Effortless to Install and Maintain',
      },
      {
        image: selectedColor?.[5],
        title: 'Airbag Compatible ',
        description: 'Safety, seamlessly integrated',
      },
    ]);
  }, [selectedColor]);

  const threeIcons = [
    { title: 'Easy Install', icon: <GrayWrench /> },
    { title: 'Custom Fit', icon: <GrayDualArrow /> },
    { title: 'Airbag Safe', icon: <GrayShieldCheck /> },
  ];

  const HeaderSeat = selectedColor[1];

  return (
    <section className="relative flex max-w-[100dvw] flex-col items-center bg-[#1A1A1A] pb-[34px] lg:mt-[42px] ">
      <p className="flex w-full items-center justify-center py-7 text-center text-[26px] font-[500] leading-[26px] text-white lg:p-[6px] lg:pb-[38px] lg:pt-[60px] lg:text-[45px]  lg:leading-[32px]">
        Elevate Comfort And Style
      </p>
      <div className="flex w-screen max-w-[850px] items-center justify-center lg:w-full ">
        <Image
          alt="product-content-seat-header"
          src={HeaderSeat}
          className="flex "
        />
      </div>

      <span className="mt-[30px] grid grid-cols-3 items-center justify-center gap-[30px] lg:gap-[120px]">
        {threeIcons.map(({ title, icon }) => (
          <div key={title} className="flex flex-col items-center ">
            <div>{icon}</div>
            <p className="pt-1.5 text-[14px] leading-[16px] text-white lg:text-[18px] lg:leading-[21px] ">
              {title}
            </p>
          </div>
        ))}
      </span>
      <p className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white  lg:p-[6px] lg:pt-[60px] lg:text-[45px] lg:leading-[52px] ">
        Quality You Can Feel
      </p>
      <span className="flex flex-col lg:grid lg:grid-cols-2 lg:justify-center lg:gap-[21px] lg:px-[39px]">
        {protectionData?.map(({ image, title, description }) => (
          <div
            key={title}
            className="pt-[38px] text-center text-white max-lg:px-4"
          >
            {image && (
              <Image
                alt="enhanced-item"
                src={image}
                className="w-full rounded-lg lg:h-[221px] lg:w-[420px]"
              />
            )}
            <p className="pt-[18px] text-[22px]  font-[500] leading-[25px] ">
              {title}
            </p>
            <p className=" pt-1.5 text-[14px] leading-[26px] text-[#D3D3D3] lg:text-[16px] lg:leading-[18px] ">
              {description}
            </p>
          </div>
        ))}
      </span>
    </section>
  );
}
