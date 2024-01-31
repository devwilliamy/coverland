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
    <span className="mt-[-70px] h-full flex-col items-center px-4 lg:flex lg:px-[80px]">
      <div className="grid h-full max-w-[1280px]  grid-cols-2 grid-rows-2 place-items-center gap-[7px] lg:gap-[20px]  ">
        {coverTypes.map(({ title, img }) => (
          <div key={`${title}-block`}>
            <a
              href="/car-covers"
              className="flex min-w-[167px]  flex-col items-center justify-center rounded-[8px] p-[10px] shadow-md lg:flex-row lg:gap-[36px] lg:px-[50px]"
            >
              <p className="order-last flex min-w-[45%] flex-[0.1] justify-center whitespace-nowrap text-center align-middle text-[14px] font-[900] uppercase lg:order-first lg:w-1/2 lg:max-w-[45%] lg:text-[24px]">
                {title}
              </p>
              <div className="flex flex-[0.9] lg:h-full lg:w-full ">
                <Image alt="" objectFit=" cover" src={img} />
              </div>
            </a>
          </div>
        ))}
      </div>
    </span>
  );
};

export default CoversGrid;
