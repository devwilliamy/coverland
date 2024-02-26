import Image from 'next/image';
import React from 'react';
import OthersVSCoverlandMobile from '@/images/PDP/Product-Details-Redesign-2/OthersVSCoverland.png';
import OthersVSCoverlandDesktop from '@/images/PDP/Product-Details-Redesign-2/desktop-vs.jpg';

export default function DifferenceGrid() {
  const differences: {
    title: string;
    others: JSX.Element | string;
    coverland: JSX.Element | string;
  }[] = [
    {
      title: 'Material',
      others: (
        <>
          <p>Thin, Weak</p>
        </>
      ),
      coverland: (
        <>
          <p>Thick, High-Density</p>
        </>
      ),
    },
    {
      title: 'Durability',
      others: (
        <>
          <p>1-2 Years</p>
        </>
      ),
      coverland: (
        <>
          <p>10+ Years</p>
        </>
      ),
    },
    {
      title: 'Waterproof',
      others: (
        <>
          <p>
            Limited <br /> (Trap Moisture)
          </p>
        </>
      ),
      coverland: (
        <>
          <p>
            Yes <br /> (Breathable)
          </p>
        </>
      ),
    },
    {
      title: 'Sun',
      others: 'Limited Protection',
      coverland: 'Full UV Block',
    },
    {
      title: 'Flexibility',
      others: 'Hard to Fit',
      coverland: 'Easy Fit + Stretch',
    },
    {
      title: 'Soft Inner',
      others: (
        <>
          <p>
            No <br /> (Risks Scratches)
          </p>
        </>
      ),
      coverland: (
        <>
          <p>
            Yes <br /> (Paint Protection)
          </p>
        </>
      ),
    },
    {
      title: 'Warranty',
      others: 'Limited Warranty',
      coverland: 'Lifetime Warranty',
    },
    {
      title: 'Value',
      others: 'Short-term Savings',
      coverland: 'Lifetime Value',
    },
  ];
  return (
    <div className="mb-[52px] px-2 pb-2 lg:w-full lg:px-0">
      <span className="flex w-full flex-col text-center">
        <p className="w-full py-[20px] text-[22px] font-[500] leading-[24px] text-[#EBE9E9] lg:pb-[36px] lg:text-[40px] lg:font-[500]">
          See the Difference:
        </p>
        <div className="flex py-1 italic lg:pb-5 lg:text-[28px] lg:font-[500] lg:leading-[24px] ">
          <p className=" w-1/2 text-[#B5B5B5]">Others</p>
          <p className=" w-1/2  text-white">Coverland</p>
        </div>
        <Image
          alt="Others-VS-Coverland"
          src={OthersVSCoverlandMobile}
          className="mb-[14px] w-full lg:hidden"
        />
        <Image
          alt="Others-VS-Coverland"
          src={OthersVSCoverlandDesktop}
          className="mb-[14px] hidden w-full lg:block"
        />
      </span>
      <div className="mt-[24px] flex flex-col overflow-hidden rounded-md">
        {differences.map(({ title, others, coverland }, index) => (
          <div
            key={title}
            className={`grid w-full grid-cols-[1fr_0.85fr_1fr] place-items-center  text-center  text-[14px] text-white`}
          >
            <div
              className={` flex h-full w-full items-center ${index + 1 !== differences.length && 'border-b-[1px] border-b-[#5D5D5D]'} justify-center  bg-[#333333] px-1 py-[14px] text-center text-[#B5B5B5]`}
            >
              {others}
            </div>
            <div className="flex h-full w-full grow-0 items-center justify-center bg-black/80 px-2 py-[14px] text-[12px]">
              {title}
            </div>
            <div
              className={`flex h-full w-full items-center justify-center ${index + 1 !== differences.length && 'border-b-[1px] border-b-[#C94F4F]'} bg-[#981D18] px-1 py-[14px]`}
            >
              {coverland}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
