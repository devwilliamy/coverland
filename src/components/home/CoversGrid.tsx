import Image from 'next/image';
import React from 'react';
import CAR from '@/images/hero/car-cover-home-icon.png';
import TRUCK from '@/images/hero/truck-cover-home-icon.png';
import SUV from '@/images/hero/suv-cover-home-icon.png';

const coverTypes = [
  { title: 'Car Covers', img: CAR },
  { title: 'Truck Covers', img: TRUCK },
  { title: 'SUV Covers', img: SUV },
];

const CoversGrid = () => {
  return (
    <div className=" mb-[110px] mt-[40px] hidden h-full  flex-col items-center  lg:flex">
      <div className="grid h-full max-w-[1280px]  grid-cols-2 grid-rows-2 place-items-center gap-[20px]  ">
        {coverTypes.map(({ title, img }) => (
          <div
            key={`${title}-block`}
            className="flex items-center gap-[36px] rounded-[8px] px-[50px] shadow-md"
          >
            <p className=" w-2/4 min-w-[45%] max-w-[45%] justify-center  text-center align-middle text-[24px] font-[900] uppercase">
              {title}{' '}
            </p>
            <div className="h-full w-full ">
              <Image alt="" objectFit="cover" src={img} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoversGrid;
