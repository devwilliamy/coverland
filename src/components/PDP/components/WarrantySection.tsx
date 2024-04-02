'use client';
import Image from 'next/image';
import React from 'react';
import LifetimeCheck from '@/images/PDP/Product-Details-Redesign-2/lifetime-sheild-check.webp';
import LifetimeCheckDesktop from '@/images/PDP/Product-Details-Redesign-2/sheild-check-desktop.webp';
import { useParams, usePathname } from 'next/navigation';
import useDetermineType from '@/hooks/useDetermineType';

export default function WarrantySection() {
  const params = useParams();
  const pathname = usePathname();
  const { isPremiumPlus } = useDetermineType();
  const coverType = params?.coverType;
  const isDefaultCoverType = isPremiumPlus || coverType === undefined;
  const warrantyData = [
    {
      title: 'All Tears Covered:',
      body: 'Beyond factory defects.',
    },
    {
      title: 'Normal Wear:',
      body: pathname.startsWith('/seat-covers')
        ? 'Covers daily use impacts.'
        : ' Includes weather damage.',
    },
    {
      title: 'Lifetime Assurance:',
      body: 'Always protected.',
    },
    {
      title: 'Effortless Claims:',
      body: ' Easy, no questions asked.',
    },
  ];
  let warrantyLength: string | number = 'Lifetime';

  !isDefaultCoverType && warrantyData.splice(2, 1);

  switch (coverType) {
    case 'premium-plus':
      warrantyLength = 'Lifetime';
      break;

    case 'premium':
      warrantyLength = '5-Year';
      break;

    case 'standard-pro':
      warrantyLength = '2-Year';
      break;

    case 'standard':
      warrantyLength = '1-Year';
      break;
  }

  if (pathname.startsWith('/seat-covers')) {
    warrantyLength = '10-Year';
    warrantyData.splice(2, 1);
  }

  return (
    <section className="flex flex-col items-center pt-[60px]  lg:pt-[110px]">
      <p className="w-full text-center text-[30px] font-[600] leading-[22px]">
        {warrantyLength} Warranty
      </p>
      <p className="pt-[13px] text-[22px] font-[500] leading-[28px]">
        Available for a Limited Time
      </p>
      <Image
        alt="Lifetime-Check-Mobile"
        src={LifetimeCheck}
        className="py-7 lg:hidden lg:w-[132px] lg:pt-[38px]"
      />
      <Image
        alt="Lifetime-Check-Desktop"
        src={LifetimeCheckDesktop}
        className="hidden pb-7 pt-3 lg:block lg:w-[132px] lg:pt-[38px]"
      />
      <ul className=" list-disc flex-col">
        {warrantyData.map(({ title, body }) => (
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
