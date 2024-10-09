import Image from 'next/image';
import PerfectCustomFitFloorMat from '@/public/images/PDP/floor-mats/perfect-custom-fit-small.webp';
export default function PerfectCustomFit() {
  return (
    <section>
      <h2 className="flex w-full items-center justify-center pt-[60px] text-center text-[26px] font-[500] leading-[30px] text-white  lg:p-[6px] lg:pt-[60px] lg:text-[45px] lg:leading-[52px] ">
        The Perfect Custom Fit
      </h2>
      <h3>
        3D Engineered for Precise Fit <br />
        to Every Curve and Corner
      </h3>
      <span className="grid max-w-[840px] grid-cols-2 grid-rows-2 justify-center justify-items-stretch gap-[22px] pt-[38px]  max-lg:grid-cols-1 ">
        <div className="flex flex-col items-center text-center text-white ">
          <Image
            alt={`perfect-custom-fit`}
            src={PerfectCustomFitFloorMat}
            className="min-w-full lg:max-h-[221px] lg:max-w-[420px]"
          />
          {/* <p className="pt-[18px] text-[18px] font-[500]  leading-[25px] lg:text-[22px] ">
            {title}
          </p>
          <p className=" pt-1.5 text-[14px] leading-[16px] text-[#D3D3D3] lg:text-[16px] lg:leading-[18px] ">
            {description}
          </p> */}
        </div>
      </span>
    </section>
  );
}
