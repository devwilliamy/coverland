import PerfectSolution from '@/images/hero/perfect-solution-video.png';
import Image from 'next/image';

export default function SolutionSection() {
  return (
    <div className="flex flex-col items-center">
      <p className=" mb-[32px] text-center text-[24px] font-black uppercase leading-[26px] lg:hidden">
        Perfect Solution <br />
        for All Weather
      </p>
      <p className="mb-[40px] hidden text-center text-[45px] font-black uppercase leading-[36px] lg:flex ">
        Perfect Solution for All Weather
      </p>
      <span className="flex w-full flex-col items-center bg-[#1A1A1A] lg:px-[150px] lg:pt-[92px]">
        {/* <Video /> */}
        <Image
          src={PerfectSolution}
          className="min-h-[190px] min-w-[339px] "
          alt="Perfect Solution Image"
        />
        <button className="my-[30px] flex min-h-[48px] w-full max-w-[214px]  flex-col items-center justify-center rounded-[4px] bg-[#BE1B1B] px-[40px] py-[15px] text-[16px] font-black text-white outline outline-[1px] outline-white">
          Shop Now
        </button>
      </span>
    </div>
  );
}
