import Image from 'next/image';
import React from 'react';
import CAR from '@/images/hero/covers-grid/car-cover-home-icon.webp';
import FRONT_SEAT from '@/images/hero/covers-grid/seat-cover-front-home-icon.webp';
import FULL_SEAT from '@/images/hero/covers-grid/seat-cover-full-home-icon.webp';
import FLOOR_MAT from '@/images/hero/covers-grid/floor-mat-home-icon.webp';
import Link from 'next/link';

const coverTypes = [
  {
    title: 'Seat Covers',
    description: 'Front Seat',
    img: FRONT_SEAT,
    link: '/seat-covers/leather',
  },
  {
    title: 'Seat Covers',
    description: 'Full Seat',
    img: FULL_SEAT,
    link: '/seat-covers/leather',
  },
  {
    title: 'Car Covers',
    description: 'Car / SUV / Truck',
    img: CAR,
    link: '/car-covers/premium-plus',
  },
  {
    title: 'Floor Mats',
    description: 'Car / SUV / Truck',
    img: FLOOR_MAT,
    link: '/floor-mats/textured',
  },
];

const CoversGrid = () => {
  return (
    <span className="mt-[-40px] h-full flex-col items-center px-4 lg:mt-[-80px] lg:flex lg:px-[80px]">
      <div className="grid h-full max-w-[1280px]  grid-cols-1 grid-rows-2 place-items-center gap-[22px] md:grid-cols-2 md:grid-rows-1 lg:gap-[20px]  ">
        {coverTypes.map(({ title, description, img, link }, i) => {
          return (
            <div
              key={`${title}-${i}-block`}
              className="h-full min-h-[39px] w-full min-w-[162.42px] bg-[#F9F9FB] lg:min-h-[226px] lg:min-w-[451.83px]"
            >
              <Link
                href={link}
                className="flex h-full min-w-[167px] items-center justify-between rounded-[8px] px-[15px] py-[14px] shadow-md lg:flex-row lg:gap-[82px] lg:pl-[60px] lg:pr-[56px]"
              >
                <div className="flex w-full min-w-[45%] flex-[0.4] flex-col gap-[10px] whitespace-nowrap text-left align-middle leading-[17.6px] lg:order-first lg:w-1/2 lg:max-w-[45%]">
                  <p className="text-[20px] font-[900] uppercase lg:text-[24px]">
                    {title}
                  </p>
                  <p className="text-[16px] font-[500] normal-case text-[#A7A7A7] lg:text-[18px]">
                    {description}
                  </p>
                </div>
                <div className={`flex max-h-[197px] max-w-[208px] lg:w-full `}>
                  {img && (
                    <Image
                      alt={`cover-image-${title}`}
                      src={img}
                      className="object-cover"
                      loading="eager"
                      width={208}
                      height={197}
                    />
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </span>
  );
};

export default CoversGrid;
