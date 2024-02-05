import DeliveryDate from '@/components/PDP/components/DeliveryDate';
import { TimeTo2PMPST } from '@/components/PDP/components/TimeTo2PM';
import React from 'react';
import { BsBoxSeam, BsGift } from 'react-icons/bs';

type Props = {};

export default function FreeDetails({}: Props) {
  return (
    <div className="flex flex-col items-start justify-start pt-6">
      <div className="flex flex-row items-start justify-start">
        <div className="flex flex-col items-start justify-start pr-4 pt-0">
          <BsBoxSeam size={20} color="#000" />
        </div>
        <div className="flex w-full flex-col items-start justify-start md:w-auto">
          <div className="mb-[9px] max-h-[10px] text-[14px] font-[700] leading-[100%]">
            <span className="font-[700] uppercase">Free shipping</span>
            <span className=""> - </span>
            <DeliveryDate />
          </div>
          <div>
            <TimeTo2PMPST />
          </div>
          <p className="mt-[7px] text-[14px] font-[700] leading-[16px] text-[#1B8500]">
            Free Returns for 30 Days
          </p>
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-[14px]">
        <BsGift size={20} color="#000" />
        <p className="text-[14px] font-[400] capitalize ">
          <span className="font-bold uppercase">$30 free</span> value kit
          included
        </p>
        {/* <BsInfoCircle size={20} color="#767676" /> */}
      </div>
    </div>
  );
}
