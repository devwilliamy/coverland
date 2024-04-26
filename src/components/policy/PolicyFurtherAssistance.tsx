'use client';
import Link from 'next/link';
import LineSeparator from '../ui/line-separator';
import CallIcon from '../icons/CallIcon';
import { useMediaQuery } from '@mantine/hooks';

export default function PolicyFurtherAssistance() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return (
    <div className="bg-opacity-2 w-full rounded-xl border-2 border-gray-300 py-8 lg:flex lg:flex-row lg:justify-evenly">
      <div className="px-5 text-center lg:flex lg:flex-col lg:justify-center lg:px-12 lg:text-left">
        <h3 className="text-2xl font-bold text-black lg:whitespace-nowrap lg:text-3xl">
          Need Further Assistance?
        </h3>
        <h4 className="pt-2 text-sm font-normal text-black lg:whitespace-nowrap lg:text-lg">
          Contact one of our Product Specialists Today!
        </h4>
        <p className="space pt-2 text-[10px] font-bold italic tracking-[1.4px] text-black lg:whitespace-nowrap lg:tracking-[0.2px]">
          Our customer support services are available 7 days a week 9:00 AM to
          5:30 PM PST.
        </p>
      </div>
      {isDesktop ? (
        <div className="flex">
          <LineSeparator className="border-1" orientation="vertical" />
        </div>
      ) : (
        <LineSeparator className="mx-6 mb-6 mt-4" />
      )}
      <div className="flex flex-col items-center justify-center lg:px-10">
        <Link href="tel:800-799-5165">
          <CallIcon />
        </Link>
        <p className="py-3 text-base font-bold">Call Us</p>
        <Link
          href="tel:800-799-5165"
          className="whitespace-nowrap rounded-lg border border-[#185CFF] px-5 py-0.5 text-xs font-bold text-[#185CFF]"
        >
          (800) 799-5165
        </Link>
      </div>
    </div>
  );
}
