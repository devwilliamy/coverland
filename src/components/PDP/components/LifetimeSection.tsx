import Image from 'next/image';
import React from 'react';
import LifetimeCheck from '@/images/PDP/Product-Details-Redesign-2/lifetime-sheild-check.png';

export default function LifetimeSection() {
  return (
    <section className="flex flex-col items-center pt-[60px] lg:mb-[40px] lg:pt-[110px]">
      <p className="w-full text-center text-[30px] font-[600] leading-[22px]">
        Lifetime Warranty
      </p>
      <p className="pt-[13px] text-[22px] font-[500] leading-[28px] text-[#7D7D7D] ">
        Available for a Limited Time
      </p>
      <Image
        alt=""
        src={LifetimeCheck}
        className="pb-7 pt-3 lg:w-[132px] lg:pt-[38px]"
      />
      <ul className=" list-disc flex-col">
        {[
          {
            title: 'All Tears Covered:',
            body: 'Beyond factory defects.',
          },
          {
            title: 'Normal Wear:',
            body: 'Includes weather damage.',
          },
          {
            title: 'Lifetime Assurance:',
            body: 'Always protected.',
          },
          {
            title: 'Effortless Claims:',
            body: ' Easy, no questions asked.',
          },
        ].map(({ title, body }) => (
          <li
            key={title}
            className="list-item text-[14px] font-[500] leading-[30px] lg:text-[22px] lg:leading-[42px]"
          >
            <div className="flex gap-1.5">
              <p className="font-[700]">{title}</p>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
