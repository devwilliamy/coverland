import Image from 'next/image';
import React from 'react';
import CAR from '@/images/hero/covers-grid/car-cover-home-icon.webp';
import TRUCK from '@/images/hero/covers-grid/truck-cover-home-icon.webp';
import SUV from '@/images/hero/covers-grid/suv-cover-home-icon.webp';
import SEAT from '@/images/hero/covers-grid/seat-cover-home-icon.webp';

const coverTypes = [
  { title: 'Car Covers', img: CAR, link: '/car-covers/premium-plus' },
  { title: 'Truck Covers', img: TRUCK, link: '/truck-covers/premium-plus' },
  { title: 'SUV Covers', img: SUV, link: '/suv-covers/premium-plus' },
  { title: 'Seat Covers', img: SEAT, link: '/seat-covers/Leatherette' },
];

const CoversGrid = () => {
  return (
    <span className="mt-[-40px] h-full flex-col items-center px-4 lg:mt-[-80px] lg:flex lg:px-[80px]">
      <div className="grid h-full max-w-[1280px]  grid-cols-2 grid-rows-2 place-items-center gap-[7px] lg:gap-[20px]  ">
        {coverTypes.map(({ title, img, link }, i) => {
          return (
            <div
              key={`${title}-${i}-block`}
              // className={`${title !== 'Car Covers' ? 'pointer-events-none' : ''}`}
              className="h-full"
            >
              <a
                href={link}
                className="flex h-full min-w-[167px]  flex-col items-center justify-center rounded-[8px] p-[10px] shadow-md lg:flex-row lg:gap-[36px] lg:px-[50px]"
              >
                <p className="order-last flex min-w-[45%] flex-[0.1] justify-center whitespace-nowrap text-center align-middle text-[14px] font-[900] uppercase lg:order-first lg:w-1/2 lg:max-w-[45%] lg:text-[24px]">
                  {title}
                </p>
                <div
                  className={`flex flex-[0.9] ${i + 1 === coverTypes.length && 'pb-2.5'} lg:w-full `}
                >
                  <Image
                    alt={`cover-image-${title}`}
                    src={img}
                    className=" object-cover"
                  />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </span>
  );
};

export default CoversGrid;
