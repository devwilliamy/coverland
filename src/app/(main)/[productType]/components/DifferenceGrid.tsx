import Image from 'next/image';
import React from 'react';
import OthersVSCoverland from '@/images/PDP/Product-Details-Redesign-2/OthersVSCoverland.png';

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
    <div className="mb-[52px] px-2 pb-2">
      <span className="flex w-full flex-col text-center">
        <p className="w-full py-[20px] text-[22px] font-[500] leading-[24px] text-[#EBE9E9]">
          See the Difference:
        </p>
        <div className="flex py-1 italic ">
          <p className=" w-1/2 text-[#B5B5B5]">Others</p>
          <p className=" w-1/2  text-white">Coverland</p>
        </div>
        <Image
          alt="Others-VS-Coverland"
          src={OthersVSCoverland}
          className="h-200 mb-[14px] w-full"
        />
      </span>
      <div className="flex flex-col overflow-hidden rounded-md">
        {differences.map(({ title, others, coverland }) => (
          <div
            key={title}
            className="grid w-full grid-cols-[1fr_0.85fr_1fr] place-items-center text-center  text-[14px] text-white"
          >
            <div className=" flex h-full w-full items-center justify-center bg-[#333333] px-1 py-[14px] text-center">
              {others}
            </div>
            <div className="flex h-full grow-0 items-center justify-center px-2 py-[14px] text-[12px]">
              {title}
            </div>
            <div className="flex h-full w-full items-center justify-center bg-[#981D18] px-1 py-[14px]">
              {coverland}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
