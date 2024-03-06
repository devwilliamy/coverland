import Image from 'next/image';
import React from 'react';
import Header from '@/images/accessories-page/header.webp';
import Grid1 from '@/images/accessories-page/fg-1.webp';
import Grid2 from '@/images/accessories-page/fg-2.webp';
import Grid3 from '@/images/accessories-page/fg-3.webp';
import Grid4 from '@/images/accessories-page/fg-4.webp';

export default function AccessoriesPage() {
  return (
    <div className="flex h-full w-full flex-col items-center pb-[120px]">
      <Image src={Header} alt="accessories-header" />
      <p className="w-full pb-[56px] pt-[180px] text-center text-[40px] font-[700] leading-[40px]">
        Features
      </p>
      <p className="w-[80%] max-w-[650px]">
        Be prepared for any eventuality with an Emergency Escape Tool. For
        example, this tool can quickly break the glass for a safe escape in a
        vehicle submersion or fire. This multi-use tool can break glass, cut
        through a seat belt, and hammer away. If the seatbelts do not unlock,
        the sharp blade can cut through all passenger{"'"}s seatbelts allowing
        for a quick escape. In the event of a fire or water hazard, the safety
        hammer can break the glass with the sharp tip, and the flat end can
        knock out any remaining jagged glass. Install this safety hammer in the
        car with the included screw or hold it in place with double-sided
        adhesive. In case of emergency, you should always keep this safety
        hammer within easy reach of the driver.
      </p>
      <ul className=" w-[80%] max-w-[650px] list-inside list-disc pt-8">
        {[
          'Size 210g',
          '0.2 lb head',
          'Available in Black or Orange',
          '3-in-1 multifunction tool',
          'Cuts through seat belts',
          'Break auto glass',
        ].map((item) => (
          <li key={item} className="list-item">
            {item}
          </li>
        ))}
      </ul>
      <section className="grid w-full max-w-[1024px] grid-cols-2 grid-rows-2 gap-[56px] pt-[110px]">
        {[
          {
            img: Grid2,
            title: 'Heavy Alloy Tip',
            desc: 'This premium Triton Escape tool has a heavy alloy striking tip. This comes in really handy when you’re stuck because it can break glass and obstructions within seconds. It is rust-resistant and has high durability.',
          },
          {
            img: Grid4,

            title: 'Safety Black Seatbelt Cutter',
            desc: 'Our black Triton escape tool comes with a sharp cutter in case your seatbelt gets stuck during an emergency. It has an easily removed cover clip to ensure it remains razor-sharp and is only exposed when needed.',
          },
          {
            img: Grid1,
            title: 'Reflective Tape',
            desc: 'This escape tool is equipped and wrapped stylishly with reflective tape for easy recognition in the dark. Due to its high reflective ability, this tape helps you locate the tool for quick use during an emergency.',
          },
          {
            img: Grid3,
            title: '3 in 1 Breaker, Cutter, and Hammer',
            desc: 'Our quality Triton Escape is fully equipped with its three-in-one feature. It bears a breaker to shatter glasses, a cutter to make way through entangling ropes and seatbelts, and a hammer to break obstacles.',
          },
        ].map(({ img, title, desc }, index) => (
          <div key={''} className="flex flex-col items-start ">
            <Image src={img} alt={`image-${index}`} />
            <p className="py-4 text-[18px] font-[700] leading-[21px]">
              {title}
            </p>
            <p className="w-full text-[16px] leading-[22px] text-[#707070]">
              {desc}
            </p>
          </div>
        ))}
      </section>
      <
    </div>
  );
}
