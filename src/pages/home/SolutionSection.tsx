import PerfectSolution from '@/images/hero/perfect-solution-video.png';
import Image from 'next/image';

export default function SolutionSection() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-[45px] font-black uppercase">
        Perfect Solution for All Weather
      </p>
      <span className="flex w-full flex-col items-center bg-[#1A1A1A] px-[150px] pt-[92px]">
        {/* <Video /> */}
        <Image
          src={PerfectSolution}
          className="mb-"
          alt="Perfect Solution Image"
        />
        <button className="my-[30px] flex min-h-[48px] min-w-[214px] flex-col items-center justify-center rounded-[4px] bg-[#BE1B1B] px-[40px] py-[17px] text-[16px] font-black text-white outline outline-[1px] outline-white">
          Shop Now
        </button>
      </span>
    </div>
  );
}
