import Image, { StaticImageData } from 'next/image';
import React, { SetStateAction } from 'react';
import SeatCoverFreeDetails from './SeatCoverFreeDetails';
import CompatibleVehiclesTrigger from './CompatibleVehiclesTrigger';
import installments from '@/images/PDP/Product-Details-Redesign-2/paypal-installments.webp';
import { Rating } from '@mui/material';
import { SeatData, SeatImageDataObject, SeatString } from '../util';

const seatColors: { color: SeatString; data: SeatData }[] = [
  { color: 'BlackRedData', data: SeatImageDataObject.BlackRedData },
  { color: 'BlackData', data: SeatImageDataObject.BlackData },
  { color: 'GrayData', data: SeatImageDataObject.GrayData },
  { color: 'BeigeData', data: SeatImageDataObject.BeigeData },
];

export default function SeatContent({
  setSelectedColor,
  colorIndex,
  setColorIndex,
}: {
  setSelectedColor: React.Dispatch<SetStateAction<SeatData>>;
  colorIndex: number;
  setColorIndex: React.Dispatch<SetStateAction<number>>;
}) {
  return (
    <section className="flex h-full w-full flex-col max-lg:px-4 max-lg:pt-[34px] lg:sticky lg:top-8 lg:w-1/2">
      <div className="flex flex-col ">
        <div className="flex flex-col gap-0.5">
          {/* Product Title */}
          <h2 className="text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:text-[28px] lg:leading-[30px] ">
            Leatherette <br className="lg:hidden" /> Front Seat Covers
          </h2>
          {/* Rating(s) */}
          <div className="flex pb-[36px] ">
            <Rating
              name="read-only"
              value={5}
              readOnly
              style={{
                height: '25px',
                color: '#BE1B1B',
              }}
            />
          </div>
        </div>
      </div>
      <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
        <div className="leading-[20px]"> ${99.95}</div>
        <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
          <span className=" text-[#BEBEBE] line-through">${200}</span>
          <p>(-50%)</p>
        </div>
      </div>
      <div className="pb-4.5 mt-1.5 flex items-center gap-2 ">
        <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
          4 interest-free installments of{' '}
          <b className="font-[400] text-black">$24.99</b>
        </p>
        <Image alt="paypal-installents" src={installments} />
        {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
      </div>
      <section
        id="select-color"
        className="mb-[30px] mt-[24px] flex  w-full flex-col py-1"
      >
        <h3 className="mb-[6px] max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
          Select Color
        </h3>
        <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
          {seatColors &&
            seatColors.map((i, index) => {
              return (
                <div
                  key={`car-color-${index}`}
                  className={`flex ${index === colorIndex && 'border-1 border border-[#6F6F6F] '} cursor-pointer flex-col place-content-center rounded-full p-[2px] `}
                  onClick={() => {
                    setColorIndex(index);
                    setSelectedColor(i.data);
                  }}
                >
                  <Image
                    alt="cover-color"
                    src={i.data[0] as StaticImageData}
                    className="rounded-full"
                  />
                </div>
              );
            })}
        </div>
      </section>
      <SeatCoverFreeDetails />
      <CompatibleVehiclesTrigger />
    </section>
  );
}
