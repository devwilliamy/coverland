import Link from 'next/link';
import LineSeparator from '../ui/line-separator';
import CallIcon from '../icons/CallIcon';

export default function PolicyFurtherAssistance() {
  return (
    <div className="bg-opacity-2 rounded-xl border-2 border-gray-300 py-8">
      <div className="px-5 text-center">
        <h1 className="text-2xl font-bold text-black">
          Need Further Assistance?
        </h1>
        <h2 className="pt-2 text-sm font-normal text-black">
          Contact one of our Product Specialists Today!
        </h2>
        <p className="space pt-2 text-xs font-bold italic tracking-[1.4px] text-black">
          Our customer support services are available 7 days a week 9:00 AM to
          5:30 PM PST.
        </p>
      </div>
      <LineSeparator className="mx-6 mb-6 mt-4" />
      <div className="flex flex-col items-center justify-center">
        <Link href="tel:800-799-5165">
          <CallIcon />
        </Link>
        <p className="py-3 text-base font-bold">Call Us</p>
        <Link
          href="tel:800-799-5165"
          className="rounded-lg border border-[#185CFF] px-5 py-0.5 text-xs font-bold text-[#185CFF]"
        >
          (800) 799-5165
        </Link>
      </div>
    </div>
  );
}
