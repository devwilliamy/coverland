import Image from 'next/image';
import PerfectCustomFitFloorMat from '@/public/images/PDP/floor-mats/perfect-custom-fit-small.webp';
export default function PerfectCustomFit() {
  return (
    <section className="w-full bg-[#1A1A1A]">
      <h2 className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white  lg:p-[6px] lg:pt-[60px] lg:text-[45px] lg:leading-[52px] ">
        The Perfect Custom Fit
      </h2>
      <div className="pt-[10px]">
        <p className="text-center text-sm font-light text-[#D3D3D3]">
          3D Engineered For Precise Fit <br />
          To Every Curve And Corner
        </p>
      </div>
      <span className="grid max-w-[840px] grid-cols-2 grid-rows-2 justify-center justify-items-stretch gap-[22px] pt-[34px]  max-lg:grid-cols-1 ">
        <div className="flex flex-col items-center text-center text-white ">
          <Image
            alt={`perfect-custom-fit`}
            width={375}
            height={280}
            src={PerfectCustomFitFloorMat}
            className="min-w-full lg:max-h-[221px] lg:max-w-[420px]"
          />
        </div>
      </span>
    </section>
  );
}
