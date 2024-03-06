'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Header from '@/images/accessories-page/header.webp';
import Grid1 from '@/images/accessories-page/fg-1.webp';
import Grid2 from '@/images/accessories-page/fg-2.webp';
import Grid3 from '@/images/accessories-page/fg-3.webp';
import Grid4 from '@/images/accessories-page/fg-4.webp';
import { Moon, Sun } from 'lucide-react';

type AccessoriesTheme = {
  bg: string;
  text: string;
  desc?: string;
};
const themes: Record<string, AccessoriesTheme> = {
  light: {
    bg: 'white',
    text: 'black',
    desc: '#707070',
  },
  dark: {
    bg: 'black',
    text: 'white',
    desc: '#d6d6d6',
  },
};

export default function AccessoriesPage() {
  const [theme, setTheme] = useState<AccessoriesTheme>(themes.light);

  return (
    <section
      className={`flex h-full w-full flex-col items-center pb-[60px] lg:pb-[120px] text-[${theme.text}] bg-[${theme.bg}]`}
      style={{
        background: theme.bg,
      }}
    >
      <Image src={Header} alt="accessories-header" />
      <button
        className={`my-4 rounded-full p-1 outline-[${theme.text}] outline outline-[1px]`}
        onClick={() => {
          if (theme === themes.light) {
            setTheme(themes.dark);
            return;
          }
          setTheme(themes.light);
        }}
      >
        {theme === themes.light ? <Moon /> : <Sun />}
      </button>
      <p className="w-full pb-[26px] pt-[30px] text-center text-[40px] font-[700] leading-[40px] lg:pb-[56px] lg:pt-[180px]">
        Features
      </p>
      <p className={`w-[80%] max-w-[650px] `}>
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
      <span className="grid w-full max-w-[1024px] items-center gap-[56px] pt-[60px] max-lg:px-4 lg:pt-[110px] min-[1024px]:grid-cols-2">
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
          <div key={''} className="flex flex-col items-center ">
            <Image
              src={img}
              alt={`image-${index}`}
              className="w-full object-cover"
            />
            <p className="w-full py-4 text-start text-[18px] font-[700] leading-[21px]">
              {title}
            </p>
            <p
              className={`w-full text-[16px] leading-[22px] text-[${theme.desc}]`}
            >
              {desc}
            </p>
          </div>
        ))}
      </span>
      <button
        className="p-4"
        onClick={() => {
          if (theme === themes.light) {
            setTheme(themes.dark);
            return;
          }
          setTheme(themes.light);
        }}
      >
        {theme === themes.light ? <Sun /> : <Moon />}
      </button>
    </section>
  );
}
