import React from 'react';
import IntertekLogo from '@/images/PDP/Product-Details-Redesign-2/intertek.png';
import IntertekResults from '@/images/PDP/Product-Details-Redesign-2/intertek-results.png';
import Image from 'next/image';
import BgBlur from '@/images/PDP/Product-Details-Redesign-2/pdp-background-blur.png';

export default function RealTestSection() {
  return (
    <section className="relative -mx-4 mt-[60px] flex flex-col  justify-center">
      <Image
        alt=""
        src={BgBlur}
        className="translate-y-15 absolute z-[-1] w-[200%] object-cover "
      />
      <span className="px-4">
        <p className="w-full text-center text-[30px] font-[600] leading-[22px] ">
          Real Test, True Result
        </p>
        <div className="flex w-full flex-col items-center pt-[14px] text-center text-[22px] font-[500] leading-[28px] text-[#7D7D7D]">
          <p>Thoroughly Tested</p>
          <p>For Your Peace of Mind</p>
        </div>
        <div className="flex w-full flex-col items-center">
          <Image alt="intertek" src={IntertekLogo} className="py-9" />
          <Image
            alt="intertek-results"
            src={IntertekResults}
            className="w-full"
          />
        </div>
        <span className="flex w-full justify-center">
          <a
            href={'/images/PDP/Product-Details-Redesign-2/intertek-results.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[36px] flex w-[75%] max-w-[255px] justify-center  rounded-lg bg-black px-6 py-[15px] text-center font-[600] uppercase text-white"
            title="Download test Results"
          >
            Download test Results
          </a>
        </span>
      </span>
    </section>
  );
}
