import Image from 'next/image';
import React from 'react';
import CAR from '@/images/hero/covers-grid/car-cover-home-icon.webp';
import TRUCK from '@/images/hero/covers-grid/truck-cover-home-icon.webp';
import SUV from '@/images/hero/covers-grid/suv-cover-home-icon.webp';
import SEAT from '@/images/hero/covers-grid/main-seatcover.webp';
import Link from 'next/link';

const coverTypes = [
  {
    title: 'Car Covers',
    description: 'Car/ SUV/ Truck',
    img: CAR,
    link: '/car-covers/premium-plus',
  },
  // { title: 'Truck Covers', img: TRUCK, link: '/truck-covers/premium-plus' },
  // { title: 'SUV Covers', img: SUV, link: '/suv-covers/premium-plus' },
  {
    title: 'Seat Covers',
    description: 'Front Seat/ Full Set',
    img: SEAT,
    link: '/seat-covers/leather',
  },
];

const CoversGrid = () => {
  return (
    <span className="mt-[-40px] h-full flex-col items-center px-4 lg:mt-[-80px] lg:flex lg:px-[80px]">
      <div className="grid h-full max-w-[1280px]  grid-cols-1 grid-rows-2 place-items-center gap-[7px] md:grid-cols-2 md:grid-rows-1  lg:gap-[20px]  ">
        {coverTypes.map(({ title, description, img, link }, i) => {
          return (
            <div key={`${title}-${i}-block`} className="h-full w-full">
              <Link
                href={link}
                className="flex h-full min-w-[167px]  items-center justify-between rounded-[8px] px-[15px] py-[20px] shadow-md lg:flex-row lg:gap-[36px] lg:px-[50px]"
              >
                <div className=" flex w-full min-w-[45%] flex-[0.4] flex-col gap-[10px]  whitespace-nowrap  text-center align-middle text-[20px] font-[900] uppercase leading-[22px] lg:order-first lg:w-1/2 lg:max-w-[45%] lg:text-[24px]">
                  <p className="text-left leading-[17.6px]"> {title}</p>
                  <p className="text-left text-[16px] font-[500] normal-case leading-[17.6px] text-[#A7A7A7]">
                    {description}
                  </p>
                </div>
                <div
                  className={`flex max-h-[146px] max-w-[160px] shrink lg:w-full `}
                >
                  <Image
                    alt={`cover-image-${title}`}
                    src={img}
                    className=" flex-[0.3] shrink object-cover"
                    loading="eager"
                    width={175}
                    height={152}
                  />
                </div>
                {/* {img === SEAT ? (
                  <div
                    className={`flex max-h-[128px] max-w-[114px] shrink lg:w-full `}
                  >
                    <Image
                      alt={`cover-image-${title}`}
                      src={img}
                      className=" flex-[0.3] shrink object-cover"
                      loading="eager"
                      width={175}
                      height={152}
                    />
                  </div>
                ) : (
                  <div
                    className={`flex max-h-[146px] max-w-[160px] shrink lg:w-full `}
                  >
                    <Image
                      alt={`cover-image-${title}`}
                      src={img}
                      className=" flex-[0.3] shrink object-cover"
                      loading="eager"
                      width={175}
                      height={152}
                    />
                  </div>
                )} */}
              </Link>
            </div>
          );
        })}
      </div>
    </span>
  );
};

export default CoversGrid;
